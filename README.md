# Scroll Carousel

_The simple, lightweight carousel that requires no dependencies and supports scroll (left/right) on touchpad._

## Demo

_Coming soon_

## Install

### NPM: Coming soon

### Build

Clone project:

```
git clone https://github.com/robinhuy/scroll-carousel.git
```

Install dependencies: `npm install` or `yarn`

Build: `npm run build` or `yarn build`

The built file is `dist/scroll-carousel.min.js`. Then, before the closing <body> tag of HTML file add script to said file.

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
ScrollCarousel({
  carouselSelector: "#carousel",
});
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
ScrollCarousel({
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
ScrollCarousel({
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

Scroll Carousel works on modern browsers such as Edge, Chrome, Firefox, and Safari.

## License

Copyright (c) 2022 Robin Huy.

Licensed under the MIT license.
