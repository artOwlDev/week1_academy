import { Request, Response } from "express";
import { ExpenseService } from "../services/expenseService";
import { ExpenseResponseDto, CreateExpenseRequestDto } from "../dtos/expenseDto"


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

        const expense = await this.service.findById(id);

        if (!expense) {
            res.status(404).json({error: "Expense not found"});
            return;
        }

        res.status(200).json(this.toResponseDto(expense));
    }

    async getAll(req: Request, res: Response): Promise<any> {
        const expenses = await this.service.findAll();
        const dtoList: ExpenseResponseDto[] = expenses.map(expense => this.toResponseDto(expense));
        res.status(200).json(dtoList);
    } 

    async create(req: Request, res: Response): Promise<void> {
        const dto: CreateExpenseRequestDto = req.body;

        const expense = await this.service.create(dto);

        if (!expense) {
            res.status(400).json({error: "Failed to create expense"});
            return;
        }

        const responseDto: ExpenseResponseDto = {
            id: expense.id,
            date: expense.date,
            description: expense.description,
            user: expense.user,
        };
        res.status(201).json(responseDto);
    }


    async update(req: Request, res: Response): Promise<any> {
        const id = Number(req.params.id);

        const updatedExpense = await this.service.update(id, req.body);

        if (!updatedExpense) {
            res.status(404).json({error: "Expense not found"});
            return;
        }

        res.status(200).json(this.toResponseDto(updatedExpense));
    }

    async delete(req: Request, res: Response): Promise<any> {
        const id = Number(req.params.id);

        const deleted = await this.service.delete(id);

        if (!deleted) {
            res.status(404).json({error: "Expense not found"});
            return;
        }

        res.status(204).send();
    }

}

