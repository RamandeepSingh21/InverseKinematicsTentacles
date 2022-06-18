class Tentacle{

    constructor(position, size, lengthPerBone, baseWidth, color){

        this.position = position;
        this.size = size;
        this.baseWidth = baseWidth;
        this.color = color;

        this.lengthPerBone = lengthPerBone;        
        this.bones = [];

        this.bones[0] = new Bone(this.position, this.lengthPerBone, new Vector2(Math.random(), Math.random()), 1, this.color);
        for(let i=1;i<this.size;i++){

            let t = (this.size - i)/this.size;
            let w = this.GetInterPolatedValue(this.baseWidth, 1, t);
            this.bones[i] = new Bone(this.bones[i-1].boneTip, this.lengthPerBone, new Vector2(Math.random(), Math.random()), w, this.color);
        }
    }

    GrabTarget(target){

        this.bones[0].GrabTarget(target);
        for(let i=1;i < this.size;i++){

            this.bones[i].GrabTarget(this.bones[i - 1].boneBase);
        }

        this.bones[this.size - 1].MoveBoneBase(this.position);
        for(let i=1;i<this.size;i++){

            this.bones[this.size - 1 - i].MoveBoneBase(this.bones[this.size - 1 - (i - 1)].boneTip);
        }
    }

    Show(ctx){

        this.bones.forEach(bone => {bone.Show(ctx)});
    }

    GetInterPolatedValue(a, b, t){

        return a + (b-a) * t;
    }
}