jQuery(function ($) {
  $(document).on("click", ".run-button", function (e) {
    e.preventDefault();
    let question_number = $(this).data("id");
    let form_id = $(this).closest("form").attr("id");
    let form_inputs = $(`#${form_id} input`);
    let values = [];
    form_inputs.each(function (index, input) {
      let id = $(input).attr("id");
      let value = $(input).val();
      values.push({ id: id, value: value });
    });
    get_answer(question_number, values);
  });

  function get_answer(number, values) {
    switch (number) {
      case 1:
        var value = values[0].value;
        let array = value.split(",");
        let uniqueArray = [];

        let intArray = $.map(array, function (i) {
          if (!isNaN(parseInt(i))) {
            return parseInt(i);
          }
        });

        intArray = [...new Set(intArray)];

        $("#result-1").val(intArray.sort((a, b) => a - b));
        break;
      default:
        alert("not a question or no answer yet");
        break;
    }
  }
});
