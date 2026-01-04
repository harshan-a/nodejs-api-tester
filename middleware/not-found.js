const notFoundMiddleware = (req, res) => {
  res.status(404).send("404 - not found");
}

module.exports = notFoundMiddleware;