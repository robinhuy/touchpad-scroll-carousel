# Touchpad Scroll Carousel

_The simple, lightweight, responsive carousel requires no dependencies and supports smooth scrolling (left/right) on touchpads._

## Demo

[Touchpad Scroll Carousel Example](https://huydq.dev/static-apps/touchpad-scroll-carousel/)

## Install

### Markup

HTML would look something like this:

```html
<div id="carousel">
  <div class="item">
    <a href="...">
      <img src="..." alt="..." />
    </a>
  </div>
</div>
```

You only need a list of item (slide), then initialize the carousel like this:

```javascript
TouchpadScrollCarousel({
  carouselSelector: "#carousel",
  ... // other options
});
```

### CDN

jsDelivr: [https://cdn.jsdelivr.net/npm/touchpad-scroll-carousel/dist/touchpad-scroll-carousel.min.js](https://cdn.jsdelivr.net/npm/touchpad-scroll-carousel/dist/touchpad-scroll-carousel.min.js)

Example use CDN:

```html
...
<body>
  <div id="carousel">
    <div class="item">
      <a href="..."><img src="..." alt="..." /></a>
    </div>

    <div class="item">
      <a href="..."><img src="..." alt="..." /></a>
    </div>

    <div class="item">
      <a href="..."><img src="..." alt="..." /></a>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/gh/robinhuy/touchpad-scroll-carousel/dist/touchpad-scroll-carousel.min.js"></script>
  <script>
    TouchpadScrollCarousel({
      carouselSelector: "#carousel",
    });
  </script>
</body>
```

### NPM

```
npm install touchpad-scroll-carousel
```

or using `yarn`:

```
yarn add touchpad-scroll-carousel
```

Example use NPM for a React App:

```jsx
import { useEffect } from "react";
import "touchpad-scroll-carousel/dist/touchpad-scroll-carousel.min.js";

const CarouselComponent = () => {
  useEffect(() => {
    window.TouchpadScrollCarousel({
      carouselSelector: "#carousel",
    });
  }, []);

  return (
    <div id="carousel">
      <div className="item">
        <a href="...">
          <img src="..." alt="..." />
        </a>
      </div>

      <div className="item">
        <a href="...">
          <img src="..." alt="..." />
        </a>
      </div>

      <div className="item">
        <a href="...">
          <img src="..." alt="..." />
        </a>
      </div>
    </div>
  );
};

export default CarouselComponent;
```

If you want to use TypeScript, create a file name `index.d.ts` in root folder of the project or in same folder as the component:

```js
export {};

interface ResponsiveOptions {
  breakpoint?: number;
  slidesToShow?: number;
  gap?: number;
}

interface TouchpadScrollCarouselOptions {
  carouselSelector: string;
  slidesToShow?: number;
  slidesToScroll?: number;
  gap?: number;
  mouseDrag?: boolean;
  showArrows?: boolean;
  nextButtonSelector?: string;
  prevButtonSelector?: string;
  showScrollbar?: boolean;
  scrollbarStyle?: {
    position?: string;
    height?: number;
    marginTop?: number;
    marginBottom?: number;
    borderRadius?: number;
    backgroundColor?: string;
    thumbColor?: string;
    thumbHoverColor?: string;
  };
  responsive?: ResponsiveOptions[];
}

declare global {
  interface Window {
    TouchpadScrollCarousel: (options: TouchpadScrollCarouselOptions) => void;
  }
}
```

## Settings

| Option             | Type                       | Default                                    | Description                                                                                                                            |
| ------------------ | -------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| carouselSelector   | string (CSS&nbsp;selector) | null                                       | Selects a node to initialize the carousel                                                                                              |
| gap                | int (value as pixel unit)  | 15                                         | The gap between items                                                                                                                  |
| mouseDrag          | boolean                    | true                                       | Enables mouse dragging                                                                                                                 |
| showArrows         | boolean                    | true                                       | Enables Next/Prev arrows                                                                                                               |
| nextButtonSelector | string (CSS&nbsp;selector) | `#btn-next`                                | Allows you to select a node to customize the "Next" arrow. Only work when `showArrows = true`.                                         |
| prevButtonSelector | string (CSS&nbsp;selector) | `#btn-prev`                                | Allows you to select a node to customize the "Previous" arrow. Only work when `showArrows = true`.                                     |
| showScrollbar      | boolean                    | true                                       | Enables scrollbar.                                                                                                                     |
| scrollbarStyle     | object                     | [See&nbsp;example](#scrollbarstyle-option) | Contains style settings for the scrollbar. Only work when `showScrollbar = true`.                                                      |
| responsive         | array                      | null                                       | Array of objects [contains breakpoints and setting objects (see example)](#responsive-option). Enables settings at given `breakpoint`. |
| slidesToScroll     | int                        | 1                                          | # of slides to scroll at a time                                                                                                        |
| slidesToShow       | float                      | 1                                          | # of slides to show at a time                                                                                                          |

### ScrollbarStyle Option

The scrollbar style options, for example:

```javascript
TouchpadScrollCarousel({
  carouselSelector: "#carousel",
  scrollbarStyle: {
    position: "bottom", // "top" or "bottom"
    height: 8,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 4,
    backgroundColor: "#ebebeb",
    thumbColor: "#6d6d6d",
    thumbHoverColor: "#4b4b4b",
  },
});
```

Note that dimensions are measured in px and colors are in string format (color name, hex value,...).

### Responsive Option

The responsive options with self-defined breakpoints, for example:

```javascript
TouchpadScrollCarousel({
  carouselSelector: "#carousel",
  responsive: [
    {
      breakpoint: 768,
      slidesToShow: 2.5,
      gap: 20,
    },
    {
      breakpoint: 1200,
      slidesToShow: 4,
      gap: 30,
    },
  ],
});
```

## Browser support

Touchpad Scroll Carousel works on modern browsers such as Edge, Chrome, Firefox, and Safari.

## License

Copyright (c) 2022 Robin Huy.

Licensed under the MIT license.
