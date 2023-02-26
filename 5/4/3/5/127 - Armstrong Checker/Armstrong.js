const txtInput = document.querySelector(".inputs input"),
checkBtn = document.querySelector(".inputs button"),
infoTxt = document.querySelector(".info-txt");
let filterInput;


// javascript program to check if x is a perfect square

// A utility function that returns true if x is perfect square
function Armstrong(number)
	{
		var flag,remainder,addition = 0;


		flag = number;
		while(number > 0)
		{
			remainder = number%10;
			addition = addition + remainder*remainder*remainder;
			number = parseInt(number/10);
		}

		if(addition == flag)
		{
			return true;
		}
		else
		{
			return false;
		}
	}


checkBtn.addEventListener("click", () => {
    let n = filterInput;
    console.log(typeof n);


    infoTxt.style.display = "block";
    // if(isString(n)===true){
    //     return infoTxt.innerHTML = `Enter a valid input`
    // }
    // else{
    if(Armstrong(n)===true) {
        return infoTxt.innerHTML = `Yes, <span>'${txtInput.value}'</span> is Armstrong number`;
    }
    infoTxt.innerHTML = `NO, <span>'${txtInput.value}'</span> is not an Armstrong number`;

});

txtInput.addEventListener("keyup", () => {
    filterInput = txtInput.value.toLowerCase().replace(/[^A-Z0-9]/ig, "");
    if(filterInput) {
        return checkBtn.classList.add("active");
    }
    infoTxt.style.display = "none";
    checkBtn.classList.remove("active");
});
