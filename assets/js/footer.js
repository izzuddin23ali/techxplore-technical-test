jQuery(function ($) {
  $.get("assets/section/footer.html", function (data) {
    $("footer").append(data);
  });
});
