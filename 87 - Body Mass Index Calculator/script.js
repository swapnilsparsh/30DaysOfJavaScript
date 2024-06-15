const inputs = document.querySelectorAll('#cm, #weight');

inputs.forEach(input => {
  input.addEventListener('input', event => {
    const value = event.target.value;
    if (!/^\d*\.?\d*$/.test(value) && value !== '') {
      event.target.value = event.target.getAttribute('data-value') || '';
    } else {
      event.target.setAttribute('data-value', value);
    }
    document.getElementById("bmi").disabled = false;
    document.querySelector("h4").innerHTML = ''; 
  });
});

function fun()
    {
       var cm = document.getElementById("cm").value ;
       cm = cm/100;
       var w = document.getElementById("weight").value;

       if (isNaN(cm) || cm <= 0 || isNaN(w) || w <= 0) {
        document.querySelector("h4").innerHTML = 'Please input valid height and weight';
        document.getElementById("bmi").value = '';
        document.getElementById("bmi").disabled = true;
        return;
       }
        var bmi = w/(cm*cm);
        document.getElementById("bmi").value= `${bmi.toFixed(2)} kg/m²`;
        
        if(bmi<18.5)
        {
            document.querySelector("h4").innerHTML = 'Under weight';
        }
        else if(bmi>=18.5 && bmi <=24.9)
        {
            document.querySelector("h4").innerHTML = 'Normal weight';
        }
        else if(bmi>=25 && bmi <= 29.9)
        {
            document.querySelector("h4").innerHTML = 'Overweight';
        }
        else if(bmi>=30)
        {
            document.querySelector("h4").innerHTML = 'Obesity';
        }
    }

  