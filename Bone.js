class Bone{

    constructor(boneBase, boneLength, boneForward, boneWidth, color){

        this.boneBase = boneBase;
        this.boneLength = boneLength;
        this.boneForward = boneForward;
        this.boneTip = Vector2.Add(boneBase, Vector2.Multiply(boneLength, boneForward));

        this.boneWidth = boneWidth;
        this.color = color;
    }

    GrabTarget(target){

        this.boneForward = Vector2.Subtract(this.boneBase, target);
        this.boneForward.Normalize();
        this.boneTip.SetVector(target.x, target.y);
        this.boneBase = Vector2.Subtract(Vector2.Multiply(this.boneLength, this.boneForward), this.boneTip);
    }

    MoveBoneBase(position){

        this.boneBase.SetVector(position.x, position.y);
        this.boneTip = Vector2.Add(this.boneBase, Vector2.Multiply(this.boneLength, this.boneForward));
    }

    Show(ctx){

        ctx.lineWidth = this.boneWidth;
        ctx.strokeStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;        
        ctx.beginPath();
        ctx.moveTo(this.boneBase.x, this.boneBase.y);
        ctx.lineTo(this.boneTip.x, this.boneTip.y);
        ctx.stroke();
    }
}