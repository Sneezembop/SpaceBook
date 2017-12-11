var PostSchema = require("./post.schema.server");
var mongoose = require('mongoose');
var PostModel = mongoose.model("PostModel", PostSchema);

PostModel.findPostById = findPostById;
PostModel.findPostsByTag = findPostsByTag;
PostModel.createPost = createPost;
PostModel.findPostsByTags = findPostsByTags;
PostModel.deletePost = deletePost;
PostModel.updatePost = updatePost;
PostModel.findAllPosts = findAllPosts;
PostModel.findPostsByUser = findPostsByUser;

module.exports = PostModel;

function findPostsByTags(tags) {

  /*
  res = [];
  for (var i = 0; i < tags.length, i++){
    res += findPostsByTag(tags[i]);
  }

  res.sort()

  I'll come back to this once we have more hooked up.
  */

  return findPostsByTag(tags[0]);
}

function findPostsByTag(tag) {
  var query = PostModel.where({tags: tag}).limit(20).sort('date');
  return query.exec();
}

function findAllPosts() {
  return PostModel.find();
}

function createPost(post) {
  return PostModel.create(post);
}

function findPostById(postId) {
  return PostModel.findOne({_id: postId});
}

function updatePost(postId, post) {
  return PostModel.updateOne({_id: postId}, post);
}

function deletePost(postId) {
  return PostModel.remove({_id: postId});
}

function findPostsByUser(userId) {
  return PostModel.find({poster: userId});
    // .populate('poster')
    // .exec();
}

