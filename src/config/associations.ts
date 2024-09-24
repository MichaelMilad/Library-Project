import Book from '../components/books/book.model';
import Borrow from '../components/borrows/borrow.model';
import Borrower from '../components/borrowers/borrower.model';

export const defineAssociations = () => {
	Book.hasMany(Borrow, {
		foreignKey: 'book_id',
	});

	Borrower.hasMany(Borrow, {
		foreignKey: 'borrower_id',
	});

	Borrow.belongsTo(Book, {
		foreignKey: 'book_id',
	});
	Borrow.belongsTo(Borrower, {
		foreignKey: 'borrower_id',
	});
};
