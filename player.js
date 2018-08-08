class Player extends Ship{
    constructor(txt,id){
        super(txt,id);
        this.ship.anchor.x = 0.5;
        this.ship.anchor.y = 0.5;
        this.ship.position.x = ( 450 - this.ship.getBounds().width ) / 2;
        this.ship.position.y = 800 - this.ship.getBounds().height;
        this.bullets = [];  
    }
    
    move(e){
        if( e.data.global.x < 450 && e.data.global.x > 0 && e.data.global.y > 0 && e.data.global.y < 800){
            super.move(e.data.global.x,e.data.global.y);
        }
    }
    
    shoot(){
        super.shoot();
    }

    destroy(){
        super.destroy();
    }

    moveBullets(){
        super.moveBullets(-1);
    }

}