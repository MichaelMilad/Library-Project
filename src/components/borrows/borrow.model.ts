import { DataTypes } from 'sequelize';
import sequelize from '../../config/database';
import Book from '../books/book.model';
import Borrower from '../borrowers/borrower.model';

// Define the Borrows model
const Borrow = sequelize.define(
	'Borrow',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		book_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Book,
				key: 'id',
			},
		},
		borrower_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Borrower,
				key: 'id',
			},
		},
		borrowed_date: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		due_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		returned_date: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		tableName: 'borrows',
		timestamps: true,
	}
);

export default Borrow;
