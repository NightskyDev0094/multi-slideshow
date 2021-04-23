var options = {
  contents: [
    "https://images.unsplash.com/photo-1538991383142-36c4edeaffde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1351&q=80",
    "https://www.youtube.com/embed/WDH_nJM3djc",
    "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ],
  fileType: ["image", "other", "image"],
  captains: ["1. Hello World", "2. Hello World", "3. Hello World"],
  captainFontSizes: [24, 24, 24],
  descriptions: [
    [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Integer lacinia dui lectus.",
      "Donec scelerisque ipsum diam, ac mattis orci pellentesque eget."
    ],
    [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Integer lacinia dui lectus.",
      "Donec scelerisque ipsum diam, ac mattis orci pellentesque eget."
    ],
    [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Integer lacinia dui lectus.",
      "Donec scelerisque ipsum diam, ac mattis orci pellentesque eget."
    ]
  ],
  descritpionFontSizes: [15, 15, 15],
  autoPlay: true,
  displayDuration: 3,
  backgroundDuration: 1.5,
  backgroundDelay: 0,
  captainDuration: 1,
  captainDelay: 0.5,
  descriptionDuration: 1,
  descriptionDelay: 0.5
};

var slideIndex = 1;
document.addEventListener("DOMContentLoaded", function(e) {
  // myWindowGlobalLibraryName.setSlideShowOptions(options);
  createContentList();
});

function createContentList() {
  var sidebarContainer = document.querySelector(".sidebarContainer");
  var addBtn = document.createElement("div");
  sidebarContainer.innerHTML = "";

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
    if (options.fileType[i] == "image") {
      imageIcon.classList.add("far", "fa-image", "fa-2x");
      imageIcon.style.padding = "0px 4px";
      b.append("Image " + (i + 1));
    } else {
      imageIcon.classList.add("fas", "fa-photo-video", "fa-2x");
      b.append("Other " + (i + 1));
    }
    imageIcon.style.margin = "0px 10px";
    title.style.color = "black";
    title.append(b);
    trashIcon.classList.add("fas", "fa-trash-alt", "fa-sm");
    trashIcon.style.cursor = "pointer";
    trashIcon.setAttribute("onclick", "deleteSlide(" + i + ")");
    innerContent.style.display = "flex";
    innerContent.style.alignItems = "center";
    innerContent.style.cursor = "pointer";
    innerContent.setAttribute("onclick", "showContentOption(" + i + ")");
    contentItem.classList.add("contentItem");

    innerContent.appendChild(gridIcon);
    innerContent.appendChild(imageIcon);
    innerContent.appendChild(title);
    contentItem.appendChild(innerContent);
    contentItem.appendChild(trashIcon);
    sidebarContainer.appendChild(contentItem);
  }

  addBtn.classList.add("btn", "addBtn");
  addBtn.append("Add Element");
  addBtn.setAttribute("onclick", "showContentOption(" + -1 + ")");
  sidebarContainer.appendChild(addBtn);
}

function showContentOption(i) {
  document.querySelector(".tabbed").style.display = "none";
  document.querySelector(".contentOption").style.display = "block";

  // Create save button
  var saveBtn = document.createElement("button");
  saveBtn.classList.add("btn", "saveBtn");

  if (i != -1) {
    saveBtn.setAttribute("onclick", "changeSlideShow(" + i + " )");
    saveBtn.append("Save");
  } else {
    saveBtn.setAttribute("onclick", "addSlide()");
    saveBtn.append("Add");
  }
  document.querySelector(".contentOptionContainer").appendChild(saveBtn);

  // get seleted image info and put to input box
  if (i != -1) {
    document.querySelector("#itemUrl").querySelector("input").value =
      options.contents[i];
    document.querySelector("#captainSetting").querySelector("input").value =
      options.captains[i];
    document
      .querySelector("#captainSetting")
      .querySelectorAll("input")[1].value = options.captainFontSizes[i];

    if (options.fileType[i] == "image")
      document.querySelector("#image").checked = true;
    else document.querySelector("#other").checked = true;

    document
      .querySelector("#descriptionSetting")
      .querySelector("textarea").value = "";
    for (let j = 0; j < options.descriptions[i].length; j++)
      document
        .querySelector("#descriptionSetting")
        .querySelector("textarea").value += options.descriptions[i][j] + "\n";
    document.querySelector("#descriptionSetting").querySelector("input").value =
      options.descritpionFontSizes[i];
  }
}

