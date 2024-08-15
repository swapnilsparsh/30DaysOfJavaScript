const container = document.getElementById('container');
const cardslength = 12;
const cards = [];

let previousShownCard = undefined;

let icons = [
  'linkedin',
  'instagram',
  'twitter',
  'whatsapp',
  'youtube',
  'facebook',
];

// Copy the icons again so we can use them in the cards
icons.push(...icons);

// Shuffle the icons
for (let i = 0; i < 100; i++) {
  const idx1 = Math.floor(Math.random() * icons.length);
  const idx2 = Math.floor(Math.random() * icons.length);

  const temp = icons[idx1];
  icons[idx1] = icons[idx2];
  icons[idx2] = temp;
}

for (let i = 0; i < cardslength; i++) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `<div class="front">
                      <i class="fab fa-${icons[i]}"></i>
                    </div>
                    <div class="back"><small>Click me</small></div>`;

  card.addEventListener('click', () => {
    if (!card.classList.contains('show')) {
      card.classList.add('show');

      if (!previousShownCard) {
        previousShownCard = card;
      } else {
        const iconOne = previousShownCard.querySelector('i').classList[1];

        const iconTwo = card.querySelector('i').classList[1];

        if (iconOne !== iconTwo) {
          const temp = previousShownCard;
          setTimeout(() => {
            temp.classList.remove('show');
            card.classList.remove('show');
          }, 1000);
        }
        previousShownCard = undefined;
      }
    }
  });

  cards.push(card);

  container.appendChild(card);

  console.log("Cards", card)
}