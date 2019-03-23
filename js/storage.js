class Store{
  //Get notes from LS
  static getNotes(){
    let notes;
    if(localStorage.getItem('notes') === null){
      notes = [];
    }else{
      notes = JSON.parse(localStorage.getItem('notes'));
    }

    return notes;
  }

  //Display notes from LS
  static displayNotes(){
    const notes = Store.getNotes();

    notes.forEach(function(note){
      const ui = new UI;

      ui.addNoteToPage(note);
    });
  }

  //Add note to LS
  static addNoteToLS(note){
    const notes = Store.getNotes();

    notes.push(note);

    localStorage.setItem('notes', JSON.stringify(notes));
  }

  //Filter notes in LS
  static filterNotes(text){
    const notes = Store.getNotes();

    notes.forEach(function(note){
      if(note.span.toLowerCase().indexOf(text) != -1 || note.engl.toLowerCase().indexOf(text) != -1){
        const ui = new UI;

        ui.showFilteredNotes(note);
      }else{
        //grab children from matchedRow 
        //remove children 
      }
    });
  }

  //Remove note from LS
  static removeNoteFromLS(noteItem){
    let notes;
    if(localStorage.getItem('notes') === null){
      notes = [];
    }else{
      notes = JSON.parse(localStorage.getItem('notes'));
    }

    notes.forEach(function(note, index){
      if(noteItem.children[0].children[0].children[0].textContent == note.id && noteItem.children[0].children[1].children[0].textContent == note.span){
        //console.log('Hello');
        notes.splice(index, 1);
      }
    });
    localStorage.setItem('notes', JSON.stringify(notes));
    // console.log(noteItem.children[0].children[0].children[0].textContent);
  }
}