let resolution=16
let mode='draw'
let pixels=[]
let color=""
let isDrawing=false
const div=document.querySelector(".container")
div.setAttribute('draggable', 'false');

generateGrid(16)

document.addEventListener("pointerenter", (e) => {
    if (!isDrawing) return;
    if (e.target.classList.contains("pixel")) {
        paintPixel(e.target)
    }
},true);

document.addEventListener("pointerup", () => {
    isDrawing = false;
});

document.addEventListener("pointercancel", () => {
    isDrawing = false;
});

document.addEventListener("pointerleave", () => {
    isDrawing = false;
});

div.addEventListener('touchstart', e => {
  e.preventDefault();
  isDrawing = true;
  paintAtTouch(e);
});

div.addEventListener('touchmove', e => {
  e.preventDefault();
  if (!isDrawing) return;
  paintAtTouch(e);
});

div.addEventListener('touchend', e => {
  e.preventDefault();
  isDrawing = false;
});

function paintAtTouch(e) {
  for (let touch of e.touches) {
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    if (el && el.classList.contains('pixel')) {
      paintPixel(el);
    }
  }
}


function generateGrid(resolution){
    div.innerHTML=""
    for(let i=1;i<=resolution;i++){
        const child=document.createElement("div")
        child.classList.add("child")
        child.setAttribute('draggable', 'false');
        div.appendChild(child)
        for(let j=1;j<=resolution;j++){
            const grandChild=document.createElement("div")
            child.appendChild(grandChild)
            grandChild.classList.add("pixel")
            grandChild.setAttribute('draggable', 'false');

            grandChild.addEventListener("pointerdown", (e) => {
                e.preventDefault();
                isDrawing = true;

                if (e.target.hasPointerCapture && e.target.hasPointerCapture(e.pointerId)) {
                    e.target.releasePointerCapture(e.pointerId);
                }
                paintPixel(e.target);
            });  

            grandChild.addEventListener("pointerenter", (e) => {
                if (isDrawing) {
                    paintPixel(e.target);
                }
            });

        }
    }
}

function paintPixel(pixel) {
    switch (mode) {
        case "rainbow":
            color = `rgb(${rand()},${rand()},${rand()})`
            pixel.style.backgroundColor = color
            break;
        case "erase":
            pixel.style.backgroundColor = "white"
            break;
        case "darken":
            color = window.getComputedStyle(pixel).backgroundColor;
            if (color === "rgba(0, 0, 0, 0)") {
                color = "rgb(255, 255, 255)"
            }
            color = color.replace("rgb(", "").replace(")", "");
            let parts = color.split(",");

            let r = Number(parts[0].trim());
            let g = Number(parts[1].trim());
            let b = Number(parts[2].trim());

            const newR = Math.max(0, Math.floor(r - r * 0.1));
            const newG = Math.max(0, Math.floor(g - g * 0.1));
            const newB = Math.max(0, Math.floor(b - b * 0.1));

            pixel.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
            break;
        case "draw":
            pixel.style.backgroundColor = "black"
            break;
    }
}


const btnNew=document.querySelector("#new")
btnNew.addEventListener("click",()=>{
    while(true){
    let input= prompt("How many square per side? (doen't exceed 100)")
    if(input===null){return}
    resolution=Number(input)
    if(!isNaN(resolution) && resolution>0 && resolution<=100){break;}
    }
    alert(`Generating grid with ${resolution} per line`)
    generateGrid(resolution)
})

const btnNormal=document.querySelector("#normal")
btnNormal.addEventListener("click",()=>{mode="draw"})

const btnDark=document.querySelector("#dark")
btnDark.addEventListener("click",()=>{mode='darken'})

const btnRnbw=document.querySelector("#rainbow")
btnRnbw.addEventListener("click",()=>{mode='rainbow'})

const btnErase=document.querySelector("#erase")
btnErase.addEventListener("click",()=>{mode='erase'})

const btnEraseAll=document.querySelector("#eraseAll")
btnEraseAll.addEventListener("click",()=> generateGrid(resolution))

function rand(){
    return Math.floor(Math.random()*256+1)
}
