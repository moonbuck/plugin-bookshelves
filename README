# plugin-bookshelves
A plugin for Micro.blog that creates a page displaying multiple bookshelves.

If you leave the parameters untouched, the plugin generates a section for every bookshelf with headers displaying the less-than-stellar bookshelf key.

![Bookshelf Key Headers](bookshelf_keys.jpeg)

You can take these silly, lowercase, spaceless values and use them as keys for descriptions within a JSON object kinda like…

```json
`{
  "currentlyreading": "*Books I am somewhat in the process of reading*",
  "finishedreading": "*Books I've managed to get myself to read*",
  "wanttoread": "*Books that gaze at me judingly from beneath the television, where they currently live, for having yet to crack their spine (f$&kers).*",
  "didwanttoread": "*Books whose gaze of judgement I've kinda become okay with as my interest in reading them has waned.*"
}
```

Notice the descriptions will be `markdownified` so you can include markdown.
 
So copy that JSON, head to the plugin parameters, and paste it in kinda like…

![Plugin Parameters](plugin_parameters.jpeg)

Then in place of those headers the plugin will generate a paragraph introducting your bookshelf with the specified description, kinda like…

![Bookshelf Descriptions](bookshelf_descriptions.jpeg)

You can play around with the pixel width to request for the cover images. If you do, there is something you should know:

**when you load the plugin parameter page, any previously set JSON object will be mangled, so you will want to keep it copied somewhere else and paste that little f$&ker back into the parameter field *EVERY* time you feel like actually hitting that button to update settings.**