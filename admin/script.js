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
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
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
  categoriesArray.forEach(category => {
      let paragraph = document.createElement('p');
      paragraph.textContent = category;
      channelContent.appendChild(paragraph);
  });
}
//catogries
function appendChannelToDOM(categoriesArray) {
  let channelContent = document.querySelector('.catogriesContent');
  categoriesArray.forEach(category => {
      let paragraph = document.createElement('p');
      paragraph.textContent = category;
      channelContent.appendChild(paragraph);
  });
}
//Type
function appendTpeToDOM(categoriesArray) {
  let channelContent = document.querySelector('.typeContent');
  categoriesArray.forEach(category => {
      let paragraph = document.createElement('p');
      paragraph.textContent = category;
      channelContent.appendChild(paragraph);
  });
}


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
            const response = await fetch(`https://youtubeapi.agricreations.com/?${slogan}`);
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
    await appendCategoriesToDOM(categoriesArray);

});


document.addEventListener('DOMContentLoaded', async function () {
  async function fetchchannelIdArray(slogan) {
      try {
          const response = await fetch(`https://youtubeapi.agricreations.com/?${slogan}`);
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
  await appendChannelToDOM(channelIdArray);
});

document.addEventListener('DOMContentLoaded', async function () {
  async function fetchgetvideoinfo(slogan) {
      try {
          const response = await fetch(`https://youtubeapi.agricreations.com/?${slogan}`);
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
    const response = await fetch('https://youtubeapi.agricreations.com/');
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
      var indexCell = document.createElement("th");
      var editRow = document.createElement('button');
      editRow.classList.add("btn", "btn-danger", 'getModel');
      editRow.setAttribute('id', dataObject.id);
      editRow.setAttribute("data-bs-toggle", "modal");
      editRow.setAttribute("data-bs-target", "#editModel");
      editRow.innerText = "Edit Video";
      indexCell.append(editRow)
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
      imageElement.classList.add("img-fluid", "thumnail");
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
      if(tbody.childElementCount >= 1){
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

// var parentElementsForUpdate = document.querySelector('#Ba58DtoCUes').parentElement.parentElement.childNodes;
// parentElementsForUpdate[3].innerText = "testupdate";

// function updateUpdatedDatataInUI(){
//   var toUdateTable = document.querySelector('#Ba58DtoCUes').parentElement.parentElement;
//   toUdateTable.childNodes[2].innerText = "test" ; //image
//   toUdateTable.childNodes[3].innerText = "test" ; //title
//   toUdateTable.childNodes[4].innerText = "test" ; //description
//   toUdateTable.childNodes[5].innerText = "test"; //channel Name
//   toUdateTable.childNodes[6].innerText = "test"; //catogries
//   toUdateTable.childNodes[7].innerText = "test"; //type
//   toUdateTable.childNodes[8].innerText = "test"; //is live  
// }






// createSelect("videoSelects", channelIdArray);
// // createSelect("videoCatogries", categoriesArray);
// createSelect("videoType", videoTypeId);







// removing toast button 
function RemoveToast(){
  if (document.getElementById('liveAlertPlaceholder').childNodes.length >= 1) {
    console.log("true");
    setInterval(() => {
      if (document.getElementById('liveAlertPlaceholder').childNodes.length >= 1) {
        document.getElementById('liveAlertPlaceholder').childNodes[document.getElementById('liveAlertPlaceholder').childNodes.length-1].remove();
      } else {
        console.log("Terminating process, no more child nodes.");
        clearInterval(intervalId);
      }
    }, 4000);
  } else {
    console.log("No child nodes initially, terminating process.");
  }
}