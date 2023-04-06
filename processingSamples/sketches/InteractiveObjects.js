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
        if(mouseX > this.x-this.diameter/2 && mouseX < this.x+this.diameter/2 && mouseY > this.y-this.diameter/2 && mouseY < this.y+this.diameter/2){
            //xVel = (1/(x+diameter/2-mouseX)*diameter/2)/2;
            this.xVel = (abs(this.x-mouseX) > 3) ? (1/(this.x-mouseX))*(this.diameter/4) : 0;
            //yVel = (1/(y+diameter/2-mouseY)*diameter/2)/2;
            //yVel = (1/(mouseY-(y+diameter)))*25;
            this.yVel = (abs(this.y-mouseY) > 3) ? (1/(this.y-mouseY))*(this.diameter/4) : 0;
        }
        rect(this.x, this.y, this.diameter, this.diameter);
        this.updatePosition();
    }
}


class PushableCircle extends PushableObj{
    
    constructor(x, y){
        super(x,y);
        this.radius = this.diameter/4;
    }
    touchesCircle(){
        let distanceVectorX = mouseX-this.x;
        let distanceVectorY = mouseY-this.y;
        let result = sqrt(sq(distanceVectorX)+sq(distanceVectorY)) <= this.radius;
        return result;
    }
    draw(){
        circle(this.x, this.y, this.diameter/2);
        if(this.touchesCircle()){
            let distanceVectorX = this.x-mouseX;
            let distanceVectorY = this.y-mouseY;
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
        fill(0,255,0);
        circle(this.x, this.y, this.diameter/2);
        fill(255);
        if(this.touchesCircle()){
            let distanceVectorX = mouseX-this.x;
            let distanceVectorY = mouseY-this.y;
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
        fill(0,0,255);
        circle(this.x, this.y, this.diameter/2);
        fill(255);
        if(this.touchesCircle()){
            let distanceVectorX = this.x-mouseX;
            let distanceVectorY = this.y-mouseY;
            this.xVel = distanceVectorX/2;
            this.yVel = distanceVectorY/2; 
        }
        if(this.x-this.radius < 0 || this.x+this.radius > width)this.xVel *= -1;
        if(this.y-this.radius < 0 || this.y+this.radius > height)this.yVel *= -1;
        this.updatePosition();
    }
}

let objects = [];
let selection = 0;
let onSelection = false;

function setup(){
    rectMode(CENTER);
    smooth();
    strokeWeight(1);
    createCanvas(700,700);
    //fullScreen();
}

function draw(){
    background(255);
    drawUI();
    objects.forEach(obj => {obj.draw()});
}

function drawUI(){
    rectMode(CORNER);
    rect(width-70,30,50,200);
    //Hover highlighting
    if(mouseX>width-70 && mouseX<width-20 && mouseY>30 && mouseY < 230){
        onSelection = true;
        noStroke();
        fill(175);
        //highlight square
        if(mouseY<80){
            rect(width-69,31,48,49);
            if(mouseIsPressed)selection = 0;
        }
        //highlight circle
        else if(mouseY<130){
            rect(width-69,80,48,49);
            if(mouseIsPressed)selection = 1;
        }
        //highlight following circle
        else if(mouseY<180){
            rect(width-69,130,48,49);
            if(mouseIsPressed)selection = 2;
        }
        //highlight bouncing circle
        else if(mouseY<230){
            rect(width-69,180,48,49);
            if(mouseIsPressed)selection = 3;
        }
    }
    else if(onSelection)onSelection=false;
    //selection highlighting
    noStroke();
    fill(50,255,0);
    rect(width-69,31+50*selection-(selection == 0 ? 0 : 1),48,50);

    //icons
    stroke(0);
    fill(255);
    rect(width-60,40,30,30);
    circle(width-45, 105, 30);
    circle(width-45, 155, 30);
    fill(0);
    text("f",width-45,155);
    fill(255);
    circle(width-45, 205, 30);
    fill(0);
    text("b",width-45,205);
    fill(255);
    rectMode(CENTER);
}

function mousePressed() {
    if(!onSelection){
        switch (selection) {
            case 0 :
                objects = append(objects,new PushableBlock(mouseX,mouseY));
            break;
            case 1 :
                objects = append(objects,new PushableCircle(mouseX,mouseY));
            break;
            case 2 :
                objects = append(objects,new PushableCircleFollowing(mouseX,mouseY));
            break;
            case 3 :
                objects = append(objects,new BouncingCircle(mouseX,mouseY));
            break;
        }
    }   
}