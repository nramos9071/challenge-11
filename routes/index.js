const router = require('express').Router();

const noteRouter = require('./noteRoutes');

router.use('/noteRoutes', noteRouter)





module.exports = router;