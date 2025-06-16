import { z } from 'zod';

export const verifySchema = z.object({
    otp: z
        .array(z.string().length(1, 'Required'))
        .length(6, 'OTP must be 6 digits'),
});
export type VerifyInput = z.infer<typeof verifySchema>;