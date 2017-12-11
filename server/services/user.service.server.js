module.exports = function (app) {
  var userModel = require("../../model/user/user.model.server");
  var passport  = require('passport');
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
  var LocalStrategy = require('passport-local').Strategy;
  var bcrypt = require("bcrypt-nodejs");
  passport.use(new LocalStrategy(localStrategy));
  var FacebookStrategy = require('passport-facebook').Strategy;
  var IDTempFromFacebook;

  var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
  };

  // var facebookConfig = {
  //   clientID     : '386216858483994',
  //   clientSecret : '51788016e1118b1991b19b8a0c923180',
  //   callbackURL  : 'http://localhost:3100/api/facebook/oauth2callback'
  // };

  passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

  function serializeUser(user, done) {
    done(null, user);
  }
  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(function (user) {
          "use strict";
          done(null, user);
        },
        function (err) {
          "use strict";
          done(err, null);
        }
      );
  }

  // var multer = require('multer');
  // var upload = multer({ dest: __dirname + '/../../dist/assets/uploads'});

  app.get("/api/user/:uid", findUserById);
  app.get("/api/user", findUsers);
  app.get("/api/admin/isAdmin", isAdmin);
  app.get("/api/admin/user", checkIsAdmin, findAllUsers);
  app.post("/api/user", createUser);
  app.put("/api/user/:uid", updateUser);
  app.delete("/api/user/:uid", deleteUser);
  app.post('/api/register', register);
  app.post('/api/login', passport.authenticate('local'), login);
  app.post('/api/logout', logout);
  app.post('/api/loggedIn', loggedIn);
  app.get ('/api/facebook/login', passport.authenticate('facebook', { scope : 'email' }));
  app.get ('/api/facebook/oauth2callback', passport.authenticate('facebook', {
    successRedirect: '../../api/login',
    failureRedirect: '../../login'
  }));

  // app.post("/api/upload", upload.single('myFile'), uploadProfilePicture);

  function checkIsAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.userType === 'ADMIN') {
      next();
    } else {
      res.send(403);
    }
  }

  function isAdmin(req, res) {
    if (req.isAuthenticated() && req.user.userType === 'ADMIN') {
      res.json(req.user);
    }else{
      res.send('0');
    }
  }
  function findAllUsers(req, res) {
    userModel.findAllUsers()
      .then(function (usrs) {
        res.json(usrs);
      });
  }

  function logout(req, res) {
    req.logOut();
    res.send(200);
  }

  function localStrategy(username, password, done) {
    userModel
      .findUserByUsername(username)
      .then(function (user) {
        if(user && bcrypt.compareSync(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
  }

  function facebookStrategy(token, refreshToken,
                            profile, done) {
    userModel
      .findUserByFacebookId(profile.id)
      .then(function(user) {
        if(user) {
          IDTempFromFacebook = user._id;
          return done(null, user);
        } else { // if not, insert into db using profile info
          var names = profile.displayName.split(" ");
          var newFacebookUser = {
            lastName:  names[1],
            firstName: names[0],
            email:     profile.emails ? profile.emails[0].value:"",
            facebook: { id:    profile.id, token: token }

          };
          return userModel.createUser(newFacebookUser);
        }
      })
      .then(
        function(user){
          IDTempFromFacebook = user._id;
          return done(null, user);
        }
      );
  }


  function register(req, res) {
    "use strict";
    var newUser = req.body;
    newUser.password = bcrypt.hashSync(newUser.password);
    userModel
      .createUser(newUser)
      .then(function(user) {
        req.login(user, function(err) {
          res.json(user);
        });
      });
  }

  function login(req, res) {
    res.json(req.user);
  }

  function loggedIn(req, res) {
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.send('0');
    }
  }



  function findUserById(req, res) {
    var userId = req.params["uid"];
    userModel.findUserById(userId)
      .then(function (user) {
        res.json(user);
      });
  }

  function findUsers(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];
    if (username && password) {
      userModel.findUserByCredentials(username, password)
        .then(function (user) {
          res.json(user);
        });
      return;
    }
    else if (username) {
      userModel
        .findUserByUsername(username)
        .then(function (user) {
          res.json(user);
        });
      return;
    }
    userModel.findAllUsers()
      .then(function (users) {
        res.json(users);
      });
  }

  function createUser(req, res) {
    var user = req.body;
    userModel
      .createUser(user)
      .then(function (user) {
        res.json(user);
      });
  }

  function updateUser(req, res) {
    var userId = req.params['uid'];
    var updatedUser = req.body;
    userModel
      .updateUser(userId, updatedUser)
      .then(function (status) {
        res.json(status);
      });
  }

  function deleteUser(req, res) {
    var userId = req.params['uid'];
    userModel
      .deleteUser(userId)
      .then(function (status) {
        res.json(status);
      });
  }

};
