/**
 * @openapi
 * tags:
 *   - name: Books
 *     description: API for managing Books
 */

import { Router } from 'express';
import BookService from './book.service';
import { ICreateBook, IUpdateBook } from './book.interfaces';
import {
	createBookSchema,
	updateBookSchema,
	searchBooksSchema,
} from './book.validations';
import { validateRequest } from '../../middlewares/validation.middleware';

const router = Router();

/**
 * @openapi
 * /api/books:
 *   get:
 *     tags:
 *       - Books
 *     description: Get All Books
 *     responses:
 *       200:
 *         description: Returns an array of all books.
 */
router.get('/', async (_req, res) => {
	try {
		const books = await BookService.getAllBooks();
		res.status(200).json({ data: books });
	} catch (error: any) {
		res.status(500).json({ message: 'Failed to fetch books', error });
	}
});

/**
 * @openapi
 * /api/books:
 *   post:
 *     tags:
 *       - Books
 *     description: Add a book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               isbn:
 *                 type: string
 *               available_quantity:
 *                 type: number
 *               shelf_location:
 *                 type: string
 *             required:
 *               - title
 *               - author
 *               - isbn
 *               - available_quantity
 *               - shelf_location
 *     responses:
 *       201:
 *         description: Created.
 */
router.post('/', validateRequest(createBookSchema), async (req, res) => {
	const bookData: ICreateBook = req.body; // Use the ICreateBook interface
	try {
		const result = await BookService.addBook(bookData);
		res.status(201).json(result);
	} catch (error: any) {
		if (error.message === 'ISBN must be unique') {
			res.status(400).json({ message: error.message });
		} else {
			res.status(500).json({ message: 'Failed to create book', error });
		}
	}
});

/**
 * @openapi
 * /api/books/search:
 *   post:
 *     tags:
 *       - Books
 *     description: Search for books by title, author, or ISBN
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               isbn:
 *                 type: string
 *             required: []
 *     responses:
 *       200:
 *         description: Returns the books matching the search criteria.
 *       400:
 *         description: Validation error.
 */
router.post('/search', validateRequest(searchBooksSchema), async (req, res) => {
	try {
		const books = await BookService.searchBooks(req.body);
		res.status(200).json({ data: books });
	} catch (error: any) {
		res.status(500).json({ message: 'Failed to search books', error });
	}
});

/**
 * @openapi
 * /api/books/{isbn}:
 *   get:
 *     tags:
 *       - Books
 *     description: Get a book by ISBN
 *     parameters:
 *       - name: isbn
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ISBN of the book to retrieve
 *     responses:
 *       200:
 *         description: Returns the book details.
 *       404:
 *         description: Book not found.
 */
router.get('/:isbn', async (req, res) => {
	try {
		const book = await BookService.getBookByISBN(req.params.isbn);
		if (!book) {
			return res.status(404).json({ message: 'Book not found' });
		}
		res.status(200).json({ data: book });
	} catch (error: any) {
		res.status(500).json({ message: 'Failed to fetch book', error });
	}
});

/**
 * @openapi
 * /api/books/{isbn}:
 *   patch:
 *     tags:
 *       - Books
 *     description: Update a book by ISBN
 *     parameters:
 *       - name: isbn
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ISBN of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               available_quantity:
 *                 type: number
 *               shelf_location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated book.
 *       404:
 *         description: Book not found.
 */
router.patch('/:isbn', validateRequest(updateBookSchema), async (req, res) => {
	const updateData: IUpdateBook = req.body; // Use the IUpdateBook interface
	try {
		const result = await BookService.updateBook(req.params.isbn, updateData);
		res.status(200).json(result);
	} catch (error: any) {
		if (error.message === 'Book not found') {
			res.status(404).json({ message: error.message });
		} else {
			res.status(500).json({ message: 'Failed to update book', error });
		}
	}
});

/**
 * @openapi
 * /api/books/{isbn}:
 *   delete:
 *     tags:
 *       - Books
 *     description: Delete a book by ISBN
 *     parameters:
 *       - name: isbn
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ISBN of the book to delete
 *     responses:
 *       200:
 *         description: Book deleted.
 *       404:
 *         description: Book not found.
 */
router.delete('/:isbn', async (req, res) => {
	try {
		const result = await BookService.deleteBook(req.params.isbn);
		res.status(200).json(result);
	} catch (error: any) {
		if (error.message === 'Book not found') {
			res.status(404).json({ message: error.message });
		} else {
			res.status(500).json({ message: 'Failed to delete book', error });
		}
	}
});

export default router;
