# plugin-bookshelves (A README Experience)

![List View](https://moondeer.blog/uploads/2022/a007bdb4a1.jpg)

A plugin for [Micro.blog](https://micro.blog "Micro.blog") that creates a page displaying multiple bookshelves. Its code lives [here](https://github.com/moonbuck/plugin-bookshelves "plugin-bookshelves").


![Grid View](https://moondeer.blog/uploads/2022/ce503c9551.jpg)

## Where It's At

Once installed, the generated page will be found at `[SCHEME]://[HOSTNAME]/bookshelf/`. By default, the content file, `content/bookshelf.md`, registers a menu item for the page:

```TOML
+++
title = "Bookshelf"
description = "Book collections"
type = "bookshelf"

[menu.main]
name = 'Bookshelf'
title = 'Bookshelf'
identifier = 'bookshelf'
url = '/bookshelf/'
weight = 115
+++
{{< plugin-bookshelves >}}
```

If you'd rather use the native Micro.blog page interface, locate this file and make it look like this:

```TOML
+++
title = "Bookshelf"
description = "Book collections"
type = "bookshelf"
+++
{{< plugin-bookshelves >}}
```

## Displaying Your Bookshelves (the Ugly Way)

If you leave the parameters untouched …

*Wait … where TF are the parameters?*

I'll get there, chillax … sooo … if you leave the parameters untouched, the plugin generates a section for every bookshelf registered for your site … providing less than stellar headers that display the bookshelf's data key.

![Default Display](https://moondeer.blog/uploads/2022/2093e2b698.jpg)

Okay, so who's ready to learn how to display your bookshelves the pretty way?

*raises hand* *raises hand* *raises hand*

Alrighty then, strap on your big boy (or girl) pants … we're about to dive into the plugin's data directory. 

<nobr> ‿︵‿︵‿︵‿ヽ(°□° )ノ︵‿︵‿︵‿︵ </nobr>

## Displaying Your Bookshelves (the Pretty Way)

I want you to locate `data/plugin_bookshelves/Bookshelves.toml`. It oughta look a little something like:

```TOML
# Bookshelf registry
####################

# A registered bookshelf is composed of the following:
# • The entry's array item umbrella: [[Registered]]
# • A 'Key' entry with the bookshelf's lookup key.
# • An optional 'DisplayName' entry with markdown to parse as the bookshelf's header.
# • An optional 'Description' entry with markdown to parse as the bookshelf's description.
#
# An example might look like the following:
#
# [[Registered]]
# Key = 'currentlyreading'
# DisplayName = 'Currently Reading'
# Description = '*Books I am somewhat in the process of reading*'
```

You can click inside that sucker, move that little cursor about with a flurry of key-up and key-down events, and totally control precisely which of your bookshelves are gonna be displayed, the order in which they are gonna appear, assign some Markdown to shove in each header, and assign some Markdown to shove in descriptive paragraphs. Here come's a lie that totally serves a purpose.

My file, used to generate [this page](https://moondeer.blog/bookshelf/ "Bookshelf"), happens to look like this:

```TOML
# Bookshelf registry
####################

# A registered bookshelf is composed of the following:
# • The entry's array item umbrella: [[Registered]]
# • A 'Key' entry with the bookshelf's lookup key.
# • An optional 'DisplayName' entry with markdown to parse as the bookshelf's header.
# • An optional 'Description' entry with markdown to parse as the bookshelf's description.
#
# An example might look like the following:
#
# [[Registered]]
# Key = 'currentlyreading'
# DisplayName = 'Currently Reading'
# Description = '*Books I am somewhat in the process of reading*'

[[Registered]]
Key = 'currentlyreading'
DisplayName = 'Currently Reading'
Description = '*Books I am somewhat in the process of reading*'

[[Registered]]
Key = 'finishedreading'
DisplayName = 'Finished Reading'
Description = "*Books I've managed to get myself to read*"

[[Registered]]
Key = 'wanttoread'
DisplayName = 'Want to Read'
Description = """\
              *Books that gaze at me judingly from beneath the television, \
              where they currently live, for having yet to crack their spine \
              (f$&kers).*\
              """

[[Registered]]
Key = 'didwanttoread'
DisplayName = 'Did Want to Read'
Description = """\
              *Books whose gaze of judgement I've kinda become okay with as \
              my interest in reading them has waned.*\
              """
```

Right, then … that's how you configure your content. Moving on, some of y'all must have noticed that toggle control above the bookshelves … am I right?

*Yeah, cool … but does it have to start in list view?* *Yeah, f$&k the toggle … just give me list view.* *Seconding f$&k the toggle … but I just want grid view.*

As I suspected, let's look at what I've done to please as many of y'all as … possible isn't really the right word … as many of y'all as I felt like when weighing the amount of time I wanted to spend on the whole ordeal.

## Configuring Plugin Behavior

You're here to learn how to configure the default view … or how to hide the toggle. To modify the default plugin behavior shall require you modify another file that lives beneath the plugin's `data/plugin_bookshelves` directory (this is another deliberate lie … how morally ambiguous of me). That file is called `Config.toml` and it starts out looking kinda like:

```TOML
# Debug and build related parameters
####################################

# Theme version, printed to HTML comment when the plugin loads.
#
Version = '7.0.3'

# Whether to print HTML comments for debugging purposes.
#
DebugPrint = false

# Whether to provide subresource integrity by generating a 
# base64-encoded cryptographic hash and attaching a .Data.Integrity
# property containing an integrity string, which is made up of the
# name of the hash function, one hyphen and the base64-encoded hash sum.
#
Fingerprint = true

# Output style for the generated stylesheet.
# Valid options are nested, expanded, compact and compressed
#
SassOutput = 'compact'

# Whether to minify the generated Javascript file.
#
MinifyScript = false

# Whether to display list/grid view toggle controls.
#
EnableViewToggle = true

# The initial view to display (list or grid).
# This will be the only view when EnableViewToggle = false.
#
InitialView = 'list'
```

You came for the last two parameter values. Read the comments. I took the time to write them.

The only two entries that, perhaps, aren't self explanatory are the first two. *Version* is used by the plugin when injecting the links for the stylesheet and javascript into the page `<head>`. Just before it renders the links, it renders an HTML comment kinda like:

```html
<!-- Bookshelves v7.0.3 (built on Feb 1 at 12:13) --> 
```

I had to dicker with the time to make it Pacific. It is what it is.

The *DebugPrint* parameter lets you dump all the parameters as resolved by the plugin into an HTML comment just above the version comment formatted as a JSON object. The prettified version of my dump is all:

```json
{
  "Bookshelves": {
    "Registered": [
      {
        "Description": "*Books I am somewhat in the process of reading*",
        "DisplayName": "Currently Reading",
        "Key": "currentlyreading"
      },
      {
        "Description": "*Books I've managed to get myself to read*",
        "DisplayName": "Finished Reading",
        "Key": "finishedreading"
      },
      {
        "Description": "*Books that gaze at me judingly from beneath the television, where they currently live, for having yet to crack their spine (f$&kers).*",
        "DisplayName": "Want to Read",
        "Key": "wanttoread"
      },
      {
        "Description": "*Books whose gaze of judgement I've kinda become okay with as my interest in reading them has waned.*",
        "DisplayName": "Did Want to Read",
        "Key": "didwanttoread"
      }
    ],
    "Resolved": [
      {
        "Description": "*Books I am somewhat in the process of reading*",
        "DisplayName": "Currently Reading",
        "Key": "currentlyreading"
      },
      {
        "Description": "*Books I've managed to get myself to read*",
        "DisplayName": "Finished Reading",
        "Key": "finishedreading"
      },
      {
        "Description": "*Books that gaze at me judingly from beneath the television, where they currently live, for having yet to crack their spine (f$&kers).*",
        "DisplayName": "Want to Read",
        "Key": "wanttoread"
      },
      {
        "Description": "*Books whose gaze of judgement I've kinda become okay with as my interest in reading them has waned.*",
        "DisplayName": "Did Want to Read",
        "Key": "didwanttoread"
      }
    ]
  },
  "Config": {
    "DebugPrint": true,
    "EnableViewToggle": false,
    "Fingerprint": true,
    "InitialView": "grid",
    "MinifyScript": false,
    "SassOutput": "compact",
    "Version": "7.0.3"
  },
  "Style": {
    "ActiveButtonClassName": "active",
    "Book": "",
    "BookAuthor": "",
    "BookClassName": "book",
    "BookCover": "",
    "BookLink": "",
    "BookTitle": "",
    "Bookshelf": "",
    "BookshelfClassName": "bookshelf",
    "BookshelfDescription": "",
    "BookshelfName": "",
    "Bookshelves": "",
    "BookshelvesID": "bookshelves",
    "CoverWidth": 100,
    "GridViewButtonID": "grid-view",
    "ListViewButtonID": "list-view",
    "ShowButtonLabels": true,
    "ToggleWrapperID": "bookshelves-view-toggle",
    "Variables": {
      "ButtonBGColor": "#FFFFFF",
      "ToggleAccentColor": "hsl(223, 26%, 43%)",
      "ToggleFontSize": "1rem",
      "ToggleHoverColor": "#1E2025"
    }
  }
}
```

Anyway, everyone is perfectly happy with the CSS styling of all the elements, right? 

<nobr> ┬┴┬┴┤(･_├┬┴┬┴ </nobr>

*Actually, I…*

Stop. I was f$&king with you. There are like 23 lines up there under a *Style* key. Let's have a look at configuring all things style.

## All Things Style

To manipulate the CSS, don't go looking for some CSS file … what you want is the configuration file located at `data/plugin_bookshelves/Style.toml`:

```TOML
# Parameters for styling the bookshelves
########################################

# The ID to assign to the element wrapping the view toggle controls.
#
ToggleWrapperID = 'bookshelves-view-toggle'

# The ID to assign to the list view toggle button.
#
ListViewButtonID = 'list-view'

# The ID to assign to the grid view toggle button.
#
GridViewButtonID = 'grid-view'

# The class name to assign to the toggle button for the active view.
#
ActiveButtonClassName = 'active'

# Whether to display button labels (text) on the toggle buttons.
#
ShowButtonLabels = true

# The ID to assign to the element wrapping the bookshelves.
#
BookshelvesID = 'bookshelves'

# Sass block to apply to the element wrapping the bookshelves.
#
Bookshelves = ''

# The class name to assign to bookshelf wrappers.
#
BookshelfClassName = 'bookshelf'

# Sass block to apply to the bookshelf wrappers.
#
Bookshelf = ''

# Sass block to apply to the bookshelf display names.
#
BookshelfName = ''

# Sass block to apply to the bookshelf descriptions.
#
BookshelfDescription = ''

# The class name to assign to book wrappers.
#
BookClassName = 'book'

# Sass block to apply to the element wrapping the books.
#
Book = ''

# Inline pixel width applied to book covers.
#
CoverWidth = 100

# Sass block to apply to the book links.
#
BookLink = ''

# Sass block to apply to the book covers.
#
BookCover = ''

# Sass block to apply to the book titles.
#
BookTitle = ''

# Sass block to apply to the book author names.
#
BookAuthor = ''

[Variables]

# The font size used by the view toggle controls.
#
ToggleFontSize = '1rem'

# The border color for the view toggle controls.
# This value is also used as the background color for hovered buttons.
#
ToggleAccentColor = 'hsl(223, 26%, 43%)'

# The color to set as the toggle button wrapper's background color.
# This color is also applied as the foreground color for inactive 
# buttons.
#
ToggleHoverColor = '#1E2025'

# The background color for the toggle buttons.
# This color is also applied as the foreground color for active buttons.
#
ButtonBGColor = '#FFFFFF'
```

The parameters that end with *ID* or *ClassName* you'll never have a need to modify unless the values happen to clash with values already in use (no idea how that would happen since I'm generating all the HTML for you). The reason these values have been parameterized is for consistency. Get this … the Javascript file for manipulating the view … and the CSS file for styling the elements … both those m0therf$&kers are actually generated from Hugo templates that make use of *your* parameter values during the build process. I stuck the HTML element specifiers in the data file so  I never have to worry about f$&king up with managing hard coded values in multiple files.

Let's seeee … what are the values of interest here … well there's *ShowButtonLabels* which let's you control whether the text appears next to the view icons. *CoverWidth* sets the image width for the cover images. Oh, and there are a bunch of parameters currently set to the empty string. These are for custom [Sass](https://sass-lang.com/ "Sass") blocks…

*Wait… WTF is Sass?*

Honestly, it really doesn't matter. The plugin uses the SCSS Sass syntax to build the stylesheet … which means any valid CSS is also valid. I may as well say they are for custom CSS blocks. Anyway, hopefully the comments above each parameter value are enough to explain to which element the CSS shall apply. The Sass file, `assets/sass/plugin_bookshelves/bookshelves.scss`, styles each element (more or less) inserting the custom CSS block just after to allow y'all to override or undo whatever default styling I've chosen to apply.

The parameter values beneath the `[Variables]` umbrella all apply to the view toggle controls. These values are singled out like this because the appear in multiple places within the Sass file.

Anyway … I fully expect some theme or another will clash with the default style … creating some little sh$t show or another. Feel free to holler at me when things don't look right. Okay, who's ready to find out why I've been lying to you periodically throught this whole deal?

*raises hand* *raises hand* *raises hand* *raises hand* *raises hand* *raises hand* *raises hand* *raises hand*

I see, more of you this time … I've peaked your curiosity have I? Alright, then. The silk I've used while spinning my little web of lies was produced in the name of persistence.

## Persistance

The drawback of having you edit files within the plugin's directory is that these files will be overwritten with each update. You can store copies of these files as regular text files somewhere and simply paste your configuration into the update. You could probably even just duplicate the plugin before updating and copy / paste from the duplicate. 

You could do that … but that sh$t ain't for me. I want to set the parameter values and then forget about their existence. Now, here's the thing about Hugo templates: path is king. If the code in my plugin looks for data located at `data/my_plugin/Config.toml` (in reality it is looking at `data.my_plugin.Config`) … it matters not whether that file is located in a theme, a custom theme, or another plugin … if it exists anywhere it will be available to my plugin. 

*What about naming collisions?*

\*touches-finger-to-nose-tip\* Precisely. This is the only real concern. This is why all of my plugins stick their files beneath an extra plugin-specific subdirectory. It's why we can't just replicate the plugin's data directory in our custom themes. To simplify things (remember, I have 15 plugins to keep configured for my own site), I chose to reduce plugin configuration to a single file when stored inside a custom theme. In order to avoid clashing with the plugin data directories, I chose to use a dash-cased naming convention when storing the single configuration file inside a custom theme. What this all adds up to, is that I have one file for configuring my plugin-bookshelves installation … and it happens to look like this (for reals):

```TOML
# Debug and build related parameters
####################################
[Config]

# Whether to print HTML comments for debugging purposes.
#
# DebugPrint = false

# Whether to provide subresource integrity by generating a 
# base64-encoded cryptographic hash and attaching a .Data.Integrity
# property containing an integrity string, which is made up of the
# name of the hash function, one hyphen and the base64-encoded hash sum.
#
# Fingerprint = true

# Output style for the generated stylesheet.
# Valid options are nested, expanded, compact and compressed
#
# SassOutput = 'compact'

# Whether to minify the generated Javascript file.
#
# MinifyScript = false

# Whether to display list/grid view toggle controls.
#
# EnableViewToggle = true

# The initial view to display (list or grid).
# This will be the only view when EnableViewToggle = false.
#
# InitialView = 'list'

# Bookshelf registry
####################

# A registered bookshelf is composed of the following:
# • The entry's array item umbrella: [[Registered]]
# • A 'Key' entry with the bookshelf's lookup key.
# • An optional 'DisplayName' entry with markdown to parse as the bookshelf's header.
# • An optional 'Description' entry with markdown to parse as the bookshelf's description.
#
# An example might look like the following:
#
# [[Registered]]
# Key = 'currentlyreading'
# DisplayName = 'Currently Reading'
# Description = '*Books I am somewhat in the process of reading*'

[[Bookshelves.Registered]]
Key = 'currentlyreading'
DisplayName = 'Currently Reading'
Description = '*Books I am somewhat in the process of reading*'

[[Bookshelves.Registered]]
Key = 'finishedreading'
DisplayName = 'Finished Reading'
Description = "*Books I've managed to get myself to read*"

[[Bookshelves.Registered]]
Key = 'wanttoread'
DisplayName = 'Want to Read'
Description = """\
              *Books that gaze at me judingly from beneath the television, \
              where they currently live, for having yet to crack their spine \
              (f$&kers).*\
              """

[[Bookshelves.Registered]]
Key = 'didwanttoread'
DisplayName = 'Did Want to Read'
Description = """\
              *Books whose gaze of judgement I've kinda become okay with as \
              my interest in reading them has waned.*\
              """

# Parameters for styling the bookshelves
########################################
[Style]

# The ID to assign to the element wrapping the view toggle controls.
#
# ToggleWrapperID = 'bookshelves-view-toggle'

# The ID to assign to the list view toggle button.
#
# ListViewButtonID = 'list-view'

# The ID to assign to the grid view toggle button.
#
# GridViewButtonID = 'grid-view'

# The class name to assign to the toggle button for the active view.
#
# ActiveButtonClassName = 'active'

# Whether to display button labels (text) on the toggle buttons.
#
# ShowButtonLabels = true

# The ID to assign to the element wrapping the bookshelves.
#
# BookshelvesID = 'bookshelves'

# Sass block to apply to the element wrapping the bookshelves.
#
# Bookshelves = ''

# The class name to assign to bookshelf wrappers.
#
# BookshelfClassName = 'bookshelf'

# Sass block to apply to the bookshelf wrappers.
#
# Bookshelf = ''

# Sass block to apply to the bookshelf display names.
#
# BookshelfName = 'font-size: 1.25rem;'

# Sass block to apply to the bookshelf descriptions.
#
# BookshelfDescription = 'font-size: 1rem;'

# The class name to assign to book wrappers.
#
# BookClassName = 'book'

# Sass block to apply to the element wrapping the books.
#
# Book = ''

# Inline pixel width applied to book covers.
#
# CoverWidth = 100

# Sass block to apply to the book links.
#
# BookLink = ''

# Sass block to apply to the book covers.
#
# BookCover = ''

# Sass block to apply to the book titles.
#
# BookTitle = ''

# Sass block to apply to the book author names.
#
# BookAuthor = ''

[Style.Variables]

# The font size used by the view toggle controls.
#
# ToggleFontSize = '.8rem'

# The border color for the view toggle controls.
# This value is also used as the background color for hovered buttons.
#
# ToggleAccentColor = 'hsl(223, 26%, 43%)'

# The color to set as the toggle button wrapper's background color.
# This color is also applied as the foreground color for inactive 
# buttons.
#
# ToggleHoverColor = '#1E2025'

# The background color for the toggle buttons.
# This color is also applied as the foreground color for active buttons.
#
# ButtonBGColor = '#FFFFFF'
```

If you have a custom theme, you can create your own file by clicking the new template button, setting the location to `data/plugin-bookshelves.toml`, and making the following TOML related adjustments (files within the data directory are treated specially by Hugo … the file name is actually the key for the top level entries of the file):

1. Copy over the contents of `data/plugin_bookshelves/Config.toml` and just below the opening comment insert `[Config]`.
2. Copy over the contents of `data/plugin_bookshelves/Bookshelves.toml` and modify every appearance of `[[Registered]]` so that it reads `[[Bookshelves.Registered]]`.
3. Copy over the contents of `data/plugin_bookshelves/Style.toml` and just below its opening comment insert `[Style]`. Then scroll down and modify `[[Variables]]` to read `[[Style.Variables]]`.
4. (Optional) Place a `#`, like I have above, in front of every parameter you don't really wish to modify. The plugin actually merges the contents of this new file with the contents of the plugin's files. The values from the file stored in a custom theme overwrite the values stored in the plugin's data files.

I'm sure y'all have questions. Feel free to holler them at me.