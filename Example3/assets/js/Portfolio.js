$(document).ready(function () {
  (function ($) {
    $.fn.writeText = function (content, callback) {
      var contentArray = content.split(""),
        current = 0,
        elem = this;
      var interval = setInterval(function () {
        if (current < contentArray.length) {
          elem.text(elem.text() + contentArray[current++]);
        } else {
          clearInterval(interval);
          if (callback) {
            callback();
          }
        }
      }, 80);
    };
  })(jQuery);

  function typeWriter(text, i, id) {
    var userInput = document.getElementById("user-input");
    userInput.setAttribute("contenteditable", "false"); // Kullanıcı girişini kapat

    function enableUserInput() {
      userInput.setAttribute("contenteditable", "true");
      userInput.focus();
    }

    if (i < text.length) {
      var char = text.charAt(i);
      if (char === "\n") {
        document.getElementById(id).innerHTML += "<br>";
      } else {
        document.getElementById(id).innerHTML += char;
      }
      i++;
      setTimeout(function () {
        typeWriter(text, i, id);
      }, 100);
    } else {
      setTimeout(enableUserInput, 500); // Yazı tamamlandıktan 500 ms sonra kullanıcı girişini etkinleştir
    }
  }

  var text =
    "Greetings Visitor.\nOnly the worthy may enter. Are you worthy? \n";
  typeWriter(text, 0, "chat-output");

  $(document).ready(function () {
    $(window).scroll(function () {
      var scrollTop = $(this).scrollTop();
      var chatContainer = $("#chat-container");

      if (scrollTop > 50 && !chatContainer.hasClass("closed")) {
        chatContainer.addClass("closed");
      } else if (scrollTop <= 50 && chatContainer.hasClass("closed")) {
        chatContainer.removeClass("closed");
      }
    });
  });

  new WOW().init();
  $(document).ready(function () {
    // Toggle Chat Window
    function toggleChat() {
      $("#chat-container").toggleClass("closed");
    }

    // Toggle Chat Button Event Listener
    $("#chat-btn").on("click", function () {
      toggleChat();
    });
    // User Input Key Down Event Listener
    $("#user-input").on("keydown", function (event) {
      handleKeyDown(event);
    });

    function handleKeyDown(event) {
      if (event.key === "Enter") {
        event.preventDefault();

        var userInput = $("#user-input").text();

        // Insert a line break every 35 characters, considering the "Visitor: " prefix
        userInput = userInput.replace(/(.{26})/g, "$1\n");

        // Replace newline characters with HTML line breaks
        userInput = userInput.replace(/\n/g, "<br>");

        $("#chat-output").append(
          '<div class="user-message">' + userInput + "</div>"
        );

        // Clear the user input
        $("#user-input").empty();

        var chatContainer = $("#chat-container");
        chatContainer.scrollTop(chatContainer[0].scrollHeight);
      }
    }

    function isMobile() {
      return window.innerWidth <= 768; // Adjust the breakpoint as needed
    }

    // Check if it's a mobile device and start the chat container closed
    if (isMobile()) {
      $("#chat-container").addClass("closed");
    }

    $(window).resize(function () {
      // Update chat container status on window resize
      if (isMobile()) {
        $("#chat-container").addClass("closed");
      } else {
        $("#chat-container").removeClass("closed");
      }
    });

    // Rest of your existing JavaScript code
  });

  // Push the body and the nav over by 285px over
  var main = function () {
    $(".fa-bars").click(function () {
      $(".nav-screen").animate(
        {
          right: "0px",
        },
        200
      );

      $("body").animate(
        {
          right: "285px",
        },
        200
      );
    });

    // Then push them back */
    $(".fa-times").click(function () {
      $(".nav-screen").animate(
        {
          right: "-285px",
        },
        200
      );

      $("body").animate(
        {
          right: "0px",
        },
        200
      );
    });

    $(".nav-links a").click(function () {
      $(".nav-screen").animate(
        {
          right: "-285px",
        },
        500
      );

      $("body").animate(
        {
          right: "0px",
        },
        500
      );
    });
  };

  $(document).ready(main);

  // initiate full page scroll

  $("#fullpage").fullpage({
    scrollBar: true,
    responsiveWidth: 400,
    navigation: false,
    navigationTooltips: ["home", "about", "projects", "contact", "connect"],
    anchors: ["home", "about", "projects", "contact", "connect"],
    menu: "#myMenu",
    fitToSection: false,

    afterLoad: function (anchorLink, index) {
      var loadedSection = $(this);

      //using index
      if (index == 1) {
        /* add opacity to arrow */
        $(".fa-chevron-down").each(function () {
          $(this).css("opacity", "1");
        });
        $(".header-links a").each(function () {
          $(this).css("color", "white");
        });
      } else if (index != 1) {
        $(".header-links a").each(function () {
          $(this).css("color", "white");
        });
      }

      //using index
      if (index == 2) {
        /* animate skill bars */
        $(".skillbar").each(function () {
          $(this)
            .find(".skillbar-bar")
            .animate(
              {
                width: jQuery(this).attr("data-percent"),
              },
              2500
            );
        });
      }
    },
  });

  // move section down one
  $(document).on("click", "#moveDown", function () {
    $.fn.fullpage.moveSectionDown();
  });

  // fullpage.js link navigation
  $(document).on("click", "#skills", function () {
    $.fn.fullpage.moveTo(2);
  });

  $(document).on("click", "#projects", function () {
    $.fn.fullpage.moveTo(3);
  });

  $(document).on("click", "#contact", function () {
    $.fn.fullpage.moveTo(4);
  });

  // smooth scrolling
  $(function () {
    $("a[href*=#]:not([href=#])").click(function () {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html,body").animate(
            {
              scrollTop: target.offset().top,
            },
            700
          );
          return false;
        }
      }
    });
  });

  //ajax form
  $(function () {
    // Get the form.
    var form = $("#ajax-contact");

    // Get the messages div.
    var formMessages = $("#form-messages");

    // Set up an event listener for the contact form.
    $(form).submit(function (e) {
      // Stop the browser from submitting the form.
      e.preventDefault();

      // Serialize the form data.
      var formData = $(form).serialize();

      // Submit the form using AJAX.
      $.ajax({
        type: "POST",
        url: $(form).attr("action"),
        data: formData,
      })
        .done(function (response) {
          // Make sure that the formMessages div has the 'success' class.
          $(formMessages).removeClass("error");
          $(formMessages).addClass("success");

          // Set the message text.
          $(formMessages).text(response);

          // Clear the form.
          $("#name").val("");
          $("#email").val("");
          $("#message").val("");
        })
        .fail(function (data) {
          // Make sure that the formMessages div has the 'error' class.
          $(formMessages).removeClass("success");
          $(formMessages).addClass("error");

          // Set the message text.
          if (data.responseText !== "") {
            $(formMessages).text(data.responseText);
          } else {
            $(formMessages).text(
              "Oops! An error occured and your message could not be sent."
            );
          }
        });
    });
  });
});
var swiper = new Swiper(".swiper-container", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  coverflowEffect: {
    rotate: 10,
    stretch: 50,
    depth: 200,
    modifier: 3,
    slideShadows: true,
  },
  keyboard: {
    enabled: true,
  },
  mousewheel: {
    thresholdDelta: 70,
  },
  loop: true, // Loop özelliğini true olarak ayarlayın
  loopAdditionalSlides: 1, // Başlangıç ve sonu birleştirme için kullanılır
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    888: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 2,
    },
    1560: {
      slidesPerView: 2,
    },
  },
});

