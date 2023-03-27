$(".loading").ripples({
  dropRadius: 20,
  perturbance: 0.01,
  resolution: 170
});

$(".loading").ripples(
  "drop",
  screen.availWidth / 2,
  screen.availHeight / 2,
  200,
  10
);

$(".body").ripples({
  resolution: 300,
  dropRadius: 35,
  perturbance: 0.1
});

$(".sidebar").ripples();

$(".main").ripples({
  imageUrl: "./name-momonga.png"
});
/*
$(".wrap").ripples(
  "drop",
  $(".wrap").width() - 64,

  $(".wrap").height() - 64,
  2,
  10
);
*/
$(".profile").ripples();

$(".profile--image").ripples({
  resolution: 300,
  dropRadius: 35,
  perturbance: 0.1
});
