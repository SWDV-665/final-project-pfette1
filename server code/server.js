// Set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

// Configuration
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/rosterbuilder");

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Model
var Player = mongoose.model('Player', {
    name: String,
    contactName: String,
    phoneNumber: String
});


// Get all players
app.get('/api/rosterBuilder', function (req, res) {

    console.log("Listing players...");

    Player.find(function (err, players) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(players); // return all players in JSON format
    });
});

// Create a player 
app.post('/api/rosterBuilder', function (req, res) {
    console.log("Adding player");
    Player.create({
        name: req.body.name,
        contactName: req.body.contactName,
        phoneNumber: req.body.phoneNumber,
        done: false
    }, function (err, players) {
        if (err) {
            res.send(err);
        }

        // create and return all the players
        Player.find(function (err, players) {
            if (err)
                res.send(err);
            res.json(players);
        });
    });

});

// Update a player
app.put('/api/rosterBuilder/:id', function (req, res) {
    console.log("edit")
    console.log(req.params.id)
    const player = {
        name: req.body.name,
        contactName: req.body.contactName,
        phoneNumber: req.body.phoneNumber
    };

    Player.update({ _id: req.params.id }, player, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


// Delete a player
app.delete('/api/rosterBuilder/:id', function (req, res) {
    Player.remove({
        _id: req.params.id
    }, function (err, players) {
        if (err) {
            console.error("Error deleting player ", err);
        }
        else {
            Player.find(function (err, players) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(players);
                }
            });
        }
    });
});


// Start app and listen on port 8080  
app.listen(process.env.PORT || 8080);
console.log("RosterBuilder server listening on port  - ", (process.env.PORT || 8080));