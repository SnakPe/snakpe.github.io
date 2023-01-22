onload = generateGrid
let grid = []
let mouseDown = false;

const CNWYS_RULE=[[false,false,false,true,false,false,false,false,false],[false,false,true,true,false,false,false,false,false]]
let rules = [CNWYS_RULE]

function generateGrid(){
    let gridElement = document.getElementById("grid")
    gridElement.onmouseup = gridElement.onmouseleave = () => mouseDown = false
    for(let y = 0; y < 70; y++){
        let row = document.createElement("div");
        row.id = "row"
        grid.push([])
        for(let x = 0; x < 70;x++){
            let cell = new Cell(y,x)
            row.append(cell.element)
            grid[y].push(cell)
        }
       gridElement.append(row)
    }
}

function updateGrid(rule){
    let newGrid = []
    for(let y = 0; y < 70; y++){
        newGrid.push([])
        for(let x = 0; x < 70;x++){
            newGrid[y].push(rules[0][grid[y][x].isAlive?1:0][countNeighbours(y,x)])
        }
    }
    for(let y = 0; y < 70; y++){
        for(let x = 0; x < 70;x++){
            if(newGrid[y][x] != grid[y][x].isAlive)grid[y][x].changeStatus()
        }
    }
}
/**
 * 
 * @param {Number} y  
 * @param {Number} x 
 * @returns {Number} active cells around cell
 */
function countNeighbours(y,x){
    let neighbours = 0
    for(let i = y-1; i <= y+1; i++){
        for(let j = x-1; j <= x+1; j++){
            if(!(i==y && j==x) && (i>=0 && i<70) && (j>=0 && j<70) && grid[i][j].isAlive)neighbours++
        }
    }
    return neighbours
}

var intervalCode = 0
onkeydown = (event) => {
    if(event.code == "Space"){
        if(intervalCode > 0){
            clearInterval(intervalCode)
            intervalCode = 0
        }
        else intervalCode = setInterval(updateGrid,500)
    }
}
/**
 * cock
 */
 class Cell{
    constructor(y,x){
        this.x = x
        this.y = y 
        this.isAlive = false
        this.rule = [[],[]]
        this.element = document.createElement("div")
        this.element.id = "cell"
        this.element.onmouseenter = () => {if(mouseDown)this.changeStatus()}
        this.element.onmousedown = () => {mouseDown = true;this.changeStatus()}
    }
    changeStatus(){
        this.isAlive = !this.isAlive
        if(this.isAlive)this.element.style.backgroundColor = "yellow";
        else this.element.style = "";
    }
}
