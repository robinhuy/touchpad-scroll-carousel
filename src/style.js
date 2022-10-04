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

  const carouselChildren = [...carousel.children];

  carouselChildren.forEach((item, index) => {
    item.style.cssText = `
      width: calc((100% - ${totalGapWithUnit}) / ${slidesToShow});
      flex-shrink: 0;
      margin-left: ${halfGapWithUnit};
      margin-right: ${halfGapWithUnit};
    `;

    if (index === 0) {
      item.style.marginLeft = "0";
    }

    if (index === carouselChildren.length - 1) {
      item.style.marginRight = "0";
    }
  });
};
