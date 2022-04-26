let lolCharacters = [];
let url = 'http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json';
function getCharacters(){
    fetch(url) //3s
    .then((prom) => {
        return prom.json();
    }).then(json => {
      for (const character in json.data) {
          if (Object.hasOwnProperty.call(json.data, character)) {
              const element = json.data[character];
                lolCharacters.push(element);
          }
      }
        console.log(lolCharacters);
        renderCharacters(lolCharacters);
        renderTags();
    });
}
getCharacters();

function renderCharacters(arr){
    arr.forEach(character => {
        let container = document.getElementById('container');
        let characterCard = createCard(character);
        container.appendChild(characterCard);
    });
}

function createCard(character){      
    let card = document.createElement('div');
    card.classList.add('card-container');
    card.innerHTML = `<img src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${character.id}_0.jpg" alt="${character.name}">
    <div class="character-name" >${character.id}</div>
    <div class="character-tag">${character.tags}</div>
    <div > ${character.blurb}</div>
    <div><button class="btn">👍Like</button></div>
    `
    return card;
}

//Render tags

function renderTags(){
    let tagDiv = document.getElementById('tag');
    let filteredTags = ['All'];
    for (let i = 0; i < lolCharacters.length; i++) {
        for (let j = 0; j < lolCharacters[i].tags.length; j++) {
            if(!filteredTags.includes(lolCharacters[i].tags[j])){
                filteredTags.push(lolCharacters[i].tags[j])
            }
        }
    }
    filteredTags.forEach(character => {
        let tag = document.createElement('option');
        tag.innerHTML = `${character }`;
        tagDiv.appendChild(tag);
    });
}

//Search characters by name 

let btnSearch = document.getElementById('btn-search');

btnSearch.addEventListener('click', () => {
    let searchInput = document.getElementById('search').value;
    let foundCharacter = lolCharacters.find(({id}) => id.toLowerCase() === searchInput.toLowerCase());
    console.log(foundCharacter);
    if(foundCharacter){
        container.innerHTML = '';
            let card = createCard(foundCharacter);
            container.appendChild(card);
    } else {
        alert('There is no character with that name, please check your spelling')
    }
});

//Search characters by tag 

let tagValueElement = document.getElementById('tag');
tagValueElement.addEventListener('change', () => {
    if(tagValueElement.value === "All"){
        container.innerHTML="";
        renderCharacters(lolCharacters);
    } else {
        let filteredCharacters = lolCharacters.filter(character =>character.tags.includes(tagValueElement.value) );
        container.innerHTML="";
        renderCharacters(filteredCharacters);
        }
    }
);
