async function addCard(connection, question, answer, author) {
  const query =
    "INSERT INTO cards_new (question, answer, author) VALUES (?, ?, ?)";
  try {
    const [results] = await connection.query(query, [question, answer, author]);
    // console.log("Card added with ID: ", results.insertId);
    return results;
  } catch (err) {
    console.error("Error adding card: ", err);
    throw err;
  }
}
async function updateCard(connection, id, question, answer) {
  const query = "UPDATE cards_new SET question = ?, answer = ? WHERE id = ?";
  try {
    const [results] = await connection.query(query, [question, answer, id]);
    // console.log("Card updated with ID: ", id);
    return results;
  } catch (err) {
    console.error("Error updating card: ", err);
    throw err;
  }
}
async function deleteCard(connection, id) {
  const query = "DELETE FROM cards_new WHERE id = ?";
  try {
    const [results] = await connection.query(query, [id]);
    // console.log("Card deleted with ID: ", id);
    return results;
  } catch (err) {
    console.error("Error deleting card: ", err);
    throw err;
  }
}
async function getAllCards(connection) {
  if (!connection) {
    throw new Error("Database connection is not initialized.");
  }
  const query = "SELECT * FROM cards_new";
  try {
    const [rows] = await connection.query(query);
    return rows;
  } catch (err) {
    console.error("Error fetching all cards: ", err);
    throw err;
  }
}
async function getCardById(connection, id) {
  const query = "SELECT * FROM cards_new WHERE id = ?";
  try {
    const [rows] = await connection.query(query, [id]);
    if (rows.length === 0) {
      return null; // No card found
    }
    return rows[0];
  } catch (err) {
    console.error("Error fetching card by ID: ", err);
    throw err;
  }
}

module.exports = {
  addCard,
  updateCard,
  deleteCard,
  getAllCards,
  getCardById,
};
