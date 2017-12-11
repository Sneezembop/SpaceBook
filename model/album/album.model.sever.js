var AlbumSchema = require("./album.schema.server");
var mongoose = require('mongoose');
var AlbumModel = mongoose.model("AlbumModel", AlbumSchema);
var UserModel = require('../user/user.model.server');

AlbumModel.createAlbum = createAlbum;
AlbumModel.findAlbumById = findAlbumById;
AlbumModel.findAllAlbumsByUser = findAllAlbumsByUser;
AlbumModel.updateAlbum = updateAlbum;
AlbumModel.deleteAlbum = deleteAlbum;

module.exports = AlbumModel;

function createAlbum(album) {
  var newAlbum = null;
  return AlbumModel
    .create(album)
    .then(function (album1) {
      newAlbum = album1;
      return UserModel
        .findUserById(album1.uploaderId)
        .then(function (user) {
          user.albums.push(newAlbum);
          return user.save();
        });
    });
}

function findAlbumById(albumId) {
  return AlbumModel.findById(albumId);
}

function findAllAlbumsByUser(userId) {
  return AlbumModel
    .find({uploaderId: userId})
    .populate('uploaderId')
    .exec();
}

function updateAlbum(albumId, album) {
  return AlbumModel.update({_id: albumId}, album);
}

function deleteAlbum(albumId) {
  var album1 = null;
  var userId = null;
  var i = null;
  return AlbumModel
    .findAlbumById(albumId)
    .then(function (album) {
      album1 = album;
      userId = album.uploaderId;
      return AlbumModel
        .deleteOne({_id: albumId})
        .then(function (albums) {
          return UserModel
            .findUserById(userId)
            .then(function (user) {
              i = user.albums.indexOf(album1);
              user.albums.splice(i, 1);
              return user.save();
            });
        });
    });
}
