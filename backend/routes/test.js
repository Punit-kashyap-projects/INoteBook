const express = require('express');
const router = express.Router();

router.get('/', async(req,res) => {
    await res.send('hello world')
})  

module.exports = router