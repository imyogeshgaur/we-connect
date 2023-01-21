# We Connect
We connect is a social media platform for employees in which you can post,chat and send friend request to other employees.
The application is built on **Micorserice architecture** using **typescript** in backend and **Reactjs** in frontend with **MongoDB** as Database
##

### Folder Structure :

![Screenshot](https://github.com/imyogeshgaur/social-app-micro/blob/master/screenshots/Screenshot%20(90).png)

![Screenshot](https://github.com/imyogeshgaur/social-app-micro/blob/master/screenshots/Screenshot%20(91).png)

### Working of the application
Step 1 : Create databases named as micro_login, micro_post, micro_chat and micro_user in MongoDB database or MongoDB Atlas for login, post, chat and user services respectively.

Step 2 : Create a gateway.env inside the gateway's service env folder (see folder structure) with following credentials
  ```
    USER_URI = http://localhost:5001/
    USER_URL = /users
    POST_URI = http://localhost:5002/
    POST_URL = /posts
    AUTH_URI = http://localhost:5003/
    AUTH_URL = /auth
    MAIL_URI = http://localhost:5004/
    MAIL_URL = /mail
  ```
Step 3 : Create a auth.env inside the auth's service env folder (see folder structure) with following credentials
```
  DBURI = mongodb://127.0.0.1:27017/micro_login
  SECRET = YOUR_JWT_SECRET
  GET_USER_URI = http://localhost:5000/users/getUser/
```
Step 4 : Create a mail.env inside the mail's service env folder (see folder structure) with following credentials
```
  FROM = YOUR_GMAIL_ID
  PASSWORD = YOUR_GMAIL_PASSWORD
```
Step 5 : Create a post.env inside the post's service env folder (see folder structure) with following credentials
```
  DBURI =  mongodb://127.0.0.1:27017/micro_post
  USER_FOR_POST = http://localhost:5000/auth/getUser/
  USER_POST_PREFIX = http://localhost:5000/posts/static/post/
  SECRET = YOUR_JWT_SECRET
```
Step 6 : Create a user.env inside the user's service env folder (see folder structure) with following credentials
```
  DBURI =  mongodb://127.0.0.1:27017/micro_users
  USER_PROFILE_PREFIX = http://localhost:5000/users/static/profile/
  GET_AUTH_URI = http://localhost:5000/auth/list
  GET_SINGLE_AUTH_URI = http://localhost:5000/auth/getUser/
```
Step 7 : Run individual service and gateway by following command
```
  cd backend/gateway/src
  npm start
```
OR

```
 cd backend/service/service_name/src
 npm start
```
Step 8 : Run frontend by follwing command
```
  cd frontend
  npm start
```
