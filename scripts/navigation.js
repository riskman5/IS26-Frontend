document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.cv-navigation a');
    const dropbtn = document.getElementById('socials');
    const dropdownContent = document.querySelector('.dropdown-content');

    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            links.forEach(function(link) {
                link.classList.remove('active');
            });
            event.currentTarget.classList.add('active');
        });
    });

    dropbtn.addEventListener('click', function() {
        dropdownContent.style.display = dropdownContent.style.display === 'grid' ? 'none' : 'grid';
    });

    document.addEventListener('click', function(event) {
        if (!dropbtn.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.style.display = 'none';
        }
    });

    window.addEventListener('load', () => {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart

        const loadTimeElement = document.createElement('div');
        loadTimeElement.textContent = `Время загрузки страницы: ${loadTime.toFixed()} мс`;

        document.querySelector(".cv-content").appendChild(loadTimeElement);
    });
});