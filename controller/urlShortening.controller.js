const shortid = require('shortid');
const db = require('../models');

module.exports.urlShortening = async (req, res, next) => {
    try {
        const { longUrl } = req.body;
        //  Create unique short URL
        const shortUrl = `https://short.com/${shortid.generate()}`;
        await db.Url.create({ longUrl, shortUrl });
        return res.status(201).json({ shortUrl });
    } catch (err) {
        next(err);
    }
}