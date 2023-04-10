export const main = f => {

    let x = (f.random(700)) // X-Position of cirle
    let y = (f.random(700)) // Y-Position of cirle
    let ranNumbX = 0          // "random Number X"
    let ranNumbY = 0          // "random Number Y"
    let s = 6                 // Speed of circle

    f.setup = function(){
        f.createCanvas(700,700)
        f.ellipseMode(f.CENTER)
        f.fill(0,255,0,70)
        f.noStroke()
        f.smooth()
        f.frameRate(2147483647)
    }

    f.draw = function(){
        f.background(255)
        ranNumbX = (f.random(-s,s))
        ranNumbY = (f.random(-s,s))
        x += ranNumbX
        y += ranNumbY
        f.ellipse(x,y,200,200)
    }
}