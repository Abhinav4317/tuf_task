const createUsersTable = `CREATE TABLE IF NOT EXISTS users_new (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
)`;
module.exports = createUsersTable;
