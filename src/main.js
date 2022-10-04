import { DEFAULT_OPTIONS } from "./const";
import { initArrows, initMouseDrag } from "./dom";
import { setCarouselStyles } from "./style";

/**
 * Init.
 *
 * @param {Object} options
 *
 * @return {Void}
 *
 */
function _init(options) {
  let {
    carouselSelector,
    slidesToShow,
    gap,
    mouseDrag,
    arrows,
    prevButtonSelector,
    nextButtonSelector,
  } = Object.assign(DEFAULT_OPTIONS, options);
  const carousel = document.querySelector(carouselSelector);
  let position = { top: 0, left: 0, x: 0, y: 0 };

  if (Number.isFinite(+gap)) {
    gap = gap + "px";
  }
  const gapNumber = parseFloat(gap);
  const totalGapNumber = (slidesToShow - 1) * gapNumber;
  setCarouselStyles(carousel, slidesToShow, gap, gapNumber, totalGapNumber);

  if (arrows) {
    initArrows(
      carousel,
      position,
      gapNumber,
      totalGapNumber,
      slidesToShow,
      nextButtonSelector,
      prevButtonSelector
    );
  }

  if (mouseDrag) {
    initMouseDrag(carousel, position);
  }
}

_init({
  carouselSelector: "#carousel",
  slidesToShow: 3,
  gap: 30,
  mouseDrag: true,
});
