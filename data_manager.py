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


@connection.connection_handler
def get_password(cursor: RealDictCursor, username) -> list:
    query = """
        SELECT password FROM users
        WHERE username = %(name)s"""
    cursor.execute(query, {'name': username})
    return cursor.fetchone()


@connection.connection_handler
def get_user_id(cursor: RealDictCursor, username) -> list:
    query = "SELECT id FROM users WHERE username = %(name)s"
    cursor.execute(query, {'name': username})
    return cursor.fetchone()


@connection.connection_handler
def add_vote(cursor: RealDictCursor, vote) -> list:
    query = """
        INSERT INTO planet_votes (planet_id, planet_name, user_id, submission_time) 
        VALUES (%(planet_id)s, %(planet_name)s, %(user_id)s, %(submission_time)s)"""
    cursor.execute(query, vote)


@connection.connection_handler
def get_votes(cursor: RealDictCursor) -> list:
    query = """
        SELECT planet_name, COUNT(id) FROM planet_votes
        GROUP BY planet_name
        ORDER BY planet_name"""
    cursor.execute(query)
    return cursor.fetchall()
