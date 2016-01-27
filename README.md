# Gerbdawg

[https://gerbdawg.herokuapp.com/](https://gerbdawg.herokuapp.com/)

In this world, there are gerbs and then there's The Big Dawg. This is a quick and dirty app that captures examples of this strange duality.

Made with [Yeoman](http://yeoman.io/) with the [GulpAngular generator](https://github.com/Swiip/generator-gulp-angular), [Firebase](https://www.firebase.com/), [SCSS](http://sass-lang.com/), [Bootstrap 3](http://getbootstrap.com/), and [Heroku](https://dashboard.heroku.com/)


## Deployment
- `gulp clean && gulp build`
- **Note** `/dist` is commented out in the .gitignore because web.js needs to read from that folder in order for Heroku to work
- If you're too lazy to do this, `publish.sh` will clean, build, and commit a release for you

## This project contains great examples of...
- Reading and three-way-binding Firebase arrays (main.controller.js) with a form for basic CRUD ops (addSayingModal.html)
- Reading a single Firebase object and waiting for it to populate (addSayingModal.controller.js)
- Modals: opening, closing (with hotkeys), tying router state to the modal
