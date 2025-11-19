module.exports = function logger(req, res, next) {
    const log = `[${req.method}] ${req.url} at ${new Date().toISOString()}`;
    console.log(log);
    next();
};
