router.post('/findUser', (req, res) => {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) return res.status(500).send(err)
    if (!user) return res.status(400).send({ errorMsg: 'no user found' })

    // const token = jwt.sign({
    //   _id: user._id
    // }, 'PROCESS')

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