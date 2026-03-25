import pymysql

def query(sql, valores=None):
    conexao = pymysql.connect(
        host="localhost",
        user="root",
        password="",
        database="masterminds",
        port=3306
    )

    cursor = conexao.cursor()

    if valores:
        cursor.execute(sql, valores)
    else:
        cursor.execute(sql)

    if sql.strip().upper().startswith("SELECT"):
        resultado = cursor.fetchall()
    else:
        conexao.commit()
        resultado = None

    cursor.close()
    conexao.close()

    return resultado