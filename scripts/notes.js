document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('notes-form');
    const messagesContainer = document.getElementById('messages-container');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;

        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push({ name, message });
        localStorage.setItem('messages', JSON.stringify(messages));

        displayMessages();
    });

    function displayMessages() {
        messagesContainer.innerHTML = '';
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.forEach((msg, index) => {
            const messageElement = document.createElement('div');
            messageElement.innerHTML = `
                <strong>${msg.name}</strong>
                <button class="delete-btn" data-index="${index}">🗑️</button>
                <div class="message-text">${msg.message}</div>
            `;
            messagesContainer.appendChild(messageElement);
        });

        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                deleteMessage(index);
            });
        });
    }

    function deleteMessage(index) {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.splice(index, 1);
        localStorage.setItem('messages', JSON.stringify(messages));
        displayMessages();
    }

    displayMessages();
});