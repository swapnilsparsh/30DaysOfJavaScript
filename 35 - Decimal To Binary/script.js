function convert() {
    let to_convert = document.getElementById("to_convert").value;
    to_convert = parseFloat(to_convert);

    // Function to convert decimal to binary
    function decimalToBinary(number) {
        if (number === 0) {
            return "0";
        }
        let binary = "";
        while (number > 0) {
            binary = (number % 2).toString() + binary;
            number = Math.floor(number / 2);
        }
        return binary;
    }

    // Convert the number to binary
    let binaryResult = decimalToBinary(to_convert);

    // Visualizing results
    let final = document.getElementById("res");
    final.value = binaryResult;
}