function flashTitleNotification() {
  var originalTitle = document.title;

  function changeTitle(sectionName) {
    if (sectionName) {
      document.title = sectionName.toUpperCase();
    } else {
      var homeNav = document.querySelector('[data-menuanchor="firstPage"] a');
      if (homeNav) {
        document.title = homeNav.textContent || originalTitle;
      }
    }
  }

  // Change title when a section is entered
  function handleSectionEnter(event) {
    var sectionName = event.target.getAttribute("data-anchor");
    changeTitle(sectionName);
  }

  // Listen for section enter events
  var fullpageContainer = document.getElementById("fullpage");
  fullpageContainer.addEventListener("fullpage:afterLoad", handleSectionEnter);

  // Call the function when the window is loaded
  window.onload = function () {
    // Set initial title based on the first section
    var firstSection = document.querySelector(".section[data-anchor]");
    if (firstSection) {
      var initialSectionName = firstSection.getAttribute("data-anchor");
      changeTitle(initialSectionName);
    }

    // Change title every second (1000 milliseconds) by default
    setInterval(function () {
      var currentSection = fullpageContainer.querySelector(".section.active");
      if (currentSection) {
        var currentSectionName = currentSection.getAttribute("data-anchor");
        changeTitle(currentSectionName);
      }
    }, 1000);
  };
}

