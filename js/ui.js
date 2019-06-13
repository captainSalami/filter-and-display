// UI Vars
const form = document.getElementById('span-form');
const filter = document.getElementById('filter');
const table = document.getElementById('conjugations');
const row = document.getElementById('example-row');
const verbTbody = document.getElementById('verb-section');
const lettersBox = document.getElementById('chars');
const letters = document.querySelectorAll('special-char');
const filterBox = document.getElementById('filter-box');
const phraseBox = document.getElementById('phrase-box');
const suggestSect = document.getElementById('suggest-section');
const pHeader = document.getElementById('phrases-header');
const counter = document.getElementById('phrase-count');
const favoriteCounter = document.getElementById('favorite-count');
const box = document.getElementById('phrase-box');
const favorites = document.getElementById('favorites');

//UI Class
class UI{
  addPhraseExample(phrase, status) {
    const col = document.createElement('div');
    col.className = 'col-md-6 my-2';
    col.innerHTML = `
      <div class="card collection-item bg-${status[0]}">
        <div class="card-body p-2">
          <div class="mt-1">
            <a href="#" class="favorite-btn">
              <i class="float-left pt-1 pr-1 text-warning ${status[1]} fa-star fa-sm outline"></i>
            </a>
              <h6 class="card-subtitle">${phrase.span}</h6>
          </div>
          <p class="card-text mt-2">${phrase.engl}</p>
        </div>
      </div>
    `;
    row.appendChild(col);
  }

  noMatch(text) {
    row.innerHTML = `
      <h6 class="mx-3 card-subtitle text-muted">No Matches for <u>${text}</u></h6>
    `;
  }

  displayCount(count, favoriteCount) {
    // const span = document.createElement('span');
    // span.className = 'badge badge-primary float-right';
    // span.innerHTML = `Found: ${phraseCount}`;
    counter.innerHTML =  `Found: ${count}`;
    favoriteCounter.innerHTML = `Favorites: ${favoriteCount}`;
    //header.insertBefore(span, divider);
  }

  starClicked(elem) {
    const card = elem.parentElement.parentElement.parentElement;
    const star = document.createElement('i');
    star.className = 'float-left pt-1 pr-1 text-warning';
    elem.removeChild(elem.children[0]);

    if(card.classList.contains('bg-light')) {
      //change to FAVORITE phrase
      card.classList.toggle('bg-light');
      card.classList.toggle('bg-info');
      star.className += ' ' + 'fas fa-star fa-sm solid';
    } else {
      //change to NORMAL phrase
      card.classList.remove('bg-info');
      card.classList.add('bg-light');
      star.className += ' ' + 'far fa-star fa-sm outline';
    }
    elem.appendChild(star);
    // elem.removeChild(elem.children[0]);
    // const faveStar = document.createElement('i');
    // faveStar.className = 'float-left pt-1 pr-1 text-warning fas fa-star fa-sm solid';
    // elem.appendChild(faveStar);

    // const starIcon = elem.children[0];
    // starIcon.classList.remove("far", "outline");
    // starIcon.classList.add("fas", "solid");
  }

  addToFavoritePhrases(phrase) {
    const col = document.createElement('div');
    col.className = 'col-12 mt-1 mb-2';
    col.innerHTML = `
      <div class="card collection-item">
        <div class="card-body p-2">
          <div class="mt-1">
            <a href="#" class="favorite-btn">
              <i class="float-left pt-1 pr-1 text-danger delete fas fa-minus-circle fa-sm"></i>
            </a>
              <h6 class="card-subtitle">${phrase.span}</h6>
          </div>
          <p class="card-text mt-2">${phrase.engl}</p>
        </div>
      </div>
    `;
    favorites.appendChild(col);
  }

  removeFavorite(phrase) {
    phrase.remove();
  }

  conjugateVerb(verb) {
    const div = document.createElement('div');
    div.className = 'shadow-sm mt-4';
    div.innerHTML = `
      <h5 class="card-title text-primary d-inline">${verb.inf}</h5>
      <h6 class="card-subtitle d-inline">${verb.translate}</h6>
    `;
    const tbl = document.createElement('table');
    tbl.className = 'table table-sm';
    tbl.innerHTML = `
    <thead>
      <tr>
        <th scope="col">pronouns</th>
        <th scope="col">present</th>
        <th scope="col">preterite</th>
        <th scope="col">imperfect</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">yo</th>
        <td>${verb.present.yo}</td>
        <td>${verb.preterite.yo}</td>
        <td>${verb.imperfect.yo}</td>
      </tr>
      <tr>
        <th scope="row">tu</th>
        <td>${verb.present.tu}</td>
        <td>${verb.preterite.tu}</td>
        <td>${verb.imperfect.tu}</td>
      </tr>
      <tr>
        <th scope="row">el/ella</th>
        <td>${verb.present.usted}</td>
        <td>${verb.preterite.usted}</td>
        <td>${verb.imperfect.usted}</td>
      </tr>
      <tr>
        <th scope="row">nosotros</th>
        <td>${verb.present.nosotros}</td>
        <td>${verb.preterite.nosotros}</td>
        <td>${verb.imperfect.nosotros}</td>
      </tr>      
      <tr>
        <th scope="row">ustedes</th>
        <td>${verb.present.ustedes}</td>
        <td>${verb.preterite.ustedes}</td>
        <td>${verb.imperfect.ustedes}</td>
      </tr>
    </tbody>
    `;
    div.appendChild(tbl);
    filterBox.appendChild(div);
  }

  clearFields() {
    document.getElementById('keywords').value = '';
    document.getElementById('spanish').value = '';
    document.getElementById('english').value = '';
  }

  showFilteredNotes(note) {
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

  showFilteredVerbs(verbs) {
  }
}

//Form and Filter Box bg-color and round corners
const sections = document.querySelectorAll('div.shadow-sm');
sections.forEach(function(box) {
  //box.style.backgroundColor = '#8797AF';
  box.classList.add('bg-light', 'rounded');
})