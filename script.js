const search = document.getElementById('search');
function getNews() {
    return fetch("https://newsapi.org/v2/everything?q=tesla&from=2024-07-18&sortBy=publishedAt&apiKey=38fbd5fcf3ad41dd9b1e3251546f12d7")
        .then(response => response.json())
        .then(data => data.articles); // Assuming 'articles' is the correct property to get the news items
}

function filterNews(news, searchTerm) {
    return news.filter(newsItem => newsItem.title.toLowerCase().includes(searchTerm.toLowerCase()));
}

function handleSearch() {
    const searchInput = document.getElementById('search');
    const searchTerm = searchInput.value.trim();
    getNews().then(news => {
        const filteredNews = filterNews(news, searchTerm);
        displayNews(filteredNews)
    })
}

function displayNews(news) {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = '';
    
    news.forEach(newsItem => {
        const card = `
        <div class="col-6 my-1 col-md-4">
            <div class="card" style="width: 18rem;">
                <img src="${newsItem.urlToImage || 'default-image.jpg'}" class="card-img-top" alt="${newsItem.title}">
                <div class="card-body">
                    <h5 class="card-title">${newsItem.title}</h5>
                    <p class="card-text">${newsItem.description || 'No description available'}</p>
                    <a href="${newsItem.url}" class="btn btn-primary" target="_blank">Read more</a>
                </div>
            </div>
        </div>`;
        
        newsContainer.innerHTML += card;
    });
}

// Fetch news and display it
getNews().then(news => displayNews(news));

search.addEventListener('input', handleSearch);
