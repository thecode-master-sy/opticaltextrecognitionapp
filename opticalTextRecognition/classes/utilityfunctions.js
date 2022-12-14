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

	drop(zone, inputElement){
		zone.addEventListener('drop', (e)=>{
			e.preventDefault();
			//let files;
			if(e.dataTransfer.files.length){
				inputElement.files = e.dataTransfer.files;

				//files = inputElement.files;
			}

			console.log(inputElement.files)

		})
	}

	preview(){

	}

	
}

export function animate(object){

}

export function checkFileType(filename){
	const ext = filename.split(".");
	const fileExt = ext[ext.length - 1];

	//check if the file contains required ext

	let reqExt = ['jpg', 'jpeg', 'png'];

	if (!reqExt.includes(fileExt)) {
		let error = "cant preview this file type!!";
		return error;
	}
}