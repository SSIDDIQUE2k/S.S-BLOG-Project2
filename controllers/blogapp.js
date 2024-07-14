const  express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const CurrentUser = await User.findById(req.session.user._id);
        
        res.render('blogApp/index.ejs', {
            blogApp: CurrentUser.blogs,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/views/index.ejs');
    }
});


router.post('/' , async (req, res) => {
try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.blogs.push(req.body);
    console.log(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/blogApp`);
} catch (error) {
    console.log(error);
    res.redirect('/');
}
} );

router.get('/:blogAppId', async (req, res) => {
    try{
        const currentUser = await User.findById(req.session.user._id);
        const blogApp = currentUser.blogs.id(req.params.blogAppId);

        res.render('blogApp/blog.ejs', {
            blogApp: blogApp,
        });

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
} );

router.get('/:blogAppId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const blogApp = currentUser.blogApps.id(req.params.blogAppId);
      res.render('blogApps/edit.ejs', {
        blogApp: blogApp,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });

router.delete('/:blogAppId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        console.log('this is current user:', currentUser);
        console.log('this is blogs ID:', currentUser.blogs.id);
        currentUser.blogs.id(req.params.blogAppId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/blogApp`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
} );


module.exports = router;