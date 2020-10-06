import TraineeAnswer from '../models/trainee-answer.model';
import url from 'url';
import User from "../models/user.model";

export function getAnswers(req, res, next) {
    const params = url.parse(req.url, true).query;
    const user = params.user;
    const question = params.question;
    // console.log(question);
    if (question !== undefined) {
        TraineeAnswer.findOne({user: user, question: question}).then((answer, err) => {
            if (err) return next(err);
            res.json(answer);
        })
    }
    else {
        TraineeAnswer.find({user: user}).then((answers, err) => {
            if (err) return next(err);
            res.json(answers);
        })
    }
}

export function saveAnswer(req, res, next) {
    const answer = TraineeAnswer(req.body);
    answer.save((err) => {
        if (err) return next(err);
        res.json({
            success: true
        });
    })
}

export function updateAnswer(req, res, next) {
    let traineeAnswer = TraineeAnswer(req.body);
    // console.log(traineeAnswer);
    TraineeAnswer.findOneAndUpdate({_id: traineeAnswer._id}, traineeAnswer, (err) => {
        if (err) return next(err);
        res.json({
            success: true
        });
    })
}
