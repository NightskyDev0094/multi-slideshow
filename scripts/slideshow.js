(function(window) {
  function multiSlideShow() {
    var _multiSlideShow = {};

    _multiSlideShow.createSlideShow = function(option) {
      return console.log(option);
    };

    return _multiSlideShow;
  }

  if (typeof window.myWindowGlobalLibraryName === "undefined") {
    window.myWindowGlobalLibraryName = multiSlideShow();
  }
})(window);
