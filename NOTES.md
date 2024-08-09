## Source code tree:
```
.github
src: Source Code
  content: content script/style, runs in YouTube
  options: options page
  platform: manifest.json copies to support many browsers
  res: Resources (icons, fonts, etc.)
tools: Scripts (UNIX only!)
  make.sh: build a package for the browser (currently a .zip file)
  preview.sh: Copies manifest.json and locales to load the extension unpacked for testing
```

## Some issues:
 - More option types
 - Possible Developer eXperience updates
 - Actual artwork and design
 - Implement YouTube HTML extraction

etc...

## Adding features
1. Add the category/section/option in `src/options.json`
2. implement the actual feature in `src/content/CATEGORY.js` like this:
```javascript

sYT.OPTION = () => {
	// 'this' is actually 'option.state'.
	if (!this) return;

	// Insert random YouTube code here

}
```
the function may be called more than once and in callbacks
    (example: the user disables then enables an option
     or the user navigates between pages)
