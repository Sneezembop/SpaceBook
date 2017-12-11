module.exports = function (app) {
  var cbModel = require('../../model/cb/cb.model.server');

  app.get('/api/cb/:cbid', findCBById);
  app.get('/api/cb', findCBsByText);
  app.post('/api/cb', createCB);
  app.put('/api/cb/:cbid', updateCB);
  app.delete('/api/cb/:cbid', deleteCB);

  function findCBById(req, res) {
    var cbId = req.params['cbid'];
    cbModel.findCBById(cbId)
      .then(function (cb) {
        res.json(cb);
      });
  }

  function findCBsByText(req, res) {
    var text = req.query['text'];
    cbModel.findCBsByText(text).then(function (cbs) {
      res.json(cbs);
    });
  }

  function createCB(req, res) {
    var cb = req.body;
    cbModel
      .createCB(cb)
      .then(function (cb) {
        res.json(cb);
      });
  }

  function updateCB(req, res) {
    var cbId = req.params['cbid'];
    var updatedCB = req.body;
    cbModel
      .updateCB(cbId, updatedCB)
      .then(function (status) {
        res.json(status);
      });
  }

  function deleteCB(req, res) {
    var cbId = req.params['cbid'];
    cbModel.deleteCB(cbId).then(function (any) {
      res.json(null);
    });

  }
};
