const CAROUSEL_STYLE_TEXT = `
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ARROW_STYLE = {
  buttonBackground: "#ffffff",
  buttonBackgroundHover: "#111111",
  buttonShadow: "#b4b4b4 0px 0px 2px 1px",
  buttonShadowHover: "#dadada 0px 0px 2px 1px",
  color: "#979797",
  colorHover: "#ffffff",
};
const ARROW_BUTTON_STYLE_TEXT = `
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: all 0.4s linear;
  background-color: ${ARROW_STYLE.buttonBackground};
  box-shadow: ${ARROW_STYLE.buttonShadow};
  touch-action: manipulation;
  appearance: none;
  border: none;
  border-radius: 50%;
`;
const ARROW_BUTTON_ICON_STYLE_TEXT = `
  position: relative;
  width: 12px;
  height: 12px;
  border-style: solid;
  border-width: 0 0 2px 2px;
  border-color: ${ARROW_STYLE.color};
`;

const SCROLL_INDICATOR_STYLE_TEXT = `
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
`;
const SCROLL_INDICATOR_BAR_WRAPPER_STYLE_TEXT = `
  width: 100%;
  scrollbar-width: none;
  transform: translateX(0);
`;
const SCROLL_INDICATOR_BAR_STYLE_TEXT = `
  will-change: transform;
  position: absolute;
  top: 0;
  bottom: 0;
  transform-origin: 0 0;
  cursor: grab;
  transition: background-color 0.3s;
`;

export const getResponsiveSettings = (responsive, slidesToShow, slidesToScroll, gap) => {
  if (!responsive) {
    return { _slidesToShow: slidesToShow, _slidesToScroll: slidesToScroll, _gap: gap };
  }

  responsive = responsive.sort((a, b) => a.breakPoint - b.breakPoint);

  let index = -1;
  for (let screen of responsive) {
    if (window.matchMedia(`(min-width: ${screen.breakPoint}px)`).matches) {
      index++;
    } else {
      break;
    }
  }

  const setting = responsive[index];

  return {
    _slidesToShow: setting?.slidesToShow || slidesToShow,
    _slidesToScroll: setting?.slidesToScroll || slidesToScroll,
    _gap: setting?.gap || gap,
  };
};

export const setCarouselStyles = (
  state,
  carouselSelector,
  slidesToShow,
  gap,
  gapNumber,
  totalGapNumber
) => {
  const { carousel, carouselStyled } = state;
  if (carouselStyled) return;

  const gapUnit = gap.replace(gapNumber, "");
  const totalGapWithUnit = totalGapNumber + gapUnit;
  const halfGapWithUnit = gapNumber / 2 + gapUnit;
  const carouselChildren = carousel.children;

  // Style carousel
  const styleElement = document.createElement("style");
  const styles = document.createTextNode(`
    ${carouselSelector}::-webkit-scrollbar {
      display: none;
    }
    ${carouselSelector} {
      ${CAROUSEL_STYLE_TEXT}
    }
  `);
  styleElement.appendChild(styles);
  carousel.after(styleElement);

  // Style items
  for (let i = 0; i < carousel.children.length; i++) {
    const item = carousel.children[i];

    item.style.cssText = `
      flex-shrink: 0;
      width: calc((100% - ${totalGapWithUnit}) / ${slidesToShow});   
      margin-left: ${halfGapWithUnit};
      margin-right: ${halfGapWithUnit};
    `;

    if (i === 0) {
      item.style.marginLeft = "0";
    }

    if (i === carouselChildren.length - 1) {
      item.style.marginRight = "0";
    }
  }
};

export const createDefaultArrowButton = (type = "prev") => {
  const button = document.createElement("button");
  button.style.cssText = ARROW_BUTTON_STYLE_TEXT;

  const arrow = document.createElement("div");
  arrow.style.cssText = ARROW_BUTTON_ICON_STYLE_TEXT;
  if (type === "prev") {
    button.setAttribute("aria-label", "Previous");
    arrow.style.left = "10px";
    arrow.style.transform = "rotate(45deg)";
  } else {
    button.setAttribute("aria-label", "Next");
    arrow.style.left = "5px";
    arrow.style.transform = "rotate(-135deg)";
  }

  button.appendChild(arrow);

  // Hover effect
  const removeHoverEffect = () => {
    button.style.backgroundColor = ARROW_STYLE.buttonBackground;
    button.style.boxShadow = ARROW_STYLE.buttonShadow;
    arrow.style.borderColor = ARROW_STYLE.color;
    button.removeEventListener("mouseleave", removeHoverEffect);
  };
  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = ARROW_STYLE.buttonBackgroundHover;
    button.style.boxShadow = ARROW_STYLE.buttonShadowHover;
    arrow.style.borderColor = ARROW_STYLE.colorHover;
    button.addEventListener("mouseleave", removeHoverEffect);
  });

  return button;
};

export const createScrollIndicator = (
  state,
  {
    position,
    height,
    marginTop,
    marginBottom,
    borderRadius,
    backgroundColor,
    thumbColor,
    thumbHoverColor,
  }
) => {
  const { carousel } = state;

  if (!state.scrollIndicatorElement) {
    // Create scroll indicator element
    const scrollIndicator = document.createElement("div");
    scrollIndicator.style.cssText = `
      ${SCROLL_INDICATOR_STYLE_TEXT}
      margin-top: ${marginTop}px;
      margin-bottom: ${marginBottom}px;
    `;
    state.scrollIndicatorElement = scrollIndicator;

    // Create scroll indicator bar wrapper element
    const scrollIndicatorBarWrapper = document.createElement("div");
    scrollIndicatorBarWrapper.style.cssText = `
      ${SCROLL_INDICATOR_BAR_WRAPPER_STYLE_TEXT}
      height: ${height}px;
      background: ${backgroundColor};
      border-radius: ${borderRadius}px;
    `;

    // Create scroll indicator bar element
    const scrollIndicatorBar = document.createElement("div");
    scrollIndicatorBar.style.cssText = `
      ${SCROLL_INDICATOR_BAR_STYLE_TEXT}
      height: ${height}px;
      background-color: ${thumbColor};
      border-radius: ${borderRadius}px;
    `;
    scrollIndicatorBar.addEventListener("mouseover", () => {
      scrollIndicatorBar.style.backgroundColor = thumbHoverColor || thumbColor;
    });
    scrollIndicatorBar.addEventListener("mouseleave", () => {
      scrollIndicatorBar.style.backgroundColor = thumbColor;
    });
    state.scrollIndicatorBarElement = scrollIndicatorBar;

    // Append scrollbar to carousel
    scrollIndicatorBarWrapper.appendChild(scrollIndicatorBar);
    scrollIndicator.appendChild(scrollIndicatorBarWrapper);
    if (position === "top") {
      carousel.before(scrollIndicator);
    } else {
      carousel.after(scrollIndicator);
    }
  }

  // Calculate scroll indicator bar width
  const scrollIndicatorBarWidthRatio =
    (carousel.offsetWidth * carousel.offsetWidth) / carousel.scrollWidth;
  state.scrollIndicatorBarElement.style.width = `${scrollIndicatorBarWidthRatio}px`;
};
