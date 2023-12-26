
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
