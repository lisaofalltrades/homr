// mongo_uri
'mongodb://heroku_906kqvg2:8t1anstopporkf4orjml2qviqo@ds155418.mlab.com:55418/heroku_906kqvg2'

'mongodb://user:pass@host:port/db'

mongo host: port/db -u user -p pass yourSeedFile.js

'mongo ds155418.mlab.com:55418/heroku_906kqvg2 -u user -p pass yourSeedFile.js'

    res.send({
      // token: token,
      admin: user.admin,
      role: user.role,
      email: user.email,
      currentUser: user,
      district: user.district
    })
    console.log('Found author')
    console.log(user)
  })
})