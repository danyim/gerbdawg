#!/bin/sh

# Creates an orphan branch and publishes to https://<your username>.github.io/<project name>
echo "Publishing to Github pages"
git rm -rf dist
gulp clean && gulp build
git add dist -A
git commit -m "changes made to gh pages"
git subtree push --prefix dist origin gh-pages
