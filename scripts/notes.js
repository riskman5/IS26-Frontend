document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('notes-form');
    let notesContainer = document.getElementById('notes-container');

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
        const newNotesContainer = notesContainer.cloneNode(false);
        notesContainer.replaceWith(newNotesContainer);
        notesContainer = newNotesContainer;

        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            const themeElement = document.createElement('strong');
            themeElement.textContent = note.theme;

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-btn');
            deleteButton.setAttribute('data-index', index);
            deleteButton.textContent = '🗑️';
            deleteButton.addEventListener('click', function() {
                deleteMessage(index);
            });

            const noteText = document.createElement('div');
            noteText.classList.add('notes-text');
            noteText.textContent = note.note;

            const priorityElement = document.createElement('div');
            priorityElement.classList.add('priority');
            priorityElement.textContent = note.priority === 'important' ? 'Важно!' : 'Не важно';

            noteElement.appendChild(themeElement);
            noteElement.appendChild(deleteButton);
            noteElement.appendChild(noteText);
            noteElement.appendChild(priorityElement);

            notesContainer.appendChild(noteElement);
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