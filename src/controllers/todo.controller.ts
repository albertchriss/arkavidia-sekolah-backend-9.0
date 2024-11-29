import { db } from '../db/drizzle';
import { createTodo, deleteTodo, getTodoById, getTodoList, updateTodo } from '../repositories/todo.repository';
import { deleteTodoRoute, getListTodoRoute, getTodoRoute, postTodoRoute, putTodoRoute } from '../routes/todo.route';
import { createRouter } from '../utils/router-factory';

export const todoRouter = createRouter();

todoRouter.openapi(getTodoRoute, async (c) => {
	const { id } = c.req.valid('param');
	const todo = await getTodoById(db, id);
	return c.json(todo, 200);
});

todoRouter.openapi(getListTodoRoute, async (c) => {
	const todos = await getTodoList(db, c.req.valid('query'));
	return c.json(todos, 200);
});

todoRouter.openapi(postTodoRoute, async (c) => {
	const todo = await createTodo(db, c.req.valid('json'));
	return c.json(todo, 201);
});

todoRouter.openapi(putTodoRoute, async (c) => {
	const { id } = c.req.valid('param');
	const todo = await updateTodo(db, id, c.req.valid('json'));
	return c.json(todo, 200)
});

todoRouter.openapi(deleteTodoRoute, async (c) => {
	const { id } = c.req.valid('param');
	const todo = await deleteTodo(db, id);
	return c.json(todo, 200);;
})