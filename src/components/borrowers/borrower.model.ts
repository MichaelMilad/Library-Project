import { DataTypes } from 'sequelize';
import sequelize from '../../config/database';

// Define the Borrower model
const Borrower = sequelize.define(
	'Borrower',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		registered_date: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		tableName: 'borrowers',
		timestamps: true,
	}
);

export default Borrower;
