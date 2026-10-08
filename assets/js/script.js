jQuery(function ($) {
  $(document).ready(function () {
    $.getJSON("assets/questions/questions.json", function (questions) {
      var shortcuts = [];
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
        let answer = question.answer ? question.answer : "";
        let fields = question.fields ?? [];
        shortcuts += `<a class="card text-center" href="#question-${number}-container">Question ${number}</a>`;

        if (PAGE_KEY == "form") {
          $("#questions-container .card").prepend(
            `
          <h3>Question ${number}</h3>
          <p>${question_str}</p>
          ${hint}
          <h4>Answer</h4>
          <pre class='code-box'><code data-id=${number}>${answer}</code></pre>
          `,
          );
        } else {
          let code =
            PAGE_KEY == "js"
              ? `<pre class='code-box'><code data-id=${number}>${answer}</code></pre>`
              : "";
          $("#questions-container").append(
            `<div class='card' data-id=${number} id='question-${number}-container'>
          <h3>Question ${number}</h3>
          <p>${question_str}</p>
          ${hint}
          <h4>Answer</h4>
          ${code}
          <form id='question-${number}-form'></form>
          </div>
          `,
          );

          if (fields.length > 0) {
            $.each(fields, function (index, field) {
              var value = field.value ?? "";
              console.log(value);
              if (field.type != "textarea") {
                var field_input = `<input class='form-control' type='${field.type}' id='${field.name}' value='${value}'/>`;
              } else {
                var field_input = `<textarea class='form-control' id='${field.name}' value='${answer}'>${answer}</textarea>`;
              }
              $(`#question-${number}-form`).append(
                `<div><label class='form-label' for='${field.name}'>${field.label}</label>
              ${field_input}</div>`,
              );
            });
          }

          if (PAGE_KEY == "js") {
            $(`#question-${number}-form`).append(
              `<div class='result-container'><label class='form-label result-box' for='result-${number}'>Result</label>
          <textarea class='form-control' id='result-${number}' disabled></textarea></div>`,
            );
          } else {
            $(`#question-${number}-form`).append(
              `<div class='result-container' id='result-${number}-container>'>
              <h4>Result</h4>
              <table class='table table-striped table-bordered' id='result-${number}-table'>
              <thead><tr></tr></thead>
              <tbody></tbody>
              </table>
              </div>`,
            );
          }

          $(`#question-${number}-form`).append(
            `<button class='btn btn-primary run-button' id='question-${number}-button' data-id=${number}>Run</button>`,
          );
        }
      });
      $("#shortcuts-container").html(shortcuts);
    });
  });

  $(document).on("submit", "form", function (e) {
    e.preventDefault();
  });
});
