const express = require('express')
const app = express()
const port = 8000

app.set('view engine', 'hbs')
app.use('/assets', express.static(__dirname + '/assets'))
app.use(express.urlencoded({extended: false}))

let isLogin = true;
let isTrue = true;
let dataProject = []


app.get('/', (req, res) => {  

  let dataMapping = dataProject.map((item) => {
    return {
      ...item,
      isTrue
    }

  })

  res.render('index', 
  {
    isTrue,
    isLogin,
    dataProject : dataMapping
  })

})

// Contact
app.get('/contact', (req, res) => {
  res.render('contact')
})

// Project
app.get('/project', (req, res) => {
  res.render('project')
})


app.post('/project', (req, res) => {
    // console.log(req.body)

    let title = req.body.inputName
    let sDate = req.body.inputStartDate
    let eDate = req.body.inputEndDate
    let content = req.body.inputDesc
    let node = req.body.nodeJs
    let laravel = req.body.laravel
    let react = req.body.reactJs
    let bootstrap = req.body.bootStrap


  
    let data = {
      title,
      duration : getTime(sDate, eDate),
      content,
      node,
      laravel,
      react,
      bootstrap,
      sDate,
      eDate
    }
  
    dataProject.push(data)

    if(title === "") {
      isTrue = true
      res.redirect('/')
    }else {
      res.redirect('/')
      isTrue = false

        if(dataProject[0].title === "") {
          dataProject.shift()
        }
      }
})

// Delete
app.get('/delete-project/:id', (req, res) => {
  let dataIndex = req.params.id
  dataProject.splice(dataIndex, 1)
  res.redirect('/')
})


// Edit 
app.get('/edit-project/:id', (req, res) => {
  let dataIndex = req.params.id

  let dataUpdate = {
    title: dataProject[dataIndex].title,
    duration: dataProject[dataIndex].duration,
    sDate: dataProject[dataIndex].sDate,
    eDate: dataProject[dataIndex].eDate,
    content: dataProject[dataIndex].content,
    node: dataProject[dataIndex].node,
    laravel: dataProject[dataIndex].laravel,
    react: dataProject[dataIndex].react,
    bootstrap: dataProject[dataIndex].bootstrap 
  }
  
  // let dataUpdate = dataProject[dataIndex]

  res.render('edit-project', {dataIndex, dataUpdate})
})

app.post('/edit-project/:id', (req, res) => {
  let dataIndex = req.params.id
  let sDate = req.body.inputStartDate
  let eDate = req.body.inputEndDate

  dataProject[dataIndex].title = req.body.inputName
  dataProject[dataIndex].sDate = req.body.inputStartDate
  dataProject[dataIndex].eDate = req.body.inputEndDate
  dataProject[dataIndex].duration = getTime(sDate, eDate)
  dataProject[dataIndex].content = req.body.inputDesc
  dataProject[dataIndex].node = req.body.nodeJs
  dataProject[dataIndex].laravel = req.body.laravel
  dataProject[dataIndex].react = req.body.reactJs
  dataProject[dataIndex].bootstrap = req.body.bootStrap

  res.redirect('/')
})


// Detail
app.get('/detail/:id', (req, res) => {
    let dataIndex = req.params.id
    let dataDetail = dataProject[dataIndex]
    res.render('detail', {dataIndex, dataDetail})
})


// Function GetTime
const getTime = (start,end) => {

  let date1 = new Date(start)
  let date2 = new Date(end)
  let time = Math.abs(date2 - date1)
  let days = Math.floor(time / (1000 * 60 * 60 * 24))

  return `${days} hari`
  
}


app.listen(port, () => {
  console.log(`Server Running on Port ${port}`)
})
