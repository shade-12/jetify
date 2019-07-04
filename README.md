# Jetify 🎵 ✈︎

Do you ever wish you knew what events were going on in your location, or what events were going on in a location you were travelling to?
Jetify is an app that allows you to see events happening in your area or the area of your choice and creates a playlist based on those events. Checkout future events happening in your area or find out what concerts are going on, on your next vacation.

Here is a demo for Jetify: https://jetify.herokuapp.com/

## Stack
* React 16.8.6
* React Router Dom 5.0.1
* Rails 2.6.2
* Bootstrap 4.3.1
* SASS 4.12.0

## Setup
1. cd into client folder and run `npm install`
2. Run `bundle install` in the root folder
3. Run `rake:db setup` then `rake:db migrate` to initialize the database
4. Run `bin/rails s` to start the rails back-end server
5. In a new terminal window, run `npm start` to start the react front-end server
6. Visit `http://localhost:3000` to view the app (Make sure you include all the API keys in order to run the app)

## API Authorization
1. Spotify: https://developer.spotify.com/
    - Login & Create an app
    - Enter `http://localhost:3000/api/logging-in`
    - Save your changes
    - Copy down the client ID, and client secret
    - Create a .env file inside the client folder and save as `REACT_APP_SPOTIFY_CLIENT_ID`and `REACT_APP_SPOTIFY_CLIENT_SECRET`

2. Google: https://console.developers.google.com/
    - Login & Create a new project
    - Set restrictions to `none`
    - Initialize API services for `Maps Javascript API`, `Places API`, `Geocoding API` and `Maps Embed API`
    - Add the API key to the .env as `REACT_APP_GOOGLE_API_KEY`

3. TicketMaster: https://developer.ticketmaster.com/
    - Register for API key
    - Create another .env file in the root folder
    - Add the API key to the .env as `TICKETMASTER_KEY`

4. Pexels: https://www.pexels.com/api
    - Request access and login
    - Get an API key
    - Add to .env file in the client folder as `REACT_APP_PEXELS_API_KEY`


## Screenshots

Users can log in through Spotify's third party authorization to the app:
!["Login Page"](https://github.com/shadeying/Jetify/blob/master/client/public/screenshots/LoginPage.png)
!["Main Page1"](https://github.com/shadeying/Jetify/blob/master/client/public/screenshots/MainPage1.png)
!["Main Page2"](https://github.com/shadeying/Jetify/blob/master/client/public/screenshots/MainPage2.png)
!["Main Page3"](https://github.com/shadeying/Jetify/blob/master/client/public/screenshots/MainPage3.png)
!["History Page"](https://github.com/shadeying/Jetify/blob/master/client/public/screenshots/HistoryPage.png)
!["Saved Playlists"](https://github.com/shadeying/Jetify/blob/master/client/public/screenshots/HistoryPagePlaylists.png)

## Contributors
* [Devan Mckay](https://github.com/Devanm15)
* [Harriet Thompson](https://github.com/hazthompson)
* [Shade Wong](https://github.com/shadeying)

