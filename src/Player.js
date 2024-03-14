export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(data){
        let {scene,x,y,texture,frame} = data;
        super(scene.matter.world,x,y,texture,frame);
        this.scene.add.existing(this);

        const{Body, Bodies} = Phaser.Physics.Matter.Matter;
        var playerCollider = Bodies.circle(this.x,this.y,12,{
            isSensor:false,
            lable:'playerCollider'})
        
        var playerSensor = Bodies.circle(this.x,this.y,24,{
            isSensor:true,
            lable:'playerSensor'})

        var compoundBody = Body.create({
            parts:[playerCollider,playerSensor],
            frictionAir: 0.35,
        })
        this.setExistingBody(compoundBody);
        this.setFixedRotation();
    }

    static preload(scene){
        scene.load.atlas('male', 'assets/images/male.png', 'assets/images/male_atlas.json');
        scene.load.atlas('female', 'assets/images/female.png', 'assets/images/female_atlas.json');
        scene.load.animation('female_anim', 'assets/images/female_anim.json');
        scene.load.animation('male_anim', 'assets/images/male_anim.json');
    }

    get velocity(){
        return this.body.velocity;
    }

    update(){
        //player movement
        this.anims.play('idle_female', true);

        const speed = 2.5;
        let Playervelocity = new Phaser.Math.Vector2(0,0);
        if(this.inputKeys.left.isDown)
        {
            Playervelocity.x = -1;
        }
        else if(this.inputKeys.right.isDown)
        {
            Playervelocity.x = 1;
        }
        
        if(this.inputKeys.up.isDown)
        {
            Playervelocity.y = -1;
        }
        else if(this.inputKeys.down.isDown)
        {
            Playervelocity.y = 1;
        }

        Playervelocity.normalize();
        Playervelocity.scale(speed);
        this.setVelocity(Playervelocity.x,Playervelocity.y);
        if(Math.abs(this.velocity.x) >0.1 || Math.abs(this.velocity.y)>0.1)
        {
            if(Playervelocity.x < 0)
            {
                this.setFlipX(true);
            }
            else
            {
                this.setFlipX(false);
            }
            this.anims.play('walk_female', true,);
            
        } else {
            this.anims.play('idle_female', true);
        }



    }
}