// Helper function to simulate async saving
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// DOM Elements
const form = document.getElementById("profile-form");
const recommendationsGrid = document.querySelector(".recommendations-grid");

const searchInput = document.getElementById("search-filter");
const savedProfilesContainer = document.getElementById("saved-profiles-list");

let allProfiles = [];
let savedProfiles = [];

// Load profiles on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedData = localStorage.getItem("skillSwap_profiles");
  const savedLaterData = localStorage.getItem("skillSwap_savedProfiles");

  allProfiles = savedData ? JSON.parse(savedData) : [];
  savedProfiles = savedLaterData ? JSON.parse(savedLaterData) : [];

  renderRecommendations();
  renderSavedProfiles();
});

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = {
    name: form.name.value.trim(),
    skillOffer: form.skillOffer.value.trim(),
    skillWant: form.skillWant.value.trim(),
    location: form.location.value.trim(),
    email: form.email.value.trim(),
  };

  await delay(500);
  allProfiles.push(user);
  localStorage.setItem("skillSwap_profiles", JSON.stringify(allProfiles));

  document.querySelector(".card").classList.add("locked");
  showSuccessMessage();
  renderRecommendations();
});

// Show a message + "Find Matches" button
function showSuccessMessage() {
  const successMsg = document.createElement("div");
  successMsg.className = "success-message";
  successMsg.innerHTML = `
    <p>✅ Profile saved successfully!</p>
    <a href="matches.html" class="find-matches-btn">🔍 Find Matches</a>
  `;
  form.parentElement.appendChild(successMsg);
}

// Render Recommendations
function renderRecommendations() {
  recommendationsGrid.innerHTML = "";

  const filtered = filterProfiles(searchInput.value);

  if (filtered.length === 0) {
    recommendationsGrid.innerHTML = "<p>No users found.</p>";
    return;
  }

  filtered.forEach((profile) => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <h4>${profile.name}</h4>
      <p><strong>Offers:</strong> ${profile.skillOffer}</p>
      <p><strong>Wants:</strong> ${profile.skillWant}</p>
      <p><strong>City:</strong> ${profile.location}</p>
      <p><strong>Email:</strong> ${profile.email || "N/A"}</p>
      <button class="save-btn">💾 Save for Later</button>
    `;

    card
      .querySelector(".save-btn")
      .addEventListener("click", () => saveProfileForLater(profile));
    recommendationsGrid.appendChild(card);
  });
}

// Filter logic
searchInput.addEventListener("input", renderRecommendations);

function filterProfiles(query) {
  query = query.toLowerCase();
  return allProfiles.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.skillOffer.toLowerCase().includes(query) ||
      p.skillWant.toLowerCase().includes(query)
  );
}

// Save profile for later
function saveProfileForLater(profile) {
  const alreadySaved = savedProfiles.some((p) => p.name === profile.name);
  if (alreadySaved) {
    alert(`${profile.name} is already saved.`);
    return;
  }

  savedProfiles.push(profile);
  localStorage.setItem(
    "skillSwap_savedProfiles",
    JSON.stringify(savedProfiles)
  );
  renderSavedProfiles();
}

// Render Saved Profiles
function renderSavedProfiles() {
  if (!savedProfilesContainer) return;

  savedProfilesContainer.innerHTML = "";

  if (savedProfiles.length === 0) {
    savedProfilesContainer.innerHTML = "<p>No saved profiles yet.</p>";
    return;
  }

  savedProfiles.forEach((profile) => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <h4>${profile.name}</h4>
      <p><strong>Offers:</strong> ${profile.skillOffer}</p>
      <p><strong>Wants:</strong> ${profile.skillWant}</p>
      <p><strong>City:</strong> ${profile.location}</p>
      <p><strong>Email:</strong> ${profile.email || "N/A"}</p>
      <button class="remove-save-btn">❌ Remove</button>
    `;

    card.querySelector(".remove-save-btn").addEventListener("click", () => {
      removeSavedProfile(profile.name);
    });

    savedProfilesContainer.appendChild(card);
  });
}

// Remove from saved
function removeSavedProfile(name) {
  savedProfiles = savedProfiles.filter((p) => p.name !== name);
  localStorage.setItem(
    "skillSwap_savedProfiles",
    JSON.stringify(savedProfiles)
  );
  renderSavedProfiles();
}