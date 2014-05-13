#!/usr/bin/env python3.4

# python 3.4.0
# mysql-connector 1.1.6
# mariadb 5.5.37

__version__ = "0.1.1"


import logging
import mysql.connector


logger = logging.getLogger(__name__)




class Connection:
    """ Usage:
    >>> import database
    >>> db = database.Connection("user", "password", "database")
    """
    def __init__(self, user, password, database, host="127.0.0.1",
                 connect_timeout=10, time_zone="+0:00"):
        self.host = host

        config = {
            "user": user,
            "password": password,
            "database": database,
            "connect_timeout": connect_timeout,
            "time_zone": time_zone,
            "autocommit": True,
            "sql_mode": "TRADITIONAL",
            "use_unicode": True,
            "charset": "utf8",
        }

        if "/" in host:
            config["unix_socket"] = host
        else:
            pair = host.split(":")
            if len(pair) == 2:
                config["host"] = pair[0]
                config["port"] = int(pair[1])
            else:
                config["host"] = host

        self._db = None
        self._db_config = config

        try:
            self.reconnect()
        except Exception:
            logger.error(
                "Cannot connect to MySQL on %s" % self.host,
                exc_info=True)


    def __del__(self):
        self.close()


    def close(self):
        """Closes database connection"""
        if getattr(self, "_db", None) is not None:
            self._db.close()
            self._db = None


    def reconnect(self):
        """Closes the existing database connection and re-opens it"""
        self.close()
        self._db = mysql.connector.connect(**self._db_config)


    def _ensure_connected(self):
        if self._db is None or not self._db.is_connected():
            self.reconnect()


    def _cursor(self):
        self._ensure_connected()
        return self._db.cursor()


    def _execute(self, cursor, query, parameters, kwparameters):
        try:
            return cursor.execute(query, kwparameters or parameters)
        except mysql.connector.OperationalError:
            logger.error("Error connecting to MySQL on %s" % self.host)
            self.close()
            raise


    def iter(self, query, *parameters, **kwparameters):
        """Returns an iterator for the given query and parameters."""
        cursor = self._cursor()
        try:
            self._execute(cursor, query, parameters, kwparameters)
            for row in cursor:
                yield Row(zip(cursor.column_names, row))
        finally:
            cursor.close()


    def query(self, query, *parameters, **kwparameters):
        """Returns a row list for the given query and parameters."""
        cursor = self._cursor()
        try:
            self._execute(cursor, query, parameters, kwparameters)
            return [Row(zip(cursor.column_names, row)) for row in cursor]
        finally:
            cursor.close()


    def get(self, query, *parameters, **kwparameters):
        """Returns the first row returned for the given query."""
        rows = self.query(query, *parameters, **kwparameters)
        if not rows:
            return None
        elif len(rows) > 1:
            raise Exception("Multiple rows returned for database.get() query")
        else:
            return rows[0]


    def execute(self, query, *parameters, **kwparameters):
        """Executes the given query, returning the rowcount from the query."""
        cursor = self._cursor()
        try:
            self._execute(cursor, query, parameters, kwparameters)
            return cursor.rowcount
        finally:
            cursor.close()


    def executemany(self, query, parameters):
        """Executes the given query against all the given param sequences.
        return the rowcount from the query.
        """
        cursor = self._cursor()
        try:
            cursor.executemany(query, parameters)
            return cursor.rowcount
        finally:
            cursor.close()




class Row(dict):
    def __getattr__(self, name):
        try:
            return self[name]
        except KeyError:
            raise AttributeError(name)
