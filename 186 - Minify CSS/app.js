// global declarations
var str = "",
    isInside = false,
    disableBtns = document.querySelectorAll(':disabled'),
    dropArea = document.querySelector(".drag-area"),
    input = dropArea.querySelector("input"),
    filename

// Functions
isAlphaNumeric = x => {
    return (x >= "a" && x <= "z") ||
        (x >= "A" && x <= "Z") ||
        (x <= "9" && x >= "0") ||
        x == "#" ||
        x == "." ||
        x == '[' ||
        x == ']';
}

removeChar = (index, end = index + 1) => {
    i--;
    str = str.slice(0, index) + str.slice(end)
}

toggleDisable = () => {
    if (text.value) {
        disableBtns[0].disabled = disableBtns[1].disabled = false;
    } else {
        disableBtns[0].disabled = disableBtns[1].disabled = true;
    }
    if (output.value) {
        disableBtns[2].disabled = false;
    } else {
        disableBtns[2].disabled = true;
    }
}

minify = () => {
    str = text.value;

    for (i = 0; i < str.length; i++) {

        if (str[i] == '"') {
            isInside = !isInside;
            if (isInside)
                continue;
        }

        if (!isInside) {

            if (str[i] == "\n" || str[i] == "\t") {
                removeChar(i);
            }

            if (str[i] == '/' && str[i + 1] == '*') {
                start = i;
                end = str.indexOf("*/", start + 2) == -1 ? str.length + 1 : str.indexOf("*/", start + 2);
                removeChar(start, end + 2);
            }

            if (str[i] == " ") {
                if (!(isAlphaNumeric(str[i + 1]) && isAlphaNumeric(str[i - 1]))) {
                    removeChar(i);
                }
                if (str[i + 1] == "a" && str[i + 2] == "n" && str[i + 3] == "d" && str[i + 4] == " ") {
                    console.log(i)
                    i = i + 4;
                }
            }

            if (str[i] == ";" && str[i + 1] == "}") {
                removeChar(i);
            }
        }
    }
    output.value = str
    outputscroll.click();
    toggleDisable();
}

empty = () => {
    output.value = text.value = '';
    toggleDisable();
}

// Event listeners
text.addEventListener('input', toggleDisable)
output.addEventListener('input', toggleDisable)
btn.addEventListener('click', minify)
reset.addEventListener('click', empty)
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("active");
});
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
});
dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    dropArea.classList.remove("active");
    dropfile = event.dataTransfer.files[0];
    showFile();
});
showFile=()=>{
    if (dropfile.type == 'text/css') {
        let fileReader = new FileReader();
        filename=dropfile.name;
        console.log(filename)
        fileReader.readAsText(dropfile);
        fileReader.onload = () => {
            text.value = fileReader.result;
            toggleDisable();
    minifyscroll.click();
        }
    } else {
        alert("Doesn't seem to be CSS File!");
        dropArea.classList.remove("active");
    }
}

function download(filename, textInput) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textInput));
    element.setAttribute('download', filename?filename:'style.css');
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

document.getElementById("download")
    .addEventListener("click", function () {
        console.log(input.files[0])
        download(filename, output.value);
    });

input.addEventListener('change', () => {
    let read = new FileReader();
    read.readAsText(input.files[0])
    filename=input.files[0].name;
    console.log(filename)

    read.addEventListener('load', () => {
        text.value = read.result;
        toggleDisable();
    minifyscroll.click();
    })
})