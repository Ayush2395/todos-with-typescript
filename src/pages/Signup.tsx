import useAuthentication from "../hooks/useAuthentication";

const Signup = () => {
  const { email, password, setEmail, setPassword, error, handleAuth } =
    useAuthentication("/api/auth/signup");
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
              <div className="card-title text-center fs-2">Signup</div>
              <hr />
              <form onSubmit={handleAuth}>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Signup
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
