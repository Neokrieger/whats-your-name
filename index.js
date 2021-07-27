const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  console.log("in the get method!")
  res.render('index.ejs')
})

app.post('/name', (req, res) => {
  console.log("in the post method!")
  res.render('full-name.ejs', {
    player1Name: req.body.player1Name,
    player2Name: req.body.player2Name
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
