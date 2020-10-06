import MockInterviewQuestions from '../models/mcok-interview-questions.model'
import MockInterviewAnswers from '../models/mock-interview-answers.model'
import MockInterviewResult from '../models/mock-interview-result'

export function addMockQuestions(req, res, next) {
    let MockQuestions = new MockInterviewQuestions(req.body);
    MockQuestions.save((err) => {
        if (err) return next(err);
        res.json({
            success: true
        });
    })
}

export function readMockQuestions(req, res, next) {
    MockInterviewQuestions.find({batch: "5eed4cd381f04e60803599e6"}).exec().then((mockInterviewQuestions, err) => {
        if (err) return next(err);
        res.json(mockInterviewQuestions);
    });
}

export function readMockQuestion(req, res, next) {
    const no = req.params.no;
    const batch = req.params.batch;
    MockInterviewQuestions.findOne({batch: batch, no: no}).exec().then((mockInterviewQuestion, err) => {
        if (err) return next(err);
        res.json(mockInterviewQuestion);
    });
}

export function addMockAnswer(req, res, next) {
    let mockInterviewAnswers = new MockInterviewAnswers(req.body);
    mockInterviewAnswers.save((err) => {
        if (err) return next(err);
        res.json({
            success: true
        });
    })
}

export function addMockAnswerResult(req, res, next) {
    let mockInterviewResult = new MockInterviewResult(req.body);
    const userID = req.body.user;
    const date = req.body.date;
    mockInterviewResult.save((err) => {
        if (err) return next(err);
        res.json({
            userID: userID,
            date: date,
            success: true
        });
    })
}

export function getMockAnswerResultID(req, res, next) {
    let userID = req.params.userID;
    let date = req.params.date;
    MockInterviewResult.findOne({user: userID, date: date}).then((mockInterviewResult, err) => {
        if (err) return next(err);
        res.json(mockInterviewResult);
    });
}

export function readMockResult(req, res, next) {
    let userID = req.params.userID;
    MockInterviewResult.find({user: userID}).then((mockInterviewResults, err) => {
        if (err) return next(err);
        res.json(mockInterviewResults);
    });
}

export function readMockAnswers() {

}

