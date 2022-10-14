# Scroll Carousel

_The simple, lightweight carousel that requires no dependencies and supports scroll (left/right) on touchpad._

## Demo

_Coming soon_

## Settings

| Option             | Type                                                  | Default     | Description                                                                                                                                       |
| ------------------ | ----------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| carouselSelector   | string (CSS selector)                                 | null        | Select a node to initialize the carousel                                                                                                          |
| gap                | int (value as pixel unit) \| string (value with unit) | 15          | The gap between items                                                                                                                             |
| arrows             | boolean                                               | true        | Enable Next/Prev arrows                                                                                                                           |
| mouseDrag          | boolean                                               | true        | Enables mouse dragging                                                                                                                            |
| nextButtonSelector | string (CSS selector)                                 | `#btn-next` | Allows you to select a node to customize the "Next" arrow.                                                                                        |
| prevButtonSelector | string (CSS selector)                                 | `#btn-prev` | Allows you to select a node to customize the "Previous" arrow.                                                                                    |
| responsive         | array                                                 | null        | Array of objects [containing breakpoints and settings objects (see example)](#responsive-option-example). Enables settings at given `breakpoint`. |
| slidesToScroll     | int                                                   | 1           | # of slides to scroll at a time                                                                                                                   |
| slidesToShow       | float                                                 | 1           | # of slides to show at a time                                                                                                                     |

### Responsive Option Example

The responsive option, and value, is quite unique and powerful.
You can use it like so:

```javascript
ScrollCarousel({
  carouselSelector: "#carousel",
  gap: 30,
  mouseDrag: true,
  responsive: [
    {
      breakPoint: 768,
      slidesToShow: 2.5,
      gap: 30,
    },
    {
      breakPoint: 1200,
      slidesToShow: 3.2,
      gap: 50,
    },
  ],
});
```

## Browser support

Scroll Carousel works on modern browsers such as Edge, Chrome, Firefox, and Safari.

## License

Copyright (c) 2022 Robin Huy.

Licensed under the MIT license.
