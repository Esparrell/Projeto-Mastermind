import random
from database_config import query
from datetime import datetime


estados = ['vermelho','verde','azul','amarelo']

def iniciar_jogo():
    global lista_resultado, lista_tentativas
    lista_resultado = [random.choice(estados) for _ in range(4)]
    lista_tentativas = []


def validar_resultado(tentativas, estados_botoes):
    acertos = 0

    lista_tentativas.append(estados_botoes.copy())
    for i in range(len(lista_resultado)):
        print(lista_resultado[i])
        if estados_botoes[i] == lista_resultado[i]:
            acertos += 1

    if acertos == 4:
        pontos = 11 - tentativas
    else:
        pontos = 0

    return {
        "acertos": acertos,
        "pontos": pontos,
    }


def definir_tempo_inicio():
    global tempo_inicio
    tempo_inicio = datetime.now()

def calcular_tempo_total():
    global tempo_inicio
    if tempo_inicio:
        tempo_fim = datetime.now()
        tempo_total = (tempo_fim - tempo_inicio).total_seconds()
        minutos = int(tempo_total // 60)
        segundos = int(tempo_total % 60)
        return int(tempo_total)
    return 0

import json

def salva_lista_partidas(estados_botoes, tentativas, pontos, id_usuario, tempo_total):
    global lista_tentativas

    try:
        if estados_botoes == lista_resultado or tentativas >= 9:

            sql = """
            INSERT INTO partidas
            (id_usuario, pontuacao, tentativas, estado_completo, resposta_correta, tempo, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, NOW())
            """

            valores = (
                id_usuario,
                pontos,
                tentativas,
                json.dumps(lista_tentativas),
                json.dumps(lista_resultado),
                tempo_total
            )

            query(sql, valores)
            lista_tentativas = []
            json.dumps(lista_resultado)
            print(lista_tentativas)
    except Exception as e:
        print('erro', e)


def salva_resultado(pontos, tentativas, estados_botoes, id_usuario, tempo_total):
    try:
        salva_lista_partidas(estados_botoes, tentativas, pontos, id_usuario, tempo_total)
        if pontos > 0:
            sql_placar = """
            INSERT INTO placar 
            (id_usuario, pontuacao, tentativas, tempo, created_at)
            VALUES (%s, %s, %s, %s, NOW())
            """

            valores_placar = (id_usuario, pontos, tentativas, tempo_total)
            query(sql_placar, valores_placar)

    except Exception as e:
        print('erro', e)


