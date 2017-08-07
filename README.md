# Angular Universal "SSR"

```bash
npm run build
cp -r src/assets dist/assets
npm run watch
```

# MAKE SURE TO EXTRACT THE NODE_MODULE.zip FILE
# DO NOT MAKE NPM INSTALL

# known bugs/errors
1- ng2-file-drop module disabled.
2- auth0.setclient in console




# Code standards and naming convention

## Pathing and module imports
`
// bad
import { ModuleName } from '/app/absolute/path/to/moduleName.ts'

// good
import { ModuleName } from './absolute/path/to/moduleName.ts'
`


## Naming conventions

- Typescript files: `fileName.ts`
- Scss files: `_file-name.scss`
- HTML component files: `file-name.component.html`

#### Hierarchy naming (organization page example)
- Landing page: `organizations`
- Detail page: `organization`
- Related Components: `organization-card`
