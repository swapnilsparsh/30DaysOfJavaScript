// listening for the scroll event
window.addEventListener('scroll', () => {
  const contents = document.querySelectorAll('.child-container'); // selecting all the div with text contents
  const logoImages = document.querySelectorAll('.logoImage'); // selecting all logo images
  const screenPosition = window.innerHeight; // taking the scroll postion

  // checking the content position on scroll event to trigger the animation of the content box
  contents.forEach((content) => {
    const contentPosition = content.getBoundingClientRect().top;
    if (contentPosition < screenPosition) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });

  // checking the logo images position on scroll event to trigger the animation of the logo images
  logoImages.forEach((logoImage) => {
    const logoImagePosition = logoImage.getBoundingClientRect().top;
    if (logoImagePosition < screenPosition) {
      logoImage.classList.add('active');
    } else {
      logoImage.classList.remove('active');
    }
  });
});
