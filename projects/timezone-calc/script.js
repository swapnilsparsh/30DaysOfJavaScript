const targetTimezones = [
  "America/New_York",
  "Europe/London",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Asia/Dubai",
  "Asia/Kolkata"
];

function convertTime() {
  const inputTime = document.getElementById('datetime').value;
  const sourceZone = document.getElementById('source').value;
  const resultDiv = document.getElementById('results');
  resultDiv.innerHTML = "";

  if (!inputTime) {
    resultDiv.innerHTML = "<p>Please select a valid date and time.</p>";
    return;
  }

  // Convert input to Date object
  const localDate = new Date(inputTime);
  const utcDate = new Date(localDate.toLocaleString("en-US", { timeZone: "UTC" }));

  // Display converted times
  targetTimezones.forEach(zone => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: zone,
      dateStyle: 'medium',
      timeStyle: 'short'
    }
  );
    const converted = formatter.format(utcDate);

    if (sourceZone != zone) {
      const div = document.createElement('div');
      div.classList.add('timezone');
      div.innerHTML = `<strong>${zone}</strong><br>${converted}`;
      resultDiv.appendChild(div);
    }
  });
}