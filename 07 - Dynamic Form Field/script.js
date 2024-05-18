var survey_options = document.getElementById('survey_options');
var add_more_fields = document.getElementById('add_fields');
var remove_fields = document.getElementById('remove_fields');

add_more_fields.onclick = function(){
    var newField = document.createElement('input');
    var input_tags = survey_options.getElementsByTagName('input');
    newField.setAttribute('type', 'text');
    newField.setAttribute('name', 'survey_options[]');
    newField.setAttribute('class', 'survey_options');
    newField.setAttribute('size', 50);
    newField.setAttribute('placeholder', 'Another Field');
    survey_options.appendChild(newField);
    if(input_tags.length >= 2){
        document.getElementById("remove_fields").style.visibility="visible";
        
    }
}

remove_fields.onclick = function(){
    var input_tags = survey_options.getElementsByTagName('input');
    if(input_tags.length >= 2){
        survey_options.removeChild(input_tags[(input_tags.length)-1]);
        if(input_tags.length < 2){
            document.getElementById("remove_fields").style.visibility="hidden";
        }
    }
    // else{
    //     document.getElementById("remove_fields").style.visibility="hidden";

    // }
}