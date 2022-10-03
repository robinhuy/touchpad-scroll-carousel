import './main.css';

let items,
  itemWidth = 0;
const carousel = document.getElementById('carousel');
let position = { top: 0, left: 0, x: 0, y: 0 };

const mouseDownHandler = function (e) {
  position = {
    // The current scroll
    left: carousel.scrollLeft,
    top: carousel.scrollTop,
    // The current mouse position
    x: e.clientX,
    y: e.clientY,
  };

  carousel.style.userSelect = 'none';
  carousel.addEventListener('mousemove', mouseMoveHandler);
  carousel.addEventListener('mouseup', mouseUpHandler);
};

const mouseUpHandler = function () {
  carousel.removeEventListener('mousemove', mouseMoveHandler);
  carousel.removeEventListener('mouseup', mouseUpHandler);

  carousel.style.cursor = 'grab';
  carousel.style.removeProperty('user-select');
  carousel.style.scrollBehavior = 'unset';
};

const mouseMoveHandler = function (e) {
  const dx = e.clientX - position.x;
  carousel.scrollLeft = position.left - dx;
};

carousel.addEventListener('mousedown', mouseDownHandler);

/**
 * Init.
 *
 * @param {Object}   $item    jQuery object with element.
 *
 * @return {Void}
 *
 */
function _init() {
  items = carousel.children;
  itemWidth = items[0].offsetWidth;

  document.getElementById('prev').addEventListener('click', prev);
  document.getElementById('next').addEventListener('click', next);

  _preventDragElementA();
}

function _preventDragElementA() {
  let isDrag = false;

  document.querySelectorAll('#carousel a').forEach((element) =>
    element.addEventListener('dragstart', (event) => {
      isDrag = true;
      event.preventDefault();
    })
  );

  document.querySelectorAll('#carousel a').forEach((element) =>
    element.addEventListener('click', (event) => {
      if (isDrag) {
        event.preventDefault();
      }
    })
  );

  document.querySelectorAll('#carousel a').forEach((element) =>
    element.addEventListener('mouseup', (event) => {
      setTimeout(() => {
        isDrag = false;
      }, 50);
    })
  );
}

function next() {
  carousel.scrollTo({
    left: carousel.scrollLeft + itemWidth + 30,
    behavior: 'smooth',
  });
}

function prev() {
  carousel.scrollTo({
    left: carousel.scrollLeft - itemWidth - 30,
    behavior: 'smooth',
  });
}

_init();
