var renderer = PIXI.autoDetectRenderer( 450, 800, { backgroundColor: 0x000000});

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

var playerTexture       = PIXI.Texture.fromImage('/img/spaceShip.png');
var enemy1Texture       = PIXI.Texture.fromImage('/img/enemy1.png');
var enemy2Texture       = PIXI.Texture.fromImage('/img/enemy2.png');
var buttonTexture       = PIXI.Texture.fromImage('/img/play-again.png');
var backgroundTexture   = PIXI.Texture.fromImage('/img/background.png');	

var enemy;
var ships = [];
var playerID = 111;
var enemyID = 112;
var anim;
var enem;

bac = new PIXI.extras.TilingSprite(backgroundTexture, 450, 800);
bac.position.x = 0;
bac.position.y = 0;
bac.tilePosition.x = 0;
bac.tilePosition.y = 0;

stage.addChild(bac);


var spaceShip = new Player(playerTexture,playerID);

ships.push(spaceShip);

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

var scoreStage = new PIXI.Graphics();  
scoreStage.beginFill(0x000000);  
scoreStage.drawRect(0,0,450,50);  
scoreStage.endFill();
stage.addChild(scoreStage);

var str = `Score: ${spaceShip.playerScore}   Lifes: ${spaceShip.playerLifes}`;
var txt = new PIXI.Text(str);

txt.style.fill =0xffffff;
txt.position.x = txt.getBounds().width / 2;
txt.position.y =  txt.getBounds().height / 2;

scoreStage.addChild(txt);

stage.addChild(spaceShip.ship);

stage.interactive = true;

stage.on("click", function(e){
    spaceShip.shoot();
    checkDamage( spaceShip.bullets );
});

stage.on("mousemove", function(e){
    spaceShip.move(e);
});
  

function gameFinished()
{

    var lastStage = new PIXI.Graphics();  
    lastStage.beginFill(0x000000);  
    lastStage.lineStyle(1, 0xffffff, 1)
    lastStage.drawRect(50,300,350,250);  
    lastStage.endFill();

    stage.addChild(lastStage);

    stage.interactive = false;

    
    var button = new PIXI.Sprite(buttonTexture);
    var scoreStr = `Your Score: ${spaceShip.playerScore}`;
    var scoreTxt = new PIXI.Text(scoreStr);


    scoreTxt.style.fill =0xffffff;
    scoreTxt.position.x = ( stage.getBounds().width - scoreTxt.getBounds().width )  / 2 ;
    scoreTxt.position.y =  lastStage.getBounds().y +  scoreTxt.getBounds().height ;

    button.buttonMode = true;

    button.anchor.set(0.5);

    button.position.x =  stage.getBounds().width  / 2 ;
    button.position.y =  scoreTxt.getBounds().y + txt.getBounds().height + 2 * button.getBounds().height ;
        
    button.interactive = true;

    lastStage.addChild(scoreTxt);
    lastStage.addChild(button); 
    
    button.on("click", function(e){

        console.log("shedis");
        lastStage.removeChild(scoreTxt);
        lastStage.removeChild(button); 
        stage.removeChild(lastStage);

        stage.interactive = true;
        spaceShip = new Player(playerTexture,playerID);
        stage.addChild(spaceShip.ship);
        ships.push(spaceShip);
        anim = requestAnimationFrame(animateEnemys);
        enem = window.setInterval(generateEnemy,2500);
    });

}

 animate(); 

 function animateEnemys(){
    for(var i=0; i<ships.length; i++)
    {
        if( ships[i].ship.id != spaceShip.ship.id && ships[i].destroyed == false )
        { 
            ships[i].move();

            if(ships[i].canShoot)
            {
                ships[i].moveBullets();
            }

            if(ships[i].ship.position.y > 850 )
            {
                ships[i].destroy();
            }

            checkDamage( ships[i].bullets );
        }else
        {
            ships.remove(ships[i]);
        }
    }
    
 }
 function animate()
 {  
    requestAnimationFrame(animate);
    anim = requestAnimationFrame(animateEnemys);
    
    updateScore();

    if(spaceShip.bullets.length)
    {
        spaceShip.moveBullets();
    }
    
    
    bac.tilePosition.y += 0.5;

    renderer.render(stage);

 }

function generateEnemy()
{
    var en = Math.round(Math.random());
    enemyID++;
    (en>0) ? enemy = new Enemy1(enemy1Texture,enemyID) : enemy = new Enemy2(enemy2Texture,enemyID);
    stage.addChild(enemy.ship);
    ships.push(enemy);
}

function resetBoard()
{
    for( var i=0; i<ships.length; i++ )
    {
        ships[i].destroy();
        ships.splice(i,1);
    }

    stage.addChild(spaceShip.ship);
    ships.push(spaceShip);

    spaceShip.destroyed = !spaceShip.destroyed;

    console.log(ships);
}

function PlayerAndBullet(bullets)
{
    for( var i=0; i<ships.length; i++ )
    {
        if( ships[i].ship.id != spaceShip.ship.id && spaceShip.destroyed == false )
        {
            for( var j=0; j< ships[i].bullets.length; j++)
            {      
                if(ships[i]){        
                    if( spaceShip.collisionDetector( ships[i].bullets[j] ) )
                    {
                        console.log("momartya");
                        if ( spaceShip.playerLifes > 0 ) 
                        {
                            spaceShip.destroy();
                            stage.removeChild(spaceShip.ship);
                            ships.remove(spaceShip);
                            spaceShip.playerLifes--;
                            resetBoard();
                         }else{
                            spaceShip.destroy();
                            stage.removeChild(spaceShip.ship);
                            ships.remove(spaceShip);
                            cancelAnimationFrame(anim);
                            clearInterval(enem);
                            gameFinished();
                        }
                    }
                }    
            }
        }        
    }
}


function EnemyAndBullet(bullets)
{
    for( var i=0; i<ships.length; i++ )
    {
        if( ships[i].ship.id != spaceShip.ship.id && spaceShip.destroyed == false )
        {
            for( var j=0; j< spaceShip.bullets.length; j++)
            {               
                if( ships[i].collisionDetector( spaceShip.bullets[j] ) )
                {
                    console.log("movartyi");
                    spaceShip.playerScore++;
                    spaceShip.bullets[j].destroy();
                    spaceShip.bullets.remove(spaceShip.bullets[j]);
                    ships[i].destroy();
                    ships.splice(i,1);
                }
            }
        }
    }
}


function PlayerAndEnemy(bullets)
{
    for( var i=0; i<ships.length; i++ )
    {
        if( ships[i].ship.id != spaceShip.ship.id && spaceShip.destroyed == false )
        {               
            if( spaceShip.collisionDetector(ships[i].ship))
            {
                console.log("damejaxa");
                if ( spaceShip.playerLifes > 0 ) 
                {
                    spaceShip.destroy();
                    stage.removeChild(spaceShip.ship);
                    ships.remove(spaceShip);
                    spaceShip.playerLifes--;
                    resetBoard();
                 }else{
                    spaceShip.destroy();
                    stage.removeChild(spaceShip.ship);
                    ships.remove(spaceShip);
                    cancelAnimationFrame(anim);
                    clearInterval(enem);
                    gameFinished();
                }
            }
        }
    }
}

function checkDamage(bullets)
{
    PlayerAndBullet(bullets);
    EnemyAndBullet(bullets);
    PlayerAndEnemy(bullets);
}

function updateScore()
{  
    var str = `Score: ${spaceShip.playerScore}   Lifes: ${spaceShip.playerLifes}`;
    txt.text = str;
}

enem = window.setInterval(generateEnemy,2500);