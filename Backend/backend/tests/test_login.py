from pytest import fixture

def test_login(monkeypatch):
    def test_query(sql, params):
        return [(1, "joao")]

    monkeypatch.setattr("backend.Services.login.query", test_query)

    from backend.Services.login import valida_login
    resultado = valida_login("joao", "123")

    assert resultado["status"] == "sucesso"