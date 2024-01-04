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