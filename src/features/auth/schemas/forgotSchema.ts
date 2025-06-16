import { z } from 'zod';

export const forgotSchema = z.object({
    email: z.string().email('Invalid email address'),
});

export type ForgotInput = z.infer<typeof forgotSchema>;
