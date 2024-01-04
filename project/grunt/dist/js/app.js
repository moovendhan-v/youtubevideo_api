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
const NOTION_API = "secret_Ku8SgGv2Ht4R6SEqUvu9uhvynxtEl1CulivgsoTLDDY";
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


  // Function to fetch data from the endpoint and populate content
  function fetchNotionApiOfClientReview() {
    // Make an AJAX request to fetch data from the endpoint
    $.ajax({
      url: `${BASE_URI}?getnotiondatabase=1&dbid=clientReview`,
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        createClientReview(data);
      },
      error: function() {
        console.error('Failed to fetch data from the endpoint.');
      }
    });
  }

  function createClientReview(data){

    $.each(data['results'], function(index, items) {
    var clientReviews = $('#clientReview');
        var clientText = items['properties']['client_name']['rich_text'][0]['text']['content'];
        var clientReview = items['properties']['client_review']['rich_text'][0]['text']['content'];
        var clientImage = items['properties']['client_image']['files'][0]['name'];
        var notionStatus = items['properties']['Status']['status'].name;
        if(notionStatus == "Done"){
            let layout = `
            <div class="col">
            <div class="card card-hover mb-3">
              <div class="row  g-0">
                <div class="col-md-2">
                  <img
                    src="${clientImage}"
                    class="img-fluid rounded-start" alt="Loading..."
                    style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="col-md-10">
                  <div class="card-body">
                    <h5 class="card-title  skeleton-loader">${clientText}</h5>
                    <p class="card-text  skeleton-loader">${clientReview}</p>
                    <div class="d-flex justify-content-between align-items-end">
                      <div>
                        <span class="badge rounded-pill text-bg-primary skeleton-loader">Video Editing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            `;
        clientReviews.append(layout);
        }else{
            console.log("Its Not live");
        }
       

    });


  }


  fetchNotionApiOfClientReview();
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
        var indexOfchannelIdArray = channelIdArray.indexOf(cannelid);
        var indexOfcategoriesArray = categoriesArray.indexOf(catogries);
        var indexOfType = videoTypeId.indexOf(type);

    
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
    }
});

// notion api 

// secret_Ku8SgGv2Ht4R6SEqUvu9uhvynxtEl1CulivgsoTLDDY
function generateHash(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  return crypto.subtle.digest('SHA-256', data)
    .then(hashBuffer => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    });
}

function generateUniqueHash(input) {
  const uniqueInput = input + Math.random().toString();
  return generateHash(uniqueInput);
}

  // Function to fetch data from the endpoint and populate content
  function fetchNotionApi() {
    // Make an AJAX request to fetch data from the endpoint
    $.ajax({
      url: `${BASE_URI}?getnotiondatabase=1&dbid=todo`,
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        createContent(data);
      },
      error: function() {
        console.error('Failed to fetch data from the endpoint.');
      }
    });
  }

  function createContent(data){
    var contentContainersOfNotion = $('#notionContainer');
    const holdingContainers = $('.notionHolding');
    const processingContainers = $('.notionProcessing');
    const liveContainers = $('.notionLive');

    $.each(data['results'], function(index, items) {
        
        var notionStatus = items['properties']['Status']['status'].name;
        var notionText = items['properties']['Name']['title'][0]['text']['content'];
        let layout = `
        <div class="card card-hover mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col">
                <div class="card-body">
                    <h5 class="card-title h6">${notionText}</h5>
                    <div class="d-flex justify-content-between align-items-end">
                    <div>
                        <span class="badge rounded-pill skeleton-loader 
                        ${(notionStatus === "Done") ? "text-bg-success" :
                        (notionStatus === "Not started") ? "text-bg-danger" :
                        (notionStatus === "In progress") ? "text-bg-warning" : "text-bg-danger"}
                        ">
                        
                        <div class="spinner-grow" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
                        ${(notionStatus === "Done") ? "Done" :
                        (notionStatus === "Not started") ? "Not Processed" :
                        (notionStatus === "In progress") ? "In Progress" : "Nothing"}</span> 
                    </div>                                    
                </div>
                </div>
            </div>
        </div>
    </div>`;
        console.log(`>>> ${notionText}`);
        if(notionStatus == "Done"){
            liveContainers.append(layout);
        }if(notionStatus == "Not started"){
            processingContainers.append(layout);
        }if(notionStatus == "In progress"){
            holdingContainers.append(layout);
        }
    });


  }


  fetchNotionApi();
  // Function to fetch data from the endpoint and populate content
  function fetchDataAndPopulateContent() {
    // Make an AJAX request to fetch data from the endpoint
    $.ajax({
      url: `${BASE_URI}?rssfetch`,
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        populateContent(data);
      },
      error: function() {
        console.error('Failed to fetch data from the endpoint.');
      }
    });
  }

  // Function to populate content
