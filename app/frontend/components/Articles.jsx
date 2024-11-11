import React, { useState, useEffect } from 'react';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // To handle the loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/v1/articles');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles()
  }, [])

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Articles</h1>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>{article.title} - {article.body}</li> // Update based on your data structure
          ))}
        </ul>
      )}
    </div>
  )
}

export default Articles;
