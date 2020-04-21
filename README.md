# guesswhat-frontend-project

## Goal of our app, what need do we answer to
The app is a multiplayer game where an image is gradually depixelized 
and you have to find the first what the image represents. 
This game answers to the need of fun and entertainement.

## The functionalities we expect to have for the deadline 
### Must have
* Main menu with game rooms lists in different categories
* Game room page with :
  * Image
  * Chat 
  * Ranking
### Should have
* Create private room (specify join code)
* Join private room (join with a code)
### Nice to have
* Submit images
* Accounts with points persistence
* Link application to a database (currently data is stored in a json file)

## A calendar detailing the different steps of the development
* 6 - 12 april : finish back-end
* 13 - 19 april : finish main menu with room list component
* 20 - 22 april : finish game room with imagen chat and ranking components

## Mockup
https://www.figma.com/file/JZfd58OMaHcb03JukC3axp/guesswhat.io?node-id=0%3A1

## Branches
* master branch is for production code (glitch link: https://wil2106-guesswhat-frontend-project.glitch.me)
* dev branch is for WIP

## Run in local
In root folder (to run server):
* npm install
* npm run server

In front folder (to run vue app):
* npm install
* npm run serve
