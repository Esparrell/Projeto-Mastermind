from backend.Services.login import valida_login as valida_login_service

class LoginController:
    def valida_login(self, usuario_informado, senha_informado):
        login = valida_login_service(usuario_informado, senha_informado)

        return login