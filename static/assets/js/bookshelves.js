var bookshelves = document.getElementsByClassName("bookshelf-books");

var i;

function listView() {
  for (i = 0; i < bookshelves.length; i++) {
    bookshelves[i].className = bookshelves[i].className.replace("grid", "list");
  }
}

function gridView() {
  for (i = 0; i < bookshelves.length; i++) {
    bookshelves[i].className = bookshelves[i].className.replace("list", "grid");
  }
}

var container = document.getElementById("bookshelves-button-container");
var buttons = container.getElementsByClassName("button");
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}