flashTitleNotification();

function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.innerHTML = message;
  notification.style.display = "block";
  notification.style.fontSize = "25px";
  notification.style.font = "large";

  // 3 saniye sonra bildirimi gizle
  setTimeout(() => {
    notification.style.display = "none";
  }, 2000);
}

document.querySelectorAll(".social-icon").forEach((icon) => {
  icon.addEventListener("click", (e) => {
    e.preventDefault();
    let site = "";
    if (icon.classList.contains("social-icon--envelope")) {
      site = "firatbitmez@outlook.com";
      // Copy email address to clipboard
      const textArea = document.createElement("textarea");
      textArea.value = site;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      showNotification("Email address copied.");

      return;
    } else if (icon.classList.contains("social-icon--codepen")) {
      site = "https://codepen.io/FIRAT-KAAN-BTMEZ";
    } else if (icon.classList.contains("social-icon--github")) {
      site = "https://github.com/firatkaanbitmez";
    } else if (icon.classList.contains("social-icon--twitter")) {
      site = "https://twitter.com/";
    } else if (icon.classList.contains("social-icon--dribbble")) {
      site = "https://dribbble.com/";
    } else if (icon.classList.contains("social-icon--instagram")) {
      site = "https://www.instagram.com/firatbitmez/";
    } else if (icon.classList.contains("social-icon--linkedin")) {
      site = "https://www.linkedin.com/in/firatkaanbitmez/";
    } else if (icon.classList.contains("social-icon--facebook")) {
      site = "https://www.facebook.com/";
    } else if (icon.classList.contains("social-icon--Hackerrank")) {
      site = "https://www.hackerrank.com/profile/firatbitmez";
    }

    if (site) {
      window.open(site, "_blank");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var imageContainer = document.querySelector(".image-container");
  var editImageContainer = document.querySelector(".editimage-container");
  var readMoreBtn = document.getElementById("readMoreBtn");

  // Set the initial state
  imageContainer.style.display = "flex";
  editImageContainer.style.display = "none";

  readMoreBtn.addEventListener("click", function () {
    if (
      imageContainer.style.display === "none" ||
      imageContainer.style.display === ""
    ) {
      imageContainer.style.display = "flex";
      editImageContainer.style.display = "none";
      readMoreBtn.innerText = "Show More";
    } else {
      imageContainer.style.display = "none";
      editImageContainer.style.display = "flex";
      readMoreBtn.innerText = "Show Less";
    }
  });
});

// User-input alanını seçin, örneğin id="user-input"
var userInput = document.getElementById("user-input");

// User-input alanına odaklanıldığında çalışacak bir fonksiyon tanımlayın
function handleFocus() {
  // Fullpage.js'in kaydırmayı devre dışı bırakın
  fullpage_api.setAllowScrolling(false);
  fullpage_api.setKeyboardScrolling(false);
}

// User-input alanından çıkıldığında çalışacak bir fonksiyon tanımlayın
function handleBlur() {
  // Fullpage.js'in kaydırmayı etkinleştirin
  fullpage_api.setAllowScrolling(true);
  fullpage_api.setKeyboardScrolling(true);
}

// User-input alanına focus ve blur olaylarını dinleyin
userInput.addEventListener("focus", handleFocus);
userInput.addEventListener("blur", handleBlur);
