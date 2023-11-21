// tab creations 
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));

            // Show the selected tab content
            tabContents[index].classList.add('active');
        });
    });
});


var categoriesArray = [];
var channelIdArray = [];
var videoTypeId = [];


async function fetchData() {
  try {
    const response = await fetch('https://apis.agricreations.com');
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

    // for (var i = 0; i < dataObjects.length; i++) {
    //     createTableRow(dataObjects[i]);
    // }

      // Log the result
      console.log(categoriesArray);
      console.log(channelIdArray);
      console.log(videoTypeId);

// Select all elements with the class name "getModel"
var getModelButtons = document.querySelectorAll('.getModel');

// Add a click event listener to each element
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
