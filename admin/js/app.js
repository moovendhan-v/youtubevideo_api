// function getVideoDetailsByUrl() {
//     // var videoUrl = $('#getVideoDetaialByUrl').val();
//     var videoUrl = "https://www.youtube.com/watch?v=UlD2BnFXV-c";
//     $.ajax({
//         type: 'GET',
//         url: 'https://youtubeapi.agricreations.com/fetchvideo.php',
//         data: { videoUrl: videoUrl },
//         dataType: 'json',
//         success: function(response) {
//             if (response.error) {
//                 $('#result').html('Error: ' + response.error);
//             } else {
//                 $('.result').html(
//                     'Video ID: ' + response.videoId + '<br>' +
//                     'Title: ' + response.title + '<br>' +
//                     'Description: ' + response.description + '<br>' +
//                     '<img src="' + response.thumbnailUrl + '" alt="Thumbnail">'
//                 );
//             console.log('AJAXSUCCESS', response);
//             }
//         },
//         error: function(xhr, status, error) {
//             console.error('AJAX Error:', status, error);
//         }
//     });
// }

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
// $(document).ready(function() {
//     $('#getVideoDetailByUrl').on('click', function() {
//         getVideoDetails();
//     });
// });