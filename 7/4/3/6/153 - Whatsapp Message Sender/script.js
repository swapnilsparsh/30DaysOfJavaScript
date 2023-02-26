document.getElementById("1").addEventListener("click", () => {
  let num = document.getElementById("num").value;
  let message = document.getElementById("message").value;
  if (num === "" || message === "") {
    alert("Please, Enter both the fields properly!");
    document.getElementById("num").value = "";
  } else {
    let link = `http://Wa.me/${num}?text=${message}`;
    window.open(link);
  }
});
