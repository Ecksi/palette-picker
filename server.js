const express = require('express'); // requires the Express module that was installed via NPM
const app = express(); //sets up our Express application
const environment = process.env.NODE_ENV || 'development'; // sets up our environment variables
const configuration = require('./knexfile')[environment]; // imports the development environment from knexfile
const database = require('knex')(configuration); // sets up knex with the proper environment
const bodyParser = require('body-parser'); // requires the body-parser modules that was installed via NPM
// This is a blank line, it does nothing.
app.set('port', process.env.PORT || 3000); // sets the port to a url or localhost:3000
app.locals.title = 'Palette Picker'; // sets the local title to 'Palette Picker'
app.use(bodyParser.json()); // allows body parser to read information from request.body
app.use(express.static('public')); // sets the static files to the location of public
// This is a blank line, it does nothing.
app.get('/api/v1/projects', (request, response) => { // makes a get request to projects endpoint
  database('projects').select() // use projects database from knex => returns a promise
    .then((projects) => { // then do this
      response.status(200).json(projects); // return array of projects when status code is 200
    }) // brackets and stuff
    .catch((error) => { // catch errors
      response.status(500).json({ error }); // return error when status code is 500
    }); // brackets and stuff
}); // brackets and stuff
// This is a blank line, it does nothing.
app.get('/api/v1/palettes', (request, response) => { // makes a get request to the palettes endpoint
  database('palettes').select() // use palettes database from knex => returns a promise
    .then((palettes) => { // then do this
      response.status(200).json(palettes); // return array of palette objects when status code is 200
    }) // brackets and stuff
    .catch((error) => { // catch errors
      response.status(500).json({ error }); // return error when status code is 500
    }); // brackets and stuff
}); // brackets and stuff
// This is a blank line, it does nothing.
app.post('/api/v1/projects', (request, response) => { // make a post request to the projects endpoint
  const { projects } = request.body; // destructure request.body
// This is a blank line, it does nothing.
  for (let requiredParameter of ['name']) { // the parameter of name is required
    if (!projects[requiredParameter]) { // checks to see if the requiredParameter has been provided
      return response // if not, return this response
        .status(422) // status code 422 => unable to process the contained instructions
        .send({ error: `Expected format: { name: <String> }. "${requiredParameter}" property missing.` }); // send out this error message
    } // brackets and stuff
  } // brackets and stuff
// This is a blank line, it does nothing.
  database('projects').insert(projects, 'id') // add a project to the projects database and return an id
    .then(projects => { // then do this
      response.status(201).json({ id: projects[0]}); // return the id of the associated project and a status of 201
    }) // brackets and stuff
    .catch(error => { // catch errors
      response.status(500).json({ error }); // return error when status code is 500
    }); // brackets and stuff
}); // brackets and stuff
// This is a blank line, it does nothing.
app.post('/api/v1/palettes', (request, response) => { // make a post request to the palettes endpoint
  const { palette } = request.body; // destructure request.body
// This is a blank line, it does nothing.
  for (let requiredParameter of ['name', 'color1', 'color2', 'color3', 'color4', 'color5', 'project_id']) { // these parameters are required
    if (!palette[requiredParameter]) { // checks to see if the requiredParameters have been provided
      return response // if not return this response
        .status(422) // status code 422 => unable to process the contained instructions
        .send({ error: `Expected format: { name: <String>, color1: <String>, color2 <String>, color3: <String>, color4: <String>, color5: <String> }. "${requiredParameter}" property missing.` }); // send out this error message
    } // brackets and stuff
  } // brackets and stuff
// This is a blank line, it does nothing.
  database('palettes').insert(palette, 'id') // add a palette to the palettes database and return an id
    .then(palette => { // then do this
      response.status(201).json({ id: palette[0] }); // return the id of the associated palette and a status of 201
    }) // brackets and stuff
    .catch(error => { // catch errors
      response.status(500).json({ error }); // return error when status code is 500
    }) // brackets and stuff
  } // brackets and stuff
); // brackets and stuff
// This is a blank line, it does nothing.
app.delete('/api/v1/palettes/:id', (request, response) => { // make a delete request to the palettes endpoint
  const { id } = request.params; // destructure requst.params
// This is a blank line, it does nothing.
  database('palettes').where('id', id).del() // find the palette with the matching id - delete it, return a promise
  .then(() => { // then do this
    response.status(202).json({ // when response.status is 202
      'id': id // return this id (which I could just have as id instead of 'id': id)
    }); // brackets and stuff
  }); // brackets and stuff
}) // brackets and stuff
// This is a blank line, it does nothing.
app.listen(app.get('port'), () => { // listen for the port that was specificed earlier
  console.log(`${app.locals.title} is running on ${app.get('port')}.`); // display this message when that port is opened
}); // brackets and stuff
// This is a blank line, it does nothing.
module.exports = app; // exports the server so it can be used elsewhere