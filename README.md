# EnderCompiler
A modifiable compiler written in JS

## How to run it
```bat
Node run.js --from="<string>" --to="<string>" --input="<path>" --output="<path>"
```

`--from="<string>"` - the language you wanna compile
<br>
`--to="<string>"` - the language you wanna your output to be in
<br>
`--input="<path>"` - the path of the input folder
<br>
`--output="<path>"` - the path of the output folder
<br>
`--emptyOutputDir` - empties the output directory before compiling
<br>
`--emptyOutputDir` - empties the input directory after compiling

## EnderHTML
This is a language that only added the ```html <component>``` element to HTML! This language is useful when building websites that have repetitive elements in them. (e.g. footers or navigation bars)

```
Node run.js --from="EnderHTML" --to="HTML" --input="<path>" --output="<path>" --emptyOutputDir --components="<path>"
```

`--components="<path>"` - The directory of the file that contains instructions on your own custom components
The file should follow this format:
```js
module.exports = {
    <name>: function(atributes) {
        //Do some stuff
        return "you final HTML code";
    },
    [...]
};
```
And the `<component>` element should follow the this format:
```html
<component:name [atributes]/>
<!-- Like: <component:nav selected="2"/> -->
```