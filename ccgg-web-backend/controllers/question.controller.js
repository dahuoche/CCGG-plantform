import Question from '../models/question.model';

export function getQuestions(req, res, next) {
    Question.find().populate('question_tags').exec().then((questions, err) => {
        if (err) return next(err);
        res.json(questions);
    });
}

export function getQuestion(req, res, next) {
    const id = req.params.id;
    // console.log(id);
    Question.findOne({_id: id}).populate('question_tags').exec().then((question, err) => {
        if (err) return next(err);
        res.json(question);
    });
}

export function saveQuestion(req, res, next) {
    let question = new Question(req.body);
    Question.find().count((err, count) => {
        question.No = count+1;
        question.save((err) => {
            if (err) return next(err);
            res.json({
                success: true
            });
        })
    })
}

export function updateQuestion(req, res, next) {
    let question = new Question(req.body);
    Question.findOneAndUpdate({No: question.No}, question, (err) => {
        if (err) return next(err);
        res.json({
            success: true
        });
    })
}
