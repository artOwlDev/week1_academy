import { Request, Response } from "express";
import { ExpenseService } from "../services/expenseService";

export class ExpenseController {
    constructor(private service: ExpenseService = new ExpenseService()) {}

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

        res.status(200).json(expense);

    }

    async getAll(req: Request, res: Response):  Promise<any>{
        res.status(200).json(this.service.findAll())
    } 

    async create(req: Request, res: Response): Promise<any>{
        const date = req.body.date
        const description = req.body.description
        const user = req.body.user

        if (!date){
            res.status(400).json({ error: "Invalid date" });
        }
        if (!description){
            res.status(400).json({ error: "Invalid description" });
        }
        if (!user){
            res.status(400).json({ error: "Invalid user" });
        }

        this.service.create({date, description, user})

        return {date, description, user}
    }

    async update(req: Request, res: Response): Promise<any>{
        const id = req.body.id
       
        if (!id){
            res.status(400).json({ error: "Invalid id" });
        }

        res.status(200).json(this.service.update(id, ""))

    }

    async delete(req: Request, res: Response): Promise<any>{
        const id = req.body.id
       
        if (!id){
            res.status(400).json({ error: "Invalid id" });
        }

        res.status(200).json(this.service.delete(id))
    }






}

