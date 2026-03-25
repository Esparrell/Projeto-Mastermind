from http.server import BaseHTTPRequestHandler
import json
from datetime import timedelta, datetime
from backend.Controller.jogoController import JogoController
from backend.Controller.criar_usuarioController import CriarUsuarioController
from backend.Services.Jogo import validar_resultado, salva_resultado, iniciar_jogo
from backend.Services.Placar import top_usuario, historico_usuario, recalcular_pontuacao
from backend.Services.login import valida_login
from http.server import ThreadingHTTPServer


class MeuHandler(BaseHTTPRequestHandler):

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "http://localhost:4200")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def responder(self, mensagem):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(mensagem.encode())

    def json_serializer(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        if isinstance(obj, timedelta):
            return int(obj.total_seconds())
        if isinstance(obj, bytes):
            return obj.decode('utf-8')
        if hasattr(obj, '__dict__'):
            return obj.__dict__
        raise TypeError(f'Object of type {obj.__class__.__name__} is not JSON serializable')

    def responder_json(self, data):
        try:
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            json_str = json.dumps(data, default=self.json_serializer, ensure_ascii=False)
            self.wfile.write(json_str.encode('utf-8'))
        except Exception as e:
            print(f"Erro ao serializar JSON: {e}")
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"erro": str(e)}).encode())

    def do_GET(self):
        print(f"GET request para: {self.path}")

        if self.path == "/health":
            self.responder("Olá, mundo!")

        elif self.path.startswith("/usuario/"):
            nome = self.path.split("/")[-1]
            validacao_login = valida_login()
            self.responder_json(validacao_login)

        elif self.path.startswith("/dashboard/"):
            id_usuario = self.path.split("/")[-1]
            print(f"Buscando dashboard para usuário: {id_usuario}")
            top_dez = top_usuario()
            self.responder_json(top_dez)

        elif self.path.startswith("/historico/"):
            id_usuario = self.path.split("/")[-1]
            print(f"Buscando histórico para usuário: {id_usuario}")
            try:
                historico = historico_usuario(id_usuario)
                print(f"Histórico encontrado: {len(historico)} registros")
                self.responder_json(historico)
            except Exception as e:
                print(f"Erro ao buscar histórico: {e}")
                self.responder_json({"erro": str(e), "dados": []})

        else:
            self.erro_404()

    def do_POST(self):
        print(f"POST request para: {self.path}")

        if self.path == "/login":
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                body = self.rfile.read(content_length)
                data = json.loads(body)

                usuario_informado = data.get("usuario")
                senha_informado = data.get("senha")

                print(f"Tentativa de login: {usuario_informado}")

                resultado_login = valida_login(usuario_informado, senha_informado)
                print(f"Resultado login: {resultado_login}")

                self.responder_json(resultado_login)

            except Exception as e:
                print(f"Erro no login: {e}")
                import traceback
                traceback.print_exc()
                self.responder_json({"status": "erro", "mensagem": str(e)})

        elif self.path == "/cadastro":
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                body = self.rfile.read(content_length)
                data = json.loads(body)

                usuario = data.get("usuario")
                senha = data.get("senha")
                email = data.get("email")

                print(f"Tentativa de cadastro: {usuario}")

                controller = CriarUsuarioController()
                resultado = controller.cadastrar_usuario(usuario, senha, email)
                print(f"Resultado cadastro: {resultado}")

                self.responder_json(resultado)

            except Exception as e:
                print(f"Erro no cadastro: {e}")
                import traceback
                traceback.print_exc()
                self.responder_json({"status": "erro", "mensagem": str(e)})

        elif self.path == "/iniciar_jogo":
            try:
                controller = JogoController()
                resposta = controller.iniciar_jogo()
                self.responder_json(resposta)
            except Exception as e:
                print(f"Erro ao iniciar jogo: {e}")
                self.responder_json({"erro": str(e)})

        elif self.path.endswith("/jogo"):
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                body = self.rfile.read(content_length)
                data = json.loads(body)

                id_usuario = data.get("id_usuario")
                estados_botoes = data.get("estados_botoes")
                tentativas = data.get("tentativas")
                tempo_total = data.get('tempo_total', 0)

                acertos = validar_resultado(tentativas, estados_botoes)
                salva_resultado(acertos['pontos'], tentativas, estados_botoes, id_usuario, tempo_total)

                self.responder_json({
                    "acertos": acertos
                })
            except Exception as e:
                print(f"Erro ao processar jogo: {e}")
                self.responder_json({"erro": str(e)})
        else:
            self.erro_404()

    def erro_404(self):
        self.send_response(404)
        self.end_headers()
        self.wfile.write(b"404 - Not Found")


if __name__ == "__main__":
    servidor = ThreadingHTTPServer(("localhost", 8000), MeuHandler)
    print("Servidor rodando em http://localhost:8000")
    print("Rotas disponíveis:")
    print("  GET  /health")
    print("  GET  /dashboard/{id}")
    print("  GET  /historico/{id}")
    print("  POST /login")
    print("  POST /cadastro")
    print("  POST /iniciar_jogo")
    print("  POST /jogo")
    servidor.serve_forever()