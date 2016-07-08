var donate = webpackJsonp_name_([ 24 ], {
0: function(e, t, n) {
"use strict";
function r() {
var e = document.querySelector("[data-order-form]");
e && new a({
elem: e
});
}
var a = n(405);
r();
},
374: function(e, t) {
"use strict";
function n(e) {
if (e = e || {}, this.elem = e.elem, this.size = e.size || "medium", this.class = e.class ? " " + e.class : "", 
this.elemClass = e.elemClass, "medium" != this.size && "small" != this.size && "large" != this.size) throw Error("Unsupported size: " + this.size);
this.elem || (this.elem = document.createElement("div"));
}
n.prototype.start = function() {
this.elemClass && this.elem.classList.toggle(this.elemClass), this.elem.insertAdjacentHTML("beforeend", '<span class="spinner spinner_active spinner_' + this.size + this.class + '"><span class="spinner__dot spinner__dot_1"></span><span class="spinner__dot spinner__dot_2"></span><span class="spinner__dot spinner__dot_3"></span></span>');
}, n.prototype.stop = function() {
var e = this.elem.querySelector(".spinner");
e && (e.remove(), this.elemClass && this.elem.classList.toggle(this.elemClass));
}, e.exports = n;
},
379: function(e, t, n) {
"use strict";
function r(e) {
function t(e, t) {
var n = new CustomEvent(e);
return n.originalEvent = t, n;
}
function n(e, n) {
var r = t("fail", n);
r.reason = e, a.dispatchEvent(r);
}
function r(e, n) {
var r = t("success", n);
r.result = e, a.dispatchEvent(r);
}
var a = new XMLHttpRequest(), s = e.method || "GET", i = e.body, c = e.url;
a.open(s, c, !e.sync), a.method = s;
var u = o();
u && !e.skipCsrf && a.setRequestHeader("X-XSRF-TOKEN", u), "[object Object]" == {}.toString.call(i) && (a.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
i = JSON.stringify(i)), e.noDocumentEvents || (a.addEventListener("loadstart", function(e) {
a.timeStart = Date.now();
var n = t("xhrstart", e);
document.dispatchEvent(n);
}), a.addEventListener("loadend", function(e) {
var n = t("xhrend", e);
document.dispatchEvent(n);
}), a.addEventListener("success", function(e) {
var n = t("xhrsuccess", e);
n.result = e.result, document.dispatchEvent(n);
}), a.addEventListener("fail", function(e) {
var n = t("xhrfail", e);
n.reason = e.reason, document.dispatchEvent(n);
})), e.raw || a.setRequestHeader("Accept", "application/json"), a.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var d = e.normalStatuses || [ 200 ];
return a.addEventListener("error", function(e) {
n("Ошибка связи с сервером.", e);
}), a.addEventListener("timeout", function(e) {
n("Превышено максимально допустимое время ожидания ответа от сервера.", e);
}), a.addEventListener("abort", function(e) {
n("Запрос был прерван.", e);
}), a.addEventListener("load", function(t) {
if (!a.status) return void n("Не получен ответ от сервера.", t);
if (d.indexOf(a.status) == -1) return void n("Ошибка на стороне сервера (код " + a.status + "), попытайтесь позднее.", t);
var o = a.responseText, s = a.getResponseHeader("Content-Type");
if (s.match(/^application\/json/) || e.json) try {
o = JSON.parse(o);
} catch (t) {
return void n("Некорректный формат ответа от сервера.", t);
}
r(o, t);
}), setTimeout(function() {
a.send(i);
}, 0), a;
}
var a = n(371), o = n(380);
document.addEventListener("xhrfail", function(e) {
new a.Error(e.reason);
}), e.exports = r;
},
380: function(e, t) {
"use strict";
e.exports = function() {
var e = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return e ? e[1] : null;
};
},
401: function(e, t, n) {
"use strict";
t.FormPayment = n(402);
},
402: function(e, t, n) {
"use strict";
function r(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
var a = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var r = t[n];
r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
Object.defineProperty(e, r.key, r);
}
}
return function(t, n, r) {
return n && e(t.prototype, n), r && e(t, r), t;
};
}(), o = n(371), s = n(379), i = n(374), c = (n(377), function() {
function e(t, n) {
r(this, e), this.orderForm = t, this.paymentMethodElem = n;
}
return a(e, [ {
key: "request",
value: function t(e) {
var t = s(e);
return t.addEventListener("loadstart", function() {
var e = this.startRequestIndication();
t.addEventListener("loadend", e);
}.bind(this)), t;
}
}, {
key: "startRequestIndication",
value: function() {
var e = this;
this.paymentMethodElem.classList.add("modal-overlay_light");
var t = new i({
elem: this.paymentMethodElem.querySelector('[type="submit"]'),
size: "small",
"class": "",
elemClass: "button_loading"
});
return t.start(), function() {
e.paymentMethodElem.classList.remove("modal-overlay_light"), t && t.stop();
};
}
}, {
key: "readPaymentData",
value: function() {
var e = {};
return [].forEach.call(this.paymentMethodElem.querySelectorAll("input,select,textarea"), function(t) {
("radio" != t.type && "checkbox" != t.type || t.checked) && (e[t.name] = t.value);
}), e;
}
}, {
key: "submit",
value: function() {
var e = this, t = this.orderForm.getOrderData();
if (t) {
var n = this.readPaymentData();
if (!n.paymentMethod) return void new o.Error("Выберите метод оплаты.");
if ("invoice" == n.paymentMethod && !n.invoiceCompanyName) return new o.Error("Укажите название компании."), 
void this.paymentMethodElem.querySelector('[name="invoiceCompanyName"]').focus();
for (var r in n) t[r] = n[r];
var a = window.location.search.match(/[?&]code=([-\w]+)/);
a && (t.discountCode = a[1]);
var i = s({
method: "POST",
url: "/payments/common/checkout",
normalStatuses: [ 200, 403, 400 ],
body: t
});
t.orderTemplate && window.ga("ec:addProduct", {
id: this.orderForm.product,
variant: t.orderTemplate,
price: t.amount,
quantity: 1
}), window.ga("ec:setAction", "checkout", {
step: 1,
option: t.paymentMethod
}), window.metrika.reachGoal("CHECKOUT", {
product: this.orderForm.product,
method: t.paymentMethod,
price: t.amount
}), window.ga("send", "event", "payment", "checkout", "ebook"), window.ga("send", "event", "payment", "checkout-method-" + t.paymentMethod, this.orderForm.product);
var c = this.startRequestIndication();
i.addEventListener("success", function(n) {
if (403 == i.status) return new o.Error("<p>" + (n.result.description || n.result.message) + "</p><p>Пожалуйста, начните оформление заново.</p><p>Если вы считаете, что на сервере ошибка &mdash; свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.</p>"), 
void c();
if (400 == i.status) return new o.Error("<p>" + n.result.message + "</p><p>Если вы считаете, что произошла ошибка &mdash; свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.</p>"), 
void c();
var r = n.result;
if (r.form) {
window.ga("ec:setAction", "purchase", {
id: r.orderNumber
});
var a = document.createElement("div");
a.hidden = !0, a.innerHTML = r.form, document.body.appendChild(a);
var s = function u() {
u.called || (u.called = !0, a.firstChild.submit());
};
window.ga("send", "event", "payment", "purchase", "ebook", {
hitCallback: s
}), setTimeout(s, 500), window.metrika.reachGoal("PURCHASE", {
product: e.orderForm.product,
method: t.paymentMethod,
price: t.amount,
number: r.orderNumber
});
} else c(), new o.Error("Ошибка на сервере, свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.");
}), i.addEventListener("fail", c);
}
}
} ]), e;
}());
e.exports = c;
},
405: function(e, t, n) {
"use strict";
function r(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
var a = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var r = t[n];
r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
Object.defineProperty(e, r.key, r);
}
}
return function(t, n, r) {
return n && e(t.prototype, n), r && e(t, r), t;
};
}(), o = (n(379), n(371)), s = n(372), i = n(401).FormPayment, c = function() {
function e(t) {
var n = this;
r(this, e), this.elem = t.elem, this.product = "donate", this.elem.addEventListener("submit", function(e) {
return n.onSubmit(e);
}), this.delegate("[data-order-payment-change]", "click", function(e) {
e.preventDefault(), this.elem.querySelector("[data-order-form-step-payment]").style.display = "block", 
this.elem.querySelector("[data-order-form-step-confirm]").style.display = "none", 
this.elem.querySelector("[data-order-form-step-receipt]").style.display = "none";
}), this.delegate("[data-order-currency]", "change", function(e) {
e.delegateTarget.value;
});
}
return a(e, [ {
key: "onSubmit",
value: function(e) {
e.preventDefault(), new i(this, this.elem).submit();
}
}, {
key: "getOrderData",
value: function() {
var e = {};
if (window.orderNumber ? e.orderNumber = window.orderNumber : (e.orderTemplate = "webpack", 
e.amount = this.elem.amount.value, e.currency = this.elem.currency.value), this.elem.elements.email) {
if (!this.elem.elements.email.value) return window.ga("send", "event", "payment", "checkout-no-email", "donate"), 
window.metrika.reachGoal("CHECKOUT-NO-EMAIL", {
product: "donate"
}), new o.Error("Введите email."), this.elem.elements.email.scrollIntoView(), setTimeout(function() {
window.scrollBy(0, -200);
}, 0), void this.elem.elements.email.focus();
e.email = this.elem.elements.email.value;
}
return e;
}
} ]), e;
}();
s.delegateMixin(c.prototype), e.exports = c;
}
});
//# sourceMappingURL=donate.f199b1bfe739fffa5b63.js.map