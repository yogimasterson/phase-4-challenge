const router = require('express').Router()
const db = require('../db')
const bcrypt = require('bcrypt')

const saltRounds = 10

router.get('/', (req, res) => {
  db.getAlbums((error, albums) => {
    if (error) {
      res.status(500).render('common/error', {
        error,
      })
    } else {
      res.render('home/index', {
        albums,
      })
    }
  })
})

router.route('/sign-up')
  .get((req, res) => {
    res.render('auth/signup')
  })
  .post((req, res) => {
    const { name, email, password } = req.body
    bcrypt.hash(password, saltRounds)
      .then((hash) => {
        db.createUser(name, email, hash, (error, users) => {
          if (error) {
            res.status(500).render('common/error', {
              error,
            })
          } else {
            const user = users[0]
            res.redirect('/sign-in', {
              user,
            })
          }
        })
      })
  })

router.route('/sign-in')
  .get((req, res) => {
    res.render('auth/signin')
  })

router.get('/albums/:albumID', (req, res) => {
  const albumID = req.params.albumID

  db.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      res.status(500).render('common/error', {
        error,
      })
    } else {
      const album = albums[0]
      res.render('albums/album', {
        album,
      })
    }
  })
})

module.exports = router
