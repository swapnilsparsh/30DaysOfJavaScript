/* Change this file to get your personal Porfolio */

// Website related settings
const settings = {
  isSplash: false, // Change this to false if you don't want Splash screen.
};

//SEO Related settings
const seo = {
  title: "Aryan's Portfolio",
  description:
    "A passionate individual who always thrives to work on end to end products which develop sustainable and scalable social and technical systems to create impact.",
  og: {
    title: "Aryan Gupta Portfolio",
    type: "website",
    url: "http://aryangupta.com/",
  },
};

//Home Page
const greeting = {
  title: "Aryan Gupta",
  logo_name: "AryanGupta",
  subTitle:
    "A passionate individual who always thrives to work on end to end products which develop sustainable and scalable social and technical systems to create impact.",
  resumeLink:
    "https://drive.google.com/file/d/1Wiz7qYX81JAS2nrdFbozLovLbQcsMoCP/view?usp=sharing",
  portfolio_repository: "https://github.com/aryangupta008/aryangupta008",
  githubProfile: "https://github.com/aryangupta008",
};

const socialMediaLinks = [
  /* Your Social Media Link */
  // github: "https://github.com/ashutosh1919",
  // linkedin: "https://www.linkedin.com/in/ashutosh-hathidara-88710b138/",
  // gmail: "ashutoshhathidara98@gmail.com",
  // gitlab: "https://gitlab.com/ashutoshhathidara98",
  // facebook: "https://www.facebook.com/laymanbrother.19/",
  // twitter: "https://twitter.com/ashutosh_1919",
  // instagram: "https://www.instagram.com/layman_brother/"

  {
    name: "Github",
    link: "https://github.com/aryangupta008",
    fontAwesomeIcon: "fa-github", // Reference https://fontawesome.com/icons/github?style=brands
    backgroundColor: "#181717", // Reference https://simpleicons.org/?q=github
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/aryan-gupta-18270b1aa/",
    fontAwesomeIcon: "fa-linkedin-in", // Reference https://fontawesome.com/icons/linkedin-in?style=brands
    backgroundColor: "#0077B5", // Reference https://simpleicons.org/?q=linkedin
  },
  {
    name: "Gmail",
    link: "mailto:aryanetaundiya@gmail.com",
    fontAwesomeIcon: "fa-google", // Reference https://fontawesome.com/icons/google?style=brands
    backgroundColor: "#D14836", // Reference https://simpleicons.org/?q=gmail
  },
  {
    name: "Twitter",
    link: "https://twitter.com/wakeuparyan",
    fontAwesomeIcon: "fa-twitter", // Reference https://fontawesome.com/icons/twitter?style=brands
    backgroundColor: "#1DA1F2", // Reference https://simpleicons.org/?q=twitter
  },
  {
    name: "Facebook",
    link: "https://www.facebook.com/aryan.etondia/",
    fontAwesomeIcon: "fa-facebook-f", // Reference https://fontawesome.com/icons/facebook-f?style=brands
    backgroundColor: "#1877F2", // Reference https://simpleicons.org/?q=facebook
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/wakeupparyan/",
    fontAwesomeIcon: "fa-instagram", // Reference https://fontawesome.com/icons/instagram?style=brands
    backgroundColor: "#E4405F", // Reference https://simpleicons.org/?q=instagram
  },
];

const skills = {
  data: [
    {
      title: "Backend Development",
      fileName: "FullStackImg",
      skills: [
        "⚡ Creating application backend in Node & Express. ",
        "⚡ Design perform, robust APIs. ",
        "⚡ Solving issues and analyzing bottlenecks. ",
        "⚡ Optimization of Web Applications for performance and scalability. ",
      ],
      softwareSkills: [
        {
          skillName: "HTML5",
          fontAwesomeClassname: "simple-icons:html5",
          style: {
            color: "#E34F26",
          },
        },
        {
          skillName: "CSS3",
          fontAwesomeClassname: "fa-css3",
          style: {
            color: "#1572B6",
          },
        },
        {
          skillName: "JavaScript",
          fontAwesomeClassname: "simple-icons:javascript",
          style: {
            backgroundColor: "#000000",
            color: "#F7DF1E",
          },
        },
        {
          skillName: "ReactJS",
          fontAwesomeClassname: "simple-icons:react",
          style: {
            color: "#61DAFB",
          },
        },
        {
          skillName: "NodeJS",
          fontAwesomeClassname: "simple-icons:node-dot-js",
          style: {
            color: "#339933",
          },
        },
        {
          skillName: "NPM",
          fontAwesomeClassname: "simple-icons:npm",
          style: {
            color: "#CB3837",
          },
        },
        {
          skillName: "MySQL",
          fontAwesomeClassname: "logos:mysql",
          style: {
            color: "#CB3837",
          },
        },
        {
          skillName: "MongoDb",
          fontAwesomeClassname: "logos:mongodb-icon",
          style: {
            color: "#CB3837",
          },
        },
        {
          skillName: "C++",
          fontAwesomeClassname: "vscode-icons:file-type-cpp3",
          style: {
            color: "#CB3837",
          },
        },
      ],
    },
  ],
};

