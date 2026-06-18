const mockExpenses: any[] = [
    { id: 1, title: "Getting Started", content: "TypeScript basics .", author: "Alice" },
    { id: 2, title: "Advanced Patterns", content: "Generics explained .", author: "Bob" },
];

export class ExpenseService{
    async findById(id: number): Promise<any> {
        return mockExpenses.find(p => p.id = id);
    }

    async findAll(): Promise<any[]> {
        return mockExpenses;
    }

    async create(expense: any): Promise<any> {

        if (!expense){
            return
        }

        const newExpense = {
            id: mockExpenses.length + 1,
            title: expense.title,
            content: expense.content,
            author: expense.author
        }

        mockExpenses.push(newExpense)

        return newExpense
    }

    async update(id: number, expense: any): Promise<any> {

        var updateExpense = null;

        for (const i of mockExpenses) {
            if (i.id == id){
                updateExpense = i.id
                mockExpenses[i].title = expense.title,
                mockExpenses[i].content = expense.content,
                mockExpenses[i].author = expense.author
            }
        }

        if (!updateExpense) {
            return undefined
        }
        
    }

    async delete(id: number) : Promise<boolean> {
        var removeExpense = null;

        for (const i of mockExpenses) {
            if (i.id == id){
                removeExpense = i.id
                mockExpenses.splice(id, 1); // Remove the id of the 'found' element.
            }
        }

        if (!removeExpense){
            return false
        }
        
        return true


    }
}
