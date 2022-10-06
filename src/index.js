ScrollCarousel({
  carouselSelector: "#carousel1",
  gap: 30,
  mouseDrag: true,
  responsive: [
    {
      breakPoint: 768,
      slidesToShow: 2.5,
    },
    {
      breakPoint: 1200,
      slidesToShow: 3.2,
    },
  ],
});

ScrollCarousel({
  carouselSelector: "#carousel2",
  gap: 50,
});
