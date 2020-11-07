// session 3 Nodejs
// to check if of the rquest and respnses go to Postman and make a post/delete/get/.. request with the link of your server and the appropiate path
// getting our libraries
const express = require('express')
const cors = require('cors')

const hawasProfile = {
    firstName: 'Hawa',
    lastName: 'Bah Bah',
    preferences: {
      foods: ['curry', 'chocolate'],
      colour: 'blue',
      number: 10
    },
    hoursOfSleep: 7.5
  }

const db = {
  profiles: {
    1000: hawasProfile,
  },
  books: {
    0: {
      title: 'The hunger Games',
      author: 'Suzanne Collins'
    },
    1: {
        title: 'The fault in our stars',
        author: 'John Green'
    }
  }
}

const app = express()
app.use(cors())
app.use(express.json()) // for parsing application/json


// GET /profiles
app.get('/profiles', (req, res) => {
  res.json({
    status: 'success',
    data: db.profiles
  })
})

app.get('/profiles/:userId', (req, res) => {
  console.log(req.params.userId)

  const matchingProfile = db.profiles[req.params.userId]

  if (matchingProfile) {
    res.json({
      status: 'success',
      data: matchingProfile
    })
  } else {
    res.json({
      message: "Couldn't find user with that id"
    })
  }
  
})

// POST /profiles
app.post('/profiles', (req, res) => {
  // find the largest key and increment it
  const existingIds = Object.keys(db.profiles)
  const largestKey = Math.max(...existingIds)
  const newKey = largestKey + 1

  db.profiles[newKey] = req.body

  res.json({
    status: 'success',
    message: `Created a profile with id of ${newKey}`
  })
})


// DELETE profiles
app.delete('/profiles/1000', (res, req) => {

    delete db.profiles[1000] 

    res.json({
        message: 'The profile 1000 has been deleted'
    })

})
app.delete('/profiles/:userId', (res, req) => {

    delete db.profiles[req.params.userId]

    res.json({
        message: 'The profile has been deleted'
    })

})

//PUT  
app.put('/profiles/:userId', (res, req) => {

    const idToPut = req.params.userId
    // updating 
    db.profiles[idToPut] = req.body

    res.json({
        message: 'The profile has been overwritten (put)'
    })

})
app.patch('/profiles/:userId', (res, req) => {

  const idToPatch = req.params.userId
  // updating 
  db.profiles[idToPatch] = {...db.profiles[idToPatch],...req.body }

  res.json({
      message: 'The profile has been modified (path)'
  })

})


// app.get('/profiles/1000', (req, res) => {
//   const matchingProfile = db.profiles[1000]

//   res.json({
//     status: 'success',
//     data: matchingProfile
//   })
// })

// app.get('/profiles/1001', (req, res) => {
//   const matchingProfile = db.profiles[1001]

//   res.json({
//     status: 'success',
//     data: matchingProfile
//   })
// })

//C POST Books
app.post('/books', (req,res)=>{

    const existingBooks = Object.keys(db.books)
    const largestKey = Math.max(...existingIds)

    const newKey = largestKey + 1

    db.books[newKey] = req.body

    res.json({
        status: 'success',
        message: `Created a book with id of ${newKey}`
    })
})

// R GET books
app.get('/books', (req,res)=>{
    res.json({
        title: 'All the books',
        data: db.books
    })
})
app.get('/books/:bookId', (req,res)=>{

  matchedBook = db.books[req.params.bookId]

  res.json({
    status: 'success';
    data: matchedBook
  })
})

// U PUT/PATCH books
app.put('books/:bookId', (res, req) => {
  // const bookToPut = db.books[req.params.bookId];
  const idToPut = req.params.bookId

  db.books[idToPut] = req.body

  res.json({
    status: 'succcess',
    // message: 'the book ' + bookToPut + ' has been changed to ' + req.body
  })

})
app.patch('/books/:bookId', (req, res) => {
  const idToPatch = req.params.bookId

  db.book[idToPatch] = {...db.book[idToPatch],...req.body }

  res.json({
      message: 'The book has been modified '
  })
})
// D
app.delete('/books:bookId', (req, res) => {
  delete db.books[req.params.bookId]

  res.json({
    message: 'the book with has been deleted' 
  })
})

app.listen(4000, () => {
  console.log('server is running!')
})