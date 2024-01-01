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

