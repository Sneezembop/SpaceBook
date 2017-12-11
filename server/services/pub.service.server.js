module.exports = function (app) {
  var pubModel = require('../../model/pub/pub.model.server');

  app.get('/api/pub/:pubid', findPubById);
  app.get('/api/pub', findPubsByText);
  app.post('/api/pub', createPub);
  app.put('/api/pub/:pubid', updatePub);
  app.delete('/api/pub/:pubid', deletePub);

  function findPubById(req, res) {
    var pubId = req.params['pubid'];
    pubModel.findPubById(pubId)
      .then(function (pub) {
        res.json(pub);
      });
  }

  function findPubsByText(req, res) {
    var text = req.query['text'];
    pubModel.findPubsByText(text).then(function (pubs) {
      res.json(pubs);
    });
  }

  function createPub(req, res) {
    var pub = req.body;
    pubModel
      .createPub(pub)
      .then(function (pub) {
        res.json(pub);
      });
  }

  function updatePub(req, res) {
    var pubId = req.params['pubid'];
    var updatedPub = req.body;
    pubModel
      .updatePub(pubId, updatedPub)
      .then(function (status) {
        res.json(status);
      });
  }

  function deletePub(req, res) {
    var pubId = req.params['pubid'];
    pubModel.deletePub(pubId).then(function (any) {
      res.json(null);
    });

  }
};
