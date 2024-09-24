/**
 * @openapi
 * tags:
 *   - name: Borrowers
 *     description: API for managing borrowers
 */

import { Router } from 'express';
import { BorrowerService } from './borrower.service';
import {
	createBorrowerSchema,
	updateBorrowerSchema,
} from './borrower.validations';
import { validateRequest } from '../../middlewares/validation.middleware';

const router = Router();

/**
 * @openapi
 * /api/borrowers:
 *   get:
 *     tags:
 *       - Borrowers
 *     description: List all borrowers
 *     responses:
 *       200:
 *         description: Returns an array of all borrowers.
 */
router.get('/', async (req, res) => {
	try {
		const borrowers = await BorrowerService.getAllBorrowers();
		res.status(200).json({ data: borrowers });
	} catch (error: any) {
		res.status(500).json({ message: 'Failed to fetch borrowers', error });
	}
});

/**
 * @openapi
 * /api/borrowers:
 *   post:
 *     tags:
 *       - Borrowers
 *     description: Register a borrower
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               registered_date:
 *                 type: string
 *                 format: date
 *             required:
 *               - name
 *               - email
 *     responses:
 *       201:
 *         description: Borrower registered.
 */
router.post('/', validateRequest(createBorrowerSchema), async (req, res) => {
	try {
		const borrower = await BorrowerService.addBorrower(req.body);
		res.status(201).json({ data: borrower });
	} catch (error: any) {
		if (error.message === 'Email must be unique') {
			res.status(400).json({ message: error.message });
		} else {
			res.status(500).json({ message: 'Failed to register borrower', error });
		}
	}
});

/**
 * @openapi
 * /api/borrowers/{email}:
 *   get:
 *     tags:
 *       - Borrowers
 *     description: Get a borrower by email
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The email of the borrower to retrieve
 *     responses:
 *       200:
 *         description: Returns the borrower details.
 *       404:
 *         description: Borrower not found.
 */
router.get('/:email', async (req, res) => {
	try {
		const borrower = await BorrowerService.getBorrowerByEmail(req.params.email);
		if (!borrower) {
			return res.status(404).json({ message: 'Borrower not found' });
		}
		res.status(200).json({ data: borrower });
	} catch (error: any) {
		res.status(500).json({ message: 'Failed to fetch borrower', error });
	}
});

/**
 * @openapi
 * /api/borrowers/{email}:
 *   patch:
 *     tags:
 *       - Borrowers
 *     description: Update borrower details by email
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The email of the borrower to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               registered_date:
 *                 type: string
 *                 format: date-time  # Corrected to date-time for ISO format
 *     responses:
 *       200:
 *         description: Borrower details updated.
 *       404:
 *         description: Borrower not found.
 */
router.patch(
	'/:email',
	validateRequest(updateBorrowerSchema),
	async (req, res) => {
		try {
			const borrower = await BorrowerService.updateBorrower(
				req.params.email,
				req.body
			);
			res.status(200).json({ data: borrower });
		} catch (error: any) {
			if (error.message === 'Borrower not found') {
				res.status(404).json({ message: error.message });
			} else {
				res.status(500).json({ message: 'Failed to update borrower', error });
			}
		}
	}
);

/**
 * @openapi
 * /api/borrowers/{email}:
 *   delete:
 *     tags:
 *       - Borrowers
 *     description: Delete a borrower by email
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The email of the borrower to delete
 *     responses:
 *       200:
 *         description: Borrower deleted.
 *       404:
 *         description: Borrower not found.
 */
router.delete('/:email', async (req, res) => {
	try {
		await BorrowerService.deleteBorrower(req.params.email);
		res.status(200).json({ message: 'Borrower deleted successfully' });
	} catch (error: any) {
		if (error.message === 'Borrower not found') {
			res.status(404).json({ message: error.message });
		} else {
			res.status(500).json({ message: 'Failed to delete borrower', error });
		}
	}
});

export default router;
