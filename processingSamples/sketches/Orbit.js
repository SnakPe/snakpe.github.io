export const main = f => {
    let circleNum = 5;
    let count = 0;
    f.setup = function() {
        f.createCanvas(700,700)
    }

    f.draw = function() {
        f.background(255);


        

        
        for(let i = 1; i <= circleNum;i++){
            //the position of all the small circles relative to each other is calculated by 2PI*i / number of circles
            //the count variable adds rotation
            //the if statement chacks if the "moons" are behind the "planet" 
            if(f.cos(count + f.PI*2*i/circleNum + f.mouseY/f.height)<=0){
                f.circle(f.width/2 + 160*f.sin(count + f.PI*2*i/circleNum + f.mouseX/f.height), f.height/2 + 160*f.cos(count + f.PI*2*i/circleNum + f.mouseY/f.height),40)
            }
            
        }

        f.stroke(125)
        f.fill(170)
        f.circle(f.width/2,f.height/2,200)
        f.stroke(0)
        f.fill(255)
        for(let i = 1; i <= circleNum;i++){ 
            if(!(f.cos(count + f.PI*2*i/circleNum + f.mouseY/f.height)<=0)){
                f.circle(f.width/2 + 160*f.sin(count + f.PI*2*i/circleNum + f.mouseX/f.height), f.height/2 + 160*f.cos(count + f.PI*2*i/circleNum + f.mouseY/f.height),40)
            }
            
        }
        count+= 0.01;
        if(count > 2*f.PI) count = 0
    }

}