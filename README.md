VS-3
-----

For the lack of a fancy name, I shall call this Voting System VS-3. (3 for no apparent reason).
VS-3 is a simple nw.js based offline voting system.

VS-3 has been used glitch free in Students' Gymkhana General Elections '15, Hall 8 HEC Elections,
Hall 4 HEC Elections and Hall 2 HEC Elections.

Configuration
-------------

- The application can be configured by modifying *scripts/main.js*.

Installation
------------

- Install dependencies.

```shell
$ npm install
$ bower install
```

- Replace the first line in *./lib/bootswatch-dist/css/bootstrap.min.js* with a comment if you want to use this offline.
  (The first line loads a font-file from Google CDN.)

- Run the following command to build binaries for win64 and linux64 in the *build/* directory.

```shell
$ npm run build
```

- Use the corresponding binaries in *build/iitk-general-elections*.

Testing
-------

```shell
$ npm test
```

LICENSE
-------

- This project is licensed under [MIT LICENSE](./LICENSE)
- The sounds are in Public Domain
- The images have been taken with permission of the candidates
