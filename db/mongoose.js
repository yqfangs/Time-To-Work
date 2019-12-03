/* This module will hold our connection to
   our mongo server through the Mongoose API.
   We will access the connection in our express server. */
const mongoose = require('mongoose')

/* Connnect to our database */
// Get the URI of the local database, or the one specified on deployment.
// const mongoURI = process.env.MONGODB_URI || 'mongodb://cara:981215@cluster0-shard-00-00-xcwjq.mongodb.net:27017,cluster0-shard-00-01-xcwjq.mongodb.net:27017,cluster0-shard-00-02-xcwjq.mongodb.net:27017/project39?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/project'

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

module.exports = { mongoose }  // Export the active connection.