var options = {
  contents: [
    "https://images.unsplash.com/photo-1538991383142-36c4edeaffde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1351&q=80",
    "https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1356&q=80",
    "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ],
  duration: 3,
  captain: "Hello World",
  captainFontSize: 28,
  description: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Integer lacinia dui lectus.",
    "Donec scelerisque ipsum diam, ac mattis orci pellentesque eget."
  ],
  descritpionFontSize: 12
};

var slideIndex = 1;
document.addEventListener("DOMContentLoaded", function(e) {
  myWindowGlobalLibraryName.createSlideShow(options);
  createContentList();
});

function createContentList() {
  var sidebarContainer = document.querySelector(".sidebarContainer");

  for (let i = 0; i < options.contents.length; i++) {
    var contentItem = document.createElement("div");
    var innerContent = document.createElement("div");
    var gridIcon = document.createElement("i");
    var trashIcon = document.createElement("i");
    var imageIcon = document.createElement("i");
    var title = document.createElement("div");
    var b = document.createElement("b");

    gridIcon.classList.add("fas", "fa-grip-vertical", "fa-sm");
    gridIcon.style.color = "black";
    imageIcon.classList.add("far", "fa-image", "fa-2x");
    imageIcon.style.margin = "0px 10px";
    title.style.color = "black";
    b.append("Image " + (i + 1));
    title.append(b);
    trashIcon.classList.add("fas", "fa-trash-alt", "fa-sm");
    trashIcon.style.cursor = "pointer";
    innerContent.style.display = "flex";
    innerContent.style.alignItems = "center";
    innerContent.style.cursor = "pointer";
    innerContent.setAttribute("onclick", "changeItem(" + i + ")");
    contentItem.classList.add("contentItem");

    innerContent.appendChild(gridIcon);
    innerContent.appendChild(imageIcon);
    innerContent.appendChild(title);
    contentItem.appendChild(innerContent);
    contentItem.appendChild(trashIcon);
    sidebarContainer.appendChild(contentItem);
  }
}

function changeItem(i) {
  document.querySelector(".tabbed").style.display = "none";
  document.querySelector(".contentOption").style.display = "block";
  console.log(i);
}

function backToContent() {
  document.querySelector(".tabbed").style.display = "block";
  document.querySelector(".contentOption").style.display = "none";
}
