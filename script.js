const projectsArea = document.querySelector(".project-list-area");
const searchBar = document.getElementById("search-bar");
let allProjects = []
function getImagePath(id) {
  return `public/assets/${id}.png`;
}

function getProjectUrl(name) {
  return `./projects/${name.toLowerCase().replace(/ /g, '-')}/`;
}

function getGithubUrl(name) {
  const repoName = name.toLowerCase().replace(/ /g, '-');
  return `https://github.com/swapnilsparsh/30DaysOfJavaScript/tree/master/projects/${repoName}`;
}

function getProjectImg(project) {
  const imgParent = document.createElement("div");
  imgParent.className = "project-img-cont";

  const imgElm = document.createElement("img");
  imgElm.src = project.image;
  imgElm.setAttribute("alt", project.name);

  imgParent.appendChild(imgElm);
  return imgParent;
}

function createAnchorElm(href, value, className, attrName, attrValue) {
  const anchorElm = document.createElement("a");
  anchorElm.innerText = value;
  anchorElm.href = href;
  anchorElm.className = className;
  anchorElm.setAttribute(attrName, attrValue);

  return anchorElm;
}

function getProjectLinks(project) {
  const linkContainer = document.createElement("div");
  linkContainer.className = "links";

  const websiteLink = createAnchorElm(project.url, 'Live', "btn", "target", "_blank");
  const githubLink = createAnchorElm(project.github, 'Github', "btn", "target", "_blank");

  linkContainer.append(websiteLink, githubLink);
  return linkContainer;
}

function getProjectContent(project) {
  const contentContainer = document.createElement("div");
  contentContainer.className = "project-detail";
  const contentElm = document.createElement("div");
  contentElm.className = "project-content";

  const projectName = document.createElement("h2");
  projectName.innerText = project.name;

  const projectDescription = document.createElement("p");
  projectDescription.innerText = project.description;

  contentElm.append(projectName, projectDescription);
  contentContainer.appendChild(contentElm);

  return contentContainer;
}

function renderProjectList(projects) {
  projectsArea.innerHTML = ""

  if (projects.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.className = "no-results";
    noResultsMessage.innerText = "No results found";
    projectsArea.appendChild(noResultsMessage);
    return;
  }
  
  projects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.className = "project-card";

    const projectImg = getProjectImg({
      ...project,
      image: getImagePath(project.id),
    });
    const projectContent = getProjectContent(project);
    const projectLinks = getProjectLinks({
      ...project,
      url: getProjectUrl(project.name),
      github: getGithubUrl(project.name),
    });

    projectCard.append(projectImg, projectContent, projectLinks);

    projectsArea.appendChild(projectCard);
  });
}

function filterProjects(query) {
  const filteredProjects = allProjects.filter(project =>
      project.name.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase())
  );
  
  renderProjectList(filteredProjects);
}

function fetchProjects() {

  fetch("./data.json")
      .then((res) => res.json())
      .then((projects) => {
        allProjects = projects;
        renderProjectList(projects);
        searchBar.addEventListener( "input", () => {
          const query = searchBar.value;
          if (query) {
            filterProjects(query)
          }
          else {
            renderProjectList(projects);
          }
        });
      })
      .catch((err) => {
        console.log("Error fetching project data:", err);
      });
}

fetchProjects();