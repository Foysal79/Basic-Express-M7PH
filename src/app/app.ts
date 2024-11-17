import express, { NextFunction, Request, Response } from 'express'
const app = express()
const port = 3000
// parsers 1. json
app.use(express.json());


const userRouter = express.Router();
const courseRouter = express.Router();
app.use('/api/v1/users', userRouter);
app.use('/api/v1/courses', courseRouter);

userRouter.get('/create-user', (req : Request, res : Response) => {
  const user = req.body;
  console.log(user);
  res.json({
    message : "user is crated successfully",
    success : true,
    status : 200,
    data : user
  })
} ) 


courseRouter.post('/create-course', (req : Request, res : Response) => {

 const course = req.body;
  res.json({
    success : true,
    message : 'create new course',
    data : course
  })

})



// middleware 

const logger = (req : Request , res : Response, next : NextFunction) => {
  console.log(req.url, req.method, req.hostname);
  next();
}

app.get('/', logger, async(req : Request, res : Response, next : NextFunction) => {
 
  try{
    res.send('Hello world')
  }
  catch(error) {
  next(error)
  }
})

app.post('/', logger, (req: Request, res : Response) => {
  console.log(req.body);
  res.json({
    message : "Sussfully Receive Data"
  })
} )

// global Route Error Handler
app.all('*', (req: Request, res : Response) => {
   res.status(400).json({
    message : 'Route not found',
    error : 'Route not found'
   })
})


// global error handler
app.use((error : any, req : Request , res : Response, next : NextFunction) => {

  if(error)
  {
    res.status(400).json({
      success :false,
      message : "failed to get data"
    })
  }

})

export default app;