function funQrCode() {
  const inputText = document.querySelector("#input-text").value;
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${inputText}`;

  const img = document.querySelector("#img-qr-code");

  img.src = url;
}