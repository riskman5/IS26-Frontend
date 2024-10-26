document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const postsContainer = document.getElementById('posts-container');

    function fetchPosts() {
        const url = 'https://jsonplaceholder.typicode.com/posts';

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                preloader.style.display = 'none';
                renderPosts(data);
            })
            .catch(error => {
                preloader.style.display = 'none';
                postsContainer.innerHTML = `<p>⚠ Что-то пошло не так: ${error.message}</p>`;
            });
    }

    function renderPosts(posts) {
        postsContainer.innerHTML = posts.map(post => `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      </div>
    `).join('');
    }

    fetchPosts();
});