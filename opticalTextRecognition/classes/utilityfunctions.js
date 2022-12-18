export class Dom {
	select(id){
		let element = document.querySelector(id);

		return element;
	}

	clickHidden(hidden, clicker){
		clicker.addEventListener('click', ()=>{
			hidden.click();
		})
	}

	preventDefault(form){
		form.addEventListener('submit', (e)=>{
			e.preventDefault();
		})
	}
	
}

export class DragAndDrop{

	dragover(zone){
		zone.addEventListener('dragover', e=>{
			e.preventDefault();
		})
	}

	dragend(zone){
		zone.addEventListener('dragend', (e)=>{
			e.preventDefault();
		})
	}

	drop(data, inputElement){

		let files;
		if(data.length){
			inputElement.files = data;

			files = inputElement.files;
		}

		return files;

	}

	preview(){

	}

	
}

export class Animate{
	variantOne(objects, callback = false){
		let startPoint = 0;
		const endPoint = 100;
		const speed = 20;
		
		objects.roundedDownloader.classList.remove('animate');
		objects.imgIcon.src = "../assets/icons/image.svg";

		let done = false;
		const progress = setInterval(()=>{
			startPoint++

			objects.roundedDownloader.style.background = `conic-gradient(#6987f8 ${startPoint * 3.6}deg, #ededed 0deg)`;

			if(startPoint == endPoint){
				objects.imgIcon.src = "../assets/icons/tick.svg";
                const successDisplay = objects.successDisplay;
                successDisplay.classList.replace('clr-primary-red', 'clr-primary-green');
                successDisplay.textContent = 'we are ready to ocr!!';
				if(callback){
					callback();
				}
				clearInterval(progress);
			}
		}, speed)

		return endPoint;
	}

	variantTwo(){
		
	}
}

export function checkFileType(filename){
	const ext = filename.split(".");
	const fileExt = ext[ext.length - 1];

	//check if the file contains required ext

	let reqExt = ['jpg', 'jpeg', 'png'];

	if (!reqExt.includes(fileExt)) {
		const error = "only jpg, jpeg, png images are allowed!!";
		return error;
	}
}