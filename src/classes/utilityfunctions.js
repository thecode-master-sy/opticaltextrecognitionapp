export class Dom {
  select(id) {
    let element = document.querySelector(id);

    return element;
  }

  clickHidden(hidden, clicker) {
    clicker.addEventListener("click", () => {
      hidden.click();
    });
  }

  preventDefault(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
}

export class DragAndDrop {
  dragover(zone) {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
  }

  dragend(zone) {
    zone.addEventListener("dragend", (e) => {
      e.preventDefault();
    });
  }

  drop(data, inputElement) {
    let files;
    if (data.length) {
      inputElement.files = data;

      files = data[0];
    }

    return files;
  }

  preview() {}
}

export class Animate {
  variantOne(objects, callback = false) {
    let startPoint = 0;
    const endPoint = 100;
    const speed = 20;

    objects.roundedDownloader.classList.remove("animate");
    objects.icons.arrowIcon.classList.remove("show");
    objects.icons.tickIcon.classList.remove("show");
    objects.icons.imgIcon.classList.add("show");

    let done = false;
    const progress = setInterval(() => {
      startPoint++;

      objects.roundedDownloader.style.background = `conic-gradient(#6987f8 ${
        startPoint * 3.6
      }deg, #ededed 0deg)`;

      objects.btnOcr.classList.remove("show");
      if (startPoint == endPoint) {
        objects.icons.imgIcon.classList.remove("show");
        objects.icons.tickIcon.classList.add("show");
        const successDisplay = objects.successDisplay;
        successDisplay.style.color = "var(--clr-primary-green)";
        successDisplay.textContent = "we are ready to ocr!!";

        if (callback) {
          setTimeout(callback, 800);
        }

        setTimeout(() => {
          successDisplay.textContent = "";
        }, 1000);

        clearInterval(progress);
      }
    }, speed);

    return true;
  }

  variantTwo() {}
}

export function checkFileType(filename) {
  const ext = filename.split(".");
  const fileExt = ext[ext.length - 1];

  //check if the file contains required ext

  let reqExt = ["jpg", "jpeg", "png"];

  if (!reqExt.includes(fileExt)) {
    const error = "only jpg, jpeg, png images are allowed!!";
    return error;
  }
}
