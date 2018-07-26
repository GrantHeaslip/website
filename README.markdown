# website

The code that builds and serves [g.hslp.ca](https://g.hslp.ca/). Powered by [Node.js][node-js] and the [Hapi framework][hapi].

The project includes code for serving an index page, 404 pages, and never-expiring static assets with MD5-hashed file names (achieved with [gulp-rev][] and [gulp-rev-replace][]). It’s designed to be run on [Heroku][heroku], but isn’t tied to it.

Please note that this was a Node.js and ECMAScript 2015+ learning project. It’s hopefully production-ready enough to serve a small personal site that almost nobody visits, but you might want to get a second opinion before you copy anything. I hope some of this code will help anyone using [Hapi 17][hapi-17] or newer, which seems to have been a fairly significant rewrite of parts of the framework.

## How to run

- Run `npm install`.
- Create an `.env` file using `.env-sample` as a template.
- If using `APP_ENV="production"`, run `gulp build` to populate `rev-manifest.json` and the `static-build` directory.
- To run the server:
    - If using the [Heroku CLI][heroku-cli]: Run [`heroku local`][heroku-local], which sources `.env` and runs the `web` command in `Procfile`.
    - If using the [Bash shell][bash], run `source source_env.sh` to load the variables from `.env` into the environment, then run `node server.js` or `npm start`.
    - If using the [Fish shell][fish], install [Bass][bass], run `bass source source_env.sh` to load the variables from `.env` into the environment, then run `node server.js` or `npm start`.

[bash]: https://www.gnu.org/software/bash/
[bass]: https://github.com/edc/bass
[fish]: https://fishshell.com/
[gulp-rev]: https://github.com/sindresorhus/gulp-rev
[gulp-rev-replace]: https://github.com/jamesknelson/gulp-rev-replace
[hapi]: https://hapijs.com/
[hapi-17]: https://github.com/hapijs/hapi/issues/3658
[heroku]: https://www.heroku.com/
[heroku-cli]: https://devcenter.heroku.com/articles/heroku-cli
[heroku-local]: https://devcenter.heroku.com/articles/heroku-local
[node-js]: https://nodejs.org/
