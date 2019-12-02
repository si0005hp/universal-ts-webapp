import * as express from "express";
import { Request, Response, ParamsDictionary, RequestHandler } from "express-serve-static-core";
import bodyParser = require("body-parser");
import { NextFunction } from "connect";

const app: express.Express = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3003

let todos = [1, 2, 3, 4, 5].map(id => ({
  userId: id,
  id: id,
  title: `hogefuga-${id}`,
  completed: false,
}))

export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface GET {
  '/todos': {
    res: Array<Todo>
  },
  '/todos/:id': {
    res: Array<Todo>
  }
}

export interface POST {
  '/todos': {
    req: {
      todo: Todo
    },
    res: Array<Todo>
  }
}

// ===== app =====

const get = <P extends keyof GET>(
  path: P,
  app: express.Express,
  ...handlers: Array<RequestHandler<ParamsDictionary, GET[P]['res'], null>>
) => app.get(path, handlers)

const post = <P extends keyof POST>(
  path: P,
  app: express.Express,
  ...handlers: Array<RequestHandler<ParamsDictionary, POST[P]['res'], POST[P]['req']>>
) => app.post(path, handlers)

app.use((req: Request<ParamsDictionary, unknown, unknown>, _res: Response<unknown>, next: NextFunction) => {
  console.log('Authorization:', req.headers.authorization)
  next()
})

get('/todos', app, (_, res) => {
  res.send(todos)
})

get('/todos/:id', app, (req, res) => {
  const id = parseInt(req.params['id'])
  res.send(todos.filter(todo => todo.id === id))
})

post('/todos', app, (req, res) => {
  todos = [...todos, req.body.todo]
  res.send(todos)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))