import { Op, fn, col } from 'sequelize';

import Borrow from './borrow.model';
import { IBorrow, IBorrowDates } from './borrow.interfaces';
import Book from '../books/book.model';
import Borrower from '../borrowers/borrower.model';
import { IBook } from '../books/book.interfaces';
import { IBorrower } from '../borrowers/borrower.interfaces';

export class BorrowService {
	// Checkout a book (create a borrow record) using ISBN and borrower email
	static async checkoutBook(
		borrowData: IBorrowDates,
		isbn: string,
		borrower_email: string
	): Promise<IBorrow> {
		const book = (await Book.findOne({ where: { isbn } })) as unknown as IBook;
		if (!book) {
			throw new Error('Book not found');
		}

		const activeBorrowsCount = await Borrow.count({
			where: { book_id: book.id, returnedDate: null },
		});
		if (activeBorrowsCount >= book.available_quantity) {
			throw new Error('No available copies of this book for borrowing.');
		}

		const borrower = (await Borrower.findOne({
			where: { email: borrower_email },
		})) as unknown as IBorrower;
		if (!borrower) {
			throw new Error('Borrower not found');
		}

		const borrowRecord = await Borrow.create({
			...borrowData,
			book_id: book.id,
			borrower_id: borrower.id,
		});
		return borrowRecord.toJSON() as IBorrow;
	}

	// Return a book using ISBN and borrower email
	static async returnBook(
		isbn: string,
		borrower_email: string
	): Promise<IBorrow> {
		const borrower = (await Borrower.findOne({
			where: { email: borrower_email },
		})) as unknown as IBorrower;
		if (!borrower) {
			throw new Error('Borrower not found');
		}

		const book = (await Book.findOne({ where: { isbn } })) as unknown as IBook;
		if (!book) {
			throw new Error('Book not found');
		}

		const borrowRecord = await Borrow.findOne({
			where: {
				book_id: book.id,
				borrower_id: borrower.id,
				returned_date: null,
			},
		});

		if (!borrowRecord) {
			throw new Error('Borrow record not found or book already returned.');
		}

		await borrowRecord.update({ returned_date: new Date() });
		return borrowRecord.toJSON() as IBorrow;
	}

	// Get books currently checked out by a borrower using their email
	static async getBorrowedBooksByBorrower(
		borrower_email: string
	): Promise<IBorrow[]> {
		const borrower = (await Borrower.findOne({
			where: { email: borrower_email },
		})) as unknown as IBorrower;
		if (!borrower) {
			throw new Error('Borrower not found');
		}

		const borrowedBooks = await Borrow.findAll({
			where: { borrower_id: borrower.id, returned_date: null },
			include: [Book],
		});

		return borrowedBooks.map((borrow) => borrow.toJSON() as IBorrow);
	}

	// List overdue books (past due_date and not returned)
	static async getOverdueBooks(): Promise<IBorrow[]> {
		const overdueBooks = await Borrow.findAll({
			where: {
				due_date: {
					[Op.lt]: fn('CURDATE'), // Compare only the date part (no time involved)
				},
				returned_date: null,
			},
			include: [Book],
		});

		return overdueBooks.map((borrow) => borrow.toJSON() as IBorrow);
	}
}

export default BorrowService;
