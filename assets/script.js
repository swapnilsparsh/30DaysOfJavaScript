document.addEventListener("DOMContentLoaded", function(event) {

  window.addEventListener("scroll", function() {
    if (document.documentElement.scrollTop >= 100) {
      scroll_button.classList.remove("hidden")
    } else {
      scroll_button.classList.add("hidden")
    }
  })

// Adding delay
  scroll_button.addEventListener("click", function(event) {
    event.preventDefault()
    setTimeout(function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
    }, 800);
  })


})
