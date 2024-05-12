document
.getElementById("calculateBtn")
.addEventListener("click", function () {
  var heightFeet =
    parseFloat(document.getElementById("heightFeet").value) || 0;
  var heightInches =
    parseFloat(document.getElementById("heightInches").value) || 0;
  var weightKgs =
    parseFloat(document.getElementById("weightKgs").value) || 0;

  var totalHeightMeters = (heightFeet * 12 + heightInches) * 0.0254;
  var bmi = weightKgs / (totalHeightMeters * totalHeightMeters);



  var resultDiv = document.getElementById("result");
  if(isNaN(bmi) || isNaN(weightkgs) || (isNan(heightFeet) && isNan(heightInches))){
    resultDiv.innerHTML="";
  }
  else{
    resultDiv.innerHTML = "Your BMI: " + bmi.toFixed(2) + "<br>";
  }

  if (bmi < 18.5) {
    resultDiv.innerHTML += "Category: Underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    resultDiv.innerHTML += "Category: Normal weight";
  } else if (bmi >= 25 && bmi <= 29.9) {
    resultDiv.innerHTML += "Category: Overweight";
  } else if (bmi>29.9){
    resultDiv.innerHTML += "Category: Obesity";
  }
  else{
    resultDiv.innerHTML +="Please enter data."
  }
});