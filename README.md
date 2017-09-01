# Maker Share

## Install

#### Install typings
```bash
$ npm install -g typings
```
#### Install dependencies
```bash
$ npm install
```

## Run dev mode (serve)
```bash
# With live reload
$ ng serve
 
# No live reload (for some reason it won't stop reloading sometimes - we should find out why when we have time)
$ ng serve --lr=false
```



# For CLI 
----------------
- `ng serve`
- `ng build --prod --aot`

# For Universal
---------------------
`npm install pm2@latest -g` // if you haven't done that yet
- `npm run build`
- `cp -r src/assets dist/assets`
- `sass dist/assets/css/style.scss dist/assets/css/style.css`
- `pm2 start dist-server/index.js --max-memory-restart 800M`

/////// old code ////////
- `npm run build`
- `cp -r src/assets dist/assets`
- `sass dist/assets/css/style.scss dist/assets/css/style.css`
- `npm run start`
/////// end old code //////////






# known bugs/errors
1- ng2-file-drop module disabled.
2- auth0.setclient in console


# Code standards and naming convention

## Pathing and module imports
```javascript
// bad
import { ModuleName } from '/app/absolute/path/to/moduleName.ts'

// good
import { ModuleName } from './absolute/path/to/moduleName.ts'
```

## Naming conventions
- Typescript files: `fileName.ts`
- Scss files: `_file-name.scss`
- HTML component files: `file-name.component.html`

#### Hierarchy naming (organization page example)
- Landing page: `organizations`
- Detail page: `organization`
- Related Components: `organization-card`
