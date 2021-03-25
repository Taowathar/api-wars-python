import connection
from psycopg2.extras import RealDictCursor


@connection.connection_handler
def add_new_user(cursor: RealDictCursor, user) -> list:
    query = """
        INSERT INTO users (username, password)
        VALUES (%(username)s, %(password)s)"""
    cursor.execute(query, user)


@connection.connection_handler
def get_usernames(cursor: RealDictCursor) -> list:
    query = "SELECT username FROM users"
    cursor.execute(query)
    return cursor.fetchall()
