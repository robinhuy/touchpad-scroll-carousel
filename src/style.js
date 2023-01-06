import { ARROW_STYLE, CAROUSEL_STYLE_TEXT, arrowStyle, scrollIndicatorStyle } from "./const";

export const getResponsiveSettings = (responsive, slidesToShow, slidesToScroll, gap) => {
  if (!responsive) {
    return { _slidesToShow: slidesToShow, _slidesToScroll: slidesToScroll, _gap: gap };
  }

  responsive = responsive.sort((a, b) => a.breakpoint - b.breakpoint);

  let index = -1;
  for (let screen of responsive) {
    if (window.matchMedia(`(min-width: ${screen.breakpoint}px)`).matches) {
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

  // Create wrapper element
  const wrapperElement = document.createElement("div");
  wrapperElement.style.position = "relative";
  carousel.after(wrapperElement);
  wrapperElement.appendChild(carousel);

  // Style carousel
  const styleElement = document.createElement("style");
  const styles = document.createTextNode(`
    ${carouselSelector}::-webkit-scrollbar {
      display: none;
    }
    ${carouselSelector} {
      ${CAROUSEL_STYLE_TEXT}
    }
    ${carouselSelector} img {
      max-width: 100%;
    }
  `);
  styleElement.appendChild(styles);
  carousel.before(styleElement);

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
  // Create button
  const button = document.createElement("button");
  button.style.cssText = arrowStyle.arrowButtonStyleText;

  // Create arrow
  const arrow = document.createElement("div");
  arrow.style.cssText = arrowStyle.arrowButtonIconStyleText;
  if (type === "prev") {
    button.setAttribute("aria-label", "Previous");
    button.style.left = "-20px";
    arrow.style.left = "10px";
    arrow.style.transform = "rotate(45deg)";
  } else {
    button.setAttribute("aria-label", "Next");
    button.style.right = "-20px";
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
      ${scrollIndicatorStyle.scrollIndicatorStyleText}
      margin-top: ${marginTop}px;
      margin-bottom: ${marginBottom}px;
    `;
    state.scrollIndicatorElement = scrollIndicator;

    // Create scroll indicator bar wrapper element
    const scrollIndicatorBarWrapper = document.createElement("div");
    scrollIndicatorBarWrapper.style.cssText = `
      ${scrollIndicatorStyle.scrollIndicatorBarWrapperStyleText}
      height: ${height}px;
      background: ${backgroundColor};
      border-radius: ${borderRadius}px;
    `;

    // Create scroll indicator bar element
    const scrollIndicatorBar = document.createElement("div");
    scrollIndicatorBar.style.cssText = `
      ${scrollIndicatorStyle.scrollIndicatorBarStyleText}
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
    scrollIndicator.appendChild(scrollIndicatorBarWrapper);
    scrollIndicatorBarWrapper.appendChild(scrollIndicatorBar);
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
