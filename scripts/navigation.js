document.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('.cv-navigation a');
    var dropbtn = document.getElementById('socials');
    var dropdownContent = document.querySelector('.dropdown-content');

    links.forEach(function(link, index) {
        link.addEventListener('click', function(event) {
            links.forEach(function(link) {
                link.classList.remove('active');
            });
            event.currentTarget.classList.add('active');
        });
    });

    dropbtn.addEventListener('click', function(event) {
        event.preventDefault();
        dropdownContent.style.display = dropdownContent.style.display === 'grid' ? 'none' : 'grid';
    });

    document.addEventListener('click', function(event) {
        if (!dropbtn.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.style.display = 'none';
        }
    });
});