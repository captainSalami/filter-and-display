class Note {
  constructor(id, keywords, span, engl){
    this.id = id;
    this.keywords = keywords;
    this.span = span;
    this.engl = engl;
  }
}

//EVENT LISTENERS
//OnLoad display LS notes
document.addEventListener('DOMContentLoaded', Store.displayNotes);
//Filter
filter.addEventListener('keyup', filterNotes);
//Submit
form.addEventListener('submit', addNote);
//Delete
noteBank.addEventListener('click', removeNote);

function addNote(e){
  i++;
  const id = i;
  const keys = document.getElementById('keywords').value;
  const spanText = document.getElementById('spanish').value;
  const translation = document.getElementById('english').value;

  const note = new Note(id, keys, spanText, translation);
  const ui = new UI;
  Store.addNoteToLS(note);
  ui.addNoteToPage(note);

  e.preventDefault();
}

//Remove Note Event
function removeNote(e){
  const note = e.target.parentElement.parentElement.parentElement;
  if(e.target.parentElement.classList.contains('delete')){
    const ui = new UI;
    ui.removeNoteFromPage(note.parentElement);
    Store.removeNoteFromLS(note.parentElement);
  }
  e.preventDefault();
}

//Filter Through Notes
function filterNotes(e){
  matchedRow.innerHTML = '';
  const text = e.target.value.toLowerCase();

  //filter text sent to storage side
  Store.filterNotes(text);

  // document.querySelectorAll('.collection-item').forEach(function(val){
  //   const spanishText = val.children[1].children[0].textContent;
  //   const translation = val.children[1].children[1].textContent;
  //   if(spanishText.toLowerCase().indexOf(text) != -1 || translation.toLowerCase().indexOf(text) != -1){
  //     const column = document.createElement('div');
  //     column.className = 'col-md-4 my-3';
  //     column.innerHTML = `
  //     <div class="card" style="width: 18rem;">
  //       <div class="card-body">
  //         <h6 class="card-subtitle mb-2 text-muted">${spanishText}</h6>
  //         <p class="card-text">${translation}</p>
  //       </div>
  //     </div>
  //     `;
  //     matchedRow.appendChild(column);
  //   }else{
  //     while(matchedRow.children != ''){
  //       matchedRow.removeChild(matchedRow.children[0]);
  //     }
  //   }
  // });
}