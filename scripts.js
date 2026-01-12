// Script para rolagem suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      })
    }
  })
})

// Atualiza o ano no footer automaticamente
const currentYearElement = document.getElementById('current-year')
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear()
}

// Botão de download do app - detecta sistema operacional
const downloadButton = document.getElementById('download-app')
if (downloadButton) {
  downloadButton.addEventListener('click', function(e) {
    e.preventDefault()
    
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    
    // Detecta iOS
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.location.href = 'https://apps.apple.com/sa/app/gest%C3%A3o-safra/id6480516817'
    }
    // Detecta Android
    else if (/android/i.test(userAgent)) {
      window.location.href = 'https://play.google.com/store/apps/details?id=br.com.gestaosafra'
    }
    // Fallback para outros dispositivos
    else {
      window.location.href = 'https://gestaosafra.com.br/baixar'
    }
  })
}

// Script para o botão de voltar ao topo
const backToTopButton = document.querySelector(".back-to-top")
if (backToTopButton) {
  let scrollTimeout
  
  window.addEventListener("scroll", () => {
    // Debounce para melhor performance
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("show")
      } else {
        backToTopButton.classList.remove("show")
      }
    }, 100)
  }, { passive: true })

  // Adiciona evento de clique ao botão de voltar ao topo
  backToTopButton.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Highlight da navegação ativa ao scroll
const sections = document.querySelectorAll('.section')
const navLinks = document.querySelectorAll('.navigation a')

let updateTimeout
function updateActiveNav() {
  clearTimeout(updateTimeout)
  updateTimeout = setTimeout(() => {
    let current = ''
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id')
      }
    })

    navLinks.forEach(link => {
      link.classList.remove('active')
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active')
      }
    })
  }, 100)
}

window.addEventListener('scroll', updateActiveNav, { passive: true })

// Animação de fade-in ao scroll com Intersection Observer (mais performático)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1'
      entry.target.style.transform = 'translateY(0)'
      observer.unobserve(entry.target) // Para de observar após animar (otimização)
    }
  })
}, observerOptions)

// Observa todas as seções
document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = '0'
  section.style.transform = 'translateY(30px)'
  section.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
  observer.observe(section)
})


