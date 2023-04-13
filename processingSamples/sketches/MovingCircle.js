export const main = f => {
    let x = (f.random(700)); // X-Position of cirle
    let y = (f.random(700)); // Y-Position of cirle
    let ranNumbX = 0;          // "random Number X"
    let ranNumbY = 0;          // "random Number Y"
    let s = 12;               // Speed of circle

    let colorb = 0; 
    let rise = 0.05;

    f.setup = function() {
        f.createCanvas(700,700);
        f.ellipseMode(f.CENTER);
        f.colorMode(f.HSB,255,255,255,255)
        f.smooth();
        f.frameRate(999999999);
        f.background(255)
    }

    f.draw = function() {
        if (colorb > 254) {
          colorb = 0;
        }
        colorb += rise
        f.fill(colorb, 255,255,5)
        f.stroke(0,0,0,100)
        ranNumbX = (f.random(-s,s));
        ranNumbY = (f.random(-s,s));
        if (x + ranNumbX > 0 && x + ranNumbX < f.width && y + ranNumbY > 0 && y + ranNumbY < f.height) {    // So the circle will stay in the window
          x = x + ranNumbX;
          y = y + ranNumbY;
        }
      f.ellipse(x,y,200,200);
    }
}