const  express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/' , (req, res) => {
    try{
    res.render('blogapp/index.ejs')
    } catch (error) {
        console.log(error);
        res.redirect('/views/index.ejs');
    }
} );

router.post('/' , async (req, res) => {
try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.blogs.push(req.body);
    console.log(req.body);
    currentUser.save();
    res.redirect(`/users/${currentUser._id}/blogapp`);
} catch (error) {
    console.log(error);
    res.redirect('/');
}
} );

module.exports = router;