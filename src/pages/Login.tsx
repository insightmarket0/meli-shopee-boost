import { FormEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import "./Login.css";

type ToastType = "success" | "error" | "info";

const DOTS = 28;

const Login = () => {
  const particlesRef = useRef<HTMLDivElement>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastState, setToastState] = useState<{
    message: string;
    type: ToastType;
    visible: boolean;
  }>({
    message: "",
    type: "success",
    visible: false,
  });

  const passwordInputType = useMemo(
    () => (passwordVisible ? "text" : "password"),
    [passwordVisible],
  );

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    container.innerHTML = "";

    for (let i = 0; i < DOTS; i += 1) {
      const dot = document.createElement("div");
      dot.className = "dot";
      dot.style.left = `${Math.random() * 100}vw`;
      dot.style.bottom = `${-10 + Math.random() * 30}vh`;
      dot.style.animationDelay = `${Math.random() * 8}s`;
      dot.style.opacity = (0.35 + Math.random() * 0.45).toString();
      container.appendChild(dot);
    }

    return () => {
      container.innerHTML = "";
    };
  }, []);

  useEffect(
    () => () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    },
    [],
  );

  const showToast = (message: string, type: ToastType = "success") => {
    setToastState({ message, type, visible: true });

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = setTimeout(() => {
      setToastState((prev) => ({ ...prev, visible: false }));
    }, 2800);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement | null;
    const passwordInput = form.elements.namedItem("password") as HTMLInputElement | null;

    if (!emailInput || !passwordInput) {
      return;
    }

    if (!emailInput.value || !emailInput.validity.valid) {
      emailInput.focus();
      showToast("Informe um e-mail válido.", "error");
      return;
    }

    if (!passwordInput.value || passwordInput.value.length < 6) {
      passwordInput.focus();
      showToast("A senha deve ter pelo menos 6 caracteres.", "error");
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const success =
      emailInput.value === "demo@exemplo.com" && passwordInput.value === "123456";

    if (success) {
      showToast("Login efetuado! Redirecionando…", "success");
      // window.location.href = "/dashboard";
    } else {
      showToast("Credenciais inválidas. Tente novamente.", "error");
    }

    setIsSubmitting(false);
  };

  const handlePasswordToggle = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleRecoveryClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    showToast("Link de recuperação em desenvolvimento.", "info");
  };

  const handleSocialLogin = (provider: string) => {
    showToast(`Simulação de login com ${provider}...`, "success");
  };

  return (
    <div className="login-page">
      <div className="particles" ref={particlesRef} aria-hidden="true" />

      <div className="wrap">
        <section className="card" role="dialog" aria-labelledby="title" aria-describedby="subtitle">
          <img
            className="logo"
            src="/insight-logo.png"
            alt="Insight Market"
            width={130}
            height={48}
          />
          <h1 id="title">Bem-vindo(a)</h1>
          <p className="sub" id="subtitle">
            Acesse sua conta para continuar
          </p>

          <form id="form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <svg
                className="icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="m4 7 7.4 5.3a2 2 0 0 0 2.3 0L21 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <input
                id="email"
                name="email"
                className="input"
                type="email"
                placeholder=" "
                autoComplete="email"
                required
                aria-required="true"
                aria-describedby="email-help"
              />
              <label className="label" htmlFor="email">
                E-mail
              </label>
              <span id="email-help" className="sr-only">
                Digite um e-mail válido
              </span>
            </div>

            <div className="field">
              <svg
                className="icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="10"
                  width="18"
                  height="11"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M8 10V7a4 4 0 0 1 8 0v3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <input
                id="password"
                name="password"
                className="input"
                type={passwordInputType}
                placeholder=" "
                autoComplete="current-password"
                minLength={6}
                required
                aria-required="true"
              />
              <label className="label" htmlFor="password">
                Senha
              </label>
              <button
                type="button"
                className="toggle"
                aria-label="Mostrar ou ocultar senha"
                title="Mostrar ou ocultar senha"
                onClick={handlePasswordToggle}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            <div className="row">
              <label className="check">
                <input type="checkbox" id="remember" /> Lembrar de mim
              </label>
              <a className="link" href="#recuperar" onClick={handleRecoveryClick}>
                Esqueci a senha
              </a>
            </div>

            <button className="btn" id="submitBtn" type="submit" disabled={isSubmitting}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 12h14"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="m13 6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>

            <div className="or" aria-hidden="true">
              ou
            </div>

            <div className="socials" aria-label="Entrar com redes sociais">
              <button
                type="button"
                className="sbtn"
                aria-label="Entrar com Google"
                onClick={() => handleSocialLogin("Google")}
              >
                Google
              </button>
              <button
                type="button"
                className="sbtn"
                aria-label="Entrar com Apple"
                onClick={() => handleSocialLogin("Apple")}
              >
                Apple
              </button>
              <button
                type="button"
                className="sbtn"
                aria-label="Entrar com GitHub"
                onClick={() => handleSocialLogin("GitHub")}
              >
                GitHub
              </button>
            </div>

            <p className="footer">
              Novo por aqui?{" "}
              <a
                className="link"
                href="#cadastro"
                onClick={(event) => {
                  event.preventDefault();
                  showToast("Fluxo de cadastro em desenvolvimento.", "info");
                }}
              >
                Crie sua conta
              </a>
            </p>
          </form>
        </section>
      </div>

      <div
        className={`toast ${toastState.type} ${toastState.visible ? "show" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toastState.message}
      </div>
    </div>
  );
};

export default Login;
