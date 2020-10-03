const express = require("express"); //bring in express
const cors = require('cors');
const connectDB = require("./config/db"); //bring in db.js from folder 'config'
const path = require("path");

const app = express(); //initialize our app with express()

connectDB(); // Connect Database

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use("/api/users", require("./routes/api/users")); //this makes '/api/users' pertain to the '/' in the router.get() call in 'users.js' in 'routes/api/'
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build")); //we want our client/build folder to be our static folder

  //now we want to serve the index.html file
  //app.get("*", (req, res) => {
    //so we get from '*' (meaning any routes except the api routes above)
    //res.sendFile(path.resolve(__dirname, "client", "build", "index.html")); //we use sendFile() because we just want to load the index.html file
    //we use path.resolve() to cleanly load it
    //we go from the current directory by making the first parameter '__dirname'
    //we want to go into our client folder and then our build folder so we make those two the next two parameters respectively
    //and we make the last parameter 'index.html' because it's the file we want to load
  //});
}

const PORT = process.env.PORT || 5000;
//process.env.PORT will look for an environment variable called PORT to use (this is where we will get the port number when we deploy to Heroku)
//locally, however, we want it to run on port 5000 (if there is no environment variable set it will default to 5000)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//listen on a port and create a callback (do something when it connects, in this case console.log that the server started and which port it started on)
