import { z } from 'zod';

export const registerSchema = z
    .object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters'),
        number: z.string().min(8, 'Phone number is required'),
        role_id: z.string().min(1, 'Role is required'),
        note: z.string().min(1, 'Note is required'),
    })


export type RegisterInput = z.infer<typeof registerSchema>;
