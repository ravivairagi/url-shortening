const router = require('express').Router();
const { validateUrlShortening } = require('../middleware/url.validation');
const  { urlShortening } = require('../controller/urlShortening.controller');
const  { urlRedirect } = require('../controller/urlRedirect.controller');

router.post('/shorten', validateUrlShortening, urlShortening);
router.get('/redirect/:shortUrl', urlRedirect);

module.exports = router;
