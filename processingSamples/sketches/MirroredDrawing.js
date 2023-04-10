export const main = f => {
    let linesWithBorders = []    

    f.addLineWithBorder = function(x1,y1,x2,y2){
        linesWithBorders.push([x1,y1,x2,y2])
    }
    f.drawLinesWithBorder = function(){
        f.stroke(0)
        f.strokeWeight(15)
        linesWithBorders.forEach((line) => {f.line(line[0],line[1],line[2],line[3])})
        f.stroke(255)
        f.strokeWeight(10)
        linesWithBorders.forEach((line) => {f.line(line[0],line[1],line[2],line[3])})
    }
    
    f.setup = function(){
        f.createCanvas(700,700)
        f.frameRate(2147483647)
        f.smooth()
    }

    f.draw = function(){
        f.background(255)
        if(f.mouseIsPressed){
            f.stroke(255,0,0)
            f.strokeWeight(1)
            f.line(0,f.height/2,f.width,f.height/2)
            f.line(f.width/2,0,f.width/2,f.height)
            f.addLineWithBorder(f.mouseX,f.mouseY,f.pmouseX,f.pmouseY)
            f.addLineWithBorder(f.width-f.mouseX,f.mouseY,f.width-f.pmouseX,f.pmouseY)
            f.addLineWithBorder(f.mouseX,f.height-f.mouseY,f.pmouseX,f.height-f.pmouseY)
            f.addLineWithBorder(f.width-f.mouseX,f.height-f.mouseY,f.width-f.pmouseX,f.height-f.pmouseY)
          }
          this.drawLinesWithBorder()
    }
}   