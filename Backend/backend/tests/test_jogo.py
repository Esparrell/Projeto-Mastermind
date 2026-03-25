def test_iniciar_jogo(monkeypatch):
    from backend.Services import Jogo

    monkeypatch.setattr("backend.Services.Jogo.random.choice", lambda x: "vermelho")

    Jogo.iniciar_jogo()

    assert Jogo.lista_resultado == ["vermelho"] * 4
    assert Jogo.lista_tentativas == []

def test_validar_resultado_acerto_total():
    from backend.Services import Jogo

    Jogo.lista_resultado = ["vermelho", "verde", "azul", "amarelo"]
    Jogo.lista_tentativas = []

    resultado = Jogo.validar_resultado(
        tentativas=1,
        estados_botoes=["vermelho", "verde", "azul", "amarelo"]
    )

    assert resultado["acertos"] == 4
    assert resultado["pontos"] == 10  # 11 - 1

def test_validar_resultado_erro():
    from backend.Services import Jogo

    Jogo.lista_resultado = ["vermelho", "verde", "azul", "amarelo"]
    Jogo.lista_tentativas = []

    resultado = Jogo.validar_resultado(
        tentativas=1,
        estados_botoes=["azul", "azul", "azul", "azul"]
    )

    assert resultado["acertos"] < 4
    assert resultado["pontos"] == 0

def test_salva_lista_partidas(monkeypatch):
    chamadas = []

    def fake_query(sql, params):
        chamadas.append((sql, params))

    monkeypatch.setattr("backend.Services.jogo.query", fake_query)

    from backend.Services import Jogo

    Jogo.lista_resultado = ["vermelho"] * 4
    Jogo.lista_tentativas = [["vermelho"] * 4]

    Jogo.salva_lista_partidas(
        estados_botoes=["vermelho"] * 4,
        tentativas=1,
        pontos=10,
        id_usuario=1
    )

    assert len(chamadas) == 1

def test_salva_resultado(monkeypatch):
    chamadas = []

    def fake_query(sql, params):
        chamadas.append((sql, params))

    monkeypatch.setattr("backend.Services.jogo.query", fake_query)

    monkeypatch.setattr(
        "backend.Services.jogo.salva_lista_partidas",
        lambda *args, **kwargs: None
    )

    from backend.Services.Jogo import salva_resultado

    salva_resultado(
        pontos=10,
        tentativas=2,
        estados_botoes=["vermelho"] * 4,
        id_usuario=1
    )

    assert len(chamadas) == 1