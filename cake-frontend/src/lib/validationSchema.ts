import { z } from 'zod';

export const cakeSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  comment: z.string()
    .min(5, { message: 'Comment must be at least 5 characters long' })
    .max(200, { message: 'Comment must be at most 200 characters long' }),
  imageUrl: z.string().url({ message: 'Please enter a valid image URL' }),
  yumFactor: z.number()
    .int()
    .min(1, { message: 'Yum factor must be between 1 and 5' })
    .max(5, { message: 'Yum factor must be between 1 and 5' }),
});

export type CakeSchemaType = z.infer<typeof cakeSchema>;