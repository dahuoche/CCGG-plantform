import UserRole from '../models/user-role.model';

export function getUserRoles(req, res, next) {
    UserRole.find({}, (err, UserRoles) => {
        if (err) return next(err);
        res.json(UserRoles);
    });
}

export function getUserRole(req, res, next) {
    const name = req.params.name;
    UserRole.findOne({name: name}, (err, UserRole) => {
        console.log(UserRole);
    })
}
