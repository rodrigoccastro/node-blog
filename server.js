const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

// users
const { sequelizeUser } = require('./user/connect');
const userRoutes = require('./user/userRoutes');
app.use('/blog/api/users', userRoutes);

// posts
const { sequelizePost } = require('./post/connect');
const postRoutes = require('./post/postRoutes');
app.use('/blog/api/posts', postRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelizeUser.authenticate();
    console.log('Database connection User has been established successfully.');

    await sequelizePost.authenticate();
    console.log('Database connection Post has been established successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
});
