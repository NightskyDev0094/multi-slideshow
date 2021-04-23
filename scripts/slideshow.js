(function(window) {
  function multiSlideShow() {
    var slideIndex = 1;
    var _multiSlideShow = {};
    var options;
    var capainTimer;
    var descriptionTimer;
    var autoPlayTimer;

    _multiSlideShow.setSlideShowOptions = function(values) {
      var slides = document.querySelectorAll(".slide");
      var images = document.querySelectorAll(".imageClip");
      var captains = document.querySelectorAll(".captain");
      var descriptions = document.querySelectorAll(".description");

      if (!slides && !images && !captains && !descriptions) {
        slides[slideIndex - 1].style.display = "none";
        images[slideIndex - 1].style.display = "none";
        captains[slideIndex - 1].style.display = "none";
        descriptions[slideIndex - 1].style.display = "none";
      }

      options = values;
      slideIndex = 1;
      createSlideShow();
    };

    this.createSlideShow = function() {
      var slideShow = document.querySelector(".slideshow-container");
      var panel = document.createElement("div");
      var prev = document.createElement("a");
      var next = document.createElement("a");
      var dotContatiner = document.createElement("div");
      var img;

      slideShow.innerHTML = "";
      panel.classList.add("panel");

      for (let i = 0; i < options.contents.length; i++) {
        var slide = document.createElement("div");
        var textArea = document.createElement("div");
        var captain = document.createElement("div");
        var description = document.createElement("div");
        var dot = document.createElement("span");
        slide.classList.add("slide");
        if (options.fileType[i] == "image") {
          img = document.createElement("img");
        } else img = document.createElement("iframe");
        img.setAttribute("src", options.contents[i]);
        img.classList.add("imageClip");
        textArea.classList.add("text-area");
        captain.classList.add("captain");
        captain.style.fontSize = options.captainFontSizes[i] + "px";
        captain.append(options.captains[i]);
        description.classList.add("description");
        description.style.fontSize = options.descritpionFontSizes[i] + "px";

        var sub = "";
        for (let j = 0; j < options.descriptions[i].length; j++) {
          sub = sub + options.descriptions[i][j] + "<br />";
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
      autoPlay();
    };

    return _multiSlideShow;
  }

  this.autoPlay = function() {
    if (options.autoPlay) {
      autoPlayTimer = setInterval(() => {
        console.log("on");
        fadeSlide((slideIndex += 1));
      }, options.displayDuration * 1000);
    } else {
      clearInterval(autoPlayTimer);
    }
  };

  // Click prev or push
  this.plusSlides = function(n) {
    clearTimeout(capainTimer);
    clearTimeout(descriptionTimer);
    clearInterval(autoPlayTimer);
    autoPlay();
    fadeSlide((slideIndex += n));
  };

  // Click bottom button
  this.currentSlide = function(n) {
    clearTimeout(capainTimer);
    clearTimeout(descriptionTimer);
    clearInterval(autoPlayTimer);
    autoPlay();
    fadeSlide((slideIndex = n));
  };

  // fade effect
  this.fadeSlide = function(n) {
    var i;
    var slides = document.querySelectorAll(".slide");
    var images = document.querySelectorAll(".imageClip");
    var captains = document.querySelectorAll(".captain");
    var descriptions = document.querySelectorAll(".description");
    var dots = document.querySelectorAll(".dot");

    slideIndex = n;
    if (n > images.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = images.length;
    }

    // for (let i = 0; i < images.length; i++)
    images[slideIndex - 1].animate(
      { opacity: [0.4, 1] },
      {
        duration: options.backgroundDuration * 1000,
        delay: options.backgroundDelay * 1000
      }
    );
    // for (let i = 0; i < captains.length; i++)
    captains[slideIndex - 1].animate(
      { opacity: [0, 1] },
      {
        duration: options.captainDuration * 1000,
        delay: options.captainDelay * 1000
      }
    );
    // for (let i = 0; i < descriptions.length; i++)
    descriptions[slideIndex - 1].animate(
      [
        { transform: "translate(-200%, 0)" },
        { transform: "translate(-100%, 0)" },
        { transform: "none" }
      ],
      {
        duration: options.descriptionDuration * 1000,
        delay: options.descriptionDelay * 1000
      }
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
    if (options.captainDelay != 0) {
      capainTimer = setTimeout(() => {
        captains[slideIndex - 1].style.display = "block";
      }, options.captainDelay * 1000 + 100);
    }
    if (options.descriptionDelay != 0) {
      descriptionTimer = setTimeout(() => {
        descriptions[slideIndex - 1].style.display = "block";
      }, options.descriptionDelay * 1000 + 100);
    }

    dots[slideIndex - 1].className += " active";
  };

  if (typeof window.myWindowGlobalLibraryName === "undefined") {
    window.myWindowGlobalLibraryName = multiSlideShow();
  }
})(window);
