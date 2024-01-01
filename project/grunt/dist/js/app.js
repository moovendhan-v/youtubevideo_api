/* Processed by grunt  */ 
// const fetchConfig = async () => {
//     try {
//       const response = await fetch('../../../../project/config.json');
//       const config = await response.json();
  
//       // Assuming your API response contains a property named 'baseUri'
//       const baseUri = config.baseUrl;
  
//       // Set the base URI to global variables or wherever needed
//       window.BASE_URI = baseUri;
//       console.log("Base URI set:", window.BASE_URI);
//     } catch (error) {
//       console.error("Error fetching configuration:", error);
//     }
//   };

// fetchConfig();

const admin = "Techey Guys";
const BASE_URI = "http://localhost/htdocs/";
var visitorsInfo = `${BASE_URI}?getvisitorsinfo`;

var visitorsInfoArray = [];
var emailsubscribers = [];
var contactMessage = [];

function createVisitorTableRow(visitor) {
    return `
        <tr>
            <td>${visitor.region}</td>
            <td><i class="fa-brands fa-firefox-browser"></i></td>
            <td>${visitor.time}</td>
            <td>${visitor.country}</td>
            <td>${visitor.timezone}</td>
            <td>${visitor.ip}</td>
        </tr>`;
}

function createEmailTable(email){
    return `
    <tr>
        <td>${email.email_details}</td>
    </tr>`;
}

function createMessageTable(message){
    return `<tr>
    <td>${message.email}</td>
    <td>${message.telegram_link}</td>
    <td>${message.message}</td>
  </tr>`;
}
class VisitorInfo {
    constructor({ city, country, id, ip, loc, region, time, timezone, user_agent }) {
        this.city = city;
        this.country = country;
        this.id = id;
        this.ip = ip;
        this.loc = loc;
        this.region = region;
        this.time = time;
        this.timezone = timezone;
        this.user_agent = user_agent;
    }
}

$.ajax({
    url: visitorsInfo,
    method: "GET",
    dataType: "json", 
    success: function (data) {

        $.each(data.visitor, function (index, visitor) {
            let visitorData = {
                city: visitor.city,
                country: visitor.country,
                id: visitor.id,
                ip: visitor.ip,
                loc: visitor.loc,
                region: visitor.region,
                time: visitor.time,
                timezone: visitor.timezone,
                user_agent: visitor.user_agent
            };
            visitorsInfoArray.push(visitorData);
            $('#visitorTable').append(createVisitorTableRow(visitorData));
        });

        $.each(data.emailsubscribers, function (index, subscribers) {
            emailsubscribers.push(subscribers);
            $('#subscribersTable').append(createEmailTable(subscribers));
        });

        $.each(data.contactmessage, function (index, message) {
            contactMessage.push(message);
            $('#contactTable').append(createMessageTable(message));
        });

        // $('.dashbordTodayVisitors').text(visitorsInfoArray.length);
        // $('.dashbordLastMontVisitors').text(visitorsInfoArray.length);
        $('.dashbordTotalSubscribers').text(emailsubscribers.length);
        $('.dashbordTotalVisitors').text(visitorsInfoArray.length);
    },
    error: function (xhr, status, error) {
        console.error("Error:", error);
    }
});

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
  var formDatas = new FormData();
  formDatas.append("videoId", videoId);
  formDatas.append("videoImage", videoImage);
  formDatas.append("videoTitle", videoTitle);
  formDatas.append("videoInfo", videoInfo);
  formDatas.append("channel", channel+1); //this +1 for incrementing id in database (the index is getting from array)
  formDatas.append("catogries", catogries+1); //this +1 for incrementing id in database
  formDatas.append("type", type+1); //this +1 for incrementing id in database
  formDatas.append("isLive", status);
  // Perform the AJAX request
  var xhr = new XMLHttpRequest();
  var url = `${BASE_URI}?updatedata`; // Replace with your actual PHP endpoint
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
  xhr.send(formDatas);
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
  var url = `${BASE_URI}?update`; // Replace with your actual PHP endpoint
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


