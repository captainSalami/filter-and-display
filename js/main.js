const ui = new UI();
const vhttp = new VerbsHTTP;
const http = new EasyHTTP;

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', Store.displayFavorites);
//Filter
filter.addEventListener('keyup', runFilter);

//verb click
filterBox.addEventListener('click', selectVerb);

//special chars
lettersBox.addEventListener('click', addChar);

//phrase section mouseover
box.addEventListener('mouseover', onStar);

//click to fave or unfave phrase
box.addEventListener('click', clickStar);

//remove favorite phrase
favorites.addEventListener('click', removeFavorite);

function showVerbs() {
  const verbs = vhttp.get();
  verbs.then(data => console.log(data))
    .catch(err => console.log(err));
}

async function getVerbs() {
  const response = await fetch('verbs.json');
  const resData = await response.json();
  return resData;
}

function runFilter(e) {
  const text = e.target.value.toLowerCase();
  // console.log(text);
  filterVerbs(text);
  filterBox.innerHTML = '';
}

async function filterVerbs(text) {
  const response = await fetch('verbs.json');
  const verbs = await response.json();

  verbs.forEach(verb => {
    if(verb.inf.indexOf(text) != -1 || verb.translate.indexOf(text) != -1){
      ui.conjugateVerb(verb);
    }
  });
}

function selectVerb(e) {
  if(e.target.tagName == 'TD'){
    row.innerHTML = '';
    const verb = e.target.innerText;
    filterPhrases(verb);
    //after filtered phrases are displayed 
    //run check for favorites
    //or
    //run favorite check in filterVerbs
  }
  e.preventDefault();
}


async function filterPhrases(verb) {
  const response = await fetch('phrase.json');
  const phrases = await response.json();
  let counter = 0;
  let favoriteCount = 0;
  const storageIDs = Store.getFavorites();
  
  phrases.forEach(phrase => {
    if(phrase.span.toLowerCase().indexOf(verb) != -1) {
      counter++;
      console.log(storageIDs);
      let status = '';
      if(storageIDs.includes(phrase.id)) {
        status =  ['info', 'fas'];
        favoriteCount++;
        // ui.addPhraseExample(phrase, status);
      }else{
        status =  ['light', 'far'];
        // ui.addPhraseExample(phrase, status);
      }
      ui.addPhraseExample(phrase, status);
      //const status = ''; in both  if AND else conditions
    }
  });
  //Run if no phrases are found for selected verb
  if(counter == 0) {
    ui.noMatch(verb);
  }
  ui.displayCount(counter, favoriteCount);
}

function onStar(e) {
  //if star contains class favorited then dont run
  if(e.target.classList.contains('far')) {
    if(e.target.classList.contains('solid') != true) {
      const star = e.target;
      onHover(star, 'far', 'fas');
    }

  }
  e.preventDefault();
}

function clickStar(e) {
  if(e.target.classList.contains('fa-star')) {
    const div = e.target.parentElement.parentElement;
    const spanishText = div.children[1].innerText;
    console.log(spanishText);
    ui.starClicked(e.target.parentElement);
    //spanish text is sent to find the phrase id in
    //json file and store in LS
    findPhraseInJson(spanishText);
  }
  e.preventDefault();
}

function removeFavorite(e) {
  if(e.target.classList.contains('delete')) {
    const elem =  e.target.parentElement.parentElement;
    const spanishText = elem.children[1].innerHTML;
    const item = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    ui.removeFavorite(item);
    returnJsonId(spanishText, 'span');
    console.log(`Removed Favorite Phrase: "${spanishText}"`);
  }
  e.preventDefault();
}

function returnJsonId(compareValue, compareKey) {
  http.get()
  .then(data => {
    //let output = '';
    const phrases = data.phrases;
    phrases.forEach(phrase => {
      if(phrase[compareKey] === compareValue) {
        //output = phrase.id;
        Store.removeFavoriteFromLS(phrase.id);
      }
    });
    //console.log(output);
  });
}

// async function getJsonId(text, compareKey) {
//   const response = await fetch('phrase.json');
//   const phrases = await response.json();
//   let output = '';
//   phrases.forEach(phrase => {
//     if(phrase[compareKey].indexOf(text) != -1) {
//       console.log(phrase.id);
//       output = phrase.id;
//     }
//     // if(phrase[compareKey] == currentData) {
//     //   console.log(phrase[want]);
//     // }
//   });
//   console.log(output);
//   return output;
// }

//automated scanner for JSON files
// async function getJsonId(currentData, compareKey, want) {
// const response = await fetch('phrase.json');
// const phrases = await response.json();
// phrases.forEach(phrase => {
//   if(phrase[compareKey] == currentData) {
//     console.log(phrase[want]);
//   }
// });
//}

async function findPhraseInJson(favePhrase) {
  const response = await fetch('phrase.json');
  const phrases = await response.json();
  phrases.forEach(phrase => {
    if(phrase.span.indexOf(favePhrase) != -1) {
      console.log(phrase.id);
      Store.addFavoriteToLS(phrase.id);
      ui.addToFavoritePhrases(phrase);
    }
  });
}

async function findIdsInJson(phraseId) {
  const response = await fetch('phrase.json');
  const phrases = await response.json();
  phrases.forEach(phrase => {
    if(phrase.id == phraseId) {
      ui.addToFavoritePhrases(phrase);
    }
  });
}


//remove and add classes on enter and on leave
function onHover(elem, orig, temp) {
  elem.addEventListener('mouseenter', function(e) {
    elem.classList.remove(orig);
    elem.classList.add(temp);
  });
  elem.addEventListener('mouseleave', function(e) {
    elem.classList.remove(temp);
    elem.classList.add(orig);
  });
}

//Add Special Character to filter text
function addChar(e) {
  if(e.target.value != null){
    filter.value = filter.value + e.target.innerText;
    filterVerbs(filter.value);
    filterBox.innerHTML = '';
    filter.focus();
  }
}


//USE TO CONVERT LOCALSTORAGE TO JSON FORMAT
function convertLS(e) {
  const notes = Store.getNotes();
  //console.log(notes);
  let output = '';
  notes.forEach(note => {
    output += `
    {
      "id":"${note.id}",
      "keywords":"${note.keywords}",
      "span":"${note.span}",
      "engl":"${note.engl}"
    },
    `;
  });
  console.log(output);
  e.preventDefault();
}
