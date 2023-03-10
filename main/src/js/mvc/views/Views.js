class Views {
  header = document.querySelector("header");
  main = document.querySelector("main");
  root = document.querySelector(":root");
  sections = Array.from(document.querySelectorAll(".section"));
  leftBanner = document.querySelector(".vertical-banner__left");
  rightBanner = document.querySelector(".vertical-banner__right");
  navBar = document.querySelector("nav");
  navLbls = document.querySelectorAll(".nav-lbl");
  hamburgerAndX = document.querySelector(".hamburger-x__wrapper");
  hamburgerContainer = document.querySelector(".hamburger-x__container");
  hamburgerIcon = document.querySelector(".hamburger__icon");
  xIcon = document.querySelector(".x__icon");
  // Gets assigned when pdfjs is instantiated
  pdfViewerInstance;

  firstLetterToUpperCase(word) {
    return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
  }

  formatName(name) {
    const formattedWords = [];
    name
      .split(" ")
      .forEach((word) =>
        formattedWords.push(this.firstLetterToUpperCase(word))
      );
    return formattedWords.join(" ");
  }

  validateWord(word) {
    // Excludes numbers and illegal characters
    // const regEx = /^([ \u00c0-\u01ffa-zA-Z'\-])+$/;
    const regEx =
      /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>{}[\]~`"¿?:;1234567890|=]{2,30}$/;
    return word.match(regEx) ? true : false;
  }

  validateEmail(email) {
    const regEx =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return email.match(regEx) ? true : false;
  }

  /**
   * @param {boolean} bool
   */
  set rootYScroll(bool) {
    document.querySelector("html").style.overflowY = bool ? "unset" : "hidden";
  }
}

export default Views;
