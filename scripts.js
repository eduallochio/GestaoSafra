// Script para rolagem suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    })
  })
})

// Script para o botão de voltar ao topo
const backToTopButton = document.querySelector(".back-to-top")
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show")
  } else {
    backToTopButton.classList.remove("show")
  }
})

// Adiciona evento de clique ao botão de voltar ao topo
backToTopButton.addEventListener("click", (e) => {
  e.preventDefault()
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Script para o carrossel
document.querySelectorAll(".carousel").forEach((carousel) => {
  let currentIndex = 0
  const items = carousel.querySelectorAll(".carousel-item")
  const totalItems = items.length

  carousel
    .querySelector(".carousel-control-next")
    .addEventListener("click", () => {
      items[currentIndex].classList.remove("active")
      currentIndex = (currentIndex + 1) % totalItems
      items[currentIndex].classList.add("active")
    })

  carousel
    .querySelector(".carousel-control-prev")
    .addEventListener("click", () => {
      items[currentIndex].classList.remove("active")
      currentIndex = (currentIndex - 1 + totalItems) % totalItems
      items[currentIndex].classList.add("active")
    })
})
