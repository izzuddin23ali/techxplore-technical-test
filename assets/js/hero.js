jQuery(function ($) {
  $.get("assets/section/hero.html", function (data) {
    $("header").append(data);
    let title = PAGE_KEY == "index" ? "Portal" : PAGE_KEY;
    $("#hero h1").text(
      `${title.toUpperCase()} | TechXPLORE Cohort 3 Technical Test`,
    );
  });
});
