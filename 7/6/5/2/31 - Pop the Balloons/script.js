let popped = 0;

document.addEventListener('mouseover', function (e) {

  if (e.target.className === "balloon") {

    e.target.style.backgroundColor = "#19172e";
    e.target.textContent = "🎈";
    popped++;
    removeEvent(e);
    checkAllPopped();
  }
});

function removeEvent(e) {
  e.target.removeEventListener('mouseover', function () {

  })
};

function checkAllPopped() {
  if (popped === 10) {
    console.log('all popped!');
    let gallery = document.querySelector('#balloon-gallery');
    let message = document.querySelector('#yay-no-balloons');
    gallery.innerHTML = '';
    message.style.display = 'block';
  }
};