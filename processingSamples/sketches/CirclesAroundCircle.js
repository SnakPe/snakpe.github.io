
export var main = f => {
    f.setup = function(){
        f.createCanvas(700,700)
    }

    f.draw = function(){
        f.background(255);
        f.circle(f.width/2,f.height/2,200);1
        let circleNum = f.mouseX/49;
        for(let i = 1; i <= circleNum;i++){
            //the position of all the small circles relative to each other is calculated by 2PI*i / number of circles
            //the additional rotation of the circles is calculated by 
            f.circle(f.width/2 + 100*f.sin((f.PI*2*i/circleNum)+2*f.PI*f.mouseY/f.height), f.height/2 + 100*f.cos((f.PI*2*i/circleNum)+2*f.PI*f.mouseY/f.height), 40);
            
        }
    }
}