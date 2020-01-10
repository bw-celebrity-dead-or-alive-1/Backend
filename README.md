# Backend



Backend Application for Celebridead

* Link to the heroku app is `https://celebridead.herokuapp.com`

## Project Description

* There is an API built that has authentication built into it. The API holds a list of celebrities and lets you add, edit, or remove celebrities from that list. 
* All of the API endpoints (except the login and register endpoint) are considered "protected", meaning you have to make the request with an authentication token in the header or the API will send back an error. 
* Once your server is up and running, the URL you'll be able to hit from within your app is `https://celebridead.herokuapp.com`. You will however need an authentication header on all the calls except the login and registration call.
* Take a look at the endpoints that our API has to offer in `server.js`.

# USERS

  * **[POST]** * to `/users/login`: returns a token to be added to the header of all other requests. Pass in the following credentials as the `body` of the request: `{ username: 'Lambda School', password: 'i<3Lambd4' }`
  * **[GET]** to `/users/:id`: returns the single user.
  * **[GET]** to `/users/`: returns the All users.
  * **[GET]** to `/:id/scores`: returns the score for the specified user.
  * **[POST]** to `/users/register`: creates a user and return the new user has been successfully created message. 
  * **[PUT]** to `/:id`: updates the user using the `id` passed as part of the URL. Send the an object with the updated information as the `body` of the request (the second argument passed to `axios.put`).
  * **[DELETE]** to `/id`: removes the user using the `id` passed as part of the URL.

  # CELEBRITIES

  * **[POST]** * to `/users/login`: returns a token to be added to the header of all other requests. Pass in the following credentials as the `body` of the request: `{ username: 'Lambda School', password: 'i<3Lambd4' }`
  * **[GET]** to `/users/:id`: returns the single user.
  * **[GET]** to `/users/`: returns the All users.
  * **[GET]** to `/:id/scores`: returns the score for the specified user.
  * **[POST]** to `/users/register`: creates a user and return the new user has been successfully created message. 
  * **[PUT]** to `/:id`: updates the user using the `id` passed as part of the URL. Send the an object with the updated information as the `body` of the request (the second argument passed to `axios.put`).
  * **[DELETE]** to `/id`: removes the user using the `id` passed as part of the URL.

  # SCORES

  * **[POST]** * to `/users/login`: returns a token to be added to the header of all other requests. Pass in the following credentials as the `body` of the request: `{ username: 'Lambda School', password: 'i<3Lambd4' }`
  * **[GET]** to `/users/:id`: returns the single user.
  * **[GET]** to `/users/`: returns the All users.
  * **[GET]** to `/:id/scores`: returns the score for the specified user.
  * **[POST]** to `/users/register`: creates a user and return the new user has been successfully created message. 
  * **[PUT]** to `/:id`: updates the user using the `id` passed as part of the URL. Send the an object with the updated information as the `body` of the request (the second argument passed to `axios.put`).
  * **[DELETE]** to `/id`: removes the user using the `id` passed as part of the URL.

  

## Initialize Project

* Run `yarn` or `npm i` inside the root directory of this project to install dependencies.
* Run `yarn start` or `npm start` to start the API server.
* Run `create-react-app friends` in a separate terminal window in the root directory of the project to create your starter application.
* `cd` into the _friends_ folder and type `yarn add axios react-router-dom` which will install the needed dependencies.

## Build the App!
* Add a route for a login page and build out a simple login form with username and password inputs and a submit button (design this however you would like).
* The login function should save the returned token to localStorage. You can setup `isLoading` state in your Login component, and show a spinner on your form or in your button while the login request is happening.
* When the request returns, save the token to `localStorage`, then use the history object in your Login component to navigate your user to your FriendsList route
* Create a `<PrivateRoute />` component to protect your other routes. It should check localStorage for a token, and redirect the user to your login route if there is not a token.
* Create a protected route for your friends list. Remember, if the user isn't logged in, navigating to this protected route will redirect them to the login page.
* In your FriendsList component, rendered with `<ProtectedRoute />`, you will create a list of your friends that you get from the API.

**Adding New Friends**
* Create a form to collects data for a new friend.
* Make a POST request to add a friend to the database
* Each `friend` item that is in the `friends` array should have the following format:

```js
{
  id: 1
  name: 'Joe',
  age: 24,
  email: 'joe@lambdaschool.com',
}
```

* If you'd like, you can create multiple "view" components for your routes. You could have a component who's sole purpose is to render the login form; one for a form for updating a user; another component who's sole purpose is for creating users; and then another component who's sole purpose is to delete a user.
* It really is up to you how you build this project. I suggest writing down the flow you want to follow, and then writing down each individual piece you need for each step in the flow so that this process doesn't feel as overwhelming.

## Stretch Problem

* In the requirements for this project, we implemented a login POST operation, a GET operation, and a "add friend" POST operation. Add two more functions, one for making a PUT request, and the other for making a DELETE request.
* Style the friends list and the input field and make everything look nice.
* Expand the number of properties that you put on each friend object. Feel free to remove the dummy data on the server or modify it in any way.