function getVideoDetailsByUrl() {
    var videoUrl = $('.getVideoDetaialByUrl').val();
    var videoId = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (videoId && videoId[1]) {
        videoId = videoId[1];
        var apiEndpoint = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + videoId + "&key=AIzaSyBG7YBeYmcINh0XGBJ52IFOHHfse9cXFrg";
        $.getJSON(apiEndpoint, function(response) {
            if (response.items && response.items[0] && response.items[0].snippet) {
                var snippet = response.items[0].snippet;
                $('.getVideoId').val(videoId);
                $('.getVideoTitle').val(snippet.title);
                $('.getVideoImage').val(snippet.thumbnails.high.url);
                $('.getVideoDescriptionInfo').val(snippet.description);
            } else {
                $('#result').html('Video details not found.');
            }
        });
    } else {
        $('#result').html('Invalid YouTube URL. Couldn\'t extract video ID.');
    }
}

//burget menu toggle
var burgerMenu = document.querySelectorAll('.burgerMenu');
var closeBurgerMenu = document.querySelectorAll('.closeBugermenu');

closeBurgerMenu.forEach(item => {
  var left_div = document.querySelector('.left_div');
  item.addEventListener('click', () => {
      left_div.classList.remove('left_div_open');
  });
});

burgerMenu.forEach(item => {
  item.addEventListener('click', () => {
    var left_div = document.querySelector('.left_div');
    if (left_div.classList.contains('left_div_open')) {
      left_div.classList.remove('left_div_open');
    } else {
      left_div.classList.add('left_div_open');
    }
  });
});

// tab creations 
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));
            tabs.forEach(content => content.classList.remove('activeBar'));
            // Show the selected tab content
            tabContents[index].classList.add('active');
            tabs[index].classList.add('activeBar');
        });
    });
});

//bootstrap script for alert
function createALertButton(message, color){
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert bg-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
    alertPlaceholder.append(wrapper)
  }
  appendAlert(message, color);
  RemoveToast();
}

let categoriesArray = [];
let channelIdArray = [];  
let videoTypeId = []; 
let apiResponce ;

//channel name
function appendCategoriesToDOM(categoriesArray) {
  let channelContent = document.querySelector('.channelContent');
  // Clear existing content
  channelContent.innerHTML = '';
  categoriesArray.forEach(category => {
      let paragraph = document.createElement('p');
      paragraph.textContent = category;
      channelContent.appendChild(paragraph);
  });
}
appendCategoriesToDOM(categoriesArray);

function appendChannelToDOM(categoriesArray) {
  let channelContent = document.querySelector('.catogriesContent');
  // Clear existing content
  channelContent.innerHTML = '';
  console.log(`channel array1 ${categoriesArray}`);
  categoriesArray.forEach(category => {
      let paragraph = document.createElement('p');
      paragraph.textContent = category;
      channelContent.appendChild(paragraph);
  });
}
appendChannelToDOM(categoriesArray);

// type 
function appendTpeToDOM(categoriesArray) {
  let channelContent = document.querySelector('.typeContent');
  // Clear existing content
  channelContent.innerHTML = '';
  console.log(`video type array1 ${categoriesArray}`);
  categoriesArray.forEach(category => {
      let paragraph = document.createElement('p');
      paragraph.textContent = category;
      channelContent.appendChild(paragraph);
  });
}
appendTpeToDOM(categoriesArray);

function createSelect(className, array) {
  var selectElements = document.querySelectorAll(`.${className}`);
  selectElements.forEach(function(selectElement) {
    array.forEach(function(value) {
      var option = document.createElement("option");
      option.value = value;
      option.text = value;
      selectElement.appendChild(option);
    });
    selectElement.options[1].selected = true;
  });
}

// createALertButton("Button created", "success");

