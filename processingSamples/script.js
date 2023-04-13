import * as s1 from "./sketches/InteractiveObjects.js"
import * as s2 from "./sketches/CirclesAroundCircle.js"
import * as s3 from "./sketches/MirroredDrawing.js"
import * as s4 from "./sketches/Orbit.js"
import * as s5 from "./sketches/ShakingCircle.js"
import * as s6 from "./sketches/Graphics.js"

let sketch = new p5(s1.main)

function changeSketch(e){
    console.log(e)
    sketch.remove()
    switch(e.target.innerText){
        case "InteractiveObjects":
            sketch = new p5(s1.main)
        break
        case "CirclesAroundCircle":
            sketch = new p5(s2.main)
        break
        case "MirroredDrawing":
            sketch = new p5(s3.main)
        break
        case "Orbit":
            sketch = new p5(s4.main)
        break
        case "ShakingCircle":
            sketch = new p5(s5.main)
        break
        case "Graphics":
            alert("Might take some time")
            sketch = new p5(s6.main)
        break
        default:
            sketch = new p5(s1.main)
        break
    }
}   
window.changeSketch = changeSketch
window.cockussky = 34