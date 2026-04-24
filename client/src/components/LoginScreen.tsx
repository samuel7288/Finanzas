import { FormEvent, useState } from "react";
import { BrandLogo } from "../icons";

export function LoginScreen({
  onLogin,
  googleConfigured,
  error
}: {
  onLogin: () => void;
  googleConfigured: boolean;
  error?: string;
}) {
  const [email, setEmail] = useState("");

  function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onLogin();
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-label="Inicio de sesion">
        <div className="login-brand">
          <BrandLogo />
          <span>Finova</span>
        </div>

        <div className="login-heading">
          <h1>Bienvenido de vuelta</h1>
          <p>Accede con tu cuenta de Google para conectar Gmail y entrar a tu app.</p>
        </div>

        <form className="login-form" onSubmit={submitLogin}>
          <label>
            Correo electronico
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tu@gmail.com"
              autoComplete="email"
            />
          </label>
        </form>

        {error ? <div className="login-error">{error}</div> : null}

        <div className="login-divider">
          <span></span>
          <p>{googleConfigured ? "continua con Google" : "configura Google Cloud"}</p>
          <span></span>
        </div>

        <div className="social-actions">
          <button type="button" onClick={onLogin} disabled={!googleConfigured}>
            <span className="google-mark" aria-hidden="true">
              G
            </span>
            {googleConfigured ? "Continuar con Google" : "Faltan credenciales Google"}
          </button>
        </div>

        <p className="signup-copy">
          La misma cuenta te sirve para iniciar sesion y leer tus compras desde Gmail.
        </p>
      </section>
    </main>
  );
}
