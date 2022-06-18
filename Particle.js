class Particle{

    position = new Vector2(0, 0);
    acc = new Vector2(0, 0);
    velocity = new Vector2(0, 0);
    radius = 1;
    boundries = {xMin : 0, xMax : 0, yMin : 0, yMax : 0};
    maxVelocity = new Vector2(5, 5);
    maxSpeed = 1;
    permanentForce = new Vector2(0, 0);
    alpha = 1;
    color = {r: 0, g: 0, b : 0};
    constructor(x, y, radius){

        this.position.SetVector(x, y);
        this.radius = radius;
    }

    Show(ctx){

        ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
        ctx.globalAlpha = this.alpha;        
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    Update(){

        this.acc = Vector2.Add(this.acc, this.permanentForce);
        this.velocity = Vector2.Add(this.velocity, this.acc);        
        if(this.velocity.GetMagnitude() > this.maxSpeed){

            this.velocity.Normalize();
            this.velocity.x *= this.maxSpeed;
            this.velocity.y *= this.maxSpeed;
        }

        this.position = Vector2.Add(this.position, this.velocity);
        this.acc.SetVector(0, 0);
    }

    AddForce(force){

        this.acc = Vector2.Add(this.acc, force);
    }

    SetPermanentForce(force){

        this.permanentForce.SetVector(force.x, force.y);
    }

    StayWithinBoundries(){

        if(this.position.x > this.boundries.xMax) this.position.x = this.boundries.xMin;
        else if(this.position.x < this.boundries.xMin) this.position.x = this.boundries.xMax;
        if(this.position.y < this.boundries.yMin) this.position.y = this.boundries.yMax;
        else if(this.position.y > this.boundries.yMax) this.position.y = this.boundries.yMin;
    }

    BounceWithinBoundries(){

        if(this.position.x > this.boundries.xMax){

            this.position.x = this.boundries.xMax;
            this.velocity.x = -Math.abs(this.velocity.x);
        } else if(this.position.x < this.boundries.xMin){

            this.position.x = this.boundries.xMin;
            this.velocity.x = Math.abs(this.velocity.x);
        } 

        if(this.position.y < this.boundries.yMin){

            this.position.y = this.boundries.yMin;
            this.velocity.y = Math.abs(this.velocity.y);
        } else if(this.position.y > this.boundries.yMax){

            this.position.y = this.boundries.yMax;
            this.velocity.y = -Math.abs(this.velocity.y);
        } 
    }

    SetBoundries(xMin, xMax, yMin, yMax){

        this.boundries.xMin = xMin;
        this.boundries.xMax = xMax;
        this.boundries.yMin = yMin;
        this.boundries.yMax = yMax;

    }

    SetMaxVelocity(velocity){

        this.maxVelocity.SetVector(velocity.x, velocity.y);
    }

    SetMaxSpeed(maxSpeed){

        this.maxSpeed = maxSpeed;
    }

    SetAlpha(alpha){

        this.alpha = alpha;
    }

    SetColor(r, g, b){

        this.color.r = r;
        this.color.g = g;
        this.color.b = b;
    }
}