    let camera_button = document.querySelector("#start-camera");
    let video = document.querySelector("#video");
    let click_button = document.querySelector("#click-photo");
    let canvas = document.querySelector("#canvas");

    camera_button.addEventListener('click', async function() {  
   	let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
	video.srcObject = stream;
    });

    click_button.addEventListener('click', function() {
   	    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
   	    let image_data_url = canvas.toDataURL('image/jpeg');
   	    console.log(image_data_url);
    });
 
