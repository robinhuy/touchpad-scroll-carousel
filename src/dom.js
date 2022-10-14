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

export const initMouseDrag = (carousel, position) => {
  const startDrag = (e) => {
    position = {
      // The current scroll
      left: carousel.scrollLeft,
      top: carousel.scrollTop,
      // The current mouse position
      x: e.clientX,
      y: e.clientY,
    };

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
    carousel.scrollLeft = position.left - dx;
  };

  preventDragElementAnchor(carousel);
  carousel.addEventListener("mousedown", startDrag);
};

export const initArrows = (
  carousel,
  position,
  item,
  gapNumber,
  totalGapNumber,
  slidesToShow,
  slidesToScroll,
  nextButtonSelector,
  prevButtonSelector,
  isUpdate
) => {
  item.itemWidth = roundDimension((carousel.offsetWidth - totalGapNumber) / slidesToShow);
  item.itemFullWidth = roundDimension(item.itemWidth + gapNumber);

  if (isUpdate) return;

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
