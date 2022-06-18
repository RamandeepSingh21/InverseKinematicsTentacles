const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.height = 600;
canvas.width = 600;

let count = 50;
let mousePosition = new Vector2(0 , 0);

canvas.addEventListener("mousemove", function(e) { 
    var cRect = canvas.getBoundingClientRect();        
    var canvasX = Math.round(e.clientX - cRect.left);  
    var canvasY = Math.round(e.clientY - cRect.top);
    mousePosition.SetVector(canvasX, canvasY);
});

let tentacles = [];
let targets = [];

Start();
GameLoop();

function Start(){

    for(let i=0;i< count;i++){

        let color = {r: Math.random() * 255, g : Math.random() * 255, b : Math.random() * 255};
        tentacles[i] = new Tentacle(new Vector2(canvas.width/2, canvas.height/2), 10, 25, 10, color);
        targets[i] = new Particle(canvas.width/2, canvas.height/2, 2);

        targets[i].SetBoundries(0, canvas.width, 0, canvas.height);
        targets[i].SetAlpha(1);
        targets[i].SetColor(255, 255, 255);
        targets[i].SetMaxSpeed(10);
        targets[i].AddForce(Vector2.Multiply(5, new Vector2(-1 + Math.random() * 2, -1 + Math.random() * 2)));
    }
}

function GameLoop(){

    ctx.fillStyle = 'rgb(0 ,0 ,0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    targets.forEach(target => {

        target.Update();
        target.BounceWithinBoundries();
        target.Show(ctx);
    })

    for(let i=0;i < count;i++){

        tentacles[i].GrabTarget(targets[i].position);
        tentacles[i].Show(ctx);
    }

    requestAnimationFrame(GameLoop);
}