function populateContent(data) {
    var contentContainer = $('#contentContainer');
    var rssTitle = $('#rssTitle');

    // alert(data[1].rss.channel.title)
    $.each(data, function(index, items) {

        var titleWithUnderscores = items.rss.channel.title.replace(/ /g, "_");

        const inputData = titleWithUnderscores;

        let uniqueId; // Declare uniqueId outside the promise chain

        generateUniqueHash(inputData)
          .then(hashValue => {
            uniqueId = hashValue;
            console.log(`Unique Hash value for ${inputData}: ${uniqueId}`);
                    
        var tileHtml = `<button type="button" id=${uniqueId} class="${titleWithUnderscores} rssbutton card-blur rounded p-1 me-2 mb-3 btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="All Added videos">
        ${items.rss.channel.title}
       </button>`;
         rssTitle.append(tileHtml);
         $.each(data[index].rss.channel.item, function(index, item) {
             var cardHtml = `
                 <div class="col ${titleWithUnderscores}${uniqueId}">
                     <div class="card card-hover mb-3" style="max-width: 540px;">
                         <div class="row  g-0">
                             <div class="col-md-4">
                                 <img src="${item.og_image}" class="img-fluid rounded-start" alt="Loading..." style="width: 100%; height: 100%; object-fit: cover;">
                             </div>
                             <div class="col-md-8">
                                 <div class="card-body">
                                     <h5 class="card-title clamp-2 skeleton-loader">${item.og_title}</h5>
                                     <p class="card-text clamp-2 skeleton-loader">${item.og_description}</p>
                                     <div class="d-flex justify-content-between align-items-end">
                                     <div>
                                      <span class="badge rounded-pill text-bg-primary skeleton-loader">${items.rss.channel.title}</span> 
                                      <span class="badge rounded-pill text-bg-success skeleton-loader">${item.category}</span> 
                                      </div>                                    
                                     <a href="${item.link}" class="text-primary link-underline link-underline-opacity-0">Visit</a>
                                    </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             `;
             contentContainer.append(cardHtml);
         });
          })
          .catch(error => console.error('Error generating hash:', error));

    });

}



   
$(function() {
  $('.rssbutton').each(function() {
      var elementId = $(this).attr('id');
console.log("---------");
      $(this).on('click', function() {
          console.log(`ID for clicked element with class 'rssbutton': ${elementId}`);
      });
  });
});




    
fetchDataAndPopulateContent();


$(document).ready(function () {
    // Simulate an API call delay for demonstration purposes
    setTimeout(function () {
        // Hide skeleton loader and show content
        $('#cardContainer .skeleton-loader').addClass('d-none');
        $('#cardContainer img, #cardContainer .card-title, #cardContainer .card-text, #cardContainer .badge, #cardContainer a').removeClass('d-none');
    }, 2000); // Adjust the delay as needed
});
document.addEventListener('DOMContentLoaded',()=>{
    var getModelButtons = document.querySelectorAll('.getModel');

    getModelButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
            // Your existing code here
    
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
        });
    });
    
    var getModelButtonss = document.querySelectorAll('.getModel')[0];
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

              }
          });
      });
    }

    

  getVideo();
  // getChannelInfo("UC79ikm9mQLz_I53CKOBeXKA");
  getChannelStatistics("UC79ikm9mQLz_I53CKOBeXKA");

});


//# sourceMappingURL=app.js.map