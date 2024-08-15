const submitBtn = document.getElementById("submit-btn");
const addBtn = document.getElementById("addBtn"); //to add the any number of parameters
const addMoreParameters = document.getElementById("addMoreParameters");
const deleteBtn = document.getElementsByClassName("deleteBtn");
//now if the user clicks on custom parameters then json option is hidden and they are toggling like this
const customJson = document.getElementById("jsonRadio"); //radio button of json
const customParams = document.getElementById("customRadio"); //radio button of custom parameters
const finalResponse = document.getElementById("response-box");
const JsonBox = document.getElementById("json-box");
//when the user clicks on custom parameters then hide the json request  box
const requestJsonBox = document.getElementById("requestJsonBox");
const responseJsonBox = document.getElementById("responseJsonBox");
const parametersBox = document.getElementById("parameter-box");
//to get the DOM element from the string
const getElementFromString = (string) => {
    let newDiv = document.createElement("div");
    newDiv.innerHTML = string;
    return newDiv.firstElementChild;
};

let numberOfParametersAdded = 0;

//hide the parameters box initially because by default JSON option is active
parametersBox.style.display = "none";
responseJsonBox.style.display = "none";
document.querySelector(".url-alert").style.display = "none";


customJson.addEventListener("click", (e) => {
    parametersBox.style.display = "none";
    requestJsonBox.style.display = "block";
});

//when the user clicks on Json then hide the custom json section

customParams.addEventListener("click", (e) => {
    parametersBox.style.display = "block";
    requestJsonBox.style.display = "none";
});

addBtn.addEventListener("click", () => {
    let addParams = ` <div class="form-group row my-4"> 
    <label for="paramKey" class="col-sm-2 col-form-label" >Parameter ${numberOfParametersAdded + 2
        }</label > 
    <div class="col-md-4"> 
    <input type="text" class="form-control" id="paramKey${numberOfParametersAdded + 2}" placeholder="Key Of Parameter ${numberOfParametersAdded + 2
        }" /> 
    </div> 
    <div class="col-md-4"> 
    <input type="text" class="form-control" id="paramValue${numberOfParametersAdded + 2}" placeholder="Value Of Parameter ${numberOfParametersAdded + 2
        }" /> 
    </div> 
    <div class="col-md-2"> 
    <button class="btn btn-primary deleteBtn"> Delete </button>
    </div>
    </div> `;
    //convert the element string to DOM;
    let newParameter = getElementFromString(addParams); //it make a  new div everytime of the above string and then we have to append that new div in the addMoreParameters
    addMoreParameters.appendChild(newParameter);
    for (let eachItem of deleteBtn) {
        eachItem.addEventListener("click", (e) => {
            let confirmation = confirm(
                "Are You Sure You Want To Remove This YES/CANCEL ?"
            );
            if (confirmation == true) {
                e.target.parentElement.parentElement.remove();
            }
        });
    }
    numberOfParametersAdded++;
});

//when the user clicks on submit button
submitBtn.addEventListener("click", () => {
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    if (url =='') {
        setTimeout(() => {
            document.querySelector(".url-alert").style.display = "none";
        }, 4000);
        document.querySelector(".url-alert").style.display = "block";
        return;
    }
    responseJsonBox.style.display = "block";
    //show the message while fetching the content
    finalResponse.value = `Please Wait We are Doing Your Work... !!`;
    //if the user clicks on the custom parameters then we have to get content of all the parameters
    if (contentType == 'custom') {
        data = {};
        for (let i = 0; i < numberOfParametersAdded + 1; i++) {
            if (document.getElementById('paramKey' + (i + 1)) != undefined) {
                let key = document.getElementById('paramKey' + (i + 1)).value;
                let value = document.getElementById( 'paramValue' + (i + 1) ).value; 
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {

        data = JsonBox.value;
    }
   //now we have to invoke the fetch api if it is GET or POST
    if (requestType == 'GET') {
        fetch(url, {
            method:'GET',   
        }).then(response => response.text()).then(text => {
            finalResponse.innerHTML = text;
            Prism.highlightAll();
        })
    }
    else {
        fetch(url, {
          method: "POST",
          body: data,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.text())
          .then((text) => {
            finalResponse.innerHTML = text;
            Prism.highlightAll();
          });
    }
});
