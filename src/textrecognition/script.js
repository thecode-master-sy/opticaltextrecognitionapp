import {
  Dom,
  DragAndDrop,
  checkFileType,
  Animate,
} from "../classes/utilityfunctions.js";

import Tesseract from "tesseract.js";

import { EventEmitter } from "events";

/* handling the choosing of files*/
const dom = new Dom();

let element = dom.select(".choose-files");

const hidden = dom.select(".hidden-input");

const form = dom.select(".form");

dom.preventDefault(form);

dom.clickHidden(hidden, element);

/* previewing of file*/
const preview = dom.select(".preview");
const previewImage = dom.select(".preview__image");
const cancel = dom.select(".cancel");
const btnOcr = dom.select(".btn--ocr");
const pursuade = dom.select(".error");

const imgIcon = dom.select(".icon--image");
const tickIcon = dom.select(".icon--tick");
const arrowIcon = dom.select(".icon--arrow-up");
const roundedDownloader = dom.select(".rounded-downloader");

cancel.addEventListener("click", (e) => {
  cancel.classList.remove("show");
  preview.classList.remove("show");
  btnOcr.classList.remove("show");
  pursuade.style.color = "var(--text-color)";
  pursuade.textContent = "please choose an image";

  setTimeout(() => {
    pursuade.textContent = "";
  }, 1200);
  //reset the rounded animation and image icon

  roundedDownloader.style.background = "var(--clr-neutral-gray)";
  roundedDownloader.classList.add("animate");
  tickIcon.classList.remove("show");
  imgIcon.classList.remove("show");
  arrowIcon.classList.add("show");
  previewImage.src = "";
});

/* drag and drop functionality*/
const zone = dom.select(".drop-zone");

const draganddrop = new DragAndDrop();

draganddrop.dragover(zone);

zone.addEventListener("drop", (e) => {
  e.preventDefault();
  let files = draganddrop.drop(e.dataTransfer.files, hidden);

  if (files) {
    const filename = files.name;
    const error = checkFileType(filename);

    if (error) {
      const errorDisplay = dom.select(".error");
      errorDisplay.style.color = "var(--clr-primary-red)";
      errorDisplay.textContent = error;
    } else {
      const successDisplay = dom.select(".error");

      const objects = {
        icons: {
          imgIcon: imgIcon,
          tickIcon: tickIcon,
          arrowIcon: arrowIcon,
        },
        roundedDownloader: roundedDownloader,
        successDisplay: successDisplay,
        btnOcr: btnOcr,
      };

      let callback = function () {
        const reader = new FileReader();

        reader.onload = () => {
          preview.classList.add("show");
          previewImage.src = reader.result;
          cancel.classList.add("show");
          btnOcr.classList.add("show");
        };

        //resolving this issue of interface blob

        reader.readAsDataURL(files);
      };

      const animate = new Animate();

      animate.variantOne(objects, callback);
    }
  }
});

/* if the user chooses files instead */
hidden.addEventListener("change", (e) => {
  let file = hidden.files[0];
  let error = checkFileType(file.name);

  if (error) {
    let errorDisplay = dom.select(".error");
    errorDisplay.style.color = "var(--clr-primary-red)";

    errorDisplay.textContent = error;
  } else {
    const animate = new Animate();
    const successDisplay = dom.select(".error");
    const objects = {
      icons: {
        imgIcon: imgIcon,
        tickIcon: tickIcon,
        arrowIcon: arrowIcon,
      },

      roundedDownloader: roundedDownloader,
      imgIcon: imgIcon,
      successDisplay: successDisplay,
      btnOcr: btnOcr,
    };
    let callback = function () {
      //console.log('this function is going to be called after one second')
      if (file) {
        const reader = new FileReader();

        reader.onload = () => {
          preview.classList.add("show");
          previewImage.src = reader.result;
          cancel.classList.add("show");
          btnOcr.classList.add("show");
        };

        reader.readAsDataURL(file);
      }
    };
    animate.variantOne(objects, callback);
  }
});

//initiate ocr when the user clicks on the ocr button

const ocrButton = dom.select(".btn--ocr");
const ocrTextPara = dom.select(".ocr--text--para");
const ocrCard = dom.select(".ocr--card");
const confidenceText = dom.select(".confidence");
const circularLoader = dom.select(".circular-loader");

ocrButton.addEventListener("click", (e) => {
  const reader = new FileReader();

  reader.onload = () => {
    Tesseract.recognize(reader.result, "eng", {
      logger: (message) => {
        confidenceText.textContent = message.status;
        ocrCard.classList.add("overlay");
        circularLoader.classList.add("animate");
      },
    }).then(({ data: { text, confidence } }) => {
      ocrCard.classList.remove("overlay");
      circularLoader.classList.remove("animate");

      if (confidence >= 80) {
        confidenceText.textContent = "very confident about this one";
        ocrTextPara.textContent = text;
      } else {
        confidenceText.textContent = "it seems like the image has no text";
        ocrTextPara.textContent = text;
      }

      //checking if the number of words exceeds the required amount
      if (ocrTextPara.offsetHeight > ocrCard.offsetHeight) {
        const seeMore = dom.select(".seeMore");

        seeMore.classList.add("show");
      } else {
        console.log("it is within the required characters");
      }

      setTimeout(() => {
        confidenceText.textContent = "";
      }, 1000);
    });
  };

  reader.readAsDataURL(hidden.files[0]);
});

//add a click to copy functionality

const copyIcon = dom.select(".copyIcon");
const copyIconContainer = dom.select(".copyIconContainer");
const tooltip = dom.select(".tooltip");

copyIcon.addEventListener("click", () => {
  navigator.clipboard
    .writeText(dom.select(".ocr--text--para").innerText)
    .then(function () {
      tooltip.textContent = "copied";
      setTimeout(() => {
        tooltip.textContent = "copy";
      }, 1200);
    });
});

//increase the click space incase of moblie
copyIconContainer.addEventListener("click", () => {
  navigator.clipboard
    .writeText(dom.select(".ocr--text--para").innerText)
    .then(function () {
      tooltip.textContent = "copied";
      setTimeout(() => {
        tooltip.textContent = "copy";
      }, 1200);
    });
});
