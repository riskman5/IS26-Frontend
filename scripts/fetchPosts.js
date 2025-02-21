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
                toastr.success('Posts loaded successfully!');
            })
            .catch(error => {
                preloader.style.display = 'none';
                const errorMessage = document.createElement('p');
                errorMessage.textContent = `⚠ Что-то пошло не так: ${error.message}`;
                postsContainer.appendChild(errorMessage);
                toastr.error(`Error: ${error.message}`);
            });
    }

    function renderPosts(posts) {
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';

            const postTitle = document.createElement('h3');
            postTitle.textContent = post.title;
            postTitle.style.cursor = 'pointer';
            postTitle.addEventListener('click', () => {
                Swal.fire({
                    title: post.title,
                    text: post.body,
                    icon: 'info',
                    confirmButtonText: 'Close'
                });
            });
            postDiv.appendChild(postTitle);

            const postBody = document.createElement('p');
            postBody.textContent = post.body;
            postDiv.appendChild(postBody);

            postsContainer.appendChild(postDiv);
        });
    }

    fetchPosts();
});