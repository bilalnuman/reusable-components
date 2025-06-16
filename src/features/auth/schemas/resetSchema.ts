import { z } from 'zod';

export const resetSchema = z
    .object({
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters'),
    })

export type ResetInput = z.infer<typeof resetSchema>;
