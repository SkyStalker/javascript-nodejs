module.exports = class FeedbackSlider {
  constructor({elem}) {
    this.elem = elem;

    this.list = elem.querySelector('.courses-feedback-slides');

    this.arrowLeft = elem.querySelector('.courses-feedback-inline__control_left');
    this.arrowRight = elem.querySelector('.courses-feedback-inline__control_right');
    this.pagination = elem.querySelector('.courses-feedback-inline__pagination');
    this.position = 0;

    this.arrowRight.onclick = this.next.bind(this);
    this.arrowLeft.onclick = this.prev.bind(this);

    this.pagination.onclick = this.onPaginationClick.bind(this);
  }

  onPaginationClick(event) {
    let target = event.target.closest('li');
    if (!target) return;
    this.position = [].indexOf.call(this.pagination.children, target);
    console.log(this.position);
    this.render();
  }

  next() {
    this.position++;
    this.render();
  }

  prev() {
    this.position--;
    this.render();
  }

  render() {
    this.list.style.transform = this.position ? `translate3d(-${this.position}00%,0,0)` : '';
    let hidden = 'courses-feedback-inline__control_hidden';

    if (this.position === 0) {
      this.arrowLeft.classList.add(hidden);
    } else {
      this.arrowLeft.classList.remove(hidden);
    }

    if (this.position == this.list.children.length - 1) {
      this.arrowRight.classList.add(hidden);
    } else {
      this.arrowRight.classList.remove(hidden);
    }

    let active = this.pagination.querySelector('.courses-feedback-inline__page_active');
    if (active) {
      active.classList.remove('courses-feedback-inline__page_active');
    }
    this.pagination.children[this.position].classList.add('courses-feedback-inline__page_active');

  }


};
