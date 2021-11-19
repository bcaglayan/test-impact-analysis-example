module.exports = {
  path: "/route-a",
  handler: (request, response) => {
    setTimeout(() => {
      response.end("Route A")
    }, 100)
  },
}
