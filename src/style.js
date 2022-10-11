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

export const setCarouselStyles = (carousel, slidesToShow, gap, gapNumber, totalGapNumber) => {
  const gapUnit = gap.replace(gapNumber, "");
  const totalGapWithUnit = totalGapNumber + gapUnit;
  const halfGapWithUnit = gapNumber / 2 + gapUnit;
  const carouselChildren = carousel.children;

  // Style carousel
  carousel.style.cssText = CAROUSEL_STYLE_TEXT;

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

  const removeHoverEffect = () => {
    button.style.backgroundColor = ARROW_STYLE.buttonBackground;
    button.style.boxShadow = ARROW_STYLE.buttonShadow;
    arrow.style.borderColor = ARROW_STYLE.color;
    button.removeEventListener("mouseleave", removeHoverEffect);
  };

  // Hover effect
  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = ARROW_STYLE.buttonBackgroundHover;
    button.style.boxShadow = ARROW_STYLE.buttonShadowHover;
    arrow.style.borderColor = ARROW_STYLE.colorHover;
    button.addEventListener("mouseleave", removeHoverEffect);
  });

  return button;
};
