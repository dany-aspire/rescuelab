export function createRepository(pool) {
  return {
    async checkConnection() {
      await pool.query("SELECT 1");
    },

    async listIncidents() {
      const result = await pool.query(
        "SELECT id, title, status, created_at FROM incidents ORDER BY created_at DESC"
      );
      return result.rows;
    },

    async createIncident(title) {
      const result = await pool.query(
        "INSERT INTO incidents (title) VALUES ($1) RETURNING id, title, status, created_at",
        [title]
      );
      return result.rows[0];
    }
  };
}
