const API = 'https://rickandmortyapi.com/api/character/';
const charsContainer = document.querySelector('.chars-container');
const loadMoreButton = document.querySelector('#load-more');

const defaultFilters = {
    name: '',
    species: '',
    gender: '',
    status: '',
    page: 1
};

async function getCharacters({ name = '', species = '', gender = '', status = '', page = 1 }) {
    const response = await fetch(`${API}?name=${name}&species=${species}&gender=${gender}&status=${status}&page=${page}`);
    const data = await response.json();
    return data.results;
}

async function render({ characters }) {
    charsContainer.innerHTML = '';
    characters.forEach((character) => {
        charsContainer.innerHTML += `
            <div class="char">
                <img src="${character.image}" alt="${character.name}">
                <div class="char-info">
                    <h3>${character.name}</h3>
                    <span>Species: ${character.species}</span>
                    <span>Gender: ${character.gender}</span>
                    <span>Status: ${character.status}</span>
                </div>
            </div>
        `;
    });
}

async function handleLoadMore() {
    defaultFilters.page += 1;
    const characters = await getCharacters(defaultFilters);
    render({ characters });
}

function addListeners() {
    loadMoreButton.addEventListener('click', handleLoadMore);
}

async function main() {
    const characters = await getCharacters(defaultFilters);
    render({ characters });
    addListeners();
}

main();
