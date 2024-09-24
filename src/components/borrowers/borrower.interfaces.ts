export interface IBorrower {
	id: number;
	name: string;
	email: string;
	registered_date: Date;
}

export interface ICreateBorrower {
	name: string;
	email: string;
	registered_date: Date;
}

export interface IUpdateBorrower {
	name?: string;
	email?: string; // Optional, in case you want to allow email updates
}
