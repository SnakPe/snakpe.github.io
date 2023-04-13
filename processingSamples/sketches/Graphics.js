export const main = f => {
    let x, y;

    let moveXPos = 0;
    let moveYPos = 0;//with these 2 integers, you can move the picture of the pattern along the x- and y-axis
    let size = 1; //to zoom in/out !USING ANY NUMBER THATS SMALLER THAN 1 CAN MAKE THIS CODE TAKE SUPER LONG TO RUN! dont do it (using numbers bigger than 1 has the opposite effect)

    let formula; // used to change pattern

    let sensitivitySlider = f.createInput("Sensitivity","range")
    let sliderText = f.createDiv("Sensitivity")
    let refresh = undefined
    
    let sizeSlider = f.createInput("Size","range")
    let sliderText2 = f.createDiv("Size: " + sizeSlider.value())

    let xPosInput = f.createInput("x-c")
    let yPosInput = f.createInput("y-c")
    let positionSubmitButton = f.createInput("Submit","Button")

    let formulaInput = f.createInput("Type Formula")
    let formulaSubmitButton = f.createInput("Submit","Button")

    let pixelCount; // amount of pixels that need to be "painted"
    let  colorRange = 0; // used to decide how every point is coloured

    f.setup = function() {
        window.cock = formula
        f.frameRate(2147483647);
        f.smooth();
        f.createCanvas(700,700);
        f.background(255);
        f.rectMode(f.CENTER);

        formula = "x+y"

        try{
            f.strokeWeight(size)
        }catch(e){
            console.log(e)
        }

        pixelCount = f.width*f.height/(size*size)

        let canvasPos = [this.canvas.getBoundingClientRect().x,this.canvas.getBoundingClientRect().y]

        sensitivitySlider.position(canvasPos[0]+f.width-100,canvasPos[1]+f.height+20)
        sensitivitySlider.size(100,20)
        sensitivitySlider.mouseReleased(() => {refresh = true})
        sizeSlider.elt.min = 0.1
        sizeSlider.elt.max = 10
        
        sliderText.position(canvasPos[0]+f.width-100,canvasPos[1]+f.height+10)

        sizeSlider.position(canvasPos[0]+f.width-100,canvasPos[1]+f.height+50)
        sizeSlider.size(100,20)
        sizeSlider.mouseReleased(() => {size = sizeSlider.value();refresh = true;})
        sizeSlider.elt.min = 0.1
        sizeSlider.elt.max = 10
        sizeSlider.elt.step = 0.1
        sizeSlider.value(1)
        //sizeSlider.elt.value -= .1
        sliderText2.position(canvasPos[0]+f.width-100,canvasPos[1]+f.height+40)

        xPosInput.position(canvasPos[0]+f.width-100,canvasPos[1]+f.height+80)
        xPosInput.size(30,20)
        yPosInput.position(canvasPos[0]+f.width-66,canvasPos[1]+f.height+80)
        yPosInput.size(30,20)
        positionSubmitButton.position(canvasPos[0]+f.width-33,canvasPos[1]+f.height+80)
        positionSubmitButton.mousePressed(() => {moveXPos = xPosInput.value(); moveYPos = yPosInput.value(); refresh = true})

        formulaInput.value(formula)
        formulaInput.position(canvasPos[0]+0,canvasPos[1]+f.height-20)
        formulaInput.size(100,20)
        formulaSubmitButton.position(formulaInput.x+formulaInput.width+10,formulaInput.y)
        formulaSubmitButton.mousePressed(() => {f.setFormula(formulaInput.value())})
    }
    f.setFormula = function(newFormula){
        newFormula = "0+" + newFormula.replaceAll(";","")
        try{
            eval(newFormula)
            refresh = true
            formula = newFormula
        }catch(e){

        }
    }
    f.draw = function() {
        sliderText2.elt.innerText = "Size: " + sizeSlider.elt.value + (sizeSlider.elt.value < 1 ? " Warning: Takes even longer" : "")
        sliderText.elt.innerText = "Sensitivity: " + sensitivitySlider.elt.value/100
        
        if(refresh == undefined || refresh == true){
            if(typeof(eval(formula)) != "number")return
            x = moveXPos
            y = moveYPos
            f.background(0)
            refresh = false
            for(x = f.width;x > 0; x--){
                for(y = f.height;y > 0;y--){
                    //f.updateFormula()
                    if (eval(formula) > colorRange) colorRange = eval(formula) // instead of using the highest value of the formula, it can also be helpful to just experiment
                }
            }
            while ((x - moveXPos)*(y - moveYPos) <= pixelCount/(size*size)) {
                
                //f.updateFormula()

                f.colorMode(f.HSB, ((1-sensitivitySlider.value()/100)*colorRange), 100, 100)
                
                f.stroke(eval(formula) % ((1-sensitivitySlider.value()/100)*colorRange), 100, 100)
                f.fill(eval(formula) % ((1-sensitivitySlider.value()/100)*colorRange), 100, 100)
                f.rect((x-moveXPos)*size, (y-moveYPos)*size,size,size)

                x++;
                if (x-moveXPos > f.width/size) {
                    y++
                    x = 0
                }
            }
        }
    }
    
}

