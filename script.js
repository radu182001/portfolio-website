// Menu toggle

const nav = document.querySelector(".navigation-bar");
const menu_btn = document.querySelector(".menu-toggle");

menu_btn.addEventListener("click", () => {
  var visible = nav.getAttribute("data-visible");

  if (visible === "false") {
    nav.setAttribute("data-visible", "true");
    menu_btn.setAttribute("aria-expanded", "true");
  } else {
    nav.setAttribute("data-visible", "false");
    menu_btn.setAttribute("aria-expanded", "false");
  }
});

// Alert
const closeAlert = document.querySelector(".closeIcon");
const alertContainer = document.querySelector(".alertContainer");
const alert = document.querySelector(".alert");

closeAlert.addEventListener("click", () => {
  alertContainer.style.display = "none";
});

function showAlertOk() {
  alert.setAttribute("ok", "true");
  alertContainer.style.display = "flex";
}

function showAlertErr() {
  alert.setAttribute("ok", "false");
  alertContainer.style.display = "flex";
}

// Projects display style

function alternateStyle(x) {
  const projects = document.getElementsByClassName("project-container");
  if (x.matches) {
    for (var i = 0; i < projects.length; i++) {
      if (i % 2 != 0) projects[i].style.flexDirection = "row-reverse";
      else projects[i].style.flexDirection = "row";
    }
  } else {
    for (var i = 0; i < projects.length; i++) {
      projects[i].style.flexDirection = "column";
    }
  }
}

var x = window.matchMedia("(min-width: 700px)");
alternateStyle(x);
x.addEventListener("change", () => {
  alternateStyle(x);
});

// Send email

function refresh() {
  var form = document.getElementsByClassName("input")[0];

  form.reset();
}

function noError() {
  for (let i = 0; i < 5; i++) {
    document.getElementsByClassName("error")[i].style.display = "none";
  }
}

function verifyEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sendEmail() {
  noError();
  var name = document.getElementsByClassName("name-input")[0].value;
  var company = document.getElementsByClassName("company-name-input")[0].value;
  var email = document.getElementsByClassName("email-input")[0].value;
  var msg = document.getElementsByClassName("message-input")[0].value;

  if (!name) {
    document.getElementsByClassName("error name")[0].style.display = "";
  }
  if (!company) {
    document.getElementsByClassName("error comp")[0].style.display = "";
  }
  if (!email) {
    document.getElementsByClassName("error email")[0].style.display = "";
  }
  if (!verifyEmail(email) && email) {
    document.getElementsByClassName("error valid")[0].style.display = "";
  }
  if (!msg) {
    document.getElementsByClassName("error msg")[0].style.display = "";
  }

  if (!name || !email || !company || !msg || !verifyEmail(email)) return;

  var finalMessage =
    "Company: " +
    company +
    "<br>Email: " +
    email +
    "<br><br>" +
    msg +
    "<br><br>" +
    name;

  Email.send({
    SecureToken: "8f7a2aa9-9da4-419c-8922-b1efe45526b6",
    To: "radupopescu182001@gmail.com",
    From: "kronic182001@gmail.com",
    Subject: "Mail from website!",
    Body: finalMessage,
  }).then((message) => {
    //alert(message);
    if (message === "OK") showAlertOk();
    else showAlertErr();
  });

  refresh();
  noError();
}
