SELECT 'Checking if the database exists...';

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'HomeBuilding') THEN
    CREATE DATABASE HomeBuilding;
  END IF;
END $$;

SELECT 'Database check complete.';

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_user WHERE usename = 'postgres_user') THEN
    CREATE USER postgres_user  WITH PASSWORD 'mypassword';
    ALTER ROLE postgres_user SET client_encoding TO 'utf8';
    ALTER ROLE postgres_user SET default_transaction_isolation TO 'read committed';
    ALTER ROLE postgres_user SET timezone TO 'UTC';
    GRANT ALL PRIVILEGES ON DATABASE mydatabase TO postgres_user;
  END IF;
END $$;

SELECT 'User check complete.';
