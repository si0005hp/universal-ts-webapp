import * as express from "express";
import { Request, Response, ParamsDictionary } from "express-serve-static-core";
import bodyParser = require("body-parser");

const app: express.Express = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000

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
  callback: (req: Request<ParamsDictionary, GET[P]['res'], {}>, res: Response<GET[P]['res']>) => void
) => app.get(path, callback)

const post = <P extends keyof POST>(
  path: P,
  app: express.Express,
  callback: (req: Request<ParamsDictionary, POST[P]['res'], POST[P]['req']>, res: Response<POST[P]['res']>) => void
) => app.post(path, callback)

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