(function(window) {
  function multiSlideShow() {
    var slideIndex = 1;
    var _multiSlideShow = {};
    var options;
    this.waitCaptainTimer = 0;

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

      importFontFamily(options.captainFontFamily);
      importFontFamily(options.descriptionFontFamily);

      var dotHover =
        ".dot:hover {background-color: " +
        options.navigationBackgroundColor +
        99 +
        ";}";
      this.dotHoverStyle = document.createElement("style");

      if (this.dotHoverStyle.styleSheet) {
        this.dotHoverStyle.styleSheet.cssText = dotHover;
      } else {
        this.dotHoverStyle.appendChild(document.createTextNode(dotHover));
      }

      var active = document.createElement("style");
      active.type = "text/css";
      active.innerHTML =
        ".active {background-color: " +
        options.navigationBackgroundColor +
        99 +
        ";}";
      document.getElementsByTagName("head")[0].appendChild(active);

      var prevHover = document.createElement("style");
      prevHover.type = "text/css";
      prevHover.innerHTML =
        ".prev:hover, .next:hover {background-color: " +
        options.arrowBackgroundColor +
        "cc;}";
      document.getElementsByTagName("head")[0].appendChild(prevHover);

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
        captain.style.fontSize = options.captainFontSize + "px";
        captain.style.fontFamily = options.captainFontFamily;
        captain.append(options.captains[i]);
        captain.style.color = options.captainColor;
        description.classList.add("description");
        description.style.fontSize = options.descritpionFontSize + "px";
        description.style.fontFamily = options.descriptionFontFamily;
        description.style.color = options.descriptionColor;

        var sub = "";
        for (let j = 0; j < options.descriptions[i].length; j++) {
          sub = sub + options.descriptions[i][j] + "<br />";
        }
        description.innerHTML = sub;

        dot.classList.add("dot");
        dot.style.border = "2px solid " + options.navigationBorderColor;
        dot.style.width = options.navigationSize + "px";
        dot.style.height = options.navigationSize + "px";
        dot.style.margin = "0px " + options.navigationSpace + "px";
        dot.setAttribute("onclick", "currentSlide(" + (i + 1) + ")");
        dot.appendChild(this.dotHoverStyle);

        textArea.appendChild(captain);
        textArea.appendChild(description);
        slide.appendChild(img);
        slide.appendChild(textArea);
        dotContatiner.appendChild(dot);

        panel.appendChild(slide);
      }

      prev.classList.add("prev");
      prev.style.color = options.arrowColor;
      prev.setAttribute("onclick", "plusSlides(-1)");
      prev.innerHTML = "&#10094;";
      next.classList.add("next");
      next.style.color = options.arrowColor;
      next.setAttribute("onclick", "plusSlides(1)");
      next.innerHTML = "&#10094;";
      dotContatiner.classList.add("dot-container");
      dotContatiner.style.display = "flex";
      if (options.navigationDirection == "vertical")
        dotContatiner.style.flexDirection = "column";
      dotContatiner.classList.add(options.navigationPosition);

      slideShow.appendChild(panel);
      if (options.hasArrow) {
        slideShow.appendChild(prev);
        slideShow.appendChild(next);
      }
      if (options.hasNavigation) slideShow.appendChild(dotContatiner);

      fadeSlide(slideIndex);
      killTimer();
      autoPlay();
    };

    return _multiSlideShow;
  }

  this.importFontFamily = function(font) {
    // var fontFamily = this.options.captainFontFamily;
    var fontFamily = font;
    var fontUrl = `https://fonts.googleapis.com/css?family=${fontFamily.replace(
      " ",
      "+"
    )}`;
    var pos = fontFamily.indexOf(":");
    if (pos > 0) {
      fontFamily = fontFamily.substring(0, pos);
    }
    var link = document.createElement("link");
    link.id = "myfontlink";
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", fontUrl);
    document.head.appendChild(link);
  };

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

    if (options.hasNavigation)
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
    slides[slideIndex - 1].style.display = "block";
    images[slideIndex - 1].style.display = "block";

    if (options.captainDelay != 0 && options.hasCaptain) {
      this.capainTimer = setTimeout(() => {
        captains[slideIndex - 1].style.display = "block";
      }, options.captainDelay * 1000 + 100);
    }
    if (options.descriptionDelay != 0 && options.hasDescription) {
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

    if (options.hasNavigation) dots[slideIndex - 1].className += " active";
  };

  this.setTextEffect = function(slideIndex, captains, descriptions) {
    captains[slideIndex - 1].animate(
      { opacity: [0, 1] },
      {
        duration: options.captainDuration * 1000,
        delay: options.captainDelay * 1000
      }
    );

    // if (options.hasDescription) {
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
    // }
  };

  if (typeof window.myWindowGlobalLibraryName === "undefined") {
    window.myWindowGlobalLibraryName = multiSlideShow();
  }
})(window);
