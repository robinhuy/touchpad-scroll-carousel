import { DEFAULT_OPTIONS } from "./const";
import { initArrows, initMouseDrag } from "./dom";
import { getResponsiveSettings, setCarouselStyles } from "./style";

function ScrollCarousel(options) {
  // Set default values
  let {
    carouselSelector,
    slidesToShow,
    gap,
    mouseDrag,
    arrows,
    prevButtonSelector,
    nextButtonSelector,
    responsive,
  } = Object.assign({ ...DEFAULT_OPTIONS }, options);

  // Check carousel selector
  const carousel = document.querySelector(carouselSelector);
  if (!carousel) {
    console.error(`Cannot found carouselSelector "${carouselSelector}".`);
    return;
  }

  // Setup sizes
  slidesToShow = getResponsiveSettings(responsive, slidesToShow, gap).slidesToShow;
  gap = getResponsiveSettings(responsive, slidesToShow, gap).gap;
  if (Number.isFinite(+gap)) {
    gap = gap + "px";
  }
  const gapNumber = parseFloat(gap);
  const totalGapNumber = (slidesToShow - 1) * gapNumber;
  setCarouselStyles(carousel, slidesToShow, gap, gapNumber, totalGapNumber);

  let position = { top: 0, left: 0, x: 0, y: 0 };

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

window.ScrollCarousel = ScrollCarousel;
