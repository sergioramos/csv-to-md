# csv-to-md

## install

```bash
npm install [--save/--save-dev] [-g] csv-to-md
```

## usage

```bash
$ csv-to-md < source.csv > table.md
```

## api

```js
var md = require('csv-to-md');
var csv = require('csv-parser');

source.pipe(csv()).pipe(md()).pipe(destiny);
```

## license

MIT