const canvas=document.querySelector('.canvas');
const wiper = document.querySelector('#wiper');
const toggler = document.querySelector('#toggler');
const gridNum = document.querySelector('#grid-number');
const gridder = document.querySelector('#gridder');
let pen = 0;
let length = 3;
let pixels = document.querySelectorAll('.pixel');
const penFunctions = [switchToDrawing,switchToErasing];

function regridCanvas(){
    length = gridNum.value;
    console.log("length: "+length);
    gridCanvas();
    pixels = document.querySelectorAll('.pixel');
    penFunctions[pen]();
}

function toggleFunctions(e){
    pen = ++pen%penFunctions.length
    penFunctions[pen]();
}

toggler.addEventListener('click',toggleFunctions);

wiper.addEventListener('click',function(e){
    pixels.forEach(function(e){
        e.classList.remove('colored');
    })
});


function gridCanvas(){
    clearBoard();
    canvas.style.gridTemplateColumns ='repeat('+length+',1fr)';
    for (i = 0; i < length*length; i++){
        newDiv = document.createElement('div');
        newDiv.classList.add('pixel');
        canvas.appendChild(newDiv);
        console.log("added div");
    }
    console.log("gridden up");
}


function draw(e){
    e.target.classList.add('colored');   
}

function erase(e){
    e.target.classList.remove('colored');   
}

function switchToDrawing(){
    toggler.textContent = "Erase";
    pixels.forEach(function(e){
        e.removeEventListener('mouseover',erase)
        e.addEventListener('mouseover',draw)
        console.log("going through this;");
    });        
}

function switchToErasing(){
    toggler.textContent = "Draw";
    pixels.forEach(function(e){
        e.removeEventListener('mouseover',draw);
        e.addEventListener('mouseover',erase)
    });        
}

pixels.forEach(function(e){
    e.addEventListener('mouseover',draw)
});

function eraseBoard(){
    pixels.forEach(function(e){
        e.classList.remove("colored");
    })
}

function clearBoard(){
    while (canvas.firstChild){
        canvas.removeChild(canvas.firstChild);
    }    
}

gridder.addEventListener('click',regridCanvas);