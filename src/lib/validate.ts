import { z } from 'zod';

export const TodoSchema = z.object({
  id: z.number().optional(),
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be 100 characters or less'),
  completed: z.boolean().default(false),
});

export const TodoFormSchema = TodoSchema.omit({ id: true, completed: true });

export type Todo = z.infer<typeof TodoSchema>;
export type TodoFormData = z.infer<typeof TodoFormSchema>;
