from django.db import connection


def dictfetchall(cursor) -> tuple:
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return tuple(
        dict(zip(columns, row))
        for row in cursor.fetchall()
    )


def db(sql: str, args: tuple = tuple()) -> tuple:
    with connection.cursor() as cursor:
        cursor.execute(sql, args)
        return dictfetchall(cursor)
