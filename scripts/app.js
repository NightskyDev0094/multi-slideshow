var options = {
  contents: [
    "https://images.unsplash.com/photo-1538991383142-36c4edeaffde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1351&q=80",
    "https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1356&q=80",
    "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ],
  duration: 3,
  captain: "Hello World",
  captainFontSize: 28,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lacinia dui lectus. Donec scelerisque ipsum diam, ac mattis orci pellentesque eget.",
  descritpionFontSize: 12
};

// function onload() {
//   // var ele = document.querySelector("iframe");
//   // console.log(ele.scrollHeight, ele.scrollWidth);
//   // var h = ele.contentWindow;
//   myWindowGlobalLibraryName.createSlideShow(options);
// }

var slideIndex = 1;
document.addEventListener("DOMContentLoaded", function(e) {
  showSlides(slideIndex);
});

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slide");
  var images = document.getElementsByClassName("imageClip");
  var captains = document.getElementsByClassName("captain");
  let descriptions = document.querySelectorAll(".description");
  var dots = document.getElementsByClassName("dot");

  for (let i = 0; i < images.length; i++)
    images[i].animate({ opacity: [0.4, 1] }, 1500);
  for (let i = 0; i < captains.length; i++)
    captains[i].animate({ opacity: [0, 1] }, { duration: 1000, delay: 1500 });
  for (let i = 0; i < descriptions.length; i++)
    descriptions[i].animate(
      // [{ transform: "translate(0, 300%)" }, { transform: "none" }],
      [{ transform: "translate(-100%, 0)" }, { transform: "none" }],
      { duration: 1000, delay: 1500 }
    );

  if (n > images.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = images.length;
  }
  for (i = 0; i < images.length; i++) {
    slides[i].style.display = "none";
    images[i].style.display = "none";
    captains[i].style.opacity = 0;
    descriptions[i].style.opacity = 0;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  images[slideIndex - 1].style.display = "block";
  setTimeout(() => {
    captains[slideIndex - 1].style.opacity = 1;
    descriptions[slideIndex - 1].style.opacity = 1;
  }, 1600);
  dots[slideIndex - 1].className += " active";
}
