export const DEFAULT_OPTIONS = {
  carouselSelector: null,
  slidesToShow: 1,
  slidesToScroll: 1,
  gap: 15,
  mouseDrag: true,
  showArrows: true,
  nextButtonSelector: null,
  prevButtonSelector: null,
  showScrollbar: true,
  scrollbarStyle: {
    position: "bottom",
    height: 8,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 4,
    backgroundColor: "#ebebeb",
    thumbColor: "#6d6d6d",
    thumbHoverColor: "#4b4b4b",
  },
  responsive: null,
};

export const CAROUSEL_STYLE_TEXT = `
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const ARROW_STYLE = {
  buttonBackground: "#ffffff",
  buttonBackgroundHover: "#111111",
  buttonShadow: "#b4b4b4 0px 0px 2px 1px",
  buttonShadowHover: "#dadada 0px 0px 2px 1px",
  color: "#979797",
  colorHover: "#ffffff",
};
export const arrowStyle = {
  arrowButtonStyleText: `
    width: 40px;
    height: 40px;
    position: absolute;
    top: calc(50% - 20px);
    cursor: pointer;
    transition: all 0.4s linear;
    background-color: ${ARROW_STYLE.buttonBackground};
    box-shadow: ${ARROW_STYLE.buttonShadow};
    touch-action: manipulation;
    appearance: none;
    border: none;
    border-radius: 50%;
  `,
  arrowButtonIconStyleText: `
    position: relative;
    width: 12px;
    height: 12px;
    border-style: solid;
    border-width: 0 0 2px 2px;
    border-color: ${ARROW_STYLE.color};
  `,
};

export const scrollIndicatorStyle = {
  scrollIndicatorStyleText: `
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
  `,
  scrollIndicatorBarWrapperStyleText: `
    width: 100%;
    scrollbar-width: none;
    transform: translateX(0);
  `,
  scrollIndicatorBarStyleText: `
    will-change: transform;
    position: absolute;
    top: 0;
    bottom: 0;
    transform-origin: 0 0;
    cursor: grab;
    transition: background-color 0.3s;
  `,
};
