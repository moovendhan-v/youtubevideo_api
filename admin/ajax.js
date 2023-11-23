var updateAjaxCall = document.querySelector('.updateAjaxCall');

updateAjaxCall.addEventListener('click',(event)=>{
  event.preventDefault();

  var videoId = document.querySelector('.getVideoId').value;
  var videoImage = document.querySelector('.getVideoImage').value;
  var videoTitle = document.querySelector('.getVideoTitle').value;
  var videoInfo = document.querySelector('.getVideoDescription').value;
  var channel = document.querySelector(".videoSelects").selectedIndex;
  var catogries = document.querySelector('.videoCatogries').selectedIndex;
  var type = document.querySelector('.videoType').selectedIndex;
  var isLive = document.querySelector('.updateVideo #flexSwitchCheckCheckedAddNew').checked;

  if(videoId == "" && videoImage == "" && videoTitle == "" && videoInfo == ""){
    createALertButton("Please fill required fields", "danger");
    return;
  }
  
  let status = 1;

  if(!isLive){
    status = 0;
  }
  // Create a FormData object
 
  var formData = new FormData();
  formData.append("videoId", videoId);
  formData.append("videoImage", videoImage);
  formData.append("videoTitle", videoTitle);
  formData.append("videoInfo", videoInfo);
  formData.append("channel", channel);
  formData.append("catogries", catogries);
  formData.append("type", type);
  formData.append("isLive", status);

  // Perform the AJAX request
  var xhr = new XMLHttpRequest();
  var url = "https://youtubeapi.agricreations.com?update"; // Replace with your actual PHP endpoint
  xhr.open("POST", url, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      // Successful response
      var responseData = JSON.parse(xhr.responseText);
      if(responseData.status == "success"){
        // setting value null 
            createALertButton(responseData.message, "success");
            document.querySelector('.getVideoId').value = "";
            document.querySelector('.getVideoImage').value = "";
            document.querySelector('.getVideoTitle').value = "";
            document.querySelector('.getVideoDescription').value = "";
            document.querySelector(".videoSelects").selectedIndex = 1;
            document.querySelector('.videoCatogries').selectedIndex = 1;
            document.querySelector('.videoType').selectedIndex = 1;
            document.querySelector('#flexSwitchCheckChecked').value = 1;
            // videoId,videoImage,videoTitle,videoInfo,channel,catogries,type,isLive = "";
      }else{
            createALertButton(responseData.message, "danger");
      }
      console.log(responseData);
    } else {
      // Error handling
      console.error("Error: " + xhr.status);
    }
  };

  xhr.onerror = function () {
    // Network error handling
    createALertButton("Check Your Network", "danger");
  };

  // Send the FormData object with the POST request
  xhr.send(formData);
})

//using ajax adding catogries, changel, type




// createAjaxCall();




// var url = "your-api-endpoint-url";
// fetch(url)
//   .then(function (response) {
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json();
//   })
//   .then(function (data) {
//     // Process the data
//     console.log(data);
//   })
//   .catch(function (error) {
//     // Handle errors
//     console.error("Error fetching data:", error);
//   });
