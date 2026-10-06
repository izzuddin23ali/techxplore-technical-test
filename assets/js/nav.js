jQuery(function ($) {
  $.get("assets/section/nav.html", function (data) {
    $("header").append(data);
    $(`.nav-link[data-page="${PAGE_KEY}"]`).addClass("active");
  });
});
