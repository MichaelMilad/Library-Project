import { Router } from 'express';
import booksRoutes from './components/books/book.controller';
import borrowersRoutes from './components/borrowers/borrower.controller';
import borrowingRoutes from './components/borrows/borrow.controller';

const router = Router();

// Books routes
router.use('/books', booksRoutes);

// Borrowers routes
router.use('/borrowers', borrowersRoutes);

// Borrowing process routes
router.use('/borrows', borrowingRoutes);

router.use('/', (req, res) => {
	res.json({
		message: 'API is running',
		status: 200,
	});
});

export default router;
