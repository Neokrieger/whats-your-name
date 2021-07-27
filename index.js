const express = require('express')
const app = express()
const port = 3000

let player1Health = 50;
let player2Health = 50;

let player1Name = ""
let player2Name = ""

let counter = 0

function decreasePlayerHealth(amount = 1){
  console.log("Hit")
  player1Health =- amount; 
  counter++; 
  app.post('/attack' + counter, (req,res) => {
    res.render('full-name.ejs', {
      player1Name: player1Name,
      player1Health: player1Health,
      player2Health: player2Health, 
      player2Name: player2Name
    })
  })
}


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  console.log("in the get method!")
  res.render('index.ejs')
})

app.post('/name', (req, res) => {
  console.log("in the post method!")
  player1Name = req.body.player1Name
  player2Name = req.body.player2Name
  res.render('full-name.ejs', {
    player1Name: req.body.player1Name,
    player1Health: player1Health,
    player2Health: player2Health, 
    player2Name: req.body.player2Name,
    decreasePlayerHealth: decreasePlayerHealth
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
