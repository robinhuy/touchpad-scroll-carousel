const ARROW_STYLE = {
  buttonBackground: "#ffffff",
  buttonBackgroundHover: "#111111",
  buttonShadow: "#b4b4b4 0px 0px 2px 1px",
  buttonShadowHover: "#dadada 0px 0px 2px 1px",
  color: "#979797",
  colorHover: "#ffffff",
};
const CAROUSEL_STYLE_TEXT = `
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
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
  carousel,
  carouselSelector,
  slidesToShow,
  gap,
  gapNumber,
  totalGapNumber
) => {
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
  button.style.cssText = `
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

  const arrow = document.createElement("div");
  arrow.style.cssText = `
    position: relative;
    width: 12px;
    height: 12px;
    border-style: solid;
    border-width: 0 0 2px 2px;
    border-color: ${ARROW_STYLE.color};
  `;
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
  carousel,
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
  // Create scroll indicator element
  const scrollIndicator = document.createElement("div");
  scrollIndicator.style.cssText = `
    margin-top: ${marginTop}px;
    margin-bottom: ${marginBottom}px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
  `;

  // Create scroll indicator bar wrapper element
  const scrollIndicatorBarWrapper = document.createElement("div");
  scrollIndicatorBarWrapper.style.cssText = `
    width: 100%;
    height: ${height}px;
    background: ${backgroundColor};
    scrollbar-width: none;
    border-radius: ${borderRadius}px;
    transform: translateX(0);
  `;

  // Create scroll indicator bar element
  const scrollIndicatorBar = document.createElement("div");
  const scrollIndicatorBarWidthRatio =
    (carousel.offsetWidth * carousel.offsetWidth) / carousel.scrollWidth;
  scrollIndicatorBar.style.cssText = `
    will-change: transform;
    position: absolute;
    top: 0;
    bottom: 0;
    width: ${scrollIndicatorBarWidthRatio}px;
    height: ${height}px;
    background-color: ${thumbColor};
    transform-origin: 0 0;
    border-radius: ${borderRadius}px;
    cursor: grab;
    transition: background-color 0.3s;
  `;
  scrollIndicatorBar.addEventListener("mouseover", () => {
    scrollIndicatorBar.style.backgroundColor = thumbHoverColor || thumbColor;
  });
  scrollIndicatorBar.addEventListener("mouseleave", () => {
    scrollIndicatorBar.style.backgroundColor = thumbColor;
  });

  // Append scrollbar to carousel
  scrollIndicatorBarWrapper.appendChild(scrollIndicatorBar);
  scrollIndicator.appendChild(scrollIndicatorBarWrapper);
  if (position === "top") {
    carousel.before(scrollIndicator);
  } else {
    carousel.after(scrollIndicator);
  }

  return { scrollIndicator, scrollIndicatorBar };
};
