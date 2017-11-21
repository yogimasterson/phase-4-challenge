const pg = require('pg')

const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const client = new pg.Client(connectionString)

client.connect()

function getAlbums(cb) {
  _query('SELECT * FROM albums', [], cb)
}

function getAlbumsByID(albumID, cb) {
  _query('SELECT * FROM albums WHERE id = $1', [albumID], cb)
}

function getUserByID(userID, cb) {
  _query('SELECT * FROM users WHERE id = $1', [userID], cb)
}

function createReview(content, userID, albumID, cb) {
  _query('INSERT INTO reviews (content, user_id, album_id) VALUES ($1, $2, $3) RETURNING *', [content, userID, albumID], cb)
}

function updateReview(reviewID, content, cb) {
  _query('UPDATE reviews SET (content) = ($2) WHERE id = $1', [reviewID, content], cb)
}

function deleteReview(reviewID, cb) {
  _query('DELETE FROM reviews WHERE id = $1', [reviewID], cb)
}

function getReviewByID(reviewID, cb) {
  _query('SELECT * FROM reviews WHERE id = $1', [reviewID], cb)
}

function getAlbumReviews(albumID, cb) {
  _query('SELECT * FROM reviews WHERE album_id = $1', [albumID], cb)
}

function getUserReviews(userID, cb) {
  _query('SELECT * FROM reviews WHERE user_id = $1', [userID], cb)
}

function _query(sql, variables, cb) {
  console.log('QUERY ->', sql.replace(/[\n\s]+/g, ' '), variables)

  client.query(sql, variables, (error, result) => {
    if (error) {
      console.log('QUERY -> !!ERROR!!')
      console.error(error)
      cb(error)
    } else {
      console.log('QUERY ->', JSON.stringify(result.rows))
      cb(error, result.rows)
    }
  })
}

module.exports = {
  getAlbums,
  getAlbumsByID,
  getUserByID,
  createReview,
  updateReview,
  deleteReview,
  getReviewByID,
  getAlbumReviews,
  getUserReviews,
}
