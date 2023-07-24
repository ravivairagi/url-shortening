const yup = require('yup');

module.exports.validateUrlShortening = (req, res, next) => {
    try {
        const schema = yup.object({ longUrl: yup.string().url().required() });

        let data = schema.validateSync(req.body, { abortEarly: false, stripUnknown: true });
        return next();
    } catch(e) {
        return res.status(422).json({ errors: e.errors });
    }
}
