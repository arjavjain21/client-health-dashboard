"""
Database connection management for Client Health Dashboard v1
"""
import logging
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from typing import List, Optional

logger = logging.getLogger(__name__)


class ReadOnlyConnection:
    """Wrapper that enforces read-only access to Supabase databases"""

    def __init__(self, conn_url: str, db_name: str):
        self.conn_url = conn_url
        self.db_name = db_name
        self._conn: Optional[psycopg2.extensions.connection] = None

    def connect(self):
        """Establish connection with read-only safeguards"""
        try:
            self._conn = psycopg2.connect(self.conn_url)
            self._conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)

            # Set session to read-only mode
            with self._conn.cursor() as cur:
                cur.execute("SET SESSION CHARACTERISTICS AS TRANSACTION READ ONLY;")
                cur.execute("SET default_transaction_read_only = ON;")

            logger.info(f"Connected to {self.db_name} in READ-ONLY mode")
            return self._conn
        except Exception as e:
            logger.error(f"Failed to connect to {self.db_name}: {e}")
            raise

    def execute_read(self, query: str, params=None) -> List[tuple]:
        """Execute a SELECT query only"""
        # Guard against write operations
        query_upper = query.upper().strip()
        if not query_upper.startswith('SELECT'):
            raise ValueError(
                f"READ-ONLY VIOLATION: Only SELECT queries allowed on {self.db_name}. "
                f"Attempted query: {query[:100]}"
            )

        try:
            with self._conn.cursor() as cur:
                cur.execute(query, params or ())
                return cur.fetchall()
        except Exception as e:
            logger.error(f"Query failed on {self.db_name}: {e}")
            raise

    def close(self):
        if self._conn:
            self._conn.close()
            logger.info(f"Closed connection to {self.db_name}")


class LocalDatabase:
    """Manages local database operations"""

    def __init__(self, conn_url: str):
        self.conn_url = conn_url
        self._conn: Optional[psycopg2.extensions.connection] = None

    def connect(self):
        try:
            self._conn = psycopg2.connect(self.conn_url)
            logger.info("Connected to local database")
            return self._conn
        except Exception as e:
            logger.error(f"Failed to connect to local database: {e}")
            raise

    def execute_write(self, query: str, params=None) -> int:
        """Execute a write query (INSERT, UPDATE, DELETE)"""
        try:
            with self._conn.cursor() as cur:
                if params is not None:
                    cur.execute(query, params)
                else:
                    cur.execute(query)
                self._conn.commit()
                return cur.rowcount
        except Exception as e:
            self._conn.rollback()
            logger.error(f"Write query failed: {e}")
            raise

    def execute_write_many(self, query: str, params_list: List[tuple]) -> int:
        """Execute multiple write queries in one transaction"""
        try:
            with self._conn.cursor() as cur:
                cur.executemany(query, params_list)
                self._conn.commit()
                return cur.rowcount
        except Exception as e:
            self._conn.rollback()
            logger.error(f"Bulk write query failed: {e}")
            raise

    def execute_read(self, query: str, params=None) -> List[tuple]:
        """Execute a SELECT query"""
        try:
            with self._conn.cursor() as cur:
                cur.execute(query, params or ())
                return cur.fetchall()
        except Exception as e:
            logger.error(f"Read query failed: {e}")
            raise

    def close(self):
        if self._conn:
            self._conn.close()
            logger.info("Closed local database connection")
