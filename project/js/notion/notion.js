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