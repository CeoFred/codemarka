app.get('/', function (req, res, next) {
    // do some sync stuff
    queryDb()
      .then(function (data) {
        // handle data
        return makeCsv(data)
      })
      .then(function (csv) {
        // handle csv
      })
      .catch(next)
  })

  