export const setCarouselStyles = (
  carousel,
  slidesToShow,
  gap,
  gapNumber,
  totalGapNumber
) => {
  const gapUnit = gap.replace(gapNumber, "");
  const totalGapWithUnit = totalGapNumber + gapUnit;
  const halfGapWithUnit = gapNumber / 2 + gapUnit;

  carousel.style.cssText = `
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
  `;

  const carouselChildren = carousel.children;

  for (let i = 0; i < carousel.children.length; i++) {
    const item = carousel.children[i];

    item.style.cssText = `
      width: calc((100% - ${totalGapWithUnit}) / ${slidesToShow});
      flex-shrink: 0;
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
    background: transparent;
    box-shadow: #b4b4b4 0px 0px 2px 1px;
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
    border-width: 0 0 2px 2px;
    border-color: #979797;
    border-style: solid;
  `;

  if (type === "prev") {
    arrow.style.left = "10px";
    arrow.style.transform = "rotate(45deg)";
  } else {
    arrow.style.left = "6px";
    arrow.style.transform = "rotate(-135deg)";
  }

  button.appendChild(arrow);

  return button;
};
