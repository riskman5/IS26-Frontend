document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('notes-form');
    const messagesContainer = document.getElementById('notes-container');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('theme').value;
        const message = document.getElementById('note').value;
        const priority = document.getElementById('priority').value;

        const messages = JSON.parse(localStorage.getItem('notes')) || [];
        messages.push({ name, message, priority });
        localStorage.setItem('notes', JSON.stringify(messages));

        displayMessages();
    });

    function displayMessages() {
        messagesContainer.innerHTML = '';
        const messages = JSON.parse(localStorage.getItem('notes')) || [];
        messages.forEach((msg, index) => {
            const messageElement = document.createElement('div');
            messageElement.innerHTML = `
                <strong>${msg.name}</strong>
                <button class="delete-btn" data-index="${index}">🗑️</button>
                <div class="notes-text">${msg.message}</div>
                <div class="priority">${msg.priority === 'important' ? 'Важно!' : 'Не важно!'}</div>
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
        const messages = JSON.parse(localStorage.getItem('notes')) || [];
        messages.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(messages));
        displayMessages();
    }

    displayMessages();
});