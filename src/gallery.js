function min(a, b) {
	
	return (a < b) ? a : b;
}

function closeOverlay() {

	if (photo.firstChild)
		photo.removeChild(photo.firstChild);
	document.onkeypress = null;
	overlay.style.visibility = "hidden";
}

function openOverlay() {

	// Show the overlay.
	overlay.style.visibility = "visible";

	// Bind keys.
	document.onkeypress = function(e) {
		switch (e.keyCode) {
			// Esc
			case 27:
				closeOverlay();
				break;
			// Right arrow
			case 63235:
				nextPhoto();
				break;
			// Left arrow
			case 63234:
				prevPhoto();
				break;
			// Home
			case 63273:
				displayPhoto(0);
				break;
			// End
			case 63275:
				displayPhoto(photos.length-1);
				break;
			default:
			//	alert(e.keyCode);
		}
	}
}

function resizePhoto(img) {

	var border = 20; // pixels on each side

	// Calculate adjusted dimensions
	var headerHeight = document.getElementById("header").offsetHeight;
	var footerHeight = document.getElementById("footer").offsetHeight;
	var maxHeight = overlay.offsetHeight - headerHeight - footerHeight - 2 * border;
	var maxWidth = overlay.offsetWidth - 2 * border;

	// Adjust size.
	var ratio  = min(maxHeight / img.height, maxWidth / img.width);
	img.height = img.height * ratio;
	img.width  = img.width * ratio;

	// Center vertically.
	photo.style.marginTop = ((overlay.offsetHeight - img.height) / 2) + "px";
}

function displayProgressBar() {

	var label = document.createElement("p");
	label.id = "progressBar";
	label.style.marginTop = (overlay.offsetHeight / 2) - 20 + "px";
	label.appendChild(document.createTextNode("Nahrávám fotografii…"));
	if (photo.firstChild)
		photo.removeChild(photo.firstChild);
	photo.appendChild(label);
}

function displayPhoto(id) {

	// Create the photo.
	var img = new Image();

	// Set up the handler to do the rest of work
	// after the photo has finished loading.
	img.onload = function() {
		// Hide the image to prevent jumping
		this.style.visibility = "hidden";
		resizePhoto(this);
		if (photo.firstChild)
			photo.removeChild(photo.firstChild);
		photo.appendChild(this);
		this.style.visibility = "visible";
		currentPhoto = id;
		updateControls();
	}

	// Update label.
	document.getElementById("label").firstChild.nodeValue =
		(id+1) + "/" + photos.length + " – " + photos[id].label;
	
	displayProgressBar();

	// Start loading.
	img.src = photos[id].src;
}

function nextPhoto() {
	if (currentPhoto < photos.length-1)
		displayPhoto(currentPhoto + 1);
}

function prevPhoto() {
	if (currentPhoto > 0)
		displayPhoto(currentPhoto - 1);
}

function updateControls() {
	// nop for now
}

function setupPhotos() {

	var links = document.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {

		if (! links[i].href.endsWith("jpg"))
			continue;

		photos.push({
			  "src" : links[i].href,
			"label" : links[i].childNodes[1].getAttribute("alt")
		});

		links[i].photoid = photos.length - 1;
		links[i].onclick = function() {
			displayPhoto(this.photoid);
			openOverlay();
			return false;
		}
	}
}

function createOverlay() {

	document.getElementById("overlay").innerHTML =
	"<div id='header'>" +
		"<p>× <a href='javascript:closeOverlay();'>Zpátky na stránku</a></p>" +
	"</div>" +
	"<div id='photo'></div>" +
	"<div id='footer'>" +
		"<p id='label'>Popisek fotky</p>" +
		"<p class='controls'>" +
			"« <a href='javascript:prevPhoto();'>Předchozí fotka</a> | " +
			"<a href='javascript:nextPhoto();'>Další fotka</a> »" +
		"</p>" +
	"</div>";
}

function setupGallery() {

	if (navigator.userAgent.indexOf("MSIE") != -1)
		return; // life is too short

	createOverlay();
	currentPhoto = -1;

	overlay = document.getElementById("overlay");
	photo = document.getElementById("photo");
	photos = new Array();

	String.prototype.endsWith = function(str) {
		return this.substr(this.length - str.length, str.length) == str;
	}

	setupPhotos();
}

window.onload = setupGallery;
window.onresize = function() {

	if (overlay.style.visibility == "visible")
		resizePhoto(document.getElementById("photo").firstChild)
}

