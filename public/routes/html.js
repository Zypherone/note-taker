// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
const express = require('express')
const path = require('path')

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------

  app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '/../html/notes.html'))
  })

  // Server all static assests from public/assets to assets/
  app.use('/assets', express.static(path.join(__dirname, '/../assets')))

  // If no matching route is found default to home
  app.use(function (req, res) {
    res.sendFile(path.join(__dirname, '/../html/index.html'))
  })
}
