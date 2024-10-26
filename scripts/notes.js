document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('notes-form');
    const notesContainer = document.getElementById('notes-container');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const theme = document.getElementById('theme').value;
        const note = document.getElementById('note').value;
        const priority = document.getElementById('priority').value;

        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push({ theme, note, priority });
        localStorage.setItem('notes', JSON.stringify(notes));

        displayMessages();
    });

    function displayMessages() {
        notesContainer.innerHTML = '';
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.innerHTML = `
                <strong>${note.theme}</strong>
                <button class="delete-btn" data-index="${index}">🗑️</button>
                <div class="notes-text">${note.note}</div>
                <div class="priority">${note.priority === 'important' ? 'Важно!' : 'Не важно'}</div>
            `;
            notesContainer.appendChild(noteElement);
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
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayMessages();
    }

    displayMessages();
});