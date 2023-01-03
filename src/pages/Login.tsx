import useAuthentication from "../hooks/useAuthentication";

const Login = () => {
  const { email, password, setEmail, setPassword, handleAuth, error } =
    useAuthentication("/api/auth/login");
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center section">
        <div className="w-100" style={{ maxWidth: "400px" }}>
          {error?.msg && (
            <div
              className={`alert ${
                error?.error ? "alert-danger" : "alert-success"
              }`}
            >
              {error?.msg}
            </div>
          )}
          <div className="card">
            <div className="card-body">
              <div className="card-title text-center fs-2">Login</div>
              <hr />
              <form onSubmit={handleAuth}>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id="password"
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
