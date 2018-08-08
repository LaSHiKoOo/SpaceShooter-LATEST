class Bullet{
    constructor(id,x,y){
        this.bulletTexture = PIXI.Texture.fromImage('/img/bullet.png');
        this.bullet = new PIXI.Sprite(this.bulletTexture);
        this.bullet.anchor.x = 0.5;
        this.bullet.anchor.y = 0.5;
        this.bullet.position.x = x;
        this.bullet.position.y = y;
        this.bullet.bulletSpeed = 5;
        this.bullet.shooterID = id;
    }

    destroy(){
        stage.removeChild(this.bullet);
    }
}