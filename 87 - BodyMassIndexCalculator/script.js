const calcButton = document.querySelector('.btn');
calcButton.addEventListener('click',bmiCalculated)
const res1 = document.querySelector('.result');
const res2 = document.querySelector('.result_2');


function bmiCalculated (e){
    let height = document.getElementById('height').value
    let weight = document.getElementById('weight').value
    if(height ==='' && weight===''){

    }
    height = height/100;
    const bmi = Math.trunc((weight/(height*height)))
     if(bmi<18.5){
        res1.textContent =`Your BMI is ${bmi}`;
        res2.textContent = 'Under weight'
        res2.style.color = 'red'
     }
     else if(bmi>=18.5 && bmi<=24.9){
        res1.textContent =`Your BMI is ${bmi}`;
        res2.textContent = 'Normal weight'
        res2.style.color = 'green'
     }
     else if(bmi>25 && bmi<=29.9){
        res1.textContent =`Your BMI is ${bmi}`;
        res2.textContent = 'Over weight'
        res2.style.color = 'yellow'

     }
     else if(bmi>30){
        res1.textContent =`Your BMI is ${bmi}`;
        res2.textContent = 'Obesity'
        res2.style.color = 'red'

     }


}