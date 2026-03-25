from database_config import query
from datetime import timedelta


def recalcular_pontuacao():
    try:
        sql = "SELECT id_usuario, pontuacao FROM placar"
        resultados = query(sql)

        pontuacoes = {}

        for row in resultados:
            id_usuario = row[0]
            pontos = row[1]

            if id_usuario not in pontuacoes:
                pontuacoes[id_usuario] = 0

            pontuacoes[id_usuario] += pontos

        for id_usuario, total in pontuacoes.items():
            sql_update = """
                         UPDATE usuarios
                         SET pontuacao_total = %s
                         WHERE id = %s \
                         """

            query(sql_update, (total, id_usuario))

    except Exception as e:
        print("Erro ao recalcular ranking:", e)


def top_usuario():
    try:
        sql = """
              SELECT u.usuario, u.pontuacao_total
              FROM usuarios u
              ORDER BY u.pontuacao_total DESC LIMIT 10 \
              """

        top_10 = query(sql)

        if top_10:
            return [
                {"nome": row[0], "pontuacao_total": row[1] if row[1] else 0}
                for row in top_10
            ]
        else:
            return []
    except Exception as e:
        print(f"Erro ao buscar top usuários: {e}")
        return []


def converter_tempo_para_segundos(tempo):
    if tempo is None:
        return 0
    if isinstance(tempo, timedelta):
        return int(tempo.total_seconds())
    if isinstance(tempo, (int, float)):
        return int(tempo)
    return 0


def historico_usuario(id_usuario):
    try:
        sql = """
              SELECT pontuacao, tentativas, estado_completo, resposta_correta, tempo, created_at
              FROM partidas
              WHERE id_usuario = %s
              ORDER BY created_at DESC \
              """

        lista_partidas = query(sql, (id_usuario,))

        if not lista_partidas:
            return []

        resultado = []
        for row in lista_partidas:
            tempo_em_segundos = converter_tempo_para_segundos(row[4])

            resultado.append({
                "pontuacao": row[0] if row[0] else 0,
                "tentativas": row[1] if row[1] else 0,
                "estado_completo": row[2] if row[2] else "[]",
                "resposta_correta": row[3] if row[3] else "[]",
                "tempo": tempo_em_segundos,
                "data": str(row[5]) if row[5] else ""
            })

        return resultado
    except Exception as e:
        print(f"Erro ao buscar histórico do usuário {id_usuario}: {e}")
        return []