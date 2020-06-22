const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
const port = 3000

app.listen(port, () => console.log(`Server is started at http://localhost:${port}`))

app.post('/login', (req, res) => {
  let result;
  let user = req.body
  console.log(user)
  if (user.name) {
    result = {
      "status": "success",
      "message": "You have logged in"
    }
  } else {
    result = {
      "status": "failed",
      "message": "You have not logged in"
    }
    res.status(400)
  }
  var opts = {
    maxAge: 900000,
    httpOnly: true,
  }
  res.cookie('name', user.name, opts)
  res.json(result)
  res.end()
})

app.get('/hello', (req, res) => {
  let name = req.cookies.name
  if (name) {
    res.send(`Welcome ${name}!`)
  }
})