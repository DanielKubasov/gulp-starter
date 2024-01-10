# Simple gulp project starter

use `npm i` to install all the dependencies

## Scripts

`w3c` - runs the w3c html validator
`start` - starts the project

## Required VS Code extensions

-   Prettier

## File structure

```
    src/                            # Source folder
    --- fonts/                      # Important, only in .woff2 format!
    --- images/                     # Images
    --- --- components/
    --- --- layouts/
    --- --- svg/                    # Compiles in one big sprites.svg file
    --- partials/                   # Contains big site parts ( layouts )
    --- --- _header.html
    --- --- _footer.html
    --- scripts/
    --- --- components/             # Contains functions to import, which will be called in script.js file
    --- --- script.js               # Main .js file
    --- styles/
    --- --- abstracts/
    --- --- --- _fonts.scss         # Connecting all the fonts
    --- --- --- _utilities.scss     # Serving classes
    --- --- --- _variables.scss     # Variables
    --- --- base/
    --- --- --- _base.scss          # Base project styles
    --- --- --- _container.scss     # Container settings
    --- --- --- _reset.scss         # Global reset
    --- --- --- _theme.scss         # Changing themes ( Dark / Light )
    --- --- --- _typography.scss    # Typography settings
    --- --- components/             # Contains styles for smaller site parts ( Button / Article )
    --- --- extends/
    --- --- --- _resets.scss        # Different resets for inputs / buttons / lists
    --- --- layouts/                # Contains styles for bigger site parts ( Header / Footer )
    --- --- --- header.scss
    --- --- --- footer.scss
    --- --- mixins/
    --- --- --- _breakpoints.scss
    --- --- --- _dis-hover.scss     # Disabling hover on mobile devices
    --- --- --- _font-face.scss     # Font face mixin
    --- --- pages/                  # Styles for different pages
    --- --- --- _index.scss
    --- --- themes/                 # Themes mixin
    --- --- --- _dark.scss
    --- --- --- _light.scss
    --- index.html
    .editorconfig
    .gitignore
    .prettierignore
    .prettierrc
    gulpfile.js
    package.json
    readme.md
    svgo.config.js
    webpack.config.js
```
