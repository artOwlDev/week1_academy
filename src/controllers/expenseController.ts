import { Request, Response } from "express";
import { ExpenseService } from "../services/expenseService";
import { CreateExpenseRequestDto, ExpenseResponseDto } from "../dtos/expenseDto"


export class ExpenseController {
    constructor(
        private service: ExpenseService = new ExpenseService()) 
    {} 

    private toResponseDto(expense: any): ExpenseResponseDto {
        return {
            id: expense.id,
            date: expense.date,
            description: expense.description,
            user: expense.user
        };
    }

    async getById(req: Request, res: Response): Promise<any> {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: "ID must be a number" });
            return;
        }

        const expense = await this.service.findById(id);

        if (!expense) {
            res.status(404).json({ error: "Expense not found" });
            return;
        }

        res.status(200).json(this.toResponseDto(expense));

    }

    async getAll(req: Request, res: Response): Promise<any> {
        const expenses = await this.service.findAll();
        const dtoList: ExpenseResponseDto[] = expenses.map(expense => this.toResponseDto(expense));
        res.status(200).json(dtoList);
    } 

    async create(req: Request, res: Response): Promise<any> {
        const body: CreateExpenseRequestDto = req.body;
        const date = body.date;
        const description = body.description;
        const user = body.user;

        if (!date) {
            res.status(400).json({ error: "Invalid date" });
            return;
        }
        if (!description) {
            res.status(400).json({ error: "Invalid description" });
            return;
        }
        if (!user) {
            res.status(400).json({ error: "Invalid user" });
            return;
        }

        const expense = await this.service.create({ date, description, user });
        res.status(201).json(this.toResponseDto(expense));
    }

    async update(req: Request, res: Response): Promise<any> {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: "ID must be a number" });
            return;
        }

        const updatedExpense = await this.service.update(id, req.body);

        if (!updatedExpense) {
            res.status(404).json({ error: "Expense not found" });
            return;
        }

        res.status(200).json(this.toResponseDto(updatedExpense));
    }

    async delete(req: Request, res: Response): Promise<any> {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: "ID must be a number" });
            return;
        }

        const deleted = await this.service.delete(id);

        if (!deleted) {
            res.status(404).json({ error: "Expense not found" });
            return;
        }

        res.status(204).send();
    }

}

