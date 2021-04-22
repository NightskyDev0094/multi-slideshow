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
    ["Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
    "Integer lacinia dui lectus.",
    "Donec scelerisque ipsum diam, ac mattis orci pellentesque eget."],
  descritpionFontSize: 12
};

var slideIndex = 1;
document.addEventListener("DOMContentLoaded", function(e) {
  console.log('start')
  myWindowGlobalLibraryName.createSlideShow(options);
  // showSlides(slideIndex);
});
