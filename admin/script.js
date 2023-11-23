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
}

let categoriesArray = [];
let channelIdArray = [];  
let videoTypeId = []; 

function createSelect(classes, array){
  var selectElement = document.querySelector(`.${classes}`);
  array.forEach(function (value) {
    var option = document.createElement("option");
    option.value = value;
    option.text = value;
    selectElement.appendChild(option);
  });
  selectElement.options[1].selected = true;
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
            console.log(categoriesArray);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    await fetchcategoriesArray("getcatogriesinfo");   // path, array, json key 
    await createSelect("videoCatogries", categoriesArray);
});


document.addEventListener('DOMContentLoaded', async function () {
  async function fetchchannelIdArray(slogan) {
      try {
          const response = await fetch(`https://youtubeapi.agricreations.com/?${slogan}`);
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
});

async function fetchData() {
  try {
    const response = await fetch('https://youtubeapi.agricreations.com/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // Process the API response data here

    // getting responce andd convert and save in object 
    var dataObjects = mapApiResponseToDataObject(data);

    //looping objects
    for (var i = 0; i < dataObjects.length; i++) {
      createTableRow(dataObjects[i]);
  }
    console.log(data);
    return data;
  } catch (error) {
    // Handle errors here
    console.error('Error fetching data:', error);
  }
}
// Call the async function
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
        channelId: response.snippet.channelId || "",
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
      editRow.innerText = "Edit";
      indexCell.append(editRow)
      tableRow.appendChild(indexCell);
    // Create a table cell for the index
      var indexCell = document.createElement("th");
      indexCell.setAttribute("scope", "row");
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
          cell.textContent = data[i];
          tableRow.appendChild(cell);
      }
      // Append the new table row to the existing table body within the table with id "tableData"
      var tbody = document.querySelector("tbody");
      tbody.appendChild(tableRow);
  }

  var getModelButtons = document.querySelectorAll('.getModel');
  getModelButtons.forEach(function (button) {
      button.addEventListener('click', function (e) {
          // Your existing code here
          console.log(e.target.parentNode.parentNode);

          var id = button.parentElement.parentElement.cells[1].innerText;
          var image = button.parentElement.parentElement.cells[2].lastChild.src;
          var title = button.parentElement.parentElement.cells[3].innerText;
          var description = button.parentElement.parentElement.cells[4].innerText;
          var cannelid = button.parentElement.parentElement.cells[5].innerText;
          var catogries = button.parentElement.parentElement.cells[6].innerText;
          var type = button.parentElement.parentElement.cells[7].innerText;
          var islive = button.parentElement.parentElement.cells[8].innerText;

          var modalid = document.querySelector('.modalId').innerText = id;
          var modalTitle = document.querySelector('.modalTitle').value = title;
          var modalDes = document.querySelector('.modalDes').value = description;
          var modalChecked = document.querySelector('.modalChecked').checked = islive == 1 ? true : false ;

          // var modalChannelId = document.querySelector('.modalDes').value = description;
          console.log(` ${image} ${title} ${description}, ${cannelid}, ${catogries} ${type} ${islive}`);
      });
  });


// createSelect("videoSelects", channelIdArray);
// // createSelect("videoCatogries", categoriesArray);
// createSelect("videoType", videoTypeId);







//removing toast button 
// if (document.getElementById('liveAlertPlaceholder').childNodes.length >= 1) {
//   console.log("true");
//   const intervalId = setInterval(() => {
//     if (document.getElementById('liveAlertPlaceholder').childNodes.length >= 1) {
//       document.getElementById('liveAlertPlaceholder').childNodes[0].remove();
//     } else {
//       console.log("Terminating process, no more child nodes.");
//       clearInterval(intervalId);
//     }
//   }, 2000);
// } else {
//   console.log("No child nodes initially, terminating process.");
// }

