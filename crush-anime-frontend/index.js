document.addEventListener("DOMContentLoaded", function (e) {
  let animes = []
  let users = []
  fetchAnimes().then(function () {
    fetchUsers()
  })
  const mainContainer = document.getElementById("main-container")
  const animeContainer = document.getElementById("anime-container")

  mainContainer.addEventListener("submit", function (event) {
    event.preventDefault()
    // console.log(event.target)
    postAnimeData(event.target)
  })

  mainContainer.addEventListener("click", function (event) {
    event.preventDefault()

    if (event.target.className === "update-button") {
      console.log(event.target.dataset.id)
      let popup = document.getElementById("myPopup");
      popup.classList.toggle("show");
      popup.dataset.id = event.target.dataset.id
    } else if (event.target.className === "remove-button") {
      // console.log("remove-button")
    } else if (event.target.className === "edit-button") {
      // console.log(popup.dataset.id)
      console.log(event.target, "this is the target")
      editAnimeData(event.target)
    }
  })

  // read
  function fetchAnimes() {
    return fetch("http://localhost:3000/api/v1/animes")
      .then(resp => resp.json())
      .then(data => {
        // console.log(data)
        animes = data
        data.forEach(renderAnime)
      })
  }
  // read
  function renderAnime(anime) {
    let animeCard;

    animeContainer.insertAdjacentHTML(
      "beforeend",
      ` <div id="anime-card-${anime.id}"class="anime-card">
        <h3 class="anime-title">${anime.title}</h3>
        <h4 class="anime-main-character">Main Character: ${
          anime.main_character
        }</h4>
        <p class="anime-description">${anime.description}</p>
        <div class="image-wrapper">
        <img class="image" src="${anime.image_url}" alt="">
        <input class="update-button" data-id=${anime.id} type="button" value="Update">
        <input class="remove-button" data-id=${anime.id} type="button" value="Remove">
      </div>`
    )
    animeCard = document.getElementById(`anime-card-${anime.id}`)
    const editButton = document.getElementById("edit-button")
    // eventHandler2(animeCard)
    // eventHandler3(editButton)
  }
  // read
  function fetchUsers() {
    fetch("http://localhost:3000/api/v1/users")
      .then(resp => resp.json())
      .then(data => {
        // console.log(data)
        users = data
        data.forEach(renderUser)
      })
  }
  // read
  function renderUser(user) {
    const userContainer = document.getElementById("user-container")
    const anime_ids = user.user_animes.map(user_anime => user_anime.anime_id)
    const targetAnimes = anime_ids.map(id => animes.find(anime => anime.id === id))
    // console.log(targetAnimes)
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

  // create
  function postAnimeData(form) {

    object = {
      title: form.title.value,
      main_character: form["main-character"].value,
      description: form.description.value,
      image_url: form.image_url.value,
    }
    fetch("http://localhost:3000/api/v1/animes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(object)
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
  // update
  function editAnimeData(form) {

    console.log("NOW IM HERE", form)
    let animeId = parseInt(popup.childNodes[1].dataset.id)
    // console.log(popup.dataset.id)
    console.log(form)

    let formData = {
      title: form.parentElement.title.value,
      main_character: form.parentElement["main-character"].value,
      description: form.parentElement.description.value,
      image_url: form.parentElement.image_url.value,
    }

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(formData)
    }

    fetch(`http://localhost:3000/api/v1/animes/${animeId}`, configObj)
      .then(resp => resp.json())
      .then(anime => console.log(anime))
    // .then(data => renderAnime(data))

    // form.reset()
  }

  function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

  function deleteAnime() {
    object = {
      title: form.parentElement.title.value,
      main_character: form.parentElement["main-character"].value,
      description: form.parentElement.description.value,
      image_url: form.parentElement.image_url.value,
    }
    fetch(`http://localhost:3000/api/v1/animes/${animeId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(object)
      })
      .then(resp => resp.json())
      .then(anime => console.log(anime))
  }

})