CREATE TABLE books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    author VARCHAR(255),
    isbn VARCHAR(50) UNIQUE,
    available_quantity INT,
    shelf_location VARCHAR(255)
);