function backToContent() {
  document.querySelector(".tabbed").style.display = "block";
  document.querySelector(".contentOption").style.display = "none";
  document.querySelector(".saveBtn").remove();
}

function changeSlideShow(i) {
  options.contents[i] = document
    .querySelector("#itemUrl")
    .querySelector("input").value;
  options.captains[i] = document
    .querySelector("#captainSetting")
    .querySelector("input").value;
  options.captainFontSizes[i] = Number.parseInt(
    document.querySelector("#captainSetting").querySelectorAll("input")[1].value
  );

  if (document.querySelector("#image").checked) options.fileType[i] = "image";
  else options.fileType[i] = "other";

  options.descriptions[i] = [];
  var lines = document
    .querySelector("#descriptionSetting")
    .querySelector("textarea")
    .value.split("\n");
  for (let j = 0; j < lines.length; j++) options.descriptions[i].push(lines[j]);

  options.descritpionFontSizes[i] = Number.parseInt(
    document.querySelector("#descriptionSetting").querySelector("input").value
  );

  myWindowGlobalLibraryName.setSlideShowOptions(options);

  createContentList();
  backToContent();
}

function deleteSlide(i) {
  options.contents.splice(i, 1);
  options.captains.splice(i, 1);
  options.captainFontSizes.splice(i, 1);
  options.descriptions.splice(i, 1);
  options.descritpionFontSizes.splice(i, 1);
  options.fileType.splice(i, 1);

  myWindowGlobalLibraryName.setSlideShowOptions(options);
  createContentList();
}
function addSlide() {
  options.contents.push(
    document.querySelector("#itemUrl").querySelector("input").value
  );
  options.captains.push(
    document.querySelector("#captainSetting").querySelector("input").value
  );
  var captainFontSize = Number.parseInt(
    document.querySelector("#captainSetting").querySelectorAll("input")[1].value
  );
  if (captainFontSize) options.captainFontSizes.push(captainFontSize);
  else options.captainFontSizes.push(24);

  if (document.querySelector("#image").checked) options.fileType.push("image");
  else options.fileType.push("other");

  options.descriptions.push([]);
  var lines = document
    .querySelector("#descriptionSetting")
    .querySelector("textarea")
    .value.split("\n");
  for (let j = 0; j < lines.length; j++)
    options.descriptions[options.descriptions.length - 1].push(lines[j]);

  var descritpionFontSize = Number.parseInt(
    document.querySelector("#descriptionSetting").querySelector("input").value
  );
  if (descritpionFontSize)
    options.descritpionFontSizes.push(descritpionFontSize);
  else options.descritpionFontSizes.push(15);

  myWindowGlobalLibraryName.setSlideShowOptions(options);
  createContentList();
  backToContent();
}

function getSlideEffectOffect() {
  if (options.autoPlay) document.querySelector("#autoPlay").checked = true;
  else document.querySelector("#autoPlay").checked = false;

  document.querySelector(
    "#displayDuration"
  ).value = this.options.displayDuration;
  document.querySelector(
    "#backgroundDuration"
  ).value = this.options.backgroundDuration;
  document.querySelector(
    "#backgroundDelay"
  ).value = this.options.backgroundDelay;
  document.querySelector(
    "#captainDuration"
  ).value = this.options.captainDuration;
  document.querySelector("#captainDelay").value = this.options.captainDelay;
  document.querySelector(
    "#descriptionDuration"
  ).value = this.options.descriptionDuration;
  document.querySelector(
    "#descriptionDelay"
  ).value = this.options.descriptionDelay;
}

function setEffectOption() {
  options.autoPlay = document.querySelector("#autoPlay").checked;
  this.options.displayDuration = document.querySelector(
    "#displayDuration"
  ).value;
  this.options.backgroundDuration = document.querySelector(
    "#backgroundDuration"
  ).value;
  this.options.backgroundDelay = document.querySelector(
    "#backgroundDelay"
  ).value;
  this.options.captainDuration = document.querySelector(
    "#captainDuration"
  ).value;
  this.options.captainDelay = document.querySelector("#captainDelay").value;
  this.options.descriptionDuration = document.querySelector(
    "#descriptionDuration"
  ).value;
  this.options.descriptionDelay = document.querySelector(
    "#descriptionDelay"
  ).value;

  document.querySelector("#tab2").checked = true;
  myWindowGlobalLibraryName.setSlideShowOptions(options);
}
