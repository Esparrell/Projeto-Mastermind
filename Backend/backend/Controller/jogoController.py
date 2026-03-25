from backend.Services.Jogo import (
    iniciar_jogo as iniciar_jogo_service,
    validar_resultado as validar_resultado_service,
    salva_lista_partidas as salva_lista_partidas_service,
    salva_resultado as salva_resultado_service
)

class JogoController:

    def iniciar_jogo(self):
        resultado = iniciar_jogo_service()

        return {
            "mensagem": "Jogo iniciado",
            "dados_jogo": resultado
        }

    def validar_resultado(self, tentativas, estados_jogo):
        validar_jogo = validar_resultado_service(tentativas, estados_jogo)
        acertos = validar_jogo.acertos
        pontos = validar_jogo.pontos
        return {

            "acertos": acertos,
            "pontos": pontos
        }

    def salva_lista_partidas(self, estados_botoes, tentativas, pontos, id_usuario):
        salva_lista_partidas_service(estados_botoes, tentativas, pontos, id_usuario)
        return

    def salva_resultado(self, pontos, tentativas, estados_botoes, id_usuario):
        salva_resultado_service(pontos, tentativas, estados_botoes, id_usuario)
        return