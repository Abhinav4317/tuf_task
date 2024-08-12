async function getUserByName(connection, name) {
  const query = "SELECT * FROM users_new WHERE name = ?";
  try {
    const [rows] = await connection.query(query, [name]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (err) {
    console.error("Error fetching user: ", err);
    throw err;
  }
}
module.exports = { getUserByName };
