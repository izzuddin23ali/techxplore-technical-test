jQuery(function ($) {
  $("form").on("submit", function (e) {
    e.preventDefault();

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let full_name = $("#full-name").val();
    let email = $("#email-address").val();
    let whatsapp = $("#whatsapp").val();

    var full_name_error_message = "";
    var email_error_message = "";
    var whatsapp_error_message = "";

    if (full_name == "") {
      full_name_error_message = "Full Name is required";
    } else {
      full_name_error_message = "";
    }

    var email_validation = regex.test(email);

    if (whatsapp == "") {
      whatsapp_error_message = "Whatsapp number is required.";
    } else if (isNaN(whatsapp)) {
      whatsapp_error_message = "Values inputted is not a number.";
    } else if (whatsapp.length < 7) {
      whatsapp_error_message =
        "Phone number must be longer than or equal to 7 digits";
    } else if (whatsapp.length > 10) {
      whatsapp_error_message = "Phone number must not be longer than 10 digits";
    } else {
      whatsapp_error_message = "";
    }

    if (!email_validation) {
      if (email.length == 0) {
        email_error_message = "Email Address is required.";
      } else {
        email_error_message = "Your email address is invalid.";
      }
    } else {
      email_error_message = "";
    }

    $('.error-message[data-input="full-name"]').text(full_name_error_message);
    full_name_error_message != ""
      ? $('.error-message[data-input="full-name"]').show()
      : $('.error-message[data-input="full-name"]').hide();

    $('.error-message[data-input="email-address"]').text(email_error_message);
    email_error_message != ""
      ? $('.error-message[data-input="email-address"]').show()
      : $('.error-message[data-input="email-address"]').hide();

    $('.error-message[data-input="whatsapp"]').text(whatsapp_error_message);
    whatsapp_error_message != ""
      ? $('.error-message[data-input="whatsapp"]').show()
      : $('.error-message[data-input="whatsapp"]').hide();
  });
});
