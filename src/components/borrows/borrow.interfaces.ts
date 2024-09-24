export interface ICreateBorrow {
	isbn: string;
	borrower_email: string;
}

export interface IBorrowDates {
	borrowed_date?: Date;
	due_date: Date;
}

export interface IReturnBorrow {
	returned_date: Date;
}

export interface IBorrow {
	id: number;
	book_id: number;
	borrower_id: number;
	borrowed_date: Date;
	due_date: Date;
	returned_date: Date | null;
}
