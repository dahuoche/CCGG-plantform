import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import mongoose from 'mongoose';
import {login, register, logout, isRevokedCallback} from "./controllers/auth.controller";
import {getBatch, getBatches, saveBatch} from "./controllers/batch.controller";
import expressJwt from 'express-jwt';
import cors from 'cors';
import {addQuestionTag, getQuestionTags} from "./controllers/question-tag.controller";
import {getQuestions, getQuestion, saveQuestion, updateQuestion} from './controllers/question.controller';
import {activeUser, getUser, getUsers} from "./controllers/user.controller";
import {getUserRoles} from "./controllers/user-role.controller";
import {verifyToken} from "./middleware/jwt";
import {getAnswers, saveAnswer, updateAnswer} from "./controllers/trainee-answer.controller";
import {
    addMockAnswer, addMockAnswerResult,
    addMockQuestions, getMockAnswerResultID,
    readMockAnswers,
    readMockQuestion,
    readMockQuestions, readMockResult
} from "./controllers/mock.controller";

const app = express();
const allowedOrigins = ['https://ccggplatform.com', 'https://bht-platform.com', 'http://localhost:4200'];

// connect to Mongodb
mongoose.Promise = global.Promise;
const promise = mongoose.connect("mongodb://ccgg-prj:ccggsweet123@cluster0-shard-00-00-kptmg.mongodb.net:27017,cluster0-shard-00-01-kptmg.mongodb.net:27017,cluster0-shard-00-02-kptmg.mongodb.net:27017/CCGG-DB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true", {
    useMongoClient: true
});
const SECRET = process.env.SECRET || 'ccgg';
promise.then(function() {
    console.log("Mongodb connected!");
});

// app.use(express.static(__dirname + "/public"));
app.use(cors({
    credentials: true,
    origin: function(origin, callback){
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(verifyToken);
// auth
app.post('/auth/login', login);
app.post('/auth/regist', register);
app.get('/logout', expressJwt({
  secret: SECRET,
  isRevoked: isRevokedCallback
}) , logout);

app.get('/users', getUsers);
app.put('/users', activeUser);
app.get('/user/:id', getUser);
app.get('/api/roles', getUserRoles);

//batches
app.get('/api/batches/:id', getBatch);
app.get('/api/batches', getBatches);
app.post('/api/batch', saveBatch);

//question tag
app.get('/api/questions_tags', getQuestionTags);
app.post('/api/questions_tag', addQuestionTag);

//questions
app.get('/api/questions', getQuestions);
app.post('/api/question', saveQuestion);
app.put('/api/question', updateQuestion);
app.get('/api/questions/:id', getQuestion);

//answers
app.get('/api/answers', getAnswers);
app.post('/api/answers', saveAnswer);
app.put('/api/answers', updateAnswer);

//Mock interview apis
app.post('/api/mock/questions', addMockQuestions);
app.post('/api/mock/result', addMockAnswerResult);
app.get('/api/mock/questions', readMockQuestions);
app.get('/api/mock/question/:batch/:no', readMockQuestion);
app.post('/api/mock/answer', addMockAnswer);
app.get('/api/mock/answer', readMockAnswers);
app.get('/api/mock/result/:date/:userID', getMockAnswerResultID);
app.get('/api/mock/result/:userID', readMockResult);

app.listen(process.env.port || 8081);
console.log("server started");
