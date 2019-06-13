class Store {
  //Get notes from LS
  static getFavorites(){
    let ids;
    if(localStorage.getItem('phraseIDs') === null){
      ids = [];
    }else{
      ids = JSON.parse(localStorage.getItem('phraseIDs'));
    }
    return ids;
  }

  //Display notes from LS
  static displayFavorites(){
    const ids = Store.getFavorites();

    ids.forEach(function(id){
      findIdsInJson(id);
      //const ui = new UI;
      
      //ui.addPhraseToPage(phrase);
    });
  }

  //Add note to LS
  static addFavoriteToLS(phraseID){
    const ids = Store.getFavorites();

    ids.push(phraseID);

    localStorage.setItem('phraseIDs', JSON.stringify(ids));
  }
  
  //Remove note from LS
  static removeFavoriteFromLS(selectedId){
    const ids = Store.getFavorites();

    ids.forEach(function(id, index){
      if(selectedId == id) {
        ids.splice(index, 1);
      }
    });
    localStorage.setItem('phraseIDs', JSON.stringify(ids));
  }


  //Compare Value with Json Data Key and get Data
  static siftJson(current, compareKey, want){
    const ids = Store.getFavorites();

    ids.forEach(id => {
      if(note.span.toLowerCase().indexOf(verb) != -1 || note.engl.toLowerCase().indexOf(verb) != -1){
        const ui = new UI;
        //console.log(note.span);
        ui.addNoteExample(note);
      }else{
        //console.log("Note does not have verb");
      }
    });

  }





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

  //Remove note from LS
  static removeNoteFromLS(noteItem){
    let notes;
    if(localStorage.getItem('notes') === null){
      notes = [];
    }else{
      notes = JSON.parse(localStorage.getItem('notes'));
    }

    notes.forEach(function(note, index){
      if(noteItem.children[0].children[0].children[0].textContent == note.id && noteItem.children[0].children[1].children[0].textContent == note.span) {
        notes.splice(index, 1);
      }
    });
    localStorage.setItem('notes', JSON.stringify(notes));
  }
}