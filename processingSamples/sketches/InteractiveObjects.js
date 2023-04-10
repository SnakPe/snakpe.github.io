




export var main = f => {
    let objects = [];
    let selection = 0;
    let onSelection = false;

    class PushableObj{
        constructor(x, y){
            this.x = x;
            this.y = y;
            this.yVel = this.xVel = 0;
            this.yDrag = this.xDrag = 0.95;
            this.diameter = 100;
        }
        updatePosition(){
            this.y += this.yVel;
            this.x += this.xVel;
            this.xVel *= this.xDrag;
            this.yVel *= this.yDrag;
        }
    }

    class PushableBlock extends PushableObj{
        constructor(x, y){
            super(x,y);
        }
        draw(){
            if(f.mouseX > this.x-this.diameter/2 && f.mouseX < this.x+this.diameter/2 && f.mouseY > this.y-this.diameter/2 && f.mouseY < this.y+this.diameter/2){
                //xVel = (1/(x+diameter/2-f.mouseX)*diameter/2)/2;
                this.xVel = (f.abs(this.x-f.mouseX) > 3) ? (1/(this.x-f.mouseX))*(this.diameter/4) : 0;
                //yVel = (1/(y+diameter/2-f.mouseY)*diameter/2)/2;
                //yVel = (1/(f.mouseY-(y+diameter)))*25;
                this.yVel = (f.abs(this.y-f.mouseY) > 3) ? (1/(this.y-f.mouseY))*(this.diameter/4) : 0;
            }
            f.rect(this.x, this.y, this.diameter, this.diameter);
            this.updatePosition();
        }
    }
    
    
    class PushableCircle extends PushableObj{
        
        constructor(x, y){
            super(x,y);
            this.radius = this.diameter/4;
        }
        touchesCircle(){
            let distanceVectorX = f.mouseX-this.x;
            let distanceVectorY = f.mouseY-this.y;
            let result = f.sqrt(f.sq(distanceVectorX)+f.sq(distanceVectorY)) <= this.radius;
            return result;
        }
        draw(){
            f.circle(this.x, this.y, this.diameter/2);
            if(this.touchesCircle()){
                let distanceVectorX = this.x-f.mouseX;
                let distanceVectorY = this.y-f.mouseY;
                this.xVel = distanceVectorX/2;
                this.yVel = distanceVectorY/2;
            }
            this.updatePosition();
        }
    }
    
    class PushableCircleFollowing extends PushableCircle{
        constructor(x, y){
            super(x,y);
            
        }
        draw(){
            f.fill(0,255,0);
            f.circle(this.x, this.y, this.diameter/2);
            f.fill(255);
            if(this.touchesCircle()){
                let distanceVectorX = f.mouseX-this.x;
                let distanceVectorY = f.mouseY-this.y;
                this.xVel = distanceVectorX;
                this.yVel = distanceVectorY;
            }
            this.updatePosition();
        }
        
    }
    class BouncingCircle extends PushableCircle{
        constructor(x, y){
            super(x,y);
        }
        draw(){
            f.fill(0,0,255);
            f.circle(this.x, this.y, this.diameter/2);
            f.fill(255);
            if(this.touchesCircle()){
                let distanceVectorX = this.x-f.mouseX;
                let distanceVectorY = this.y-f.mouseY;
                this.xVel = distanceVectorX/2;
                this.yVel = distanceVectorY/2; 
            }
            if(this.x-this.radius < 0 || this.x+this.radius > f.width){
                this.xVel *= -1;
                if(this.x-this.radius < 0)this.x = 0 + this.radius;
                else this.x = f.width - this.radius;
            }
            if(this.y-this.radius < 0 || this.y+this.radius > f.height){
                this.yVel *= -1;
                if(this.y-this.radius < 0)this.y = 0 + this.radius;
                else this.y = f.height - this.radius;
            }
            this.updatePosition();
        }
    }
    f.setup = function(){
        f.rectMode(f.CENTER);
        f.smooth();
        f.strokeWeight(1);
        f.createCanvas(700,700);
    }
    f.draw = function(){
        f.background(255);
        f.drawUI();
        objects.forEach(obj => {obj.draw()});
    }
    f.drawUI = function(){
        f.rectMode(f.CORNER);
        f.rect(f.width-70,30,50,200);
        //Hover highlighting
        if(f.mouseX>f.width-70 && f.mouseX<f.width-20 && f.mouseY>30 && f.mouseY < 230){
            onSelection = true;
            f.noStroke();
            f.fill(175);
            //highlight square
            if(f.mouseY<80){
                f.rect(f.width-69,31,48,49);
                if(f.mouseIsPressed)selection = 0;
            }
            //highlight f.circle
            else if(f.mouseY<130){
                f.rect(f.width-69,80,48,49);
                if(f.mouseIsPressed)selection = 1;
            }
            //highlight following f.circle
            else if(f.mouseY<180){
                f.rect(f.width-69,130,48,49);
                if(f.mouseIsPressed)selection = 2;
            }
            //highlight bouncing f.circle
            else if(f.mouseY<230){
                f.rect(f.width-69,180,48,49);
                if(f.mouseIsPressed)selection = 3;
            }
        }
        else if(onSelection)onSelection=false;
        //selection highlighting
        f.noStroke();
        f.fill(50,255,0);
        f.rect(f.width-69,31+50*selection-(selection == 0 ? 0 : 1),48,50);
    
        //icons
        f.stroke(0);
        f.fill(255);
        f.rect(f.width-60,40,30,30);
        f.circle(f.width-45, 105, 30);
        f.circle(f.width-45, 155, 30);
        f.fill(0);
        f.text("f",f.width-45,155);
        f.fill(255);
        f.circle(f.width-45, 205, 30);
        f.fill(0);
        f.text("b",f.width-45,205);
        f.fill(255);
        f.rectMode(f.CENTER);
    }
    f.mousePressed = function(){
        if(!onSelection){
            switch (selection) {
                case 0 :
                    objects = f.append(objects,new PushableBlock(f.mouseX,f.mouseY));
                break;
                case 1 :
                    objects = f.append(objects,new PushableCircle(f.mouseX,f.mouseY));
                break;
                case 2 :
                    objects = f.append(objects,new PushableCircleFollowing(f.mouseX,f.mouseY));
                break;
                case 3 :
                    objects = f.append(objects,new BouncingCircle(f.mouseX,f.mouseY));
                break;
            }
        }
    }
}