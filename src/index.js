TouchpadScrollCarousel({
  carouselSelector: "#carousel1",
  gap: 30,
  mouseDrag: true,
  responsive: [
    {
      breakpoint: 768,
      slidesToShow: 2.5,
      gap: 30,
    },
    {
      breakpoint: 1200,
      slidesToShow: 3.2,
      gap: 50,
    },
  ],
});

TouchpadScrollCarousel({
  carouselSelector: "#carousel2",
});
