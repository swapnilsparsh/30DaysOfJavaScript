var i = 0;
var images = [
  "https://images.unsplash.com/photo-1633269540827-728aabbb7646?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1932&q=80",
  "https://images.unsplash.com/photo-1633282043211-e262bed3e321?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1633113090205-cc1ac795b5f9?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1633183601291-ec3ddf252825?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1633239894530-d715e7498078?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80"
];

btn_previous.addEventListener("click", function(event) {
  if (i <= 0)
    i = images.length
  i--

  return setImg()
})

btn_next.addEventListener("click", function(event) {
  if (i >= images.length-1)
    i = -1
  i++

  return setImg()
})

function setImg() {
  return image_container.setAttribute("src", images[i])
}
