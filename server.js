const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Blog = mongoose.model('Blog', blogSchema);

app.get('/blogs', async (req, res) => {
  const blogs = await Blog.find({});
  res.send(blogs);
});

app.get('/blogs/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.send(blog);
});

app.post('/blogs', async (req, res) => {
  const blog = new Blog(req.body);
  console.log(blog);
  await blog.save();
  res.send(blog);
});

app.delete('/blogs/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.send('Blog deleted successfully');
});


app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
