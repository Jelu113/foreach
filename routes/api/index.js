const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');


router.use('/Thought', thoughtRoutes);
router.use('/User', userRoutes);

module.exports = router;
