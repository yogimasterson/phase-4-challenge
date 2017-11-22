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
    const {name, email, password} = req.body
    bcrypt.hash(password, saltRounds)
      .then((hash) => {
        db.createUser(name, email, hash, (error, result) => {
          if (error) {
            res.status(500).render('common/error', {
              error,
            })
          } else {
            const user = result[0]
            req.session.user = user.id
            res.redirect('/', {
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
  .post((req, res) => {
    const {email, password} = req.body
    db.validateUser(email, (error, result) => {
      if (error) {
        res.status(500).render('common/error', {
          error,
        })
      } else {
        const user = result[0]
        bcrypt.compare(password, user.password)
          .then((comparison) => {
            if (comparison) {
              req.session.user = user.id
              res.redirect('/')
            } else {
              res.render('/sign-in')
            }
          })
      }
    })
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
