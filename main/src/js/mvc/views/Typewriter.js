import Views from "./Views.js";
import { SCRIPT, WRITING_SPEED_IN_MILLISECONDS } from "../../config.js";
class Typewriter extends Views {
  addHandler() {
    this.writeScript(SCRIPT);
  }

  writeScript(script) {
    const charArray = [];
    let i = 0;

    script.forEach((word) => {
      const typewriter = document.querySelector(".typewriter");

      const caret = document.querySelector(".typewriter__caret");

      const wordElement = document.createElement("label");

      wordElement.classList.add(`${word.at(0)}`);

      const insertedElement = typewriter.insertBefore(wordElement, caret);

      // make an array of characters of current word
      const chars = [...word.at(1).split()[0]];
      chars.forEach((char, i) => {
        charArray.push([char, insertedElement]);
      });
    });

    setInterval(() => {
      if (!charArray[i]) {
        clearInterval(1);
        return;
      }
      charArray.at(i).at(1).textContent += charArray.at(i).at(0);
      i++;
    }, WRITING_SPEED_IN_MILLISECONDS);
  }
}

export default new Typewriter();