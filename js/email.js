function validateEmail(email) {
  "use strict";

  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function sendEmail() {
  "use strict";

  var name = $("#name").val();
  var email = $("#email").val();
  var subject = $("#subject").val();
  var message = $("#message").val();

  if (!name) {
    $("#message")
      .toast("show")
      .addClass("bg-danger")
      .removeClass("bg-success");
    $(".toast-body").html("Name is  required");
  } else if (!email) {
    $("#message")
      .toast("show")
      .addClass("bg-danger")
      .removeClass("bg-success");
    $(".toast-body").html("Email is  required");
  } else if (!validateEmail(email)) {
    $("#message")
      .toast("show")
      .addClass("bg-danger")
      .removeClass("bg-success");
    $(".toast-body").html("Email is not valid");
  } else if (!subject) {
    $("#message")
      .toast("show")
      .addClass("bg-danger")
      .removeClass("bg-success");
    $(".toast-body").html("Subject is  required");
  } else if (!message) {
    $("#message")
      .toast("show")
      .addClass("bg-danger")
      .removeClass("bg-success");
    $(".toast-body").html("Comments is  required");
  } else {
    $.ajax({
      url: "https://portfolio-email-sender.herokuapp.com/api/v1/contact",
      type: "POST",
      data: JSON.stringify({ name, email, subject, message }),
      contentType: "application/json",
      beforeSend: function() {
        $("#submit-btn").html(
          '<span class="spinner-border spinner-border-sm"></span> Loading..'
        );
      },
      success: function(data) {
        $("#submit-btn").html("Submit");
        console.log(data);
        var myObj = data;

        if (myObj["status"] == "success") {
          console.log("success");

          let alert = document.getElementById("success1");
          alert.classList.remove("collapse");
          //$("#succes1").removeClass("collapse");

          setTimeout(() => {
            $("#success1").addClass("collapse");
          }, 3000);
        } else if (myObj["status"] == "Error") {
          let alert = document.getElementById("error1");
          alert.classList.remove("collapse");

          setTimeout(() => {
            $("#error1").addClass("collapse");
          }, 3000);
        } else if (myObj["status"] == "Warning") {
          $("#message")
            .toast("show")
            .addClass("bg-warning")
            .removeClass("bg-success bg-danger");
          $(".toast-body").html(
            "<strong>" + myObj["status"] + " : </strong> " + myObj["message"]
          );
        }
      },
      error: function(xhr) {
        $("#submit-btn").html("Submit");
        $("#message")
          .toast("show")
          .addClass("bg-danger")
          .removeClass("bg-success bg-warning");
        $(".toast-body").html(
          "<strong> Error : </strong> Something went wrong, Please try again."
        );
      }
    });
  }
}
