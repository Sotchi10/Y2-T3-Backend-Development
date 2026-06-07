import { useEffect, useState } from "react";
import axios from "axios";

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  // Fetch all articles when component mounts
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedJournalistId, setSelectedJournalistId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    const res = await axios.get("http://localhost:5000/articles");
    setArticles(res.data);
  };

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    const res = await axios.get("http://localhost:5000/journalists");
    setJournalists(res.data);
  };

  const fetchCategories = async () => {
    // Fetch categories from the API
    const res = await axios.get("http://localhost:5000/categories");
    setCategories(res.data);
  };

  const applyFilters = async () => {
    let res;

    if (selectedJournalistId && selectedCategoryId) {
      res = await axios.get(
        `http://localhost:5000/articles?journalistId=${selectedJournalistId}&categoryId=${selectedCategoryId}`,
      );
    } else if (selectedJournalistId) {
      res = await axios.get(
        `http://localhost:5000/journalists/${selectedJournalistId}/articles`,
      );
    } else if (selectedCategoryId) {
      res = await axios.get(
        `http://localhost:5000/categories/${selectedCategoryId}/articles`,
      );
    } else {
      res = await axios.get("http://localhost:5000/articles");
    }

    setArticles(res.data);
  };

  const resetFilters = () => {
    setSelectedJournalistId("");
    setSelectedCategoryId("");
    fetchArticles();
  };
  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select
          id="journalistFilter"
          value={selectedJournalistId}
          onChange={(e) => setSelectedJournalistId(e.target.value)}
        >
          <option value=""></option>
          {/* Options for journalists */}
          {journalists.map((j) => (
            <option key={j.id} value={j.id}>
              {j.name}
            </option>
          ))}
        </select>

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          <option value="">All Categories</option>
          {/* Options for categories */}
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            applyFilters();
          }}
        >
          Apply Filters
        </button>
        <button
          onClick={() => {
            // Logic to reset filters
            resetFilters();
          }}
        >
          Reset Filters
        </button>
      </div>

      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>
              By Journalist #{article.journalistId} | Category #
              {article.categoryId}
            </small>
            <br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
