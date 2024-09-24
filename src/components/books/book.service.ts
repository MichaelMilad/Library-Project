import Book from './book.model';
import {
	ICreateBook,
	IUpdateBook,
	IBook,
	IBookResponse,
	IDeleteResponse,
} from './book.interfaces';

export class BookService {
	// Fetch all books
	static async getAllBooks(): Promise<IBook[]> {
		const books = await Book.findAll();
		return books as unknown as IBook[];
	}

	// Add a new book
	static async addBook(bookData: ICreateBook): Promise<IBookResponse> {
		try {
			const book = await Book.create({ ...bookData });
			return {
				data: book.toJSON() as IBook,
				message: 'Book created successfully',
			};
		} catch (error: any) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				throw new Error('ISBN must be unique');
			}
			throw error;
		}
	}

	// Search books by title, author, or ISBN
	static async searchBooks(
		searchCriteria: Partial<ICreateBook>
	): Promise<IBook[]> {
		const { title, author, isbn } = searchCriteria;

		const whereClause: any = {};
		if (title) whereClause.title = title;
		if (author) whereClause.author = author;
		if (isbn) whereClause.isbn = isbn;

		const books = await Book.findAll({ where: whereClause });
		return books as unknown as IBook[];
	}

	// Get a book by ISBN
	static async getBookByISBN(isbn: string): Promise<IBook | null> {
		const book = await Book.findOne({ where: { isbn } });
		return book ? (book.toJSON() as IBook) : null;
	}

	// Update a book by ISBN
	static async updateBook(
		isbn: string,
		updateData: IUpdateBook
	): Promise<IBookResponse> {
		try {
			const book = await Book.findOne({ where: { isbn } });
			if (!book) {
				throw new Error('Book not found');
			}
			await book.update(updateData);
			return {
				data: book.toJSON() as IBook,
				message: 'Book updated successfully',
			};
		} catch (error: any) {
			throw error;
		}
	}

	// Delete a book by ISBN
	static async deleteBook(isbn: string): Promise<IDeleteResponse> {
		try {
			const book = await Book.findOne({ where: { isbn } });
			if (!book) {
				throw new Error('Book not found');
			}
			await book.destroy();
			return { message: 'Book deleted successfully' };
		} catch (error: any) {
			throw error;
		}
	}
}

export default BookService;
