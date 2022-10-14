ScrollCarousel({
  carouselSelector: "#carousel1",
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

ScrollCarousel({
  carouselSelector: "#carousel2",
  slidesToShow: 2,
  slidesToScroll: 2,
});
