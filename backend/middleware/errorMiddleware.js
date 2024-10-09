function errorHandler(err, req, res, next) {
    console.error(err.stack)
    if (err.status === 500) {
        return res.status(500).json({ error: "Internal server error" })
    } else if (err.status === 404) {
        return res.status(404).json({ error: "Resource was not found" })
    } else if (err.status === 401) {
        return res.status(401).json({ error: "Not authorized" })
    } else if (err.status === 400) {
        return res.status(400).json({ error: "Bad request" })
    }
}

module.exports = errorHandler;