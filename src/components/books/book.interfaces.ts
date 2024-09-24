export interface IBook {
	id: number;
	title: string;
	author: string;
	isbn: string;
	available_quantity: number;
	shelf_location: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ICreateBook {
	title: string;
	author: string;
	isbn: string;
	available_quantity?: number;
	shelf_location: string;
}

export interface IUpdateBook {
	title?: string;
	author?: string;
	available_quantity?: number;
	shelf_location?: string;
}

export interface IBookResponse {
	data: IBook | null;
	message: string;
}

export interface IDeleteResponse {
	message: string;
}
