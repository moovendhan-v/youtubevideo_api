  // Function to fetch data from the endpoint and populate content
  function fetchDataAndPopulateContent() {
    // Make an AJAX request to fetch data from the endpoint
    $.ajax({
      url: 'http://localhost/htdocs/?rssfetch',
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
    // var siteLength = data;
    // var itemLength = data[1].rss.channel.item.length;

    // alert(`${siteLength} ${itemLength}`);
    var contentContainer = $('#contentContainer');
    var rssTitle = $('#rssTitle');

    // alert(data[1].rss.channel.title)
    $.each(data, function(index, items) {
        var titleWithUnderscores = items.rss.channel.title.replace(/ /g, "_");
        var tileHtml = `<button type="button" class="${titleWithUnderscores} card-blur rounded p-1 me-2 mb-3 btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="All Added videos">
       ${items.rss.channel.title}
      </button>`;
        rssTitle.append(tileHtml);
        $.each(data[index].rss.channel.item, function(index, item) {
            var cardHtml = `
                <div class="col ${titleWithUnderscores}">
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
    });
       
}


  fetchDataAndPopulateContent();