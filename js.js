const btn=document.querySelector("button")
btn.addEventListener("click",()=>{
    let resolution=''
    while(true){
    let input= prompt("How many square per side? (doen't exceed 100)")
    if(input===null){return}
    resolution=Number(input)
    if(!isNaN(resolution) && resolution>0 && resolution<=100){break;}
    }
    alert(`Generating grid with ${resolution} per line`)
    generateGrid(resolution)
})
 

function generateGrid(resolution){
    div.innerHTML=""
    for(let i=1;i<=resolution;i++){
        const child=document.createElement("div")
        div.appendChild(child)
        child.style.display="flex"
        for(let j=1;j<=resolution;j++){
            const grandChild=document.createElement("div")
            child.appendChild(grandChild)
            grandChild.classList.add("pixel")
            grandChild.style.border="2px solid black"
        }
    }
    const pixels=document.querySelectorAll(".pixel")
    pixels.forEach(pixel => {
        pixel.addEventListener("mouseover",(e)=>{
            e.target.style.backgroundColor=`rgb(${rand()},${rand()},${rand()})`
        })
    });
}



const div=document.querySelector(".container")


generateGrid(16)

function rand(){
    return Math.floor(Math.random()*256+1)
}

