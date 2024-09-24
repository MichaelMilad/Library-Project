import { DataTypes } from 'sequelize';
import sequelize from '../../config/database';

const Book = sequelize.define(
	'Book',
	{
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		author: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		isbn: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		available_quantity: {
			type: DataTypes.INTEGER,
			defaultValue: 1,
		},
		shelf_location: {
			type: DataTypes.STRING,
		},
	},
	{
		tableName: 'books',
		timestamps: true,
	}
);

export default Book;
