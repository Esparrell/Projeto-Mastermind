from database_config import query

def cadastrar_usuario(usuario, senha, email=None):
    try:
        sql_check = "SELECT id FROM usuarios WHERE usuario = %s"
        resultado = query(sql_check, (usuario,))

        if resultado:
            return {
                "status": "erro",
                "mensagem": "Usuário já existe. Escolha outro nome de usuário."
            }

        sql_insert = """
                     INSERT INTO usuarios (usuario, senha, email, pontuacao_total, created_at)
                     VALUES (%s, %s, %s, %s, NOW()) \
                     """

        valores = (usuario, senha, email, 0)
        query(sql_insert, valores)

        sql_get_id = "SELECT id FROM usuarios WHERE usuario = %s"
        resultado_id = query(sql_get_id, (usuario,))

        if resultado_id:
            id_usuario = resultado_id[0][0]
            return {
                "status": "sucesso",
                "mensagem": "Usuário cadastrado com sucesso!",
                "id_usuario": id_usuario,
                "usuario": usuario
            }
        else:
            return {
                "status": "erro",
                "mensagem": "Erro ao criar usuário. Tente novamente."
            }

    except Exception as e:
        print(f"Erro ao cadastrar usuário: {e}")
        return {
            "status": "erro",
            "mensagem": f"Erro no servidor: {str(e)}"
        }


def verificar_usuario_existe(usuario):
    try:
        sql = "SELECT id FROM usuarios WHERE usuario = %s"
        resultado = query(sql, (usuario,))
        return len(resultado) > 0
    except Exception as e:
        print(f"Erro ao verificar usuário: {e}")
        return False