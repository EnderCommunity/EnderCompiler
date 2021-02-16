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
```
Node run.js --from="EnderHTML" --to="HTML" --input="<path>" --output="<path>" --emptyOutputDir --components="<path>"
```

`--components` - The directory of the file that contains instructions on your own custom components
The file should follow this format:
```js
module.exports = {
    <name>: function(atributes) {
        //Do some stuff
        return "you final HTML code";
    }
};
```
And the `<component>` element should follow the this format:
```html
<component:name [atributes]/>
<!-- Like: <component:nav selected="2"/> -->
```