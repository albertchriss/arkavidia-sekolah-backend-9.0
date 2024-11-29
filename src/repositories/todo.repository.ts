import { and, eq } from "drizzle-orm";
import type { Database } from "../db/drizzle";
import { todo } from "../db/schema/todo.schema";
import {
  GetListTodoQuerySchema,
  IdTodoPathSchema,
  PostTodoBodySchema,
  PutTodoBodySchema,
} from "~/types/todo.type";
import { z } from "zod";

export const getTodoById = async (db: Database, id: string) => {
  return await db.select().from(todo).where(eq(todo.id, id));
};

export const getTodoList = async (
  db: Database,
  q: z.infer<typeof GetListTodoQuerySchema>
) => {
  const isCompletedQ = q.isCompleted === 'false' ? eq(todo.isCompleted, false) : eq(todo.isCompleted, true);
  const userIdQ = eq(todo.authorId, q.userId);
  return await db.select().from(todo).where(and(isCompletedQ, userIdQ));
};

export const createTodo = async (
  db: Database,
  body: z.infer<typeof PostTodoBodySchema>
) => {
  return await db.insert(todo).values(body).returning();
};

export const updateTodo = async (
  db: Database,
  id: string,
  body: z.infer<typeof PutTodoBodySchema>
) => {
  return await db.update(todo).set(body).where(eq(todo.id, id)).returning();
};

export const deleteTodo = async (
	db: Database,
	id: string
) => {
	return await db.delete(todo).where(eq(todo.id, id)).returning();
}
