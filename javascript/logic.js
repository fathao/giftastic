// var gif = ["goku", "bulma", "vegeta"];

const apikey = 'gus012HEmcH71My5Dr9CPpImSBWR3XnM';
const limit = 20;

function getApiUrl(query) {
	return "http://api.giphy.com/v1/gifs/search?q=" + query
		+ "&api_key=" + apikey
		+ "&limit=" + limit;
}

function buildImage(imageData) {
    var stillImgUrl = imageData.images.fixed_height_still.url;
    var animatedImgUrl = imageData.images.fixed_height.url;

    var img = $("<img>")
        .attr("src", stillImgUrl)
        .attr("data-still", stillImgUrl)
        .attr("data-animate", animatedImgUrl)
        .attr("data-state", "still")
        .click(function() {
            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate")
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });

    return img;
}

function showGif(query) {

    var queryURL = getApiUrl(query);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        var data = response.data;
        var gifsContainer = $("#gif-view");
        gifsContainer.empty();

        for (var i = 0; i < data.length; i++) {
            var imageData = data[i];

            var rating = $("<p>")
                .text("Rating: " + imageData.rating);

            var img = buildImage(imageData);

            var gifDiv = $("<div>")
            	.attr("class", "img-container")
                .append(rating)
                .append(img);

            gifsContainer.append(gifDiv);
        }

    });

}

function buildButton(name) {
	var button = $("<button>")
        .addClass("gif")
        .attr("data-name", name)
        .text(name)
        .on("click", function() {
        	var buttonValue = $(this).attr("data-name");
        	showGif(buttonValue);
        });
	return button;
}

function renderButtons() {
	var gif = ["goku", "gohan", "vegeta"];
    for (var i = 0; i < gif.length; i++) {
        var button = buildButton(gif[i]);
        $("#button-view").append(button);
    }
}
renderButtons();

$("#add-gif").on("click", function(event) {

	event.preventDefault();

	var userInput = $("#gif-input").val().trim();
	var button = buildButton(userInput);
    $("#button-view").append(button);

    $("#gif-input").val("");
});
