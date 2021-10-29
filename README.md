# plugin-bookshelves
A plugin for [Micro.blog](https://micro.blog "Micro.blog") that creates a page displaying multiple bookshelves.

Once installed, the generated page will be found at `[SCHEME]://[HOSTNAME]/bookshelf/`.

If you leave the parameters untouched, the plugin generates a section for every bookshelf with headers displaying the less-than-stellar bookshelf key.

![Bookshelf Key Headers](https://raw.githubusercontent.com/moonbuck/plugin-bookshelves/main/bookshelf_keys.jpeg)

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
 
So copy that JSON, head to the plugin parameters, and paste it in kinda like…

![Plugin Parameters](https://raw.githubusercontent.com/moonbuck/plugin-bookshelves/main/plugin_parameters.jpeg)

Then, instead of listing all of your bookshelves, the plugin will list only the bookshelves included in the JSON object … and in place of those headers the plugin will generate a paragraph introducing your bookshelf with the specified description, kinda like…

![Bookshelf Descriptions](https://raw.githubusercontent.com/moonbuck/plugin-bookshelves/main/bookshelf_descriptions.jpeg)

In addition to giving pretty descriptions, the choice of which bookshelves to include on the page hinges entirely upon which names are found in the supplied JSON object. This means that (until I implement better handling for massive book lists) a bookshelf may be left out simply by leaving out its entry in the JSON object.

You can play around with the pixel width used in cover image requests. If you do, there is something you should know:

**when you load the plugin parameter page, any previously set JSON object will be mangled, so you will want to keep it copied somewhere else and paste that little f$&ker back into the parameter field *EVERY* time you feel like actually hitting that button to update settings.**

The page template lives at `layouts/bookshelf/single.html`. 

```html
{{ define "main" }}
<section id="wrapper">
<article class="h-entry post">
<section class="e-content post-body">

{{ with site.Params.bookshelves_data_json }}
  {{ with transform.Unmarshal . }}
    {{ range $bookshelf, $description := . }}
    
<p class="bookshelf-description">{{ $description | markdownify }}</p>
<div class="bookshelf-books">
      {{ range index site.Data.bookshelves $bookshelf }}

{{ partial "book.html" . }}

      {{ end }}
</div>

    {{ end }}
  {{ end }}

{{ else }}
  
 {{ range $bookshelf_key, $bookshelf := site.Data.bookshelves }}
 
<h1 class="bookshelf-key">{{ $bookshelf_key }}</h1>
<div class="bookshelf-books">
  {{ range $bookshelf }}
  
{{ partial "book.html" . }}  
  
  {{ end }}
</div>

 {{ end }}

{{ end }}

</section>
</article>
</section>

{{ end }}
```

The partial it uses for each book lives at `layouts/partials/book.html`. It may be useful elsewhere if you feed it a book from a bookshelf.

```html
{{ $cover_width := 100 }}
{{ with site.Params.bookshelves_cover_width }}
{{ $cover_width = . | int }}
{{ end }}
<div class="bookshelf-book">
  <a 
    class="bookshelf-book-link" 
    href="https://micro.blog/books/{{ .isbn }}">
    <img 
      class="bookshelf-book-cover"
      src="https://micro.blog/photos/{{ $cover_width }}x/{{ .cover_url }}"
      align="left" />
  </a>
  <div>
  <span class="bookshelf-book-title">{{ .title }}</span>
{{ with .author }}
  <br /><span class="bookshelf-book-author">by {{.}}</span>
{{ end }}
  </div>
 </div>
```

The HTML elements are all appropriately classed for custom CSS, etc., etc. The stylesheet it uses lives at `static/assets/css/bookshelf.css`.

```css
div.bookshelf-books {
  margin: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

div.bookshelf-book {
  display: flex;
  align-items: center;
  gap: 20px;
}
```

The file living at `content/bookshelf.md` specifies the front matter for the page.

```json
{
  "title": "Bookshelf",
  "description": "Book collections",
  "type": "bookshelf",
  "menu": {
    "main": {
      "name": "Bookshelf",
      "title": "Bookshelf",
      "identifier": "bookshelf",
      "url": "/bookshelf/",
      "weight": 115
    }
  }
}
```

Leave the `type` alone (as that is what points it to `layouts/bookshelf/single.html`). You can play with the `title` and `description` values. These set the values I would expect your theme to draw from when constructing the page `<head>`. The `menu` creates a menu item to include the page in your navigation. Leave the `url` alone (this is how the link’s target is derived). You can play around with the other values. You can adjust the value of `weight` to slide the menu item up or down your list of navigation items. You can remove the `menu` entry entirely if you do not want the page to show up in your navigation menu.