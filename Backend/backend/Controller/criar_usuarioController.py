from backend.Services.criar_usuario import cadastrar_usuario as cadastrar_usuario_service

class CriarUsuarioController:

    def cadastrar_usuario(self, usuario, senha, email=None):
        try:
            if not usuario or not senha:
                return {
                    "status": "erro",
                    "mensagem": "Usuário e senha são obrigatórios"
                }

            if len(usuario) < 3:
                return {
                    "status": "erro",
                    "mensagem": "Usuário deve ter pelo menos 3 caracteres"
                }

            if len(senha) < 4:
                return {
                    "status": "erro",
                    "mensagem": "Senha deve ter pelo menos 4 caracteres"
                }
            resultado = cadastrar_usuario_service(usuario, senha, email)
            return resultado

        except Exception as e:
            print(f"Erro no controller de cadastro: {e}")
            return {
                "status": "erro",
                "mensagem": f"Erro no servidor: {str(e)}"
            }