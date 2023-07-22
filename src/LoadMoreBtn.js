export default class LoadMoreBtn {
  static classes = {
    hidden: "hidden",
  };

  constructor({ selector, isHidden = false }) {
    this.button = this.getButton(selector);
    // if (isHidden) this.hide();
    isHidden && this.hide();
    // isHidden = true && this.hide(); -> true && true -> this.hide();
    // isHidden = false && this.hide(); -> false && true -> false
  }

  getButton(selector) {
    return document.querySelector(selector);
  }

  hide() {
    this.button.classList.add(LoadMoreBtn.classes.hidden);
  }

  show() {
    this.button.classList.remove(LoadMoreBtn.classes.hidden);
  }

  disable() {
    this.button.disabled = true;
    this.button.textContent = "Loading...";
  }

  enable() {
    this.button.disabled = false;
    this.button.textContent = "Load more";
  }

  end() {
    this.button.disabled = true;
    this.button.textContent = "The end!";
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const currentLocation = window.location.pathname;
  const navigationLinks = document.querySelectorAll('.navigation a');

  for (let link of navigationLinks) {
    const href = link.getAttribute('href');

    if (href === currentLocation) {
      link.classList.add('current');
    }
  }
});

const scrollUpButton = document.getElementById('scrollUpButton');

// Показывать кнопку, когда прокручено больше половины экрана
window.addEventListener('scroll', () => {
  if (window.scrollY > window.innerHeight / 2) {
    scrollUpButton.style.display = 'block';
  } else {
    scrollUpButton.style.display = 'none';
  }
});

// При клике на кнопку прокрутить страницу вверх
scrollUpButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});