"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
// parsers 1. json
app.use(express_1.default.json());
const userRouter = express_1.default.Router();
const courseRouter = express_1.default.Router();
app.use('/api/v1/users', userRouter);
app.use('/api/v1/courses', courseRouter);
userRouter.get('/create-user', (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({
        message: "user is crated successfully",
        success: true,
        status: 200,
        data: user
    });
});
courseRouter.post('/create-course', (req, res) => {
    const course = req.body;
    res.json({
        success: true,
        message: 'create new course',
        data: course
    });
});
// middleware 
const logger = (req, res, next) => {
    console.log(req.url, req.method, req.hostname);
    next();
};
app.get('/', logger, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send('Hello world');
    }
    catch (error) {
        next(error);
    }
}));
app.post('/', logger, (req, res) => {
    console.log(req.body);
    res.json({
        message: "Sussfully Receive Data"
    });
});
// global Route Error Handler
app.all('*', (req, res) => {
    res.status(400).json({
        message: 'Route not found',
        error: 'Route not found'
    });
});
// global error handler
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).json({
            success: false,
            message: "failed to get data"
        });
    }
});
exports.default = app;
