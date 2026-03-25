from backend.Services.Placar import (
recalcular_pontuacao as recalcular_pontuacao_service,
top_usuario as top_usuario_service,
historico_usuario as historico_usuario_service
)

class LoginController:
    def recalcular_pontuacao(self):
        recalcular = recalcular_pontuacao_service()
        return

    def top_usuario(self):
        top_dez = top_usuario_service()
        return top_dez

    def historico_usuario(self, id_usuario):
        historico = historico_usuario_service()
        return
