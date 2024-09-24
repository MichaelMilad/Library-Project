import Borrower from './borrower.model';
import {
	ICreateBorrower,
	IUpdateBorrower,
	IBorrower,
} from './borrower.interfaces';

export class BorrowerService {
	// Fetch all borrowers
	static async getAllBorrowers(): Promise<IBorrower[]> {
		return (await Borrower.findAll()) as unknown as IBorrower[];
	}

	// Add a new borrower
	static async addBorrower(borrowerData: ICreateBorrower): Promise<IBorrower> {
		try {
			const borrower = await Borrower.create({ ...borrowerData });
			return borrower.toJSON() as IBorrower;
		} catch (error: any) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				throw new Error('Email must be unique');
			}
			throw error;
		}
	}

	// Get a borrower by email
	static async getBorrowerByEmail(email: string): Promise<IBorrower | null> {
		const borrower = await Borrower.findOne({ where: { email } });
		return borrower ? (borrower.toJSON() as IBorrower) : null;
	}

	// Update a borrower by email
	static async updateBorrower(
		email: string,
		updateData: IUpdateBorrower
	): Promise<IBorrower> {
		const borrower = await Borrower.findOne({ where: { email } });
		if (!borrower) throw new Error('Borrower not found');

		await borrower.update(updateData);
		return borrower.toJSON() as IBorrower;
	}

	// Delete a borrower by email
	static async deleteBorrower(email: string): Promise<void> {
		const borrower = await Borrower.findOne({ where: { email } });
		if (!borrower) throw new Error('Borrower not found');

		await borrower.destroy();
	}
}
