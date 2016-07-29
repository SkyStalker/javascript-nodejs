'use strict';

var _ = require('lodash');
var Order = require('payments').Order;
var Transaction = require('payments').Transaction;
var User = require('users').User;
var CourseParticipant = require('../../models/courseParticipant');
var CourseInvite = require('../../models/courseInvite');
var CourseGroup = require('../../models/courseGroup');

exports.get = function*() {

  let cutDate = new Date();
  cutDate.setDate(cutDate.getDate() - 30);
  let groups = this.locals.groups = yield CourseGroup.find({
    dateEnd: {
      $gt: cutDate
    }
  }).sort({dateEnd: -1}).populate('teacher');

  let orderCounts = this.locals.orderCounts = {};
  let amounts = this.locals.amounts = {};

  for (let i = 0; i < groups.length; i++) {
    let group = groups[i];

    let orders = yield Order.find({
      'data.group': group._id,
      status:       {
        $in: [Order.STATUS_SUCCESS, Order.STATUS_PENDING]
      }
    });

    // filter out duplicates
    let ordersByUser = _.groupBy(orders, 'user');

    let successCount = orders
      .filter(o => o.status == Order.STATUS_SUCCESS)
      .reduce((prev, current) => prev + current.data.count, 0);

    let pendingCount = orders
      .filter(o => o.status == Order.STATUS_PENDING)
      .reduce((prev, current) => prev + current.data.count, 0);

    let pendingFilteredCount = 0;

    for (let userId in ordersByUser) {
      let ordersForUser = ordersByUser[userId];

      let successfulOrder = ordersForUser.filter(o => o.status == Order.STATUS_SUCCESS);

      // if user has successful order, we don't count pending, probably a dupe
      if (successfulOrder.length) {
        continue;
      }
      pendingFilteredCount += ordersForUser[0].data.count;
    }

    orderCounts[group.id] = {
      success: successCount,
      pending: pendingCount,
      pendingFiltered: pendingFilteredCount
    };


    let participants = yield CourseParticipant.find({
      group:    group._id,
      isActive: true
    }).populate('user invite');

    amounts[group.id] = {
      amount: 0,
      missing: []
    };

    // console.log(participants);
    // console.log("COUNT GROUP", group.title, participants.length);
    for(let j=0; j<participants.length; j++) {
      let participant = participants[j];

      let order;
      if (participant.invite) {
        order = yield Order.findById(participant.invite.order);
      } else {
        order = yield Order.findOne({
          'data.group':  group._id,
          'data.emails': participant.user.email,
          status:        Order.STATUS_SUCCESS
        });
      }

      if (!order) {
        // console.log("MISSING", participant.user.email);
        amounts[group.id].missing.push(participant.user.email);
      } else {
        // console.log("ADD", order.amount / order.data.count);
        amounts[group.id].amount += order.amount / order.data.count;
      }

    }

  }

  this.body = this.render('admin/groups');
};

function* loadOrderAdmin() {

  yield* this.loadOrder();

  if (!this.order) {
    this.throw(404, {
      info: 'Нет такого заказа.'
    });
  }

  if (!this.order.data.group) {
    this.throw(404, {
      info: 'Нет такого заказа на курс'
    });
  }

}

exports.post = function*() {

  yield* loadOrderAdmin.call(this);

  this.order.amount = this.request.body.amount;
  this.order.currency = this.request.body.currency;

  let order = this.order;

  function* paidTx() {
    let transaction = yield Transaction.findOne({
      order:  order._id,
      status: Transaction.STATUS_PENDING
    });
    yield* order.onPaid(transaction);

    order.status = Order.STATUS_SUCCESS;
  }

  function* paidDirect() {
    let transaction = yield Transaction.findOne({
      order:  order._id,
      status: Transaction.STATUS_PENDING
    });

    if (transaction) {
      yield transaction.persist({
        status: Transaction.STATUS_FAIL
      });
    }

    yield Transaction.create({
      order:         order._id,
      amount:        order.amount,
      status:        Transaction.STATUS_SUCCESS,
      currency:      order.currency,
      paymentMethod: 'direct'
    });

    yield* order.onPaid();

    order.status = Order.STATUS_SUCCESS;
  }

  if (this.order.status == Order.STATUS_CANCEL) {

    if (this.request.body.action == 'pending') {
      this.order.status = Order.STATUS_PENDING;
    } else if (this.request.body.action == 'paid-tx') {
      yield* paidTx();
    } else if (this.request.body.action == 'paid-direct') {
      yield* paidDirect();
    }

  } else if (this.order.status == Order.STATUS_PENDING) {
    if (this.request.body.action == 'paid-tx') {
      yield* paidTx();
    } else if (this.request.body.action == 'paid-free') {
      this.order.amount = 0;
      yield* order.onPaid();
      order.status = Order.STATUS_SUCCESS;
    } else if (this.request.body.action == 'paid-direct') {
      yield* paidDirect();
    }
  } else if (this.order.status == Order.STATUS_SUCCESS) {
    if (this.request.body.action == 'cancel') {
      this.order.status = Order.STATUS_CANCEL;

      var userIdsByEmails = yield User.find({
        email: {
          $in: this.order.data.emails
        }
      }, {id: 1});

      userIdsByEmails = userIdsByEmails.map(user => user._id);

      var participants = yield CourseParticipant.find({
        group:    this.order.data.group,
        user:     {
          $in: userIdsByEmails
        },
        isActive: true
      });

      this.log.debug("cancel participants", participants);

      for (var i = 0; i < participants.length; i++) {
        var participant = participants[i];
        yield participant.persist({
          isActive: false
        });
      }

      let transaction = yield Transaction.findOne({
        order:  order._id,
        status: Transaction.STATUS_SUCCESS
      });

      if (transaction) {

        yield transaction.log('возврат');

        yield transaction.persist({
          status: Transaction.STATUS_REFUND
        });
      }

    }
  }

  yield this.order.persist();

  this.redirect(this.originalUrl);

};

