function filterJson(text){
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'verbs.json', true);

  xhr.onload = function(){
    if(this.status === 200){
      //console.log(this.responseText);
      const verbs = JSON.parse(this.responseText);

      let jsonOutput = '';
      
      verbs.forEach(function(verb){
        if(verb.inf.toLowerCase().indexOf(text) != -1 || verb.translate.toLowerCase().indexOf(text) != -1){
          jsonOutput += `
          <li class="list-group-item">${verb.ing} : ${verb.translate}</li>
          `;
        }else{
          
        }
      });
      // verbTbody.innerHTML = jsonOutput;
    }
  }

  xhr.send();
}