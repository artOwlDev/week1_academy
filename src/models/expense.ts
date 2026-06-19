export class Expense {
    constructor(
        public readonly id: number,
        public readonly date: string,
        public readonly description: string,
        public readonly user: string
    ){
        if (id = 0) throw new Error("ID must be positive");
        if (!date) throw new Error("Date can't be empty!")
        if (!description) throw new Error("Description can't be empty!")
        if (!user) throw new Error("User can't be empty!")
    }
    
}
