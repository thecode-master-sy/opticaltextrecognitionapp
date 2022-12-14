import {Dom, DragAndDrop, animate, checkFileType} from '../classes/utilityfunctions.js';

/* handling the choosing of files*/
const dom = new Dom();

let element = dom.select('.choose-files');

const hidden = dom.select('.hidden-input');

const form = dom.select('.form');

dom.preventDefault(form);

dom.clickHidden(hidden, element);


/* drag and drop functionality*/
const zone = dom.select('.drop-zone');

const draganddrop = new DragAndDrop();

draganddrop.dragover(zone);

draganddrop.drop(zone, hidden);

