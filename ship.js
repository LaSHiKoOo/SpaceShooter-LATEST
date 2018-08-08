class Ship{
    constructor(shipTxt,id,x,y){        
        this.shipTexture = shipTxt;
        this.ship = new PIXI.Sprite(this.shipTexture);
        this.ship.anchor.x = 0.5;
        this.ship.anchor.y = 0.5;
        this.ship.id = id;
        this.bullets = [];
        this.destroyed = false;
        this.playerScore = 0;
        this.playerLifes = 3;
    }

    move(x,y)
    {
        this.ship.position.x = x;
        this.ship.position.y = y;
    }

    collisionDetector(b)
    {
        var ab = this.ship.getBounds();
        var bb = b.getBounds();
        
        return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
    }

    shoot(){
        var bullet = new Bullet( this.ship.id , this.ship.position.x , this.ship.position.y );
        stage.addChild(bullet.bullet);
        this.bullets.push(bullet.bullet);
    }

    destroy()
    {
        stage.removeChild(this.ship);
        this.destroyed = true;
        this.removeBullets();
    }

    removeBullets()
    {
        for(var i=0; i<this.bullets.length; i++)
        {
            stage.removeChild(this.bullets[i]);
            this.bullets.splice(i,0);            
        }
    }

    moveBullets(vr)
    {
        for(var i=0; i<this.bullets.length; i++)
        {
            if( this.bullets[i].position.y > -15 && this.bullets[i].position.y < 815){
                this.bullets[i].position.y += this.bullets[i].bulletSpeed * vr;
            }else{             
                this.bullets[i].destroy();
                this.bullets.splice(i,1);
            }
        }
    }
}