// UI Vars
const form = document.getElementById('span-form');
const filter = document.getElementById('filter');
const tbody = document.getElementById('table-body');
const row = document.getElementById('row');
const matchedRow = document.getElementById('matched-row');
const noteBank = document.getElementById('note-bank');
let i = 0;

//UI Class
class UI{
  addNoteToPage(note){
    const col = document.createElement('div');
    col.className = 'col-md-3 my-3';
    col.innerHTML = `
      <div class="card collection-item">
        <div class="card-header">
          <small class="d-inline">${note.id}</small>
          <a href="3" class="delete"><i class="far fa-times-circle align-text-bottom float-right text-dark"></i></a>
        </div>
        <div class="card-body">
          <h6 class="card-subtitle mb-2">${note.span}</h6>
          <p class="card-text">${note.engl}</p>
        </div>
        <div class="card-footer">
          <small>Keywords: ${note.keywords}</small>
        </div>
      </div>
    `;
    // matched.appendChild(col);
    row.appendChild(col);
  }

  removeNoteFromPage(target){
    target.remove();
  }

  showFilteredNotes(note){
    const col = document.createElement('div');
    col.className = 'col-md-4 my-3';
    col.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h6 class="card-subtitle mb-2 text-muted">${note.span}</h6>
        <p class="card-text">${note.engl}</p>
      </div>
    </div>
    `;
    matchedRow.appendChild(col);
  }
}
