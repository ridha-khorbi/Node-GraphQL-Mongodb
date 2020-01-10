var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    var path = req.baseUrl;
    res.render(path);
});
module.exports = router;