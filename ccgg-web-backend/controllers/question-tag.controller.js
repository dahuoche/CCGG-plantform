import QuestionTag from '../models/question-tag.model';
import Batch from "../models/batch.model";

export function getQuestionTags(req, res, next) {
    QuestionTag.find({}, (err, questionTags) => {
        if (err) return next(err);
        res.json(questionTags);
    });

    // QuestionTag.findOne()
}

export function addQuestionTag(req, res, next) {
    let questionTag = new QuestionTag(req.body);
    questionTag.save((err) => {
        if (err) return next(err);
        res.json({
            success: true
        });
    })
}
