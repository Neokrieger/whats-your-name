const express = require('express')
const app = express()
const port = 3000

class Player{
  constructor(name, hitpoint = 50){
    this.name = name;
    this.hitpoint = hitpoint;
  }

  damage(){
    this.hitpoint -= 10;
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

  player1.damage();
  if(player1.isDead()){
    res.send('<h1>Player 1 Loses</h1>')
  }
  console.log("Player 1 loses 10 HP!")
  console.log("Attack!")


  res.render('attack1.ejs', {
    player1Name: player1.name,
    player2Name: player2.name,
    player1Health: player1.hitpoint,
    player2Health: player2.hitpoint,
  })
})

app.post('/attack2', (req, res) => {

  player2.damage();
  if(player2.isDead()){
    res.send('<h1>Player 2 Loses</h1>')
  }
  console.log("Player 2 loses 10 HP!")
  console.log("Attack!")


  res.render('attack2.ejs', {
    player1Name: player1.name,
    player2Name: player2.name,
    player1Health: player1.hitpoint,
    player2Health: player2.hitpoint,
  })
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
