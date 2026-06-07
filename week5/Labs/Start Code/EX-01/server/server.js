const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let articles = [];
let nextId = 1;

app.get('/articles', (req, res) => {
  res.json(articles);
});

app.get('/articles/:id', (req, res) => {
  const article = articles.find(a => a.id === Number(req.params.id));
  if (!article) return res.status(404).json({ message: 'Article not found' });
  res.json(article);
});

app.post('/articles', (req, res) => {
  const { title, content, journalistId, categoryId } = req.body;
  if (!title || !content || !journalistId || !categoryId) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  const article = {
    id: nextId++,
    title,
    content,
    journalistId: Number(journalistId),
    categoryId: Number(categoryId),
  };
  articles.push(article);
  res.status(201).json(article);
});

app.put('/articles/:id', (req, res) => {
  const index = articles.findIndex(a => a.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Article not found' });
  const { title, content, journalistId, categoryId } = req.body;
  articles[index] = {
    ...articles[index],
    title,
    content,
    journalistId: Number(journalistId),
    categoryId: Number(categoryId),
  };
  res.json(articles[index]);
});

app.delete('/articles/:id', (req, res) => {
  const index = articles.findIndex(a => a.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Article not found' });
  articles.splice(index, 1);
  res.status(204).send();
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));