const { Router } = require('express');
const serviceApi = require('./service');

const router = Router();
router.use('/', serviceApi);

router.use((err, req, res, next) => {
    console.error(err);
    switch(err.code) {
        default:
            return res.status(404).send({ msg: 'oh no! we issue some problems' })
    }
})

module.exports = router;

