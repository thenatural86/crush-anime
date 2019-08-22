let animes = []
let users = []

document.addEventListener("DOMContentLoaded", function(e) {
  fetchAnimes().then(function() {
    fetchUsers()
  })

  const mainContainer = document.getElementById("main-container")
  const userContainer = document.getElementById("user-container")
  const animeContainer = document.getElementById("anime-container")
  const popUpContainer = document.getElementById("edit-button").parentNode
    .parentNode
  // let likeCount = event.target.parentNode.querySelector(".likes").innerText

  mainContainer.addEventListener("submit", function(event) {
    event.preventDefault()
    // debugger
    if (event.target.className === "add-anime-form") {
      console.log(event.target)
      postAnimeData(event.target)
    }
  })

  mainContainer.addEventListener("click", function(event) {
    // event.preventDefault()
    if (event.target.className === "update-button") {
      console.log(event.target.dataset.id)

      let popup = document.getElementById("myPopup")
      popup.classList.toggle("show")
      popup.dataset.id = event.target.dataset.id

      const title = document.getElementById("title")
      title.value = `${
        event.target.parentNode.parentNode.children[0].innerText
      }`

      const character = document.getElementById("character")
      character.value = `${
        event.target.parentNode.parentNode.children[1].innerText.split(":")[1]
      }`

      const description = document.getElementById("description")
      description.value = `${
        event.target.parentNode.parentNode.children[2].innerText
      }`

      const image = document.getElementById("image")
      image.value = `${
        event.target.parentNode.parentNode.children[3].children[0].src
      }`
    } else if (event.target.className === "remove-button") {
      console.log("remove-button")
      deleteAnime(event.target)
    } else if (event.target.className === "like-button") {
      console.log(
        parseInt(event.target.parentNode.querySelector(".likes").innerText)
      )
    }
  })
  popUpContainer.addEventListener("submit", function(event) {
    if (event.target.className === "edit-anime-form") {
      console.log(event.target.className)
      // debugger
      editAnimeData(event.target)
      let popup = document.getElementById("myPopup")
      popup.classList.toggle("show")
      popup.dataset.id = event.target.dataset.id
    }
  })
  userContainer.addEventListener("submit", function(event) {
    event.preventDefault()
    console.log(event.target.querySelector("select").value)
    const userId = event.target.dataset.userId
    const animeId = event.target.querySelector("select").value

    fetch("http://localhost:3000/api/v1/user_animes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        anime_id: animeId
      })
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        // debugger
        // let userAnimeContainers = document.querySelectorAll('user-anime-container')
        // userAnimeContainers.forEach(container => {
        //   if (container.dataset.userId === data.user_id) {
        //     const anime = animes.find(anime => anime.id === data.anime_id)
        //     userAnimeContainer.insertAdjacentHTML("beforeend", renderUser(anime))
        //     // renderTargetAnime(anime)
        //   }
        users[0][0].user_animes.push(data)
        renderUser(users[0][0])
      })
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
    let animeCard

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
         <div class="likes">0</div>
         <input class="like-button" data-id=${
           anime.id
         } type="button" value="Like">
        <input class="update-button" data-id=${
          anime.id
        } type="button" value="Update">
        <input class="remove-button" data-id=${
          anime.id
        } type="button" value="Remove">
      </div>`
    )
    animeCard = document.getElementById(`anime-card-${anime.id}`)
  }
  // read
  function fetchUsers() {
    fetch("http://localhost:3000/api/v1/users")
      .then(resp => resp.json())
      .then(data => {
        // console.log(data)
        // debugger
        // users = data
        users.push(data)
        data.forEach(renderUser)
      })
  }
  // read
  function renderUser(user) {
    const anime_ids = user.user_animes.map(user_anime => user_anime.anime_id)
    const targetAnimes = anime_ids.map(id =>
      animes.find(anime => anime.id === id)
    )

    // console.log(targetAnimes)
    let targetAnimeHtml = targetAnimes.map(renderTargetAnime).join("")

    userContainer.innerHTML = `<div class="user-card">
          <h3 class="user-name">Username: ${user.name}</h3>
          <h4 class="user-favorite-anime">Favorite Anime: ${
            user.favorite_anime
          }</h4>
        <div class="user-anime-container" data-user-id=${user.id}>
          ${targetAnimeHtml}
        </div>

        <div>
          <form class="userForm" data-user-id=${user.id}>
            <select data-id=${user.id}>
            ${animes.map(anime => {
              return `<option value=${anime.id}>${anime.title}</option>`
            })}
            </select>
            <button>Add Anime</button>
          </form>
        </div>

      </div>
      `
  }

  // create
  function postAnimeData(form) {
    object = {
      title: form.title.value,
      main_character: form["main-character"].value,
      description: form.description.value,
      image_url: form.image_url.value
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
      .then(data => {
        renderAnime(data)
        // renderTargetAnime(data)
        // renderUser()
      })

    form.reset()
  }

  function renderTargetAnime(anime) {
    return `
  <div data-id=${anime.id}>
  <li>${anime.title}</li>
  </div>
  `
  }
  // update
  function editAnimeData(form) {
    console.log("NOW IM HERE", form)
    // debugger
    // console.log(popup.dataset.id)
    // debugger
    let animeId = parseInt(popup.childNodes[1].dataset.id)

    let formData = {
      title: form.title.value,
      main_character: form["main-character"].value,
      description: form.description.value,
      image_url: form.image_url.value
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
      .then(anime => {
        console.log(anime)
        editRenderAnime(anime)
      })

    // .then(data => renderAnime(data))
    // debugger
    form.reset()
  }

  function myFunction() {
    var popup = document.getElementById("myPopup")
    popup.classList.toggle("show")
  }
  // delete
  function deleteAnime(form) {
    let deleteId = parseInt(event.target.dataset.id)
    let deleteItem = event.target.parentNode.parentNode
    fetch(`http://localhost:3000/api/v1/animes/${deleteId}`, {
      method: "DELETE"
    })
      .then(resp => resp.json())
      .then(function(json) {
        deleteItem.remove()
        // debugger
      })
  }

  function editRenderAnime(anime) {
    let animeCard = document.getElementById(`anime-card-${anime.id}`)

    animeCard.innerHTML = ` 
      <h3 class="anime-title">${anime.title}</h3>
      <h4 class="anime-main-character">Main Character: ${
        anime.main_character
      }</h4>
      <p class="anime-description">${anime.description}</p>
      <div class="image-wrapper">
      <img class="image" src="${anime.image_url}" alt="">
      <div class="likes">Likes: 0</div>
      <input class="like-button" data-id=${anime.id} type="button" value="Like">
      <input class="update-button" data-id=${
        anime.id
      } type="button" value="Update">
      <input class="remove-button" data-id=${
        anime.id
      } type="button" value="Remove">
    `
  }
})
