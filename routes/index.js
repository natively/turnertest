var _ = require('underscore');
// renders a layout
exports.index = function (req, res) {
  res.render('index', { title: 'Express' });
};

// returns a list of titles in json
exports.titleList = function (db) {
  return function (req, res) {
    var collection = db.get("titles");
    collection.find(
      { TitleName: { $regex: '^.*' + req.query.name + '.*$', $options: 'i' } },
      ['TitleName'],
      function (e, titles) {
        var titles = _.sortBy(titles, function (title) { return title.TitleName; });
        res.json(titles);
      }
    );
  };
};

// returns a detailed title object
exports.title = function (db) {
  return function (req, res) {
    var collection = db.get('titles');
    if (req.params.name) {
      collection.findOne({"TitleName": req.params.name}, function (e, doc) {
        res.json(doc);
      });
    }
  };
};
