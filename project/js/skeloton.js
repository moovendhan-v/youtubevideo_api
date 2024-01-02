$(document).ready(function () {
    // Simulate an API call delay for demonstration purposes
    setTimeout(function () {
        // Hide skeleton loader and show content
        $('#cardContainer .skeleton-loader').addClass('d-none');
        $('#cardContainer img, #cardContainer .card-title, #cardContainer .card-text, #cardContainer .badge, #cardContainer a').removeClass('d-none');
    }, 2000); // Adjust the delay as needed
});