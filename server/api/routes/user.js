const { login, register, remove } = require('../control/user');
exports.login = (req, res) => {
  const loginData = {
    userName: req.body.userName,
    password: req.body.password
  }
  login(loginData)
    .then(results => {
      if (results.err) {
        return res.status(500).send(results.err);
      }
      res.jsonp(results)
    })
    .catch(error => {
      console.log('err', err);
      res.status(500).send(err);
    })

}
exports.register = (req, res) => {
  const registerData = {
    userName: req.body.userName,
    password: req.body.password
  }
  register(registerData)
    .then(results => {
      if (results.err) {
        console.log(results);
        return res.status(500).send(results.err);
      }
      res.jsonp(results)
    })
    .catch(err => {
      console.log('err', err);
      res.status(500).send(err);
    })
}
exports.removeUser = (req, res) => {
  const removeData = {
    userName: req.params.userId
  }
  remove(removeData)
    .then(results => {
      if (results.err) {
        console.log(results);
        return res.status(500).send(results.err);
      }
      res.jsonp(results)
    })
    .catch(err => {
      console.log('err', err);
      res.status(500).send(err);
    })
}
