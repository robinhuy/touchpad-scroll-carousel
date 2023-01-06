import { DEFAULT_OPTIONS } from "./const";
import { initArrows, initMouseDrag, initScrollIndicatorBarDrag } from "./dom";
import { createScrollIndicator, getResponsiveSettings, setCarouselStyles } from "./style";

function TouchpadScrollCarousel(options) {
  // Set default values
  let {
    carouselSelector,
    slidesToShow,
    slidesToScroll,
    gap,
    mouseDrag,
    showArrows,
    prevButtonSelector,
    nextButtonSelector,
    showScrollbar,
    responsive,
  } = Object.assign({ ...DEFAULT_OPTIONS }, options);
  let scrollbarStyle = Object.assign(DEFAULT_OPTIONS.scrollbarStyle, options?.scrollbarStyle);

  // Global state to track data changed
  const state = {
    carousel: null,
    carouselStyled: false,
    prevButtonElement: null,
    nextButtonElement: null,
    handlePrevButtonClick: null,
    handleNextButtonClick: null,
    scrollIndicatorElement: null,
    scrollIndicatorBarElement: null,
    isScrollbarIndicatorScrolling: false,
  };

  // Check carousel selector
  const carousel = document.querySelector(carouselSelector);
  if (!carousel) {
    console.error(`Cannot found carouselSelector "${carouselSelector}".`);
    return;
  }
  state.carousel = carousel;

  initCarousel(
    state,
    carouselSelector,
    slidesToShow,
    slidesToScroll,
    gap,
    mouseDrag,
    showArrows,
    prevButtonSelector,
    nextButtonSelector,
    showScrollbar,
    responsive,
    scrollbarStyle
  );

  window.addEventListener("resize", () =>
    initCarousel(
      state,
      carouselSelector,
      slidesToShow,
      slidesToScroll,
      gap,
      mouseDrag,
      showArrows,
      prevButtonSelector,
      nextButtonSelector,
      showScrollbar,
      responsive,
      scrollbarStyle
    )
  );
}

function initCarousel(
  state,
  carouselSelector,
  slidesToShow,
  slidesToScroll,
  gap,
  mouseDrag,
  showArrows,
  prevButtonSelector,
  nextButtonSelector,
  showScrollbar,
  responsive,
  scrollbarStyle
) {
  const { carousel } = state;

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

  setCarouselStyles(state, carouselSelector, _slidesToShow, _gap, gapNumber, totalGapNumber);

  if (showArrows) {
    initArrows(
      state,
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
        state,
        gapNumber,
        totalGapNumber,
        _slidesToShow,
        _slidesToScroll,
        nextButtonSelector,
        prevButtonSelector
      );
    }, 100);
  }

  if (showScrollbar) {
    createScrollIndicator(state, scrollbarStyle);

    carousel.addEventListener("scroll", () => {
      if (!state.isScrollbarIndicatorScrolling) {
        const carouselMaxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;
        const scrollIndicatorBarMaxTranslate =
          carousel.offsetWidth - state.scrollIndicatorBarElement.offsetWidth;
        const scrollIndicatorBarTranslate =
          (carousel.scrollLeft * scrollIndicatorBarMaxTranslate) / carouselMaxScrollLeft;
        state.scrollIndicatorBarElement.style.transform = `translateX(${scrollIndicatorBarTranslate}px)`;
      }
    });
    initScrollIndicatorBarDrag(state);
  }

  if (mouseDrag) {
    initMouseDrag(carousel);
  }
}

window.TouchpadScrollCarousel = TouchpadScrollCarousel;

export default TouchpadScrollCarousel;
