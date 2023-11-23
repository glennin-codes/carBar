import express, {
  Application,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import { config } from "dotenv";
import createHttpError from "http-errors";
import createError from "http-errors";

config();

const app: Application = express();
const port: number = Number(process.env.Port) || 8080;

//middlewares
app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("car hub api");
  });
app.use("*",(req: Request, res: Response, next: NextFunction) => {
  // Simulate a 404 error
  next(new createHttpError.NotFound(
    `The requested resource ${req.originalUrl} does not exist`
  ));
});

const handleErrors: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .send({ error: err.message || "something went wrong" });
};
app.use(handleErrors);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
