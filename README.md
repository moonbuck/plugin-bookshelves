# plugin-bookshelves
A plugin for [Micro.blog](https://micro.blog "Micro.blog") that creates a page displaying multiple bookshelves.

***New in version 4 (and yes … version 3 was like three hours ago)*** Data can be stored as an array of objects under the `bookshelves` key so that the order in which they are displayed can be controlled. Take my file as I had it (found a bit lower down), apply the array format, and it looks like this:

```json
{ "bookshelves": [
  {
    "key": "currentlyreading",
    "description": "*Books I am somewhat in the process of reading*"
  },
  {
    "key": "finishedreading",
    "description": "*Books I've managed to get myself to read*"
  },
  {
    "key": "wanttoread",
    "description": "*Books that gaze at me judingly from beneath the television, where they currently live, for having yet to crack their spine (f$&kers).*"
  },
  {
    "key": "didwanttoread",
    "description": "*Books whose gaze of judgement I've kinda become okay with as my interest in reading them has waned.*"
  }
]}
```

***New in version 3*** List and grid views, beeeches. The default view is `list`. You can set the parameter value to `grid` to start out with the grid view instead.

![List View](https://raw.githubusercontent.com/moonbuck/plugin-bookshelves/main/images/list_view.jpeg) ![Grid View](https://raw.githubusercontent.com/moonbuck/plugin-bookshelves/main/images/grid_view.jpeg)

Once installed, the generated page will be found at `[SCHEME]://[HOSTNAME]/bookshelf/`.

If you leave the parameters untouched, the plugin generates a section for every bookshelf with headers displaying the less-than-stellar bookshelf key.

![Bookshelf Key Headers](https://raw.githubusercontent.com/moonbuck/plugin-bookshelves/main/images/bookshelf_keys.jpeg)

You can take these silly, lowercase, spaceless values and use them as keys for descriptions within a JSON object kinda like…

```json
{
  "currentlyreading": "*Books I am somewhat in the process of reading*",
  "finishedreading": "*Books I've managed to get myself to read*",
  "wanttoread": "*Books that gaze at me judingly from beneath the television, where they currently live, for having yet to crack their spine (f$&kers).*",
  "didwanttoread": "*Books whose gaze of judgement I've kinda become okay with as my interest in reading them has waned.*"
}
```

Notice the descriptions will be `markdownified` so you can include markdown.
 
So copy that JSON, head to the plugin parameters, and paste it in…

![Plugin Parameters](https://raw.githubusercontent.com/moonbuck/plugin-bookshelves/main/images/plugin_parameters.jpeg)

Or, starting with `version 2`, you can save that JSON object directly in a template under `data/plugin_bookshelves/bookshelves_data.json`. I highly recommend this method … and if you save it in your theme the data will persist between plugin updates.

Then, instead of listing all of your bookshelves, the plugin will list only the bookshelves included in the JSON object … and in place of those headers the plugin will generate a paragraph introducing your bookshelf with the specified description, kinda like…

![Bookshelf Descriptions](https://raw.githubusercontent.com/moonbuck/plugin-bookshelves/main/images/bookshelf_descriptions.jpeg)

You can play around with the pixel width used in cover image requests. If you do, there is something you should know if you are using the plugin parameter to store your bookshelves data:

**when you load the plugin parameter page, any previously set JSON object will be mangled, so you will want to keep it copied somewhere else and paste that little f$&ker back into the parameter field *EVERY* time you feel like actually hitting that button to update settings.**

The page template lives at `layouts/bookshelf/single.html`. 

```go
{{ define "main" }}
{{/* Wrap the content */}}
<section id="wrapper">
<article class="h-entry post">
<section class="e-content post-body">

{{/* Create the list-grid layout buttons */}}
<div id="bookshelves-button-container-wrapper"><div id="bookshelves-button-container">
<button id="list-view" class="button active" onclick="listView()"><i class="fas fa-list"></i></button> 
<button id="grid-view" class="button" onclick="gridView()"><i class="fas fa-th"></i></button>
</div></div>

{{/* Check for bookshelves data */}}
{{ $bookshelves_data := false }}
{{ with site.Data.plugin_bookshelves.bookshelves_data }}
{{ $bookshelves_data = . }}
{{ else }}
{{ with site.Params.bookshelves_data }}{{ $bookshelves_data = . }}{{ end }}
{{ end }}

{{/* Unmarshall the data if we found it in string form */}}
{{ if (and $bookshelves_data (not ($bookshelves_data | reflect.IsMap))) }}
{{ with transform.Unmarshal $bookshelves_data }}
{{ $bookshelves_data = . }}
{{ end }}
{{ end }}

{{ with $bookshelves_data }}

{{ partial "bookshelves-from-data.html" . }}

{{ else }}
  
{{ partial "bookshelves-inferred.html" . }}

{{ end }}

</section>
</article>
</section>

{{ end }}
```

The partial it uses for each book lives at `layouts/partials/book.html`. It may be useful elsewhere if you feed it a book from a bookshelf.

```go
{{ $cover_width := site.Params.bookshelves_cover_width | default 100 | int }}
<div class="bookshelf-book">
  <a 
    class="bookshelf-book-link" 
    href="https://micro.blog/books/{{ .isbn }}">
    <img 
      class="bookshelf-book-cover"
      src="https://micro.blog/photos/{{ $cover_width }}x/{{ .cover_url }}"
      align="left" />
  </a>
  <div class="bookshelf-book-title-author">
  <span class="bookshelf-book-title">{{ .title }}</span>
{{ with .author }}
  <br /><span class="bookshelf-book-author">by {{.}}</span>
{{ end }}
  </div>
</div> 
```

The HTML elements are all appropriately classed for custom CSS, etc., etc. The stylesheet it uses lives at `static/assets/css/bookshelf.css`.

```css
/* List View */

div.bookshelf-books.list-view {
  margin: 50px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  gap: 20px;
}

div.bookshelf-books.list-view > div.bookshelf-book {
  display: flex;
  align-items: center;
  gap: 20px;
}

/*
div.bookshelf-books.list-view > div.bookshelf-book > a.bookshelf-book-link {
  
}
*/

/*
div.bookshelf-books.list-view > div.bookshelf-book > a.bookshelf-book-link > img.bookshelf-book-cover {
  
}
*/

/*
div.bookshelf-books.list-view > div.bookshelf-book > div.bookshelf-book-title-author {
  
}
*/

/* Grid View */

div.bookshelf-books.grid-view {
  margin: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
}

/*
div.bookshelf-books.grid-view > div.bookshelf-book {
  
}
*/

/*
div.bookshelf-books.grid-view > div.bookshelf-book > a.bookshelf-book-link {
  
}
*/

/*
div.bookshelf-books.grid-view > div.bookshelf-book > a.bookshelf-book-link > img.bookshelf-book-cover {
  
}
*/

div.bookshelf-books.grid-view > div.bookshelf-book > div.bookshelf-book-title-author {
  display: none;
}

/* Buttons */

div#bookshelves-button-container-wrapper {
  display: flex;
  justify-content: center;
  gap: 0;
 padding: 0;
 margin: 0;
 align-content: stretch;
}

div#bookshelves-button-container {
  border: 0.1em solid hsl(223, 26%, 43%);
  outline: none;
  padding: 0;
  margin:0;
  background-color: #FFF;
  border-radius: 1em;
  color: #1E2025;
  font-size: 0.8rem;
  cursor: pointer;
}

div#bookshelves-button-container > button.button {
  padding: 0 1em;
  margin: 0;
  background-color: #FFF;
  color: #1E2025;
  height: 100%;
  font-size: 0.8rem;
}
  
div#bookshelves-button-container > button#list-view {
  border-radius: 1em 0 0 1em;
}

div#bookshelves-button-container > button#grid-view {
    border-radius: 0 1em 1em 0;
}

/* Change this hover color to match your theme color */
div#bookshelves-button-container > button.button:hover {
  background-color: hsl(223, 26%, 43%);
  color: #DDD;
}

div#bookshelves-button-container > button.button.active {
  background-color: #1E2025;
  color: #FFF;
}
```

The file living at `content/bookshelf.md` specifies the front matter for the page.

```toml
+++
title = "Bookshelf"
description = "Book collections"
type = "bookshelf"
+++
```

Leave the `type` alone (as that is what points it to `layouts/bookshelf/single.html`). You can play with the `title` and `description` values. These set the values I would expect your theme to draw from when constructing the page `<head>`.