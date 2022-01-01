document.querySelectorAll('.plant').forEach(plant=> {
	plant.onpointerdown = pointerDrag;
	plant.addEventListener('dblclick', evt => onDoubleClick(evt));
})
function onDoubleClick(e){
	// console.log(e.target.style.zIndex)
	let zindex = e.target.style.zIndex
	if (zindex === '2'){
		e.target.style.zIndex = '3'
	} else {
		e.target.style.zIndex = '2'
	}
	// e.target.style.zIndex = '2';
	// console.log(e.target.style.zIndex)
}

//set 4 positions for positioning on the screen
let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
// function dragElement() {
// 	terrariumElement.onpointerdown = pointerDrag;
// }

let terrariumElement;


function pointerDrag(e) {
	terrariumElement = e.target
	e.target.style.zIndex = '4';
	console.log(e.target.style.zIndex)
	e.preventDefault();
	// console.log(e);
	pos3 = e.clientX;
	pos4 = e.clientY;
    document.onpointermove = elementDrag;
    document.onpointerup = stopElementDrag;
}

function elementDrag(e) {
	pos1 = pos3 - e.clientX;
	pos2 = pos4 - e.clientY;
	pos3 = e.clientX;
	pos4 = e.clientY;
	// console.log(pos1, pos2, pos3, pos4);
	terrariumElement.style.top = terrariumElement.offsetTop - pos2 + 'px';
	terrariumElement.style.left = terrariumElement.offsetLeft - pos1 + 'px';
}

function stopElementDrag(e) {
	e.target.style.zIndex = '3'
	document.onpointerup = null;
	document.onpointermove = null;
}