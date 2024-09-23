import fs from 'fs';

const cwd = process.cwd() + '/src/config/mysql/';

const BooksTableSQLPath = cwd + 'books.table.sql';
const BorrowersTableSQLPath = cwd + 'borrowers.table.sql';
const BorrowsTableSQLPath = cwd + 'borrows.table.sql';

export async function createTables(sequelize: any) {
  // Create Books Table
  console.log('Creating Books Table..');
  await sequelize
    .query(fs.readFileSync(BooksTableSQLPath, 'utf8'))
    .then(() => console.log('Done Creating Books Table'))
    .catch((err: any) => {
      if (err.parent?.code === 'ER_TABLE_EXISTS_ERROR') {
        console.log('Books table already exists, skipping creation...');
      } else {
        console.error('Error creating Books table:', err);
      }
    });

  // Create Borrowers Table
  console.log('Creating Borrowers Table..');
  await sequelize
    .query(fs.readFileSync(BorrowersTableSQLPath, 'utf8'))
    .then(() => console.log('Done Creating Borrowers Table'))
    .catch((err: any) => {
      if (err.parent?.code === 'ER_TABLE_EXISTS_ERROR') {
        console.log('Borrowers table already exists, skipping creation...');
      } else {
        console.error('Error creating Borrowers table:', err);
      }
    });

  // Create Borrows Table
  console.log('Creating Borrows Table..');
  await sequelize
    .query(fs.readFileSync(BorrowsTableSQLPath, 'utf8'))
    .then(() => console.log('Done Creating Borrows Table'))
    .catch((err: any) => {
      if (err.parent?.code === 'ER_TABLE_EXISTS_ERROR') {
        console.log('Borrows table already exists, skipping creation...');
      } else {
        console.error('Error creating Borrows table:', err);
      }
    });

  return;
}
