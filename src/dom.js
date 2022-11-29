import { createDefaultArrowButton } from "./style";
import { roundDimension } from "./util";

const preventDragElementAnchor = (carousel) => {
  let isDrag = false;

  const anchorElements = carousel.getElementsByTagName("a");

  for (let element of anchorElements) {
    element.addEventListener("dragstart", (event) => {
      element.style.cursor = "grab";
      isDrag = true;
      event.preventDefault();
    });

    element.addEventListener("click", (event) => {
      if (isDrag) {
        event.preventDefault();
      }
    });

    element.addEventListener("mouseup", () => {
      element.style.removeProperty("cursor");
      setTimeout(() => {
        isDrag = false;
      }, 50);
    });
  }
};

export const initMouseDrag = (carousel) => {
  // Store scroll state
  const position = { left: 0, x: 0 };

  const startDrag = (e) => {
    // The current scroll
    position.left = carousel.scrollLeft;

    // The current mouse position
    position.x = e.clientX;

    // Add event handleDrag on element
    carousel.addEventListener("mousemove", handleDrag);

    // Add event removeDragEvent on document to prevent mouseup outside element
    document.addEventListener("mouseup", removeDragEvent);

    // Disable user select when drag
    carousel.style.userSelect = "none";
    carousel.style.cursor = "grab";
  };

  const removeDragEvent = () => {
    document.removeEventListener("mouseup", removeDragEvent);
    carousel.removeEventListener("mousemove", handleDrag);
    carousel.style.removeProperty("user-select");
    carousel.style.removeProperty("cursor");
  };

  const handleDrag = (e) => {
    const dx = e.clientX - position.x;
    const distance = position.left - dx;
    carousel.scrollLeft = distance;
  };

  preventDragElementAnchor(carousel);
  carousel.addEventListener("mousedown", startDrag);
};

export const initScrollIndicatorBarDrag = (
  carousel,
  scrollIndicator,
  scrollIndicatorBar,
  state
) => {
  // Store scroll state
  const position = { left: 0, x: 0 };

  const startDrag = (e) => {
    // The current scroll indicator bar position
    position.left = parseFloat(scrollIndicatorBar.style.transform.slice(11)) || 0;

    // The current mouse position
    position.x = e.clientX;

    // Update scrolling status
    state.isScrollbarIndicatorScrolling = true;

    // Add event handleDrag on element
    scrollIndicator.addEventListener("mousemove", handleDrag);

    // Add event removeDragEvent on document to prevent mouseup outside element
    document.addEventListener("mouseup", removeDragEvent);

    // Disable user select when drag
    scrollIndicatorBar.style.userSelect = "none";
    scrollIndicatorBar.style.cursor = "grab";
  };

  const removeDragEvent = () => {
    document.removeEventListener("mouseup", removeDragEvent);
    scrollIndicator.removeEventListener("mousemove", handleDrag);
    scrollIndicatorBar.style.removeProperty("user-select");
    scrollIndicatorBar.style.removeProperty("cursor");

    // Update scrolling status
    state.isScrollbarIndicatorScrolling = false;
  };

  const handleDrag = (e) => {
    const carouselWidth = carousel.offsetWidth;
    const scrollIndicatorBarMaxTranslate = carouselWidth - scrollIndicatorBar.offsetWidth;
    const carouselMaxScrollLeft = carousel.scrollWidth - carouselWidth;

    // Move the scroll indicator bar
    const dx = e.clientX - position.x;
    let translate = position.left + dx;

    if (translate <= 0) translate = 0;
    if (translate >= scrollIndicatorBarMaxTranslate) translate = scrollIndicatorBarMaxTranslate;

    scrollIndicatorBar.style.transform = `translateX(${translate}px)`;

    // Move the carousel
    carousel.scrollLeft = (translate * carouselMaxScrollLeft) / scrollIndicatorBarMaxTranslate;
  };

  scrollIndicator.addEventListener("mousedown", startDrag);
};

export const initArrows = (
  carousel,
  gapNumber,
  totalGapNumber,
  slidesToShow,
  slidesToScroll,
  nextButtonSelector,
  prevButtonSelector,
  isUpdate
) => {
  if (isUpdate) return;

  const position = { left: 0 };
  const item = { itemWidth: 0, itemFullWidth: 0 };
  item.itemWidth = roundDimension((carousel.offsetWidth - totalGapNumber) / slidesToShow);
  item.itemFullWidth = roundDimension(item.itemWidth + gapNumber);

  let prevButtonElement, nextButtonElement;

  if (nextButtonSelector) {
    nextButtonElement = document.querySelector(nextButtonSelector);
    if (!nextButtonElement)
      console.error(`Cannot found nextButtonSelector "${nextButtonSelector}".`);
  }

  if (!nextButtonElement) {
    nextButtonElement = createDefaultArrowButton("next");
    carousel.after(nextButtonElement);
  }

  nextButtonElement.addEventListener("click", () => {
    console.log("--- DATA ---", position);

    position.left = roundDimension(carousel.scrollLeft);
    const remainDistance = roundDimension(position.left % item.itemFullWidth);
    const left = position.left + item.itemFullWidth * slidesToScroll - remainDistance;
    carousel.scrollTo({ left, behavior: "smooth" });
  });

  if (prevButtonSelector) {
    prevButtonElement = document.querySelector(prevButtonSelector);
    if (!prevButtonElement)
      console.error(`Cannot found prevButtonSelector "${prevButtonSelector}".`);
  }

  if (!prevButtonElement) {
    prevButtonElement = createDefaultArrowButton("prev");
    carousel.after(prevButtonElement);
  }

  prevButtonElement.addEventListener("click", () => {
    position.left = roundDimension(carousel.scrollLeft);
    let remainDistance = roundDimension(position.left % (item.itemFullWidth * slidesToScroll));
    if (remainDistance <= gapNumber) remainDistance = item.itemFullWidth * slidesToScroll;

    const left = position.left - remainDistance;
    carousel.scrollTo({ left, behavior: "smooth" });
  });
};
