jQuery(function ($) {
  $(document).ready(function () {
    $.getJSON("assets/questions/js-questions.json", function (questions) {
      $.each(questions, function (index, question) {
        if (question.section != PAGE_KEY) {
          return true;
        }

        let number = question.number ?? "";
        let question_str = question.question ?? "";
        let hint =
          question.hint != "" && question.hint != null
            ? `<div class="text-mute">${question.hint}</div>`
            : "";
        let answer = question.answer ? "" : "";
        let fields = question.fields ?? [];

        $("#questions-container").append(
          `<div class='card' data-id=${number}>
          <h3>Question ${number}</h3>
          <p>${question_str}</p>
          ${hint}
          <pre class='code-box'><code>${answer}</code></pre>
          <div id='question-${number}-form'></div>
          </div>
          `,
        );

        if (fields.length > 0) {
          $.each(fields, function (index, field) {
            console.log(field.type);
            if (field != "textarea") {
              var field_input = `<input class='form-control' type='${field.type}' id='${field.name}' />`;
            } else {
              var field_input = `<textarea class='form-control' id='${field.name}'></textarea>`;
            }
            $(`#question-${number}-form`).append(
              `<div>
              <label class='form-label' for='${field.name}'>${field.label}</label>
              ${field_input}
              </div>`,
            );
          });
        }
        $(`#question-${number}-form`).append(
          `<button class='btn btn-primary' id='question-${number}-button'>Run</button>`,
        );
      });
    });
  });
});
