## Small scale full stack todo app
- It has a mongoDB database, a node.js server, and a html front-end.
- It keeps track of a list of todo items.


#### Example of what inside the .env file
```env
mongoUrl=mongodb+srv://<username>:<password>@clustername.mongodb.net/todos
jwtPass=thatUltimateSecretKey
todoDb=todoDataBaseName
userDb=userDataBaseName
```

#### Getting Started
- Clone the repository
- Run `npm install` to install the dependencies
- Create a `.env` file in the root directory and add the mongoDB url
- Run `node server.js` to start the server
- Open the `index.html` file in the browser

#### Dependencies
```json
node version: v21.7.2
```

```json
"dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.3.1",
    "zod": "^3.22.4"
}
```

### What are CORES?

Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin. A web application makes a cross-origin HTTP request when it requests a resource that has a different origin (domain, protocol, and port) than its own origin.

