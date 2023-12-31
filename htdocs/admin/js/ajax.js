var updateAjaxCall = document.querySelector('.updateAjaxCall');
var updateVideoDetailsAjaxCall = document.querySelector('.updateVideoDetails');

updateVideoDetailsAjaxCall.addEventListener('click',(event)=>{
  event.preventDefault();
  var videoId = document.querySelector('.modalId').innerText;
  var videoImage = document.querySelector('.modalImage').value
  var videoTitle = document.querySelector('.modalTitle').value
  var videoInfo = document.querySelector('.modalDes').value
  var channel = document.querySelector('.modelVideoSelects').selectedIndex
  var catogries = document.querySelector('.modelVideoCatogries').selectedIndex
  var type = document.querySelector('.modelVideoType').selectedIndex
  var isLive = document.querySelector('.modalChecked').checked 
  if(videoId == "" && videoImage == "" && videoTitle == "" && videoInfo == ""){
    createALertButton("Please fill required fields", "danger");
    return;
  }
  let status = 1;
  if(!isLive){
    status = 0;
  }
  var formData = new FormData();
  formData.append("videoId", videoId);
  formData.append("videoImage", videoImage);
  formData.append("videoTitle", videoTitle);
  formData.append("videoInfo", videoInfo);
  formData.append("channel", channel+1); //this +1 for incrementing id in database (the index is getting from array)
  formData.append("catogries", catogries+1); //this +1 for incrementing id in database
  formData.append("type", type+1); //this +1 for incrementing id in database
  formData.append("isLive", status);
  // Perform the AJAX request
  var xhr = new XMLHttpRequest();
  var url = "https://youtubeapi.agricreations.com?updatedata"; // Replace with your actual PHP endpoint
  xhr.open("POST", url, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Successful response
      var responseData = JSON.parse(xhr.responseText);
      if(responseData.status == "success"){
            createALertButton(responseData.message, "success");
            updateUpdatedDatataInUI(videoId,videoImage,videoTitle,videoInfo,channelIdArray[channel],categoriesArray[catogries],videoTypeId[type],status); // id, image, text, des, channel, catogries, type, islive
      }else{
            createALertButton(responseData.message, "danger");
      }
      console.log(responseData);
    } else {
      console.error("Error: " + xhr.status);
    }
  };
  xhr.onerror = function () {
    createALertButton("Check Your Network", "danger");
  };
  xhr.send(formData);
})


updateAjaxCall.addEventListener('click',(event)=>{
  event.preventDefault();
  var videoId = document.querySelector('.getVideoId').value;
  var videoImage = document.querySelector('.getVideoImage').value;
  var videoTitle = document.querySelector('.getVideoTitle').value;
  var videoInfo = document.querySelector('.getVideoDescriptionInfo').value;
  var channel = document.querySelector(".videoSelectss").selectedIndex;
  var catogries = document.querySelector('.videoCatogriess').selectedIndex;
  var type = document.querySelector('.videoTypess').selectedIndex;
  var isLive = document.querySelector('.updateVideo #flexSwitchCheckCheckedAddNew').checked;
  if(videoId == "" && videoImage == "" && videoTitle == "" && videoInfo == ""){
    createALertButton("Please fill required fields", "danger");
    return;
  }
  let status = 1;
  if(!isLive){
    status = 0;
  }
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
    createALertButton("Check Your Network", "danger");
  };
  xhr.send(formData);
})
