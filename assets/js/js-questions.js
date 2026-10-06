jQuery(function ($) {
  $(document).on("click", "#question-1-button", function () {
    console.log("click");
    let value = $("#question-1").val().replace(/\s+/g, "");

    let array = value.split(",");

    let intArray = $.map(array, function (i) {
      if (!isNaN(parseInt(i))) {
        return parseInt(i);
      }
    });

    console.log(intArray.sort((a, b) => a - b));
  });
});
