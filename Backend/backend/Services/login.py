import json
from database_config import query


def valida_login(usuario=None, senha=None):
    try:
        if not usuario or not senha:
            return {"status": "erro", "mensagem": "Usuário e senha são obrigatórios"}

        sql = "SELECT id, usuario FROM usuarios WHERE usuario = %s AND senha = %s"
        resultado = query(sql, (usuario, senha))

        if resultado and len(resultado) > 0:
            return {
                "status": "sucesso",
                "id_usuario": resultado[0][0],
                "usuario": resultado[0][1]
            }
        else:
            return {"status": "erro", "mensagem": "Usuário ou senha inválidos"}

    except Exception as e:
        print(f"Erro no valida_login: {e}")
        return {"status": "erro", "mensagem": str(e)}