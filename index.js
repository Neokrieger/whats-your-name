const e = require('express');
const express = require('express')
const app = express()
const port = 3000

let enemyPlayer; 

class Player{
  static isParalysed = false
  constructor(name, hitpoint = 50){
    this.name = name;
    this.hitpoint = hitpoint;
  }

  damage(attack){
    if(Player.isParalysed){
      console.log("Paralysed");
      Player.isParalysed = false; 
      return 0; 
    }
    let damage; 
    let chance = Math.random(); 
    if (attack === "heavyAttack"){
      console.log("Heavy Attack");
      damage =  Math.round(Math.random() * 10);
      Player.isParalysed = chance >= 0.8; 
    }
    else if(attack === "mediumAttack"){
      console.log("Medium Attack");
      damage = Math.round((Math.random() * 3) + 3);
      Player.isParalysed = chance >= 0.9;
    }
    else{
      console.log("Light Attack"); 
      damage = 4; 
      Player.isParalysed = chance >= 0.95;
    }
    this.hitpoint -= damage;
    return damage;
  }

  isDead(){
    if(this.hitpoint <= 0) return true;
  }

}

let player1;
let player2;

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  console.log("in the get method!")
  res.render('index.ejs')
})

app.post('/name', (req, res) => {

  player1 = new Player(req.body.player1Name);
  player2 = new Player(req.body.player2Name);

  console.log("in the post method!")
  res.render('attack1.ejs', {
    player1Name: player1.name,
    player2Name: player2.name,
    player1Health: player1.hitpoint,
    player2Health: player2.hitpoint,
  })
})

app.post('/attack1', (req, res) => {
  
  console.log("Attack!")
  console.log(`Player 1 loses ${player1.damage(req.body.Attack)} HP!`)
  if(player1.isDead()){
    console.log("Player 1 Loses")
    res.send('<h1>Player 1 Loses</h1>')
  }
  
    else{
      res.render('attack1.ejs', {
        player1Name: player1.name,
        player2Name: player2.name,
        player1Health: player1.hitpoint,
        player2Health: player2.hitpoint,
      })
    }
})

app.post('/attack2', (req, res) => {
  console.log("Attack!")
  console.log(`Player 2 loses ${player2.damage(req.body.Attack)} HP!`)
  if(player2.isDead()){
    console.log("Player 2 Loses")
    res.send('<h1>Player 2 Loses</h1>')
  }
  

  else{
  
    res.render('attack2.ejs', {
      player1Name: player1.name,
      player2Name: player2.name,
      player1Health: player1.hitpoint,
      player2Health: player2.hitpoint,
    })
  }
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
