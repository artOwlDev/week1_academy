import { Expense } from "../models/expense";


const mockExpenses: Expense[] = [
    { id: 1, date: "2024-01-15", description: "Grocery shopping", user: "Alice" },
    { id: 2, date: "2024-01-16", description: "Gas refill", user: "Bob" },
];

export class ExpenseService{
    async findById(id: number): Promise<Expense | undefined> {
        return mockExpenses.find(p => p.id === id);
    }

    async findAll(): Promise<Expense[]> {
        return mockExpenses;
    }

    async create(expense: any): Promise<Expense |undefined> {
        if (!expense) {
            return;
        }

        const newExpense = {
            id: mockExpenses.length + 1,
            date: expense.date,
            description: expense.description,
            user: expense.user
        };

        mockExpenses.push(newExpense);
        return newExpense;
    }

    async update(id: number, expense: any): Promise<Expense | undefined> {
        const index = mockExpenses.findIndex(e => e.id === id);

        if (index === -1) {
            return undefined;
        }

        mockExpenses[index] = {
            id: mockExpenses[index].id,
            date: expense.date || mockExpenses[index].date,
            description: expense.description || mockExpenses[index].description,
            user: expense.user || mockExpenses[index].user
        };

        return mockExpenses[index];
    }

    async delete(id: number): Promise<boolean> {
        const index = mockExpenses.findIndex(e => e.id === id);

        if (index === -1) {
            return false;
        }

        mockExpenses.splice(index, 1);
        return true;
    }
}
