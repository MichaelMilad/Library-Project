import { Router } from 'express';
import BookService from '../services/books';

const router = Router();

/**
 * @openapi
 * /api/books:
 *   get:
 *     description: Get All Books
 *     responses:
 *       200:
 *         description: Returns an array of all books.
 */
router.get('/', async (req, res) => {
  try {
    const books = await BookService.getAllBooks();
    res.status(200).json({
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch books',
      error,
    });
  }
});

/**
 * @openapi
 * /api/books:
 *   post:
 *     description: Add a book
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                author:
 *                  type: string
 *                isbn:
 *                  type: string
 *                available_quantity:
 *                  type: number
 *                shelf_location:
 *                  type: string
 *                required:
 *     responses:
 *       201:
 *         description: Created.
 */
router.post('/', async (req, res) => {
  try {
    const book = await BookService.addBook(req.body);
    res.status(201).json({
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create book',
      error,
    });
  }
});

export default router;
