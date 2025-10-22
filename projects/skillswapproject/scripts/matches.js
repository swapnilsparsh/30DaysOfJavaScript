function parseSkills(skillString) {
  return skillString
    .toLowerCase()
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

const matchesContainer = document.getElementById('matches-list');
const oneSidedContainer = document.getElementById('one-sided-list');
const chatPreview = document.getElementById('chat-preview');
const chatUserName = document.getElementById('chat-user-name');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendChatBtn = document.getElementById('send-chat-btn');
const emailChatBtn = document.getElementById('email-chat-btn');
const closeChatBtn = document.getElementById('close-chat-btn');

const allProfiles = JSON.parse(localStorage.getItem('skillSwap_profiles')) || [];
const currentUser = allProfiles[allProfiles.length - 1];

if (!currentUser) {
  matchesContainer.innerHTML = `<p>No profile found. Please fill your skill journey first!</p>`;
  oneSidedContainer.innerHTML = `<p>No profile found. Please fill your skill journey first!</p>`;
} else {
  const currentUserOfferSkills = parseSkills(currentUser.skillOffer);
  const currentUserWantSkills = parseSkills(currentUser.skillWant);

  // Mutual matches: Both want each other's offered skills
  const matchedUsers = allProfiles.filter(profile => {
    if (profile.name === currentUser.name) return false;

    const profileOfferSkills = parseSkills(profile.skillOffer);
    const profileWantSkills = parseSkills(profile.skillWant);

    // Does currentUser want something profile offers?
    const wantsOffered = currentUserWantSkills.some(skill => profileOfferSkills.includes(skill));
    // Does profile want something currentUser offers?
    const offersWanted = currentUserOfferSkills.some(skill => profileWantSkills.includes(skill));

    return wantsOffered && offersWanted;
  });

  // One-sided matches: Current user offers skill that others want, but they do NOT offer what current user wants
  const oneSidedUsers = allProfiles.filter(profile => {
    if (profile.name === currentUser.name) return false;

    const profileOfferSkills = parseSkills(profile.skillOffer);
    const profileWantSkills = parseSkills(profile.skillWant);

    const profileDoesNotOfferWhatUserWants = !profileOfferSkills.some(skill => currentUserWantSkills.includes(skill));
    const offersWanted = currentUserOfferSkills.some(skill => profileWantSkills.includes(skill));

    return offersWanted && profileDoesNotOfferWhatUserWants;
  });

  // Utility function to show a message inside a container
  function renderAlert(container, message) {
    container.innerHTML = `<p>${message}</p>`;
  }

  // Render mutual matches or fallback message
  if (matchedUsers.length === 0) {
    renderAlert(matchesContainer, "No mutual matches found right now.");
  } else {
    matchesContainer.innerHTML = '';
    matchedUsers.forEach(profile => {
      matchesContainer.appendChild(createUserCard(profile));
    });
  }

  // Render one-sided matches or fallback message
  if (oneSidedUsers.length === 0) {
    renderAlert(oneSidedContainer, "No one-sided interest matches found.");
  } else {
    oneSidedContainer.innerHTML = '';
    oneSidedUsers.forEach(profile => {
      oneSidedContainer.appendChild(createUserCard(profile));
    });
  }
}

// Create user card element with chat button
function createUserCard(profile) {
  const card = document.createElement('div');
  card.className = 'user-card';
  card.innerHTML = `
    <h4>${profile.name}</h4>
    <p><strong>Offers:</strong> ${profile.skillOffer}</p>
    <p><strong>Wants:</strong> ${profile.skillWant}</p>
    <p><strong>City:</strong> ${profile.location}</p>
    <button class="chat-btn">💬 Chat</button>
  `;

  card.querySelector('.chat-btn').addEventListener('click', () => openChat(profile));

  return card;
}

let activeChatProfile = null;

// Open chat preview with selected profile
function openChat(profile) {
  activeChatProfile = profile;
  chatUserName.textContent = profile.name;
  chatMessages.innerHTML = `<p class="system">This is a simulated chat with ${profile.name}.</p>`;
  chatInput.value = '';
  chatPreview.classList.remove('hidden');
}

// Send chat message simulation
sendChatBtn.addEventListener('click', () => {
  const message = chatInput.value.trim();
  if (!message) return;

  addChatMessage(message, 'outgoing');
  chatInput.value = '';

  // Simulate a reply after 1.5 seconds
  setTimeout(() => {
    addChatMessage(`Thanks for your message! Let's connect soon.`, 'incoming');
  }, 1500);
});

function addChatMessage(text, type) {
  const msg = document.createElement('div');
  msg.className = `message ${type}`;
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Close chat preview
closeChatBtn.addEventListener('click', () => {
  chatPreview.classList.add('hidden');
  activeChatProfile = null;
  chatMessages.innerHTML = '';
});

// Email chat button functionality
emailChatBtn.addEventListener('click', () => {
  if (!activeChatProfile) return;

  const recipientEmail = activeChatProfile.email || '';
  const currentUserEmail = currentUser.email || '';

  if (!recipientEmail) {
    alert("This user doesn't have an email listed.");
    return;
  }

  const subject = encodeURIComponent("SkillSwap: Let's connect!");
  const body = encodeURIComponent(
    `Hi ${activeChatProfile.name},\n\nI'd like to connect with you for a skill swap.\n\nMy email: ${currentUserEmail}\n\nBest regards,\n${currentUser.name}`
  );

  const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

  window.location.href = mailtoLink;
});
