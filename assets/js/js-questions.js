jQuery(function ($) {
  $(document).on("click", ".run-button", function (e) {
    e.preventDefault();
    let question_number = $(this).data("id");
    let form_id = $(this).closest("form").attr("id");
    let form_inputs = $(`#${form_id} input`);
    let values = {};
    form_inputs.each(function (index, input) {
      let id = $(input).attr("id");
      let value = $(input).val();
      $.extend(values, { [id]: value });
    });
    get_answer(question_number, values);
  });

  function get_answer(number, values) {
    switch (number) {
      case 1:
        var value = values["question-1"];
        var array = value.split(",");
        var uniqueArray = [];

        var intArray = $.map(array, function (i) {
          if (!isNaN(parseInt(i))) {
            return parseInt(i);
          }
        });

        intArray = [...new Set(intArray)];

        $("#result-1").val(intArray.sort((a, b) => a - b));
        break;
      case 2:
        var value = values["question-2"]
          .toLowerCase()
          .replace(/[^a-zA-Z0-9\s]/g, "");
        var array = value.split(" ");
        var uniqueArray = [...new Set(array)];
        var countObject = [];
        var returnStr = "";

        $.each(uniqueArray, function (i, v) {
          var count = array.reduce(
            (count, item) => (item === v ? count + 1 : count),
            0,
          );
          countObject.push({ [v]: count });
        });

        $.each(countObject, function (i, obj) {
          var key = Object.keys(obj);
          var value = obj;
          returnStr += `${key}: ${obj[key]}, `;
        });

        $("#result-2").val(returnStr);
        break;
      case 3:
        var age = values["age"];
        var score = values["score"];
        var returnStr = "";
        if (age >= 18 && score >= 70) {
          returnStr = "Eligible";
        } else {
          returnStr = "Not Eligible";
        }

        $("#result-3").val(returnStr);
        break;
      case 4:
        console.log(values);
        var array1str = values["array1"].replace("[", "").replace("]", "");
        var array2str = values["array2"].replace("[", "").replace("]", "");
        var array1 = array1str.split(",");
        var array2 = array2str.split(",");

        array1 = $.map(array1, function (i) {
          if (!isNaN(parseInt(i))) {
            return parseInt(i);
          }
        });

        array2 = $.map(array2, function (i) {
          if (!isNaN(parseInt(i))) {
            return parseInt(i);
          }
        });

        var combinedArray = $.merge(array1, array2);
        combinedArray = [...new Set(combinedArray)];

        for (let n = 0; n < combinedArray.length; n++) {}

        break;
      default:
        alert("not a question or no answer yet");
        break;
    }
  }
});
