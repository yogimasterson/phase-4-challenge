const router = require('express').Router()
const db = require('../db')

router.get('/', (req, res) => {
  db.getAlbums((error, albums) => {
    if (error) {
      res.status(500).render('error', {
        error,
      })
    } else {
      res.render('index', {
        albums,
      })
    }
  })
})

router.get('/albums/:albumID', (req, res) => {
  const albumID = req.params.albumID

  db.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      res.status(500).render('error', {
        error,
      })
    } else {
      const album = albums[0]
      res.render('album', {
        album,
      })
    }
  })
})

module.exports = router
