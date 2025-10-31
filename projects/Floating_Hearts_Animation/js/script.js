document.addEventListener('click', function (e) {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerText = '❤️';
  document.body.appendChild(heart);

  const colors = ['#ff3e96', '#ff5f6d', '#ffb6c1', '#ff69b4', '#ff7eb3'];
  heart.style.color = colors[Math.floor(Math.random() * colors.length)];
  heart.style.left = e.pageX + 'px';
  heart.style.top = e.pageY + 'px';
  heart.style.fontSize = Math.random() * 20 + 20 + 'px';

  heart.style.transform = `rotate(${Math.random() * 360}deg)`;

  setTimeout(() => {
    heart.remove();
  }, 3000);
});
