class Enemy1 extends Ship{
    constructor(txt,id){
        super(txt,id);
        this.ship.anchor.x = 0.5;
        this.ship.anchor.y = 0.5;
        this.ship.position.x = Math.round(Math.random() * ( 420 - 30 ) + 30 );
        this.ship.position.y = 100;
        this.enemySpeed = 2;
        this.canShoot = false;
        this.bullets = [];
    }

    move(){
        var x = this.ship.position.x;
        var y = this.ship.position.y;

        if(!this.destroyed){
            y += this.enemySpeed;
            super.move(x,y);
        }
    }

    destroy(){
        super.destroy();
    }
}