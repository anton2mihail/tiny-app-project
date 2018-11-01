# Tiny App Project
This is simply a fully functional url shortening serivce, that implements a express backend, and a uses ejs for templating. It also implements user accounts so that only the user who created the url actually 'owns' the url. This only means that they are the only ones capable of editing them. Anyone can use the urls created by this service, ie. youre free to share them with your friends.

## Dependencies
```json
    "bcrypt": "^2.0.0",
    "cookie-session": "^2.0.0-beta.3",
    "dotenv": "^6.1.0",
    "ejs": "^2.6.1",
    "ejs-lint": "^0.3.0",
    "express": "^4.16.4",
    "express-session": "^1.15.6"
```

## Built With
* Express - Lightweight server framework
* Ejs - Templating engine

## Authors
Toni Lachmaniucu

# Screenshots
### Login Page
![alt text](https://github.com/anton2mihail/tiny-app-project/blob/master/public/examples/LoginPage.png "Login Page")
### Homepage
![alt text](https://github.com/anton2mihail/tiny-app-project/blob/master/public/examples/HomePage.png "Homepage")
### Page where you edit urls
![alt text](https://github.com/anton2mihail/tiny-app-project/blob/master/public/examples/EditPage.png "Edit Page")
### Page where you create new urls
![alt text](https://github.com/anton2mihail/tiny-app-project/blob/master/public/examples/NewUrl.png "Create New Url Page")