document.addEventListener('DOMContentLoaded', async function () {
    async function fetchcategoriesArray(slogan) {
        try {
            const response = await fetch(`${BASE_URI}?${slogan}`);
            const data = await response.json();
            categoriesArray = data.catogries.map(function (data) {
                return data.toLowerCase();
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    await fetchcategoriesArray("getcatogriesinfo");  
    await createSelect("videoCatogries", categoriesArray);
    await createSelect("videoCatogriess", categoriesArray);

    await appendCategoriesToDOM(categoriesArray);

});

document.addEventListener('DOMContentLoaded', async function () {
  async function fetchchannelIdArray(slogan) {
      try {
          const response = await fetch(`${BASE_URI}?${slogan}`);
          apiResponce = response;
          const data = await response.json();
          channelIdArray = data.channel.map(function (data) {
              return data.toLowerCase();
          });
          console.log(channelIdArray);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }
  await fetchchannelIdArray("getchannelinfo");
  await createSelect("videoSelects", channelIdArray);
  await createSelect("videoSelectss", channelIdArray);

  await appendChannelToDOM(channelIdArray);
});

document.addEventListener('DOMContentLoaded', async function () {
  async function fetchgetvideoinfo(slogan) {
      try {
          const response = await fetch(`${BASE_URI}?${slogan}`);
          const data = await response.json();
          videoTypeId = data.videoinfo.map(function (data) {
              return data.toLowerCase();
          });
          console.log(videoTypeId);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }
  await fetchgetvideoinfo("getvideoinfo");
  await createSelect("videoType", videoTypeId  );
  await createSelect("videoTypess", videoTypeId  );
  await appendTpeToDOM(videoTypeId);
});

function updateDashbord(length){
  console.log("length", length);
  document.querySelector('.dashbordTotalVideos').innerText = length;
  document.querySelector('.dashbordTotalLive').innerText = length;
  document.querySelector('.dashbordTotalCatogries').innerText = categoriesArray.length;

}

async function fetchData() {
  try {
    const response = await fetch(BASE_URI);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    var dataObjects = mapApiResponseToDataObject(data);
    for (var i = 0; i < dataObjects.length; i++) {
      createTableRow(dataObjects[i]);
  }
  updateDashbord(data.length);
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
fetchData();

function mapApiResponseToDataObject(apiResponse) {
    var mappedData = apiResponse.map(response => {
      if (response.snippet.category && !categoriesArray.includes(response.snippet.category)) {
        categoriesArray.push(response.snippet.category);
      }
        if (response.snippet.channelId && !channelIdArray.includes(response.snippet.channelId)) {
            channelIdArray.push(response.snippet.channelId);
          }
        if (response.snippet.type && !videoTypeId.includes(response.snippet.type)) {
            videoTypeId.push(response.snippet.type);
          }
      return {
        id: response.id.videoId || "",
        image: response.snippet.thumbnails.high.url || "",
        title: response.snippet.title || "",
        info: response.snippet.description || "",
        channelId: response.snippet.channelTitle || "",
        catogries: response.snippet.category || "",
        type: response.snippet.type || "",
        islive: response.snippet.islive || "",
      };
    });
    return mappedData;
  }
  function createTableRow(dataObject) {
    // Create a table row
      var tableRow = document.createElement("tr");
      var indexCell = document.createElement("td");
      var editRow = document.createElement('button');
      editRow.classList.add("btn", "btn-danger", 'getModel' , "m-2");
      editRow.setAttribute('id', dataObject.id);
      editRow.setAttribute("data-bs-toggle", "modal");
      editRow.setAttribute("data-bs-target", "#editModel");
      editRow.innerHTML = '<i class="fa-solid fa-pen-to-square "></i> Edit ';
      indexCell.append(editRow);
      // indexCell.classList.add('d-flex', "justify-content-center");
      tableRow.classList.add('card-hover');
      tableRow.appendChild(indexCell);
    // Create a table cell for the index
      var indexCell = document.createElement("th");
      indexCell.setAttribute("scope", "row");
      indexCell.classList.add('display-none');
      indexCell.textContent = dataObject.id; // You can change the index as needed
      tableRow.appendChild(indexCell);
      // Create a table cell for the image
      var imageCell = document.createElement("td");
      var imageElement = document.createElement("img");
      imageElement.classList.add("img-fluid", "thumnail","p-2","rounded","mb-0");
      imageElement.setAttribute("src", dataObject.image); // Replace with the actual image URL
      imageElement.setAttribute("alt", "");
      imageCell.appendChild(imageElement);
      tableRow.appendChild(imageCell);
      // Create table cells for title, info, channel id, categories, type, and live
      var data = [dataObject.title, dataObject.info, dataObject.channelId, dataObject.catogries, dataObject.type,dataObject.islive];
      for (var i = 0; i < data.length; i++) {
          var cell = document.createElement("td");
         cell.classList.add('text-truncate');
          cell.textContent = data[i];
          tableRow.appendChild(cell);
      }
      // Append the new table row to the existing table body within the table with id "tableData"
      var tbody = document.querySelector("tbody");
      if(tbody.childElementCount >= 0){
        var spinner = document.querySelector('.spinner');
        spinner.classList.add('visually-hidden');
      }
      tbody.appendChild(tableRow);
  }
  function updateUpdatedDatataInUI(id, image, text, des, channel, catogries, type, islive){
    var toUdateTable = document.querySelector(`#${id}`).parentElement.parentElement;
    toUdateTable.childNodes[2].childNodes[0].src = image; //image
    toUdateTable.childNodes[3].innerText = text ; //title
    toUdateTable.childNodes[4].innerText = des ; //description
    toUdateTable.childNodes[5].innerText = channel; //channel Name
    toUdateTable.childNodes[6].innerText = catogries; //catogries
    toUdateTable.childNodes[7].innerText = type; //type
    toUdateTable.childNodes[8].innerText = islive; //is live  
  }
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('getModel')) {
        var id = e.target.parentElement.parentElement.cells[1].innerText;
        var image = e.target.parentElement.parentElement.cells[2].lastChild.src;
        var title = e.target.parentElement.parentElement.cells[3].innerText;
        var description = e.target.parentElement.parentElement.cells[4].innerText;
        var cannelid = e.target.parentElement.parentElement.cells[5].innerText;
        var catogries = e.target.parentElement.parentElement.cells[6].innerText;
        var type = e.target.parentElement.parentElement.cells[7].innerText;
        var islive = e.target.parentElement.parentElement.cells[8].innerText;
console.log(e.target.parentElement.parentElement.cells[5].innerText);
        var indexOfchannelIdArray = channelIdArray.indexOf(cannelid);
        var indexOfcategoriesArray = categoriesArray.indexOf(catogries);
        var indexOfType = videoTypeId.indexOf(type);

        console.log(channelIdArray);
        console.log(categoriesArray);

        console.log(indexOfType, type);
        console.log(indexOfcategoriesArray, catogries);
        console.log(indexOfchannelIdArray, cannelid);

        document.querySelector('.modalId').innerText = id;
        document.querySelector('.modalTitle').value = title;
        document.querySelector('.modalImage').value = image;
        document.querySelector('.modalDes').value = description;
        document.querySelector('.modalChecked').checked = islive == 1 ? true : false;
        document.querySelector('.modelVideoSelects').selectedIndex = indexOfchannelIdArray;
        document.querySelector('.modelVideoCatogries').selectedIndex = indexOfcategoriesArray;
        document.querySelector('.modelVideoType').selectedIndex = indexOfType;

        // function updateUpdatedDatataInUI(id, image, text, des, channel, catogries, type, islive){
        //   var toUdateTable = document.querySelector(`#${id}`).parentElement.parentElement;
        //   toUdateTable.childNodes[2].innerText = image; //image
        //   toUdateTable.childNodes[3].innerText = text ; //title
        //   toUdateTable.childNodes[4].innerText = des ; //description
        //   toUdateTable.childNodes[5].innerText = channel; //channel Name
        //   toUdateTable.childNodes[6].innerText = catogries; //catogries
        //   toUdateTable.childNodes[7].innerText = type; //type
        //   toUdateTable.childNodes[8].innerText = islive; //is live  
        // }
        console.log(`${image} ${title} ${description}, ${cannelid}, ${catogries} ${type} ${islive}`);
    }
});

// notion api 

// secret_Ku8SgGv2Ht4R6SEqUvu9uhvynxtEl1CulivgsoTLDDY
document.addEventListener('DOMContentLoaded',()=>{
    var getModelButtons = document.querySelectorAll('.getModel');

    getModelButtons.forEach(function (button) {
        console.log(button);
        button.addEventListener('click', function (e) {
            // Your existing code here
            console.log(e);
    
            var id = button.parentElement.parentElement.cells[1].innerText;
            var image = button.parentElement.parentElement.cells[2].lastChild.src;
            var title = button.parentElement.parentElement.cells[3].innerText;
            var description = button.parentElement.parentElement.cells[4].innerText;
            var cannelid = button.parentElement.parentElement.cells[5].innerText;
            var catogries = button.parentElement.parentElement.cells[6].innerText;
            var type = button.parentElement.parentElement.cells[7].innerText;
            var islive = button.parentElement.parentElement.cells[8].innerText;
    
            document.querySelector('.modalId').innerText = id;
            var modalTitle = document.querySelector('.modalTitle').value = title;
            var modalDes = document.querySelector('.modalDes').value = description;
            var modalChecked = document.querySelector('.modalChecked').checked = islive == 1 ? true : false ;
    
            // var modalChannelId = document.querySelector('.modalDes').value = description;
            console.log(` ${image} ${title} ${description}, ${cannelid}, ${catogries} ${type} ${islive}`);
        });
    });
    
    var getModelButtonss = document.querySelectorAll('.getModel')[0];
    console.log(getModelButtonss);
})


$(document).ready(function() {
  // Replace 'YOUR_API_KEY' with your actual API Key
  const apiKey = 'AIzaSyAvDMW8O-oJJd2iIP7ATyj8EgfmB7YZjHE';

  function embedVideo(data) {
    // $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
    // $('h3').text(data.items[0].snippet.title)
    // $('.description').text(data.items[0].snippet.description)
}
  function getVideo() {
    $.ajax({
      type: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/search',
      data: {
          key: apiKey,
          // q: "cats", query
          part: 'snippet',
          maxResults: 1,
          type: 'video',
          videoEmbeddable: true,
      },
      success: function(data){
          embedVideo(data)
      },
      error: function(response){
          console.log("Request Failed");
      }
    });
  }

  // function getChannelInfo(channelId) {
  //   $.ajax({
  //     type: 'GET',
  //     url: 'https://www.googleapis.com/youtube/v3/channels',
  //     data: {
  //         key: apiKey,
  //         id: channelId,
  //         part: 'snippet,contentDetails,statistics',
  //     },
  //     success: function(data){
  //         // Handle the response, and you can display or use the channel information as needed
  //         console.log('Channel Info:', data);
  //     },
  //     error: function(response){
  //         console.log("Request Failed");
  //     }
  //   });
  // }

       // Function to get channel statistics
       function getChannelStatistics(channelId) {
        $(document).ready(function () {
          $.ajax({
              url: 'https://www.googleapis.com/youtube/v3/channels',
              method: 'GET',
              data: {
                  part: 'statistics,snippet',
                  id: channelId,
                  key: apiKey
              },
              success: function (data) {
                  var statistics = data.items[0].statistics;
                  var snippet = data.items[0].snippet;

                  var recentSubscribers = statistics.subscriberCount;
                  var channelTitle = snippet.title;

                  console.log(data.items[0]);

                  console.log('Recent Subscribers:', recentSubscribers);
                  console.log('Channel Title:', channelTitle);
              }
          });
      });
    }

    

  getVideo();
  // getChannelInfo("UC79ikm9mQLz_I53CKOBeXKA");
  getChannelStatistics("UC79ikm9mQLz_I53CKOBeXKA");

});


//# sourceMappingURL=app.js.map