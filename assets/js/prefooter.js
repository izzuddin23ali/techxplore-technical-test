jQuery(function ($) {
  if (PAGE_KEY != "index") {
    $.get("assets/section/pre-footer.html", function (data) {
      $("main").append(data);
      switch (PAGE_KEY) {
        case "js":
          $("#pf-js").remove();
          break;
        case "sql":
          $("#pf-sql").remove();
          break;
        case "form":
          $("#pf-form").remove();
          break;
        default:
          break;
      }
    });
  }
});
