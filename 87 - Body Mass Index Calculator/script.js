const inputs = document.querySelectorAll('#cm, #weight');

inputs.forEach(input => {
  input.addEventListener('input', event => {
    const value = event.target.value;
    if (!/^\d*\.?\d*$/.test(value) && value !== '') {
      event.target.value = event.target.getAttribute('data-value') || '';
    } else {
      event.target.setAttribute('data-value', value);
    }
  });
});

function fun()
    {
       var cm = document.getElementById("cm").value ;
        cm = cm/100;
        var w = document.getElementById("weight").value;
        var bmi = w/(cm*cm);
        document.getElementById("bmi").value = bmi;
        if(isNaN(bmi)){
            document.querySelector("h4").innerHTML='Please input valid height and weight';
        }

        else if(bmi<18.5)
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

  