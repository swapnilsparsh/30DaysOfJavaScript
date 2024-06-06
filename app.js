// scripts.js
document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.getElementById("projectsContainer");
  const pageNumbers = document.getElementById("pageNumbers");
  const prevPageButton = document.getElementById("prevPage");
  const nextPageButton = document.getElementById("nextPage");
  const projectsPerPage = 30; // Number of projects to show per page
  let currentPage = 1;
  let totalPages;

  // Function to display projects for the current page
  function displayProjects() {
    const projects = Array.from(
      projectsContainer.getElementsByClassName("maincard")
    );
    totalPages = Math.ceil(projects.length / projectsPerPage);

    // Hide all projects
    projects.forEach((project, index) => {
      project.style.display = "none";
    });

    // Show projects for the current page
    const start = (currentPage - 1) * projectsPerPage;
    const end = start + projectsPerPage;
    for (let i = start; i < end && i < projects.length; i++) {
      projects[i].style.display = "block";
    }

    // Update page numbers
    updatePageNumbers();

    // Enable/disable buttons
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;
  }

  // Function to update page numbers
  function updatePageNumbers() {
    pageNumbers.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const pageNumber = document.createElement("span");
      pageNumber.textContent = i;
      pageNumber.className = "page-number";
      if (i === currentPage) {
        pageNumber.classList.add("current");
      } else {
        pageNumber.addEventListener("click", () => {
          currentPage = i;
          displayProjects();
          scrollToTop();
        });
      }
      pageNumbers.appendChild(pageNumber);
    }
  }

  // Function to scroll smoothly to the top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  function toggleBackToTopBtn() {
    if (window.scrollY > 200) {
      backToTopBtn.style.display = "flex";
    } else {
      backToTopBtn.style.display = "none";
    }
  }

  // Event listeners for pagination buttons
  prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayProjects();
      scrollToTop();
    }
  });
  backToTopBtn.addEventListener("click", () => {
    scrollToTop();
  });

  nextPageButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayProjects();
      scrollToTop();
    }
  });
  window.addEventListener("scroll", toggleBackToTopBtn);
  // Event listener for dark mode toggle
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      darkModeIcon.textContent = "☀️";
    } else {
      darkModeIcon.textContent = "🌙";
    }
  });
  // Initial display of projects
  displayProjects();
  toggleBackToTopBtn(); // Check initial scroll position
});
