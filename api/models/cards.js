const createCardsTable = `CREATE TABLE IF NOT EXISTS cards_new (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(768) NOT NULL,
    answer VARCHAR(768) NOT NULL,
    author INT,
    FOREIGN KEY (author) REFERENCES users_new(id)
)`;

module.exports = createCardsTable;
