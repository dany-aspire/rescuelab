CREATE TABLE IF NOT EXISTS incidents (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO incidents (title)
SELECT 'Verify the known-good RescueLab baseline'
WHERE NOT EXISTS (SELECT 1 FROM incidents);
