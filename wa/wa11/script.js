
document.querySelector("#general").addEventListener('click', () => {
  getNews("general");
  localStorage.setItem("selectedCategory", "general");
});

document.querySelector("#sports").addEventListener('click', () => {
  getNews("sports");
  localStorage.setItem("selectedCategory", "sports");
});

document.querySelector("#health").addEventListener('click', () => {
  getNews("health");
  localStorage.setItem("selectedCategory", "health");
});

document.querySelector("#business").addEventListener('click', () => {
  getNews("business");
  localStorage.setItem("selectedCategory", "business");
});
document.querySelector("#clear").addEventListener('click', function() {
  localStorage.removeItem("selectedCategory");
  const content = document.querySelector(".content");
  content.innerHTML = "";
});

// api https://saurav.tech/NewsAPI/top-headlines/category/<category>/us.json

async function getNews(userCategory) {
  try {
    const response = await fetch(`https://saurav.tech/NewsAPI/top-headlines/category/${userCategory}/us.json`);
    if (!response.ok) {
        throw Error(response.statusText)
    }
    const data = await response.json();
    console.log(data);
    displayNews(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
    alert("Failed to load news. Please try again later.");
  }

}

function displayNews(articles) {
  const content = document.querySelector(".content");
  content.innerHTML = "";

  articles.forEach(article => {
    const card = document.createElement("div");
    card.classList.add("article");

    card.innerHTML = 
    `<img src="${article.urlToImage || 'https://via.placeholder.com/250x150?text=No+Image'}" alt="News image">
      <h3>${article.title}</h3>
      <p>${article.description || 'No description available.'}</p>
      <a href="${article.url}" target="_blank">Read more</a>`;

    content.appendChild(card);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    getNews(savedCategory);
  }
});
