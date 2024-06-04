function convert() {
    let to_convert = document.getElementById("to_convert").value;

    // Function to convert binary to decimal
    function binaryToDecimal(binary) {
        return parseInt(binary, 2);
    }

    // Convert the binary number to decimal
    let decimalResult = binaryToDecimal(to_convert);

    // Visualizing results
    let final = document.getElementById("res");
    final.value = decimalResult;
}
