import Book from '../models/book';
import { ICreateBook } from '../interfaces/book';
import { Optional } from 'sequelize';

export class BookService {
  static async getAllBooks() {
    const books = await Book.findAll();
    return books;
  }

  static async addBook(book: ICreateBook) {
    return await Book.create(book as unknown as Optional<any, string>);
  }
}

export default BookService;
