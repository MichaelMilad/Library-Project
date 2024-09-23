import { Router } from 'express';
import booksRoutes from './books';
import borrowersRoutes from './borrowers';
import borrowingRoutes from './borrowing';

const router = Router();

// Books routes
router.use('/books', booksRoutes);

// Borrowers routes
router.use('/borrowers', borrowersRoutes);

// Borrowing process routes
router.use('/borrow', borrowingRoutes);

router.use('/', (req, res) => {
    res.json({
        message: 'API is running',
        status: 200,
    })
})

export default router;
