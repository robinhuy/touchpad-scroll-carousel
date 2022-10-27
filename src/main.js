import { DEFAULT_OPTIONS } from "./const";
import { initArrows, initMouseDrag } from "./dom";
import { createScrollIndicator, getResponsiveSettings, setCarouselStyles } from "./style";

function ScrollCarousel(options) {
  // Set default values
  let {
    carouselSelector,
    slidesToShow,
    slidesToScroll,
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
  let { _slidesToShow, _slidesToScroll, _gap } = getResponsiveSettings(
    responsive,
    slidesToShow,
    slidesToScroll,
    gap
  );
  _slidesToScroll = Math.round(_slidesToScroll);
  if (Number.isFinite(+_gap)) {
    _gap = _gap + "px";
  }
  const gapNumber = parseFloat(_gap);
  const totalGapNumber = (_slidesToShow - 1) * gapNumber;

  // Global variables to track data changed
  let position = { top: 0, left: 0, x: 0, y: 0 };
  let item = { width: 0, fullWidth: 0 };

  setCarouselStyles(carousel, carouselSelector, _slidesToShow, _gap, gapNumber, totalGapNumber);

  if (arrows) {
    initArrows(
      carousel,
      position,
      item,
      gapNumber,
      totalGapNumber,
      _slidesToShow,
      _slidesToScroll,
      nextButtonSelector,
      prevButtonSelector
    );

    // Re-init to prevent layout changed
    setTimeout(() => {
      initArrows(
        carousel,
        position,
        item,
        gapNumber,
        totalGapNumber,
        _slidesToShow,
        _slidesToScroll,
        nextButtonSelector,
        prevButtonSelector,
        true
      );
    }, 100);
  }

  const { scrollIndicatorBar } = createScrollIndicator(carousel);
  carousel.addEventListener("scroll", () => {
    const carouselMaxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;
    const scrollIndicatorBarMaxTranslate = carousel.offsetWidth - scrollIndicatorBar.offsetWidth;
    const scrollIndicatorBarTranslate =
      (carousel.scrollLeft * scrollIndicatorBarMaxTranslate) / carouselMaxScrollLeft;
    scrollIndicatorBar.style.transform = `translateX(${scrollIndicatorBarTranslate}px)`;
  });

  if (mouseDrag) {
    initMouseDrag(carousel, position, scrollIndicatorBar);
  }
}

window.ScrollCarousel = ScrollCarousel;
