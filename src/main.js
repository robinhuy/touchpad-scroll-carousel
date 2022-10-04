import { DEFAULT_OPTIONS } from "./const";
import { setCarouselStyles } from "./style";

/**
 * Init.
 *
 * @param {Object}   options    jQuery object with element.
 *
 * @return {Void}
 *
 */
function _init(options) {
  let {
    carouselSelector,
    prevButtonSelector,
    nextButtonSelector,
    slidesToShow,
    gap,
    mouseDrag,
  } = Object.assign(DEFAULT_OPTIONS, options);
  const carousel = document.querySelector(carouselSelector);

  if (Number.isFinite(+gap)) {
    gap = gap + "px";
  }
  const gapNumber = parseFloat(gap);
  const halfGap = gap.replace(gapNumber, gapNumber / 2);

  let position = { top: 0, left: 0, x: 0, y: 0 };
  let itemWidth = carousel.offsetWidth / slidesToShow;

  setCarouselStyles(carousel, slidesToShow, halfGap);

  if (prevButtonSelector) {
    document.querySelector(prevButtonSelector).addEventListener("click", () => {
      carousel.scrollTo({
        left: carousel.scrollLeft - itemWidth - gapNumber,
        behavior: "smooth",
      });
    });
  }

  if (nextButtonSelector) {
    document.querySelector(nextButtonSelector).addEventListener("click", () => {
      carousel.scrollTo({
        left: carousel.scrollLeft + itemWidth + gapNumber,
        behavior: "smooth",
      });
    });
  }

  if (mouseDrag) {
    const startDrag = function (e) {
      position = {
        // The current scroll
        left: carousel.scrollLeft,
        top: carousel.scrollTop,
        // The current mouse position
        x: e.clientX,
        y: e.clientY,
      };

      // Add event handleDrag on element
      carousel.addEventListener("mousemove", handleDrag);

      // Add event removeDragEvent on document to prevent mouseup outside element
      document.addEventListener("mouseup", removeDragEvent);

      // Disable user select when drag
      carousel.style.userSelect = "none";
      carousel.style.cursor = "grab";
    };

    const removeDragEvent = function () {
      document.removeEventListener("mouseup", removeDragEvent);
      carousel.removeEventListener("mousemove", handleDrag);
      carousel.style.removeProperty("user-select");
      carousel.style.removeProperty("cursor");
    };

    const handleDrag = function (e) {
      const dx = e.clientX - position.x;
      carousel.scrollLeft = position.left - dx;
    };

    _preventDragElementA(carouselSelector);
    carousel.addEventListener("mousedown", startDrag);
  }
}

const _preventDragElementA = (carouselSelector) => {
  let isDrag = false;

  document.querySelectorAll(carouselSelector + " a").forEach((element) =>
    element.addEventListener("dragstart", (event) => {
      element.style.cursor = "grab";
      isDrag = true;
      event.preventDefault();
    })
  );

  document.querySelectorAll(carouselSelector + " a").forEach((element) =>
    element.addEventListener("click", (event) => {
      if (isDrag) {
        event.preventDefault();
      }
    })
  );

  document.querySelectorAll(carouselSelector + " a").forEach((element) =>
    element.addEventListener("mouseup", () => {
      element.style.removeProperty("cursor");
      setTimeout(() => {
        isDrag = false;
      }, 50);
    })
  );
};

_init({
  carouselSelector: "#carousel",
  prevButtonSelector: "#prev",
  nextButtonSelector: "#next",
  slidesToShow: 3,
  gap: 15,
  mouseDrag: true,
});
