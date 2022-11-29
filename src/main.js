import { DEFAULT_OPTIONS } from "./const";
import { initArrows, initMouseDrag, initScrollIndicatorBarDrag } from "./dom";
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
    scrollbarStyle,
    responsive,
  } = Object.assign({ ...DEFAULT_OPTIONS }, options);
  // Global state to track data changed
  const state = { isScrollbarIndicatorScrolling: false };

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

  setCarouselStyles(carousel, carouselSelector, _slidesToShow, _gap, gapNumber, totalGapNumber);

  if (arrows) {
    initArrows(
      carousel,
      gapNumber,
      totalGapNumber,
      _slidesToShow,
      _slidesToScroll,
      nextButtonSelector,
      prevButtonSelector
    );

    // Re-init to prevent layout changed (ex: document scrollbar appear/disappear)
    setTimeout(() => {
      initArrows(
        carousel,
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

  const { scrollIndicator, scrollIndicatorBar } = createScrollIndicator(carousel, scrollbarStyle);
  carousel.addEventListener("scroll", () => {
    if (!state.isScrollbarIndicatorScrolling) {
      const carouselMaxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;
      const scrollIndicatorBarMaxTranslate = carousel.offsetWidth - scrollIndicatorBar.offsetWidth;
      const scrollIndicatorBarTranslate =
        (carousel.scrollLeft * scrollIndicatorBarMaxTranslate) / carouselMaxScrollLeft;
      scrollIndicatorBar.style.transform = `translateX(${scrollIndicatorBarTranslate}px)`;
    }
  });
  initScrollIndicatorBarDrag(carousel, scrollIndicator, scrollIndicatorBar, state);

  if (mouseDrag) {
    initMouseDrag(carousel);
  }
}

window.ScrollCarousel = ScrollCarousel;
