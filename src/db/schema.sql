CREATE TABLE albums (
  id SERIAL,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id SERIAL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  join_date TIMESTAMP(0) DEFAULT now()
);

CREATE TABLE reviews (
  id SERIAL,
  content TEXT NOT NULL,
  user_id INT REFERENCES users,
  album_id INT REFERENCES albums
);