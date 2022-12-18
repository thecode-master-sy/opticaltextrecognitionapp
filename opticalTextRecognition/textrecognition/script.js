import {Dom, DragAndDrop, checkFileType, Animate} from '../classes/utilityfunctions.js';

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


zone.addEventListener('drop', (e)=>{
    e.preventDefault();
    const files = draganddrop.drop(e.dataTransfer.files, hidden);
    
    if(files){
        const filename = files[0].name;
        const error = checkFileType(filename);

        if(error){
            const errorDisplay = dom.select('.error');

            errorDisplay.textContent = error;
        }else {
            const imgIcon = dom.select('.icon');
            const roundedDownloader = dom.select('.rounded-downloader');
            const successDisplay = dom.select('.error');

            const objects = {
                imgIcon: imgIcon,
                roundedDownloader: roundedDownloader,
                successDisplay: successDisplay
            }

            const animate = new Animate();
            animate.variantOne(objects);

            
        }
        

    }
})

/* if the user chooses files instead */
hidden.addEventListener('change', e =>{
    const file = hidden.files[0];
    let error = checkFileType(file.name);
    const preview = dom.select('.preview');
    const previewImage = dom.select('.preview__image');
    const cancel = dom.select('.cancel');

    if(error){
        let errorDisplay = dom.select('.error');

        errorDisplay.textContent = error;
    }else {
        const animate = new Animate();
        const roundedDownloader = dom.select('.rounded-downloader');
        const imgIcon = dom.select('.icon');
        const successDisplay = dom.select('.error')
        const objects = {
            roundedDownloader:roundedDownloader,
            imgIcon:imgIcon,
            successDisplay:successDisplay
        }
        let callback = function (){
            const reader = new FileReader();

            preview.style.display = "block";

            /* if the user cancels remove the preview*/
            cancel.addEventListener('click', e=>{
                preview.style.display = 'none';

                /*restore the upload to default*/
                successDisplay.textContent = '';
                imgIcon.src = '../assets/icons/arrow-up.svg';
                roundedDownloader.style.background = 'var(--clr-neutral-gray)';
                roundedDownloader.classList.add('animate');
            })

            reader.onload = () => {
                previewImage.src = reader.result;
            }

            reader.readAsDataURL(file);
        }
        const done = animate.variantOne(objects, callback);

        
        // const reader = new FileReader();

        // preview.style.display = "block";

        // reader.onload = () => {
        //     previewImage.src = reader.result;
        // }

        // reader.readAsDataURL(file);


    }
    

    
})

