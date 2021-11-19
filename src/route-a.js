module.exports = {
  path: "/route-a",
  handler: (request, response) => {
    setTimeout(() => {
      console.log('abc')
      response.end("Route A")
    }, 100)
  },
}
