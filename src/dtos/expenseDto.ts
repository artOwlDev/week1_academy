import { z } from 'zod'

export interface ExpenseResponseDto {
    id: number;
    date: string;
    description: string;
    user: string;
}

export const CreateExpenseSchema = z.object({
    date: z.string().min(1, "Date cannot be empty"),
    description: z.string().min(1, "Description cannot be empty"),
    user: z.string().min(1, "User cannot be empty"),
});

export type CreateExpenseRequestDto = z.infer<typeof CreateExpenseSchema>;

export const IdParamSchema = z.object({
    id: z.coerce.number().int().positive("Number must be positive")
})
