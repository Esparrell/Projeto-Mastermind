from pytest import fixture

def test_recalcular_pontuacao(monkeypatch):
    chamadas = []

    def test_query(sql, params=None):
        if "SELECT" in sql:
            return [(1, 1000)]

        if "UPDATE" in sql:
            chamadas.append((sql, params))
            return None

    monkeypatch.setattr('backend.Services.Placar.query', test_query)
    from backend.Services.Placar import recalcular_pontuacao
    recalcular_pontuacao()
    assert chamadas == [
        (
            """
            UPDATE usuarios
            SET pontuacao_total = %s
            WHERE id = %s
            """,
            (1000, 1)
        )
    ]

def test_top_usuario(monkeypatch):
    def test_query(sql):
        return [('joao', 1000)]

    monkeypatch.setattr('backend.Services.Placar.query', test_query)
    from backend.Services.Placar import top_usuario
    ranking = top_usuario()
    assert ranking == [
        {"nome":"joao","pontuacao_total": 1000}
    ]

def test_historico_usuario(monkeypatch):
    def test_query(sql, params):
        return [
            (100, 3, "estado", "resposta", "2024-01-01")
        ]

    monkeypatch.setattr('backend.Services.Placar.query', test_query)

    from backend.Services.Placar import historico_usuario

    resultado = historico_usuario(1)

    assert resultado == [
        {
            "pontuacao": 100,
            "tentativas": 3,
            "estado_completo": "estado",
            "resposta_correta": "resposta",
            "data": "2024-01-01"
        }
    ]

