const  express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/' , (req, res) => {
    res.send('This is the blog app page');
}   );

module.exports = router;