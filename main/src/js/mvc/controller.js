import { lightTheme } from "./model.js"; // state.save, state.load
import LightThemeView from "./views/header/LightThemeView.js";
import Header from "./views/header/Header.js";
import MenuView from "./views/header/MenuView.js";
import Typewriter from "./views/Typewriter.js";
import Slider from "./views/Slider.js";
import ModalView from "./views/ModalView";
import {
  AJAX_CALL_TIMEOUT_SECONDS,
  FORM_API,
  OPEN_CONTACT_INFO_MARKUP,
} from "../config.js";
import footerView from "./views/footerView.js";

const controlTheme = function () {
  lightTheme.isActive = !lightTheme.isActive;
  lightTheme.isActive ? lightTheme.save() : lightTheme.delete();
  LightThemeView.enableLightTheme(lightTheme.isActive);
};

const controlFormSubmission = async function (formData) {
  // Fetch abortion
  const controller = new AbortController();
  const signal = controller.signal;

  const requestTimeout = function (seconds) {
    return new Promise((_, reject) =>
      setTimeout(() => {
        controller.abort();
        return reject(new Error("Request took too long."));
      }, seconds * 1000)
    );
  };

  // Send form to backend
  try {
    // Running promise in parallel
    const responsePromise = fetch(FORM_API, {
      method: "POST",
      body: formData,
      signal,
    });
    const response = await Promise.race([
      responsePromise,
      requestTimeout(AJAX_CALL_TIMEOUT_SECONDS),
    ]);

    if (response.status === 200) {
      this.formButtonStatus("sent");
    } else {
      throw new Error("POST request failed");
    }
  } catch (err) {
    this.formBtnShowErrorBtn();
    console.error(`🚨 ${err} 🚨`);
  }
};

const controlFooter = function () {};
const init = function () {
  if (lightTheme.load()) {
    lightTheme.isActive = !lightTheme.isActive;
    LightThemeView.enableLightTheme(lightTheme.isActive).toggleSwitch();
  }
  LightThemeView.addHandler(controlTheme);
  MenuView.addHandler();
  Header.addHandler();
  Typewriter.addHandler();
  Slider.addHandler();
  ModalView.addHandler(controlFormSubmission);

  // controlFormSubmission is passed in because it will be handled on one of the footer links
  // openContactMe is binded to itself so arguments can be passed into the function without calling it.
  footerView.addHandler(
    controlFooter,
    ModalView.openContactMe.bind(ModalView, controlFormSubmission),
    ModalView.openRegularWindow.bind(ModalView, OPEN_CONTACT_INFO_MARKUP)
  );
};

init();