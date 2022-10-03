export const setCarouselStyles = (carousel, slidesToShow, halfGap) => {
  carousel.style.cssText = `
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    overflow-x: scroll;
  `;

  const carouselChildren = [...carousel.children];
  carouselChildren.forEach((item, index) => {
    item.style.cssText = `
      width: ${100 / slidesToShow}%;
      flex-shrink: 0;
      margin-left: ${halfGap};
      margin-right: ${halfGap};
      display: flex;
      justify-content: center;
      align-items: center;
    `;

    if (index === 0) {
      item.style.marginLeft = "0";
    }

    if (index === carouselChildren.length - 1) {
      item.style.marginRight = "0";
    }
  });
};
