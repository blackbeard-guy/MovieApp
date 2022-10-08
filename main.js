const API_KEY = '8c8e1a50-6322-4135-8875-5d40a5420d86'
const API_URL_POPULAR = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1'
const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
        }
    })
    const respData = await resp.json()
    console.log(respData)
    showMovies(respData)
}

getMovies(API_URL_POPULAR)

function showMovies(data) {
    const moviesEl = document.querySelector('.movies')

    moviesEl.innerHTML = '' // очищаем ввод при новом запросе

    data.films.forEach((movie) => {
        const movieItemEL = document.createElement('div')
        console.log(movieItemEL)
        movieItemEL.classList.add('movies-item')
        movieItemEL.innerHTML = `
        <div class="movies-item">
        <div class="movies-item-cover-inner">
            <img class="movies-item-cover" src="${movie.posterUrlPreview}" alt="${movie.nameEn}">
            <div class="movies-item-darkend"></div>
        </div>
        <div class="movies-itme-info">
            <div class="movies-item-title">${getMovieName(movie.nameEn, movie.nameRu)}</div>
            <div class="movies-item-category">${movie.genres.map((genre) => ` ${genre.genre}`)}</div>
            <div class="movies-item-average movies-item-average--${getClassByRate(movie.rating)}">${movie.rating}</div>
        </div>
    </div>
    `
    console.log(movie.genres[1])
    moviesEl.appendChild(movieItemEL)
    })
}

function getClassByRate(vote) {
    if(vote < 5) {
        return 'red'
    } else if(vote < 7.5) {
        return 'orange'
    } else {
        return 'green'
    }
}

function getMovieName(nameEn, nameRu) {
    if (nameEn) {
        return nameEn
    } else {
        return nameRu
    }
}

const form = document.querySelector('form')
const search = document.querySelector('.search')
console.log(form)
console.log(search)

form.addEventListener('submit', (e) => {
    e.preventDefault()

    console.log(search.value)
    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`
    if(search.value){
        getMovies(apiSearchUrl)
    }

    search.value = ''
})