// Education Page
const competitiveSites = {
  competitiveSites: [
    {
      siteName: "HackerRank",
      iconifyClassname: "simple-icons:hackerrank",
      style: {
        color: "#2EC866",
      },
      profileLink: "https://www.hackerrank.com/AryanGupta",
    },
    {
      siteName: "Codechef",
      iconifyClassname: "simple-icons:codechef",
      style: {
        color: "#5B4638",
      },
      profileLink: "https://www.codechef.com/users/aryan8112",
    },
    {
      siteName: "Codeforces",
      iconifyClassname: "simple-icons:codeforces",
      style: {
        color: "#1F8ACB",
      },
      profileLink: "https://codeforces.com/profile/_aryan_gupta_007",
    },
    {
      siteName: "Hackerearth",
      iconifyClassname: "simple-icons:hackerearth",
      style: {
        color: "#323754",
      },
      profileLink: "https://www.hackerearth.com/@aryanetaundiya",
    },
    {
      siteName: "Leetcode",
      iconifyClassname: "cib:leetcode",
      style: {
        color: "#20BEFF",
      },
      profileLink: "https://leetcode.com/wakeuparyan/",
    },
    {
      siteName: "GeeksforGeeks",
      iconifyClassname: "simple-icons:geeksforgeeks",
      style: {
        color: "#20BEFF",
      },
      profileLink: "https://auth.geeksforgeeks.org/user/aryan007/profile",
    },
  ],
};

const degrees = {
  degrees: [
    {
      title: "Pranveer Singh Institute of Technology",
      subtitle: "B.Tech. in Electrionics and Communications",
      alt_name: "PSIT",
      duration: "2019 - Present",
      descriptions: [
        "⚡ I have studied basic Electronics engineering subjects like DBMS, Data Communications, Digital System Design, Microprocessors, etc.",
        "⚡ Apart from this, I have done courses on Data Structures & Algorithms, Competitive Programming and Full Stack Development.",
        "⚡ I was selected for Elite Group of College which is formed by top 20% of students. ",
      ],
      website_link: "https://www.psit.ac.in/",
    },
  ],
};

const certifications = {
  certifications: [
    {
      title: "Google Hashcode",
      subtitle: "-Google Competitions",
      logo_path: "google_logo.png",
      certificate_link:
        "https://codingcompetitions.withgoogle.com/hashcode/certificate/summary/00000000008cb4d4",
      alt_name: "Google",
      color_code: "#0C9D5899",
    },
    {
      title: "Microsoft Office",
      subtitle: "- NIIT",
      logo_path: "microsoft_logo.png",
      alt_name: "Microsoft",
      color_code: "#D83B0199",
    },
    {
      title: "Google Kickstart",
      subtitle: "- Google Competitions",
      logo_path: "google_logo.png",
      certificate_link:
        "https://codingcompetitions.withgoogle.com/kickstart/certificate/summary/0000000000435bad",
      alt_name: "Google",
      color_code: "#0C9D5899",
    },
    {
      title: "Backend Development",
      subtitle: "- Relevel",
      logo_path: "coursera_logo.png",
      alt_name: "Unacademy",
      color_code: "#2A73CC",
    },
    {
      title: "CPP",
      subtitle: "- NIIT",
      logo_path: "google_logo.png",
      alt_name: "NIIT",
      color_code: "#2A73CC",
    },
  ],
};

// Experience Page
const experience = {
  title: "Experience",
  subtitle: "Work, Internship and Volunteership",
  description:
    "I have worked on various projects as a Developer. I love organising events and that is why I am also in a lot of opensource communities as a representative. ",
  header_image_path: "experience.svg",
  sections: [
    {
      title: "Internships",
      experiences: [
        {
          title: "Virtual Intern",
          company: "Future Ready Talent ",
          company_url: "https://futurereadytalent.in",
          logo_path: "microsoft_logo.png",
          duration: "May 2020 - Sept 2021",
          location: "Work From Home",
          description: "I have created and deployed a cloud computing project.",
          color: "#ee3c26",
        },
      ],
    },
    {
      title: "Volunteerships",
      experiences: [
        {
          title: "Elite Batch Student Member",
          company: "Elite Batch PSIT",
          logo_path: "dsc_logo.png",
          duration: "Dec 2020 - Nov 2021",
          location: "Kanpur, Uttar Pradesh",
          description:
            "We have well established Elite Club in our college. We organizes Data Structures and Algorithm workshops, Writing clean codes and Hosting events on various trending Technologies.",
          color: "#0C9D58",
        },
        {
          title: "Developer Program Member",
          company: "Github",
          company_url: "https://github.com/",
          logo_path: "github_logo.png",
          duration: "July 2019 - PRESENT",
          location: "Work From Home",
          description:
            "I am actively contributing to opensource projects . Keenly looking for a blockchain project. ",
          color: "#181717",
        },
      ],
    },
  ],
};

// Projects Page
const projectsHeader = {
  title: "Projects",
  description:
    "My projects makes use of vast variety of latest technology tools. My best experience is to create projects and deploy them to web applications.",
  avatar_image_path: "projects_image.svg",
};

// Contact Page
const contactPageData = {
  contactSection: {
    title: "Contact Me",
    // profile_image_path: "animated_ashutosh.png",
    description:
      "I am available on almost every social media. You can message me, I will reply within 24 hours. I can help you with DataStructures,Code Quality,Opensource Development, & Backend Development.",
  },
  // blogSection: {
  //   title: "Blogs",
  //   subtitle:
  //     "For individual fundamental empowerment, I like to write powerful lessons that create impact on each of the reader individually to change the core of their character.",
  //   link: "https://ashutoshhathidara.wordpress.com",
  //   avatar_image_path: "blogs_image.svg",
  // },
  addressSection: {
    title: "Address",
    subtitle: "50/267 Halsey Road, Kanpur-208001",
    avatar_image_path: "address_image.svg",
    location_map_link: "https://goo.gl/maps/5qQAmRJkcdM959zs8",
  },
  phoneSection: {
    title: "Phone Number",
    subtitle: "+91-8112791111",
  },
};

export {
  settings,
  seo,
  greeting,
  socialMediaLinks,
  skills,
  competitiveSites,
  degrees,
  certifications,
  experience,
  projectsHeader,
  contactPageData,
};
