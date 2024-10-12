document.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('.cv-navigation a');
    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            links.forEach(function(link) {
                link.classList.remove('active');
            });
            event.currentTarget.classList.add('active');
        });
    });
});