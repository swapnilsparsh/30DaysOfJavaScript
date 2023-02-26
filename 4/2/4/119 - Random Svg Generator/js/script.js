// CREDIT: https://github.com/boringdesigners/boring-avatars/blob/master/src/lib/utilities.js
function hashCode(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        let character = name.charCodeAt(i);
        hash = (hash << 5) - hash + character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

function getModulus(num, max) {
    return num % max;
}

function getDigit(number, ntn) {
    return Math.floor((number / Math.pow(10, ntn)) % 10);
}

function getBoolean(number, ntn) {
    return !(getDigit(number, ntn) % 2);
}

function getAngle(x, y) {
    return (Math.atan2(y, x) * 180) / Math.PI;
}

function getUnit(number, range, index) {
    let value = number % range;

    if (index && getDigit(number, index) % 2 === 0) {
        return -value;
    } else return value;
}

function getRandomColor(number, colors, range) {
    return colors[number % range];
}

function getContrast(hexcolor) {
    // If a leading # is provided, remove it
    if (hexcolor.slice(0, 1) === "#") {
        hexcolor = hexcolor.slice(1);
    }

    // Convert to RGB value
    let r = parseInt(hexcolor.substr(0, 2), 16);
    let g = parseInt(hexcolor.substr(2, 2), 16);
    let b = parseInt(hexcolor.substr(4, 2), 16);

    // Get YIQ ratio
    let yiq = (r * 299 + g * 587 + b * 114) / 1000;

    // Check contrast
    return yiq >= 128 ? "#0f172a" : "#f8fafc";
}

const SIZE = 36;

function generateData(name, colors) {
    const numFromName = hashCode(name);
    const range = colors && colors.length;
    const wrapperColor = getRandomColor(numFromName, colors, range);
    const preTranslateX = getUnit(numFromName, 10, 1);
    const wrapperTranslateX =
        preTranslateX < 5 ? preTranslateX + SIZE / 9 : preTranslateX;
    const preTranslateY = getUnit(numFromName, 10, 2);
    const wrapperTranslateY =
        preTranslateY < 5 ? preTranslateY + SIZE / 9 : preTranslateY;

    const data = {
        wrapperColor: wrapperColor,
        faceColor: getContrast(wrapperColor),
        backgroundColor: getRandomColor(numFromName + 13, colors, range),
        wrapperTranslateX: wrapperTranslateX,
        wrapperTranslateY: wrapperTranslateY,
        wrapperRotate: getUnit(numFromName, 360),
        wrapperScale: 1 + getUnit(numFromName, SIZE / 12) / 10,
        isMouthOpen: getBoolean(numFromName, 2),
        isCircle: getBoolean(numFromName, 1),
        eyeSpread: getUnit(numFromName, 5),
        mouthSpread: getUnit(numFromName, 3),
        faceRotate: getUnit(numFromName, 10, 3),
        faceTranslateX: wrapperTranslateX > SIZE / 6 ?
            wrapperTranslateX / 2 : getUnit(numFromName, 8, 1),
        faceTranslateY: wrapperTranslateY > SIZE / 6 ?
            wrapperTranslateY / 2 : getUnit(numFromName, 7, 2),
    };

    return data;
}

const AvatarBeam = (name = "", colors, size = 128, square) => {
        const data = generateData(name, colors);

        return `
      <svg
        viewBox="0 0 ${SIZE} ${SIZE}"
        fill="none"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        width="${size}"
        height="${size}"
      >
        <title>${name}</title>
        <mask
          id="mask__beam"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="${SIZE}"
          height="${SIZE}"
        >
          <rect
            width="${SIZE}"
            height="${SIZE}"
            rx="${square ? 0 : SIZE * 2}"
            fill="#FFFFFF"
          />
        </mask>
        <g mask="url(#mask__beam)">
          <rect width="${SIZE}" height="${SIZE}" fill="${data.backgroundColor}" />
          <rect
            x="0"
            y="0"
            width="${SIZE}"
            height="${SIZE}"
            transform="translate(${data.wrapperTranslateX} ${
      data.wrapperTranslateY
    })
            rotate(${data.wrapperRotate})
            scale(${data.wrapperScale})"
            fill="${data.wrapperColor}"
            rx="${data.isCircle ? SIZE : SIZE / 6}"
          />
          <g
            transform="translate(${data.faceTranslateX} ${data.faceTranslateY}) 
            rotate(${data.faceRotate} ${SIZE / 2} ${SIZE / 2})"
          >
            ${
              data.isMouthOpen
                ? `<path
                d="M15 ${19 + data.mouthSpread} c2 1 4 1 6 0"
                stroke="${data.faceColor}"
                fill="none"
                strokeLinecap="round"
              />`
                : `<path
                d="M13, ${19 + data.mouthSpread} a1,0.75 0 0,0 10,0"
                fill="${data.faceColor}"
              />`
            }
            <rect
              x="${14 - data.eyeSpread}"
              y="14"
              width="1.5"
              height="2"
              rx="1"
              stroke="none"
              fill="${data.faceColor}"
            />
            <rect
              x="${20 + data.eyeSpread}"
              y="14"
              width="1.5"
              height="2"
              rx="1"
              stroke="none"
              fill="${data.faceColor}"
            />
          </g>
        </g>
      </svg>
      `;
  };
  const COLORS = ["#f97316", "#84cc16", "#22c55e", "#0ea5e9", "#f43f5e"];
const avatarContainer = document.querySelector(".avatar-container");
avatarContainer.innerHTML = AvatarBeam("", COLORS, 140);

const inputElement = document.querySelector("#name");
inputElement.addEventListener("keyup", (e) => {
  avatarContainer.innerHTML = AvatarBeam(
    e.target.value,
    ["#f97316", "#84cc16", "#22c55e", "#0ea5e9", "#f43f5e"],
    140,
    false
  );
});

const downloadBtn = document.querySelector("#download");
downloadBtn.addEventListener("click", () => {
  let svgData = avatarContainer.outerHTML;
  let preface = '<?xml version="1.0" standalone="no"?>\r\n';
  let svgBlob = new Blob([preface, svgData], {
    type: "image/svg+xml;charset=utf-8",
  });
  let svgUrl = URL.createObjectURL(svgBlob);
  let downloadLink = document.createElement("a");
  downloadLink.href = svgUrl;
  downloadLink.download = svgUrl.split("/")[3];
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
});