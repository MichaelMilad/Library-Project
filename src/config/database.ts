import { Sequelize } from 'sequelize';

import { createTables } from './mysql';

const sequelize = new Sequelize(
	(process.env.MYSQL_DATABASE as string) || 'library',
	(process.env.MYSQL_USER as string) || 'user',
	process.env.MYSQL_PASSWORD || 'password',
	{
		host: 'db',
		port: 3306,
		dialect: 'mysql',
		logging: false,
	}
);

createTables(sequelize);

export default sequelize;
