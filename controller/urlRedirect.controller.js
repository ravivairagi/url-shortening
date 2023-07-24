const db = require('../models');
const redis =  require('../config/redis');

module.exports.urlRedirect = async (req, res) => {
    const { shortUrl } = req.params;
    let isCached = false;
    let urlMapping;
    try {
        const cacheResults = await redis.client.get(shortUrl);
        if (cacheResults) {
          isCached = true;
          urlMapping = JSON.parse(cacheResults);
        } else {
            urlMapping = await db.Url.findOne({ where: { shortUrl } });
            await redis.client.set(shortUrl, JSON.stringify(urlMapping), {
                EX: 120, // Delete caching data after 2 minute
                NX: true,
            });
        }
        if (urlMapping) {
            return res.redirect(urlMapping.longUrl);
        } else {
            return res.status(404).json({ error: 'Short URL not found.' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Something broken.' });
    }
}
