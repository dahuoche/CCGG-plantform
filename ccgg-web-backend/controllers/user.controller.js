import User from '../models/user.model';

export function getUsers(req, res, next) {
  User.find().populate("role").populate("batch").exec().then((users, err) => {
    if (err) return next(err);
    res.json(users);
  });
}

export function getUser(req, res, next) {
  const id = req.params.id;
  // console.log(id);
  User.findOne({_id: id}).populate("role").populate("batch").exec().then((user, err) => {
    if (err) return next(err);
    res.json(user);
  });
}

export function activeUser(req, res, next) {
  let user = User(req.body);
  User.findOneAndUpdate({_id: user._id}, user, (err) => {
    if (err) return next(err);
    res.json({
      success: true
    });
  })
}
