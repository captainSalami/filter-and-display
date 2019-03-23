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
//OnLoad list JSON verbs in table
document.addEventListener('DOMContentLoaded', displayVerbs)
//Filter
filter.addEventListener('keyup', filterNotes);
//Submit
form.addEventListener('submit', addNote);
//Delete
noteBank.addEventListener('click', removeNote);
//special character click
lettersBox.addEventListener('click', addChar);

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

//Display verbs in table
function displayVerbs(){
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'verbs.json', true);

  xhr.onload = function(){
    if(this.status === 200){
      //console.log(this.responseText);
      const verbs = JSON.parse(this.responseText);

      let jsonOutput = '';

      verbs.forEach(function(verb){
        jsonOutput += `
          <tr>
            <td>${verb.inf}</td>
            <td>${verb.translate}</td>
          </tr>
        `;
      });
      verbTbody.innerHTML = jsonOutput;
    }
  }
  xhr.send();
}

//Filter Through Notes
function filterNotes(e){
  matchedRow.innerHTML = '';
  const text = filter.value.toLowerCase();

  //filter text sent to storage side
  Store.filterNotes(text);

  filterJson(text);
}

//Add Special Character to filter text
function addChar(e){
  if(e.target.value != null){
    filter.value = filter.value + e.target.innerText;
    filterNotes();
  }
}