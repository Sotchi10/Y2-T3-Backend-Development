const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const articles = [
  { id: 1, title: "AI News", journalistId: 1, categoryId: 1 },
  { id: 2, title: "Sports Today", journalistId: 2, categoryId: 2 },
  { id: 3, title: "Tech Trends", journalistId: 1, categoryId: 1 },
];

const journalists = [
  { id: 1, name: "John" },
  { id: 2, name: "Alice" },
];

const categories = [
  { id: 1, name: "Tech" },
  { id: 2, name: "Sports" },
];


app.get("/articles", (req, res) => {
  const { journalistId, categoryId } = req.query;

  let filtered = articles;

  if (journalistId) {
    filtered = filtered.filter(
      (a) => a.journalistId == journalistId
    );
  }

  if (categoryId) {
    filtered = filtered.filter(
      (a) => a.categoryId == categoryId
    );
  }

  res.json(filtered);
});

app.get("/journalists", (req, res) => {
  res.json(journalists);
});

app.get("/categories", (req, res) => {
  res.json(categories);
});


app.get("/journalists/:id/articles", (req, res) => {
  const id = req.params.id;

  const filtered = articles.filter(
    (a) => a.journalistId == id
  );

  res.json(filtered);
});


app.get("/categories/:id/articles", (req, res) => {
  const id = req.params.id;

  const filtered = articles.filter(
    (a) => a.categoryId == id
  );

  res.json(filtered);
});

app.listen(5000, () => {
  console.log("Server running on port http://localhost:5000/");
});
