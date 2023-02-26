
const URL = "https://teachablemachine.withgoogle.com/models/JHem2FpyN/";

async function createModel() {
    const checkpointURL = URL + "model.json"; 
    const metadataURL = URL + "metadata.json"; 

    const recognizer = speechCommands.create(
        "BROWSER_FFT", 
        undefined, 
        checkpointURL,
        metadataURL);

    await recognizer.ensureModelLoaded();

    return recognizer;
}


async function init() {
    const recognizer = await createModel();
    const classLabels = recognizer.wordLabels(); 
    const labelContainer = document.getElementById("label-container");
    for (let i = 0; i < classLabels.length; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }

    recognizer.listen(result => {
        const scores = result.scores; 

        for (let i = 0; i < classLabels.length; i++) {
            const classPrediction = classLabels[i] + ": " + result.scores[i].toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }

        let max=0
        for(let i=1; i<result.scores.length; i++){
            if(result.scores[i]>result.scores[max])
                max=i;
        }
        let str = classLabels[max];
        console.log(str);
        
        if(str=="stop")
            recognizer.stopListening()
        else{
            move(str);
        }
        let lost = lose()
        if(lost==1)
            recognizer.stopListening();
        hasEaten();
    }, {
        includeSpectrogram: true, 
        probabilityThreshold: 0.75,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.75
    });
}