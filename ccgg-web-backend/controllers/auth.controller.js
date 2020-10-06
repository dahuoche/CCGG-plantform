import User from "../models/user.model";
import UserRole from "../models/user-role.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const SALTROUNDS = process.env.SALTROUNDS || 10;
const SECRET = process.env.SECRET || 'ccgg';

export function login(req, res, next) {
  const u = req.body;
  User.findOne({email: u.email}, (err, user) => {
    if (user === null) {
      return res.json({
        success: false
      });
    }
    if (err) return next(err);
    bcrypt.compare(u.password, user.password, (err, match) => {
      if (match && (user.active === 1)) { // login successfully
        const token = jwt.sign({
            name: user.name,
            email: user.email
          }, 'ccgg',
          {
            expiresIn: 60 * 60 * 24 * 7
          });
        res.cookie('token', token, {expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000)});
        res.json({
          success: true,
          token,
          _id: user._id
        });
      } else {
        res.json({
          success: false
        });
      }
    });
  });
}

export function register(req, res, next) {
  const user = new User(req.body);
  let roleid = 0;
  User.findOne({email: user.email}, (err, u) => {
      if (u != null) {
          return res.json({
              success: false,
              message: "Email already been used"
          });
      }
      UserRole.findOne({name: "ROLE_STUDENT"}, (err, UserRole) => {
        roleid = UserRole._id;
      });
      // console.log(user);
      bcrypt.genSalt(SALTROUNDS, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          user.password = hash;
          user.active = 0;
          user.mock = "pending";
          user.role = mongoose.Types.ObjectId(roleid);
          user.save((err) => {
            if (err) return next(err);
            res.json({
              success: true
            });
          });
        });
      });
  });
}

export function logout(req, res) {
  res.clearCookie("ccgg");
  return res.json({ message: "Signout success!"});
}

//Check if the email-issueTime pair exist in blacklist
export function isRevokedCallback(req, payload, done){
  let email = payload.email;
  let issueTime = payload.iat;
  Blacklist.find({iat: issueTime}, (err, items) => {
    if (err) return done(err);
    if (items.findIndex(item => item.email === email) >= 0){
      return done(null, true);
    } else {
      return done(null, false);
    }
  })
}
