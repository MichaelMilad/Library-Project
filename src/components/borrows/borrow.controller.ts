/**
 * @openapi
 * tags:
 *   - name: Borrows
 *     description: API for managing book borrowing and returning
 */

import { Router } from 'express';
import BorrowService from './borrow.service';
import { validateRequest } from '../../middlewares/validation.middleware';
import { borrowBookSchema, returnBookSchema } from './borrow.validations';

const router = Router();

/**
 * @openapi
 * /api/borrows:
 *   post:
 *     tags:
 *       - Borrows
 *     description: Borrow a book (checkout)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isbn:
 *                 type: string
 *                 description: The ISBN of the book to borrow
 *               borrower_email:
 *                 type: string
 *                 description: The email of the borrower
 *               borrowed_date:
 *                 type: string
 *                 format: date-time
 *                 description: The date the book was borrowed
 *               due_date:
 *                 type: string
 *                 format: date-time
 *                 description: The due date for returning the book
 *             required:
 *               - isbn
 *               - borrower_email
 *               - due_date
 *     responses:
 *       201:
 *         description: Book successfully borrowed
 *       400:
 *         description: Validation error
 */
router.post('/', validateRequest(borrowBookSchema), async (req, res) => {
	try {
		const { isbn, borrower_email, borrowed_date, due_date } = req.body;
		const borrowRecord = await BorrowService.checkoutBook(
			{ borrowed_date, due_date },
			isbn,
			borrower_email
		);
		res.status(201).json({ data: borrowRecord });
	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
});

/**
 * @openapi
 * /api/borrows/return:
 *   post:
 *     tags:
 *       - Borrows
 *     description: Return a book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isbn:
 *                 type: string
 *                 description: The ISBN of the book being returned
 *               borrower_email:
 *                 type: string
 *                 description: The email of the borrower
 *             required:
 *               - isbn
 *               - borrower_email
 *     responses:
 *       200:
 *         description: Book successfully returned
 *       404:
 *         description: Borrow record not found
 */
router.post('/return', validateRequest(returnBookSchema), async (req, res) => {
	try {
		const { isbn, borrower_email } = req.body;
		const returnRecord = await BorrowService.returnBook(isbn, borrower_email);
		res.status(200).json({ data: returnRecord });
	} catch (error: any) {
		res.status(404).json({ message: error.message });
	}
});

/**
 * @openapi
 * /api/borrows/overdue:
 *   get:
 *     tags:
 *       - Borrows
 *     description: List all overdue books
 *     responses:
 *       200:
 *         description: Returns an array of overdue books
 */
router.get('/overdue', async (_req, res) => {
	try {
		const overdueBooks = await BorrowService.getOverdueBooks();
		res.status(200).json({ data: overdueBooks });
	} catch (error: any) {
		res.status(500).json({ message: 'Failed to fetch overdue books', error });
	}
});

/**
 * @openapi
 * /api/borrows/{email}:
 *   get:
 *     tags:
 *       - Borrows
 *     description: Get books currently borrowed by a borrower
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: The borrower's email
 *     responses:
 *       200:
 *         description: Returns an array of books currently borrowed
 *       404:
 *         description: Borrower not found
 */
router.get('/:email', async (req, res) => {
	try {
		const borrower_email = req.params.email;
		const borrowedBooks = await BorrowService.getBorrowedBooksByBorrower(
			borrower_email
		);
		res.status(200).json({ data: borrowedBooks });
	} catch (error: any) {
		res.status(404).json({ message: error.message });
	}
});

export default router;
