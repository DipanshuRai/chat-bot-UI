var $messages = $(".messages-content"),
  d,
  h,
  m,
  i = 0;
var userMessage = "";

console.log(273618273186, $messages);

$(window).on("load", function () {
  $messages.mCustomScrollbar();
  setTimeout(function () {
    fakeMessage();
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar("scrollTo", "bottom", {
    scrollInertia: 10,
    timeout: 0,
  });
}

function setDate() {
  d = new Date();
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ":" + m + "</div>").appendTo(
      $(".message:last")
    );
  }
}

function insertMessage() {
  msg = $(".message-input").val();
  if ($.trim(msg) == "") {
    return false;
  }
  $('<div class="message message-personal">' + msg + "</div>")
    .appendTo($(".mCSB_container"))
    .addClass("new");
  setDate();
  userMessage = msg;
  $(".message-input").val(null);
  updateScrollbar();
  
  // Disable the submit button and add disabled class
  $(".message-submit").prop("disabled", true).addClass("disabled");

  setTimeout(function () {
    fakeMessage();
  }, 1000 + Math.random() * 20 * 100);
}

$(".message-submit").click(function () {
  insertMessage();
});

$(window).on("keydown", function (e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
});

function fakeMessage() {
  if (userMessage === "") {
    return false;
  }
  $(
    '<div class="message loading new"><figure class="avatar"><img src="./bot.png" /></figure><span></span></div>'
  ).appendTo($(".mCSB_container"));
  updateScrollbar();

  setTimeout(function () {
    $(".message.loading").remove();
    $(
      '<div class="message new"><figure class="avatar"><img src="./bot.png" /></figure>' +
        marked.parse(userMessage) +
        "</div>"
    )
      .appendTo($(".mCSB_container"))
      .addClass("new");
    setDate();
    updateScrollbar();
    i++;
    userMessage = "";
    
    // Re-enable the submit button and remove disabled class
    $(".message-submit").prop("disabled", false).removeClass("disabled");
  }, 1000 + Math.random() * 20 * 100);
}
