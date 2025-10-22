// Simulate async delay
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// LocalStorage keys
const STORAGE_KEYS = {
  PROFILES: 'skillSwap_profiles',
  MATCHES: 'skillSwap_matches'
};

// Fetch all profiles from localStorage (async simulated)
export async function fetchProfiles() {
  await delay(500); // simulate network delay
  const data = localStorage.getItem(STORAGE_KEYS.PROFILES);
  return data ? JSON.parse(data) : [];
}

// Save profiles array to localStorage
export async function saveProfiles(profiles) {
  await delay(300);
  localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
}

// Add a new profile and save
export async function addProfile(profile) {
  const profiles = await fetchProfiles();
  profiles.push(profile);
  await saveProfiles(profiles);
  return profile;
}

// Matching algorithm
// Find profiles where:
// - Their skillOffer is in user's skillWant AND
// - Their skillWant is in user's skillOffer
export function findMatchesForUser(userProfile, allProfiles) {
  if (!userProfile) return [];

  const userOffer = userProfile.skillOffer.toLowerCase();
  const userWant = userProfile.skillWant.toLowerCase();

  return allProfiles.filter(profile => {
    if (profile.name === userProfile.name) return false; // exclude self

    const offer = profile.skillOffer.toLowerCase();
    const want = profile.skillWant.toLowerCase();

    // Match if swapped skills
    return (userWant.includes(offer) && want.includes(userOffer));
  });
}

// Simulate fetching matches for a user
export async function fetchMatches(userProfile) {
  await delay(700);
  const profiles = await fetchProfiles();
  return findMatchesForUser(userProfile, profiles);
}
