const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
   res.send('HELLO WORLD from Paul');
})
module.exports = router;
