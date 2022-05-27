const billDivideForm = document.getElementById('bill-divider-form');

billDivideForm.addEventListener('submit', billDividerHandler);

function billDividerHandler(event) {
    event.preventDefault();
    const inputs = getInputs();
    console.log(inputs);
    showCalculateOutput(inputs);
}

function getInputs() {
    let subTotal = document.getElementById('subtotal').value;
    let tipPercent = document.getElementById('tip').value;
    let noOfPerson = document.getElementById('no-of-person').value;
    return { subTotal, tipPercent, noOfPerson };


}

function showCalculateOutput(input) {
    billDivideForm.reset();

    let totalTip = (parseFloat(input.subTotal) * parseFloat(input.tipPercent)) / 100;

    let totalAmount = parseFloat(input.subTotal) + totalTip;
    let tipPerPerson = totalTip / parseFloat(input.noOfPerson);
    let amountPerPerson = totalAmount / parseFloat(input.noOfPerson);

    document.getElementById('total-bill').innerHTML = `$ ${totalAmount.toFixed(2)}`;
    document.getElementById('bill-per-person').innerHTML = `$ ${amountPerPerson.toFixed(2)}`;
    document.getElementById('total-tip').innerHTML = `$ ${totalTip.toFixed(2)}`;
    document.getElementById('tip-per-person').innerHTML = `$ ${tipPerPerson.toFixed(2)}`;


}


