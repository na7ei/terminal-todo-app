'use server';

import { prisma } from '@/lib/prisma';
import { TodoSchema, TodoFormData } from '@/lib/validate';
import { revalidatePath } from 'next/cache';

export async function addTodoAction(data: TodoFormData) {
  await addTodo(data);

  revalidatePath('/');
}

export async function addTodo(data: TodoFormData) {
  const validatedData = TodoSchema.parse({ ...data, completed: false });

  const { id, title } = await prisma.todo.create({
    data: validatedData,
  });
  return {
    id,
    title,
  };
}

export async function toggleTodoAction(id: number, completed: boolean) {
  await toggleTodo(id, completed);

  revalidatePath('/');
}

export async function toggleTodo(id: number, completed: boolean) {
  await prisma.todo.update({
    where: { id },
    data: { completed },
  });
}

export async function deleteTodoAction(id: number) {
  await deleteTodo(id);

  revalidatePath('/');
}

export async function deleteTodo(id: number) {
  await prisma.todo.delete({
    where: { id },
  });
}
