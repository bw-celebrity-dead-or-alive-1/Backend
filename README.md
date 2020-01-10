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
  * **[GET]** to `/users/:id/scores`: returns the score for the specified user.
  * **[POST]** to `/users/register`: creates a user and return the new user has been successfully created message. 
  * **[PUT]** to `/users/:id`: updates the user using the `id` passed as part of the URL. Send the an object with the updated information as the `body` of the request (the second argument passed to `axios.put`).
  * **[DELETE]** to `/users/:id`: removes the user using the `id` passed as part of the URL.

  # CELEBRITIES

  * **[POST]** * to `/celebrities`: Allows a new celebrity to be added to the database.

  
  * **[GET]** to `/celebrities/random/`: returns the celebrities randomly.
  * **[GET]** to `/celebrities/`: returns the All celebrities in a list.
  * **[PUT]** to `/celebrities/:id`: updates the celebrities using the `id` passed as part of the URL. Send the an object with the updated information as the `body` of the request (the second argument passed to `axios.put`).
  * **[DELETE]** to `/celebrities/:id`: removes the celebrity using the `id` passed as part of the URL.

  # SCORES

  * **[POST]** * to `/scores/`: Add a new score. 
  * **[GET]** to `/scores/`: returns the all scores the top 5 users.
  * **[GET]** to `/scores/:id/`: returns the scores for a single user.
  * **[GET]** to `/:id/scores`: returns the score for the specified user.
  * **[PUT]** to `/scores/:id`: updates the user score using the `id` passed as part of the URL. Send the an object with the updated information as the `body` of the request (the second argument passed to `axios.put`).
  * **[DELETE]** to `/scores/id`: removes the user score using the `id` passed as part of the URL.

  
  Please note that with all of the following schema, an ID will automatically be provided to you from the backend server call. 

## Users follow the following Format:

```js
{
          "username": "Michael",
          "password": "goodformike",
          "firstName": "Michael",
          "lastName": "Evans",
          "email": "mevans@gmail.com",
          "role": "user"
        }
```

With all fields as required except *role*, which is a string of either 'admin' or 'user'.

## Scores follow the following Format:

```js
{ id: 1, user_id: 1, score: 50 }
```

With all fields as required.

## Celebrities follow the following Format:

```js
        { 
         firstName: "Michael",
          lastName: "Jackson", 
          yearOfBirth: 1958, 
          alive: false, 
          death: 2009, 
          image_url:"https://www.billboard.com/files/media/michael-jackson-1996-red-u-billboard-1548.jpg",
           fact: "King of Pop"
            },

```

With all fields as required except *image_url*.

** Also with Celebrities, please note 


a