module.exports = function (app) {
  var postModel = require('../../model/post/post.model.server');
  var userModel = require('../../model/user/user.model.server');

  app.get('/api/post/:pid', findPostById);
  app.get('/api/post', findPosts);
  app.get('/api/post/user/:uid', findPostsByUser);
  app.post('/api/post', createPost);
  app.put('/api/post/:pid', updatePost);
  app.delete('/api/post/:pid', deletePost);

  function findPostById(req, res) {
    var postId = req.params['pid'];
    postModel.findPostById(postId)
      .then(function (post) {
        res.json(post);
      });
  }


  function findPostsByUser(req, res) {
    var userId = req.params['uid'];
    postModel.findPostsByUser(userId).then(function(posts) {
      res.json(posts);
    });
  }

  function findPosts(req, res) {
    var tag = req.query['tag'];
    var userId = req.params['uid'];
    var postId = req.params['pid'];
    if (tag) {
      postModel.findPostsByTag(tag).then(function (posts) {
        res.json(posts);
      });
    } else {
      postModel.findAllPosts().then(function(posts) {
        res.json(posts);
      })
    }
  }

  function createPost(req, res) {
    var post = req.body;
    postModel
      .createPost(post)
      .then(function (post) {
        res.json(post);
      });
  }


  function updatePost(req, res) {
    var postId = req.params['pid'];
    var updatedPost = req.body;
    postModel
      .updatePost(postId, updatedPost)
      .then(function (status) {
        res.json(status);
      });
  }

  function deletePost(req, res) {
    var postId = req.params['pid'];
    postModel.deletePost(postId).then(function (any) {
      res.json(null);
    });

  }

};
