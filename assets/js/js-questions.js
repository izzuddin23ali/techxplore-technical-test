jQuery(function ($) {
  $(document).on("click", "#question-1-button", function (e) {
    //e.preventDefault();
    console.log("click");
    let value = $("#question-1").val().replace(/\s+/g, "");

    let array = value.split(",");

    let intArray = $.map(array, function (i) {
      if (!isNaN(parseInt(i))) {
        return parseInt(i);
      }
    });

    $("#result-1").val(intArray.sort((a, b) => a - b));
  });
});
