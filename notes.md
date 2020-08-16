- We start off by creating a basic app by requiring express(& initializing it) and dotenv and setting the path from which we'll load the global variables (dotenv.config({path:'./config/config.env'})
**Why dotenv? Because we need to hide certain details that we don't want to appear when we collab with other or in our github code(like passwords, API keys,etc)

- Next we set the port and mongoURI in config.env and then assign the port number in the app.js file and start a server using app.listen

- In the config folder, we create a file called db.js and setup mongoose in it(and connect it to mongodb), and then we export it. Back in app.js, we import it and run, and we can see that the mongodb server is  connected

- We require morgan and set a condition that it runs only if we are in development mode that we have specified under scripts

- Next we require handlebars and set it as our view engine and create a folder called views and create main.hbs

- We create our usual HTML boiler plate and then add '{{{body}}}'. Everything we add in views' files will be visible in the '{{{body}}}', other parts of main will be autoadded to the view files//Check how Handlebars work to know more

- Now we'll create a routes folder and add an index file in it(we'll require express in it and set our router and export it) 

- We'll send the routes set in the app.js file to the index.js file, so far we've created routes for landing page and dashboard

- Next we'll create dashboard.hbs and login.hbs files in views, we'll just add temporary headers in these two files and render them on their relative routes to check everything works fine.

- Now we add materialize to our main.hbs file(both css and js cdns) + fontawesome(css)

- Then we require the path module, create a static folder and define the path of our static folder. WE link our css with the main.hbs(and test it) file just in case we need style customisations going forward 

- Next we create a div called container and put the '{{{body}}}' in it in the main.hbs, and copy paste the same in the login.hbs file(the one in the layouts folder, not in views). In the same login file, in the container we also create - "card div>card-content div" and put the body in it.//So now we'll use this as a partial for the main login in the views. As mentioned earlier, everything in the 'views/login' will go in the '{{{body}}}' of 'layouts/login'

- In index.js, now we'll specify that we want the login page in the layout(not the one in views) to be used on the '/' path. So in res.render for that path, we'll also specify the same --- res.render('login',{layout:'login'}) 

- Next we style the login page in views and add a login link with a route of '/auth/google' which we'll create soon

- Now we go to google cloud console and set it up, and then we go to the passport js website and see how the google oauth strategy works

- In the config folder, we create a passport.js file, and in the app.js, we require passport and the passport.js file(and pass passport as an arguement) in the config folder. After that, we add passport initialize and session middleware

- We then require the express-sessions middleware and place it above the passport initialize and session middleware

- Next we create the models folder and a User.js file in it. In User.js, we create a userSchema that includes all the info we will get from the google login(name, image,etc).

- In the passport.js file, we require the google strategy, user model and mongoose. And from the same file, we'll export our passport function that we'll catch in our passport config in app.js. First, we'll just console.log the info we are getting from google to see what the data structure is like
//passport config
require('./config/passport')(passport)

- After setting up everything in passport.js, we create a new folder in the routes folder called auth.js that will handle all routes related to authentication

- Now in passport.js, instead of console logging what we have received, we will create a new user and save those details//we've already imported the userSchema in this file  

- Next we create the logout process in auth.js

- After that, we create a partials folder in views, we create a header in it with a hamburger menu for navigation(dashboard, published stories and logout, and our logout actually works coz we have done the required settings) and add it to the main.hbs file above the container.

- Next we make a middleware folder that handles the authentication middleware, basically takes you to the main page directly if you are logged in and the login page if you are not logged in. Also ensuring that the dashboard can't be accessed by anyone who isn't logged in

- To make sure that we are logged in once you sign in through google, we'll use 'connect-mongo' and pass in 'session' as the second argument when we require it and assign it to variable 'MongoStore'. We'll use it in the session middleware and this will make sure that we are logged in even if we reload the page.

- Now we create a new story model so that we can start working on our stories

- We import it into the index file and setup the story upload settings on '/dashboard' path. We also create the error page in views so that we can render it in case something goes wrong

- Then in the dashboard view, we add an if else statement that will list the stories or tell the user that he hasn't created any stories

- Next we create an add button in partials and import it in the main.gbs file, after that we create the stories folder in views and create a add.hbs file and create a from with "post" method to submit stories

- In the routes folder, we create a stories.js file and connect the add stories page to it and setup rest of the things for this route. And in app.js, we set the route for the requests handled by the stories.js file

- We also set the bodyparser and json middlewares so that when the form data(or any json data) gets parsed befire it is sent to the server

- Next we create a helpers folder and create a hbs.js file. First we require moment.js in it and then setup the date formatting function and export it. We require that function in app.engine and adjust the date settings in the dashboard

- We create an index.hbs file in the views/stories folder. In this file, we'll display all the stories

- In helpers folder >>> hbs.js file, we add stripTags,editIcon and truncate functions and bring them in in the app.js file and also the index.hbs file

- Next under passport middleware, we set req.user as a global variable so that it is accessible for other functionalities that we have to apply

- We now go to the stories route and work on the edit stories route

- Then we go to our hbs file and add a new helper('select') that will keep the option of public/private as is when we are editing the file

- Next we'll import the method override npm and use it as a middleware to create put and delete requests (which can't be done with a form in normal cases)

- Next we'll create a delete icon for the stories in the dashboard and work on the delete method

- In stories.js, we'll handle the delete route


extra
how promises & async work

