import { Router } from "express";
import RepositoriesController from "./controllers/RepositoriesController";
import SessionsController from "./controllers/SessionsController";
import UserController from "./controllers/UserController";

const routes = new Router();

routes.post('/sessions', SessionsController.create);


// routes.use(auth);


routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.uptade);
routes.delete('/users/:id', UserController.destroy);


routes.get('/users/:user_id/repositories', RepositoriesController.index);
routes.post('/users/:user_id/repositories', RepositoriesController.create);
routes.delete('/users/:user_id/repositories', RepositoriesController.destroy);




export default routes;
