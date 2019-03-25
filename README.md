# Tentbnb

Just a prank for my friends. Nothing serious here.

*Using Angular & Google Maps*

See it live [here](https://psyber.city/TentBnB/)

Always useful:
[angular to gh pages](https://github.com/angular/angular-cli/wiki/stories-github-pages)

##Steps for deployment of an Angular SPA to GitHub pages:

1. Create js file with code from [websemantics/gh-pages-spa](https://github.com/websemantics/gh-pages-spa). 
Just copy the code from [this](https://github.com/websemantics/gh-pages-spa/blob/master/ghspa.js) file here, and
paste it in a file named **ghspa.js** (or however else you like) that you place in the `src/` folder of your app. On the same level as
`index.html`.

2. Create a `404` page with code from [websemantics/gh-pages-spa](https://github.com/websemantics/gh-pages-spa). 
Just copy the code from [this](https://github.com/websemantics/gh-pages-spa/blob/master/404.html) file here, and
paste it in a file named **404.html** that you place in the `src/` folder of your app. On the same level as
`index.html`.

3. Edit your `index.html` file. Add these at the bottom of the `<head>` tag.
   * Create a `redirect` variable
   ```angular2html
   <script>var redirect = location.href</script>
   ```
   * Link the `ghspa.js` file
   ```angular2html
   <script type="text/javascript" src="ghspa.js"></script>
   ```
4. Set `<base>` to '/' (in `<head>` tag):
   ```angular2html
   <base href="/">
   ```
5. In `angular-cli.json`, in the "assets" array within the "apps" array, add
your two new files, in order to be included in the build. Result should look something
like this, for example:
   ```json
   ...
    "apps": [
     {
       "root": "src",
       "outDir": "dist",
       "assets": [
         "assets",
         "favicon.ico",
         "404.html",
         "spaghpages.js"
       ],
       "index": "index.html",
       "main": "main.ts",
       "polyfills": "polyfills.ts",
    ...
   ```
6. In your terminal, run the following command, as seen [here](https://github.com/angular/angular-cli/wiki/stories-github-pages). Remember,
it will only work if you specify the whole URL (https://yourusername.github.io/YourProject/)
   ```
   ng build --prod --output-path docs --base-href https://yourusername.github.io/YourProject/
   ```
7. As mentioned in the angular-cli relevant tutorial [here](https://github.com/angular/angular-cli/wiki/stories-github-pages), 
commit your changes and push. 
On the GitHub project page, configure it to publish from the docs folder.
