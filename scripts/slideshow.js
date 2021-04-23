(function(window) {
  function multiSlideShow() {
    var slideIndex = 1;
    var _multiSlideShow = {};
    var options;
    this.waitCaptainTimer = 0;
    // var capainTimer;
    // var descriptionTimer;
    // var autoPlayTimer;

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
        textArea.classList.add("textArea");
        textArea.classList.add(options.textPosition);
        captain.classList.add("captain");
        captain.style.fontSize = options.captainFontSizes[i] + "px";
        captain.append(options.captains[i]);
        captain.style.color = options.captainColor;
        description.classList.add("description");
        description.style.fontSize = options.descritpionFontSizes[i] + "px";
        description.style.color = options.descriptionColor;

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
      killTimer();
      autoPlay();
    };

    return _multiSlideShow;
  }

  this.autoPlay = function() {
    if (options.autoPlay) {
      this.autoPlayTimer = setInterval(() => {
        fadeSlide((slideIndex += 1));
      }, options.displayDuration * 1000);
    } else {
      clearInterval(this.autoPlayTimer);
    }
  };

  this.killTimer = function() {
    clearInterval(this.autoPlayTimer);
  };

  // Click prev or push
  this.plusSlides = function(n) {
    var descriptions = document.querySelectorAll(".description");
    console.log(descriptions[slideIndex - 1].style.opacity);
    clearTimeout(this.capainTimer);
    clearTimeout(this.descriptionTimer);
    clearTimeout(this.waitCaptainTimer);
    clearInterval(this.autoPlayTimer);
    autoPlay();
    fadeSlide((slideIndex += n));
  };

  // Click bottom button
  this.currentSlide = function(n) {
    clearTimeout(this.capainTimer);
    clearTimeout(this.descriptionTimer);
    clearTimeout(this.waitCaptainTimer);
    clearInterval(this.autoPlayTimer);
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

    images[slideIndex - 1].animate(
      { opacity: [0.4, 1] },
      {
        duration: options.backgroundDuration * 1000,
        delay: options.backgroundDelay * 1000
      }
    );
    setTextEffect(slideIndex, captains, descriptions);

    for (i = 0; i < images.length; i++) {
      slides[i].style.display = "none";
      images[i].style.display = "none";
      captains[i].style.display = "none";
      descriptions[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    images[slideIndex - 1].style.display = "block";
    if (options.captainDelay != 0) {
      this.capainTimer = setTimeout(() => {
        captains[slideIndex - 1].style.display = "block";
      }, options.captainDelay * 1000 + 100);
    }
    if (options.descriptionDelay != 0) {
      if (
        !options.textPosition.toLowerCase().includes("left") &&
        !options.textPosition.toLowerCase().includes("right")
      ) {
        this.waitCaptainTimer = setTimeout(() => {
          descriptions[slideIndex - 1].style.opacity = 0;
          descriptions[slideIndex - 1].style.display = "block";
        }, options.captainDelay * 1000 + 100);
        this.descriptionTimer = setTimeout(() => {
          descriptions[slideIndex - 1].style.opacity = 1;
        }, options.descriptionDuration * 1000 + options.captainDelay * 1000 + 100);
      } else {
        this.descriptionTimer = setTimeout(() => {
          descriptions[slideIndex - 1].style.display = "block";
          descriptions[slideIndex - 1].style.opacity = 0;
          descriptions[slideIndex - 1].style.opacity = 1;
        }, options.descriptionDelay * 1000 + 100);
      }
    }

    dots[slideIndex - 1].className += " active";
  };

  this.setTextEffect = function(slideIndex, captains, descriptions) {
    captains[slideIndex - 1].animate(
      { opacity: [0, 1] },
      {
        duration: options.captainDuration * 1000,
        delay: options.captainDelay * 1000
      }
    );
    if (options.textPosition.toLowerCase().includes("left")) {
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
    } else if (options.textPosition.toLowerCase().includes("right")) {
      descriptions[slideIndex - 1].animate(
        [
          { transform: "translate(200%, 0)" },
          { transform: "translate(100%, 0)" },
          { transform: "none" }
        ],
        {
          duration: options.descriptionDuration * 1000,
          delay: options.descriptionDelay * 1000
        }
      );
    } else {
      descriptions[slideIndex - 1].animate(
        { opacity: [0, 1] },
        {
          duration: options.descriptionDuration * 1000,
          delay: options.captainDuration * 1000 + options.captainDelay * 1000
        }
      );
    }
  };

  if (typeof window.myWindowGlobalLibraryName === "undefined") {
    window.myWindowGlobalLibraryName = multiSlideShow();
  }
})(window);
