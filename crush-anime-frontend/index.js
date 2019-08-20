let animes = []
let users = []

document.addEventListener("DOMContentLoaded", function (e) {
  fetchAnimes()
  fetchUsers()
  eventHandler()
})

function fetchAnimes() {
  fetch("http://localhost:3000/api/v1/animes")
    .then(resp => resp.json())
    .then(data => {
      // console.log(data)
      animes = data
      data.forEach(renderAnime)
    })
}

function renderAnime(anime) {
  const animeContainer = document.getElementById("anime-container")

  animeContainer.insertAdjacentHTML(
    "beforeend",
    ` <div class="anime-card" data-anime-id=>
        <h3 class="anime-title">${anime.title}</h3>
        <h4 class="anime-main-character">Main Character: ${
          anime.main_character
        }</h4>
        <p class="anime-description">${anime.description}</p>
        <div class="image-wrapper">
        <img class="image" src="${anime.image_url}" alt="">
      </div>`
  )
}

function fetchUsers() {
  fetch("http://localhost:3000/api/v1/users")
    .then(resp => resp.json())
    .then(data => {
      // console.log(data)
      users = data
      data.forEach(renderUser)
    })
}

function renderUser(user) {
  const userContainer = document.getElementById("user-container")
  const anime_ids = user.user_animes.map(user_anime => user_anime.anime_id)
  const targetAnimes = anime_ids.map(id => animes.find(anime => anime.id === id))
  const targetAnimeHtml = targetAnimes.map(renderTargetAnime).join("")

  userContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="user-card">
    <h3 class="user-name">Username: ${user.name}</h3>
    <h4 class="user-favorite-anime">Favorite Anime: ${user.favorite_anime}</h4>
    <div class="user-anime-container">
    ${targetAnimeHtml}
  </div>`
  )
}

function eventHandler() {
  const animeForm = document.getElementById("create-anime-form")

  animeForm.addEventListener("submit", function (event) {
    event.preventDefault()
    console.log(event.target)
    postAnimeData(event.target)
  })
}

function postAnimeData(form) {

  fetch("http://localhost:3000/api/v1/animes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        title: form.title.value,
        main_character: form["main-character"].value,
        description: form.description.value,
        image: form.image.value,
      })
    })
    .then(resp => resp.json())
    .then(data => renderAnime(data))
  form.reset()
}

function renderTargetAnime(anime) {
  return `
  <div>
  <li>${anime.title}</li>
  </div>
  `
}