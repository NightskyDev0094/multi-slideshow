(function(window) {
  var slideIndex = 1;

  function multiSlideShow() {
    var _multiSlideShow = {};
    var capainTimer;
    var descriptionTimer;

    _multiSlideShow.createSlideShow = function(option) {
      var slideShow = document.querySelector(".slideshow-container");
      var panel = document.createElement("div");
      var prev = document.createElement("a");
      var next = document.createElement("a");
      var dotContatiner = document.createElement("div");

      panel.style.height = "100%";
      panel.style.display = "flex";
      panel.style.position = "absolute";

      for (let i = 0; i < options.contents.length; i++) {
        var slide = document.createElement("div");
        var textArea = document.createElement("div");
        var captain = document.createElement("div");
        var description = document.createElement("div");
        var img = document.createElement("img");
        var dot = document.createElement("span");

        slide.classList.add("slide");
        img.setAttribute("src", options.contents[i]);
        img.classList.add("imageClip");
        textArea.classList.add("text-area");
        captain.classList.add("captain");
        captain.append(options.captain);
        description.classList.add("description");

        var sub = "";
        for (let i = 0; i < options.description.length; i++) {
          sub = sub + options.description[i] + "<br />";
        }
        description.innerHTML = sub;
        dot.classList.add("dot");
        dot.setAttribute("onclick", "currentSlide(" + (i + 1) + ")");

        textArea.appendChild(captain);
        textArea.appendChild(description);
        slide.appendChild(img);
        slide.appendChild(textArea);
        dotContatiner.appendChild(dot);

        panel.appendChild(slide);
      }

      prev.classList.add("prev");
      // prev.addEventListener('click', plusSlides(-1))
      prev.setAttribute("onclick", "plusSlides(-1)");
      prev.innerHTML = "&#10094;";
      next.classList.add("next");
      next.setAttribute("onclick", "plusSlides(1)");
      next.innerHTML = "&#10095;";
      dotContatiner.classList.add("dot-container");

      slideShow.appendChild(panel);
      slideShow.appendChild(prev);
      slideShow.appendChild(next);
      slideShow.appendChild(dotContatiner);

      fadeSlide(slideIndex);
    };

    return _multiSlideShow;
  }

  // Click prev or push
  this.plusSlides = function(n) {
    clearTimeout(capainTimer);
    clearTimeout(descriptionTimer);
    fadeSlide((slideIndex += n));
  };

  // Click bottom button
  this.currentSlide = function(n) {
    clearTimeout(capainTimer);
    clearTimeout(descriptionTimer);
    fadeSlide((slideIndex = n));
  };

  // fade effect
  this.fadeSlide = function(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    var images = document.getElementsByClassName("imageClip");
    var captains = document.getElementsByClassName("captain");
    var descriptions = document.querySelectorAll(".description");
    var dots = document.getElementsByClassName("dot");

    if (n > images.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = images.length;
    }

    // for (let i = 0; i < images.length; i++)
    images[slideIndex - 1].animate({ opacity: [0.4, 1] }, 1500);
    // for (let i = 0; i < captains.length; i++)
    captains[slideIndex - 1].animate(
      { opacity: [0, 1] },
      { duration: 1000, delay: 500 }
    );
    // for (let i = 0; i < descriptions.length; i++)
    descriptions[slideIndex - 1].animate(
      [
        { transform: "translate(-200%, 0)" },
        { transform: "translate(-100%, 0)" },
        { transform: "none" }
      ],
      { duration: 1000, delay: 500 }
    );

    for (i = 0; i < images.length; i++) {
      slides[i].style.display = "none";
      images[i].style.display = "none";
      // captains[i].style.opacity = 0;
      // descriptions[i].style.opacity = 0;
      captains[i].style.display = "none";
      descriptions[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    images[slideIndex - 1].style.display = "block";
    // captains[slideIndex - 1].style.opacity = 1;
    // descriptions[slideIndex - 1].style.opacity = 1;
    capainTimer = setTimeout(() => {
      captains[slideIndex - 1].style.display = "block";
    }, 600);
    descriptionTimer = setTimeout(() => {
      descriptions[slideIndex - 1].style.display = "block";
    }, 600);

    dots[slideIndex - 1].className += " active";
  };

  if (typeof window.myWindowGlobalLibraryName === "undefined") {
    window.myWindowGlobalLibraryName = multiSlideShow();
  }
})(window);
