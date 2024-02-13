import { Link } from "react-router-dom";
import useLoginHook from "../hooks/auth/useLoginHook";

const CPLogin = () => {

    const {
        handleInputChange,
        handleLogin
    } = useLoginHook();

    return (
        <div className="login-page bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        <h3 className="mb-3">Login Now</h3>
                        <div className="bg-white shadow rounded">
                            <div className="row">
                                <div className="col-md-7 pe-0">
                                    <div className="form-left h-100 py-5 px-5">
                                        <form className="row g-4">

                                            <div className="col-12">
                                                <label>Email<span className="text-danger">*</span></label>
                                                <div className="input-group">
                                                    <div className="input-group-text"><i className="bi bi-person-fill" /></div>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="Enter Email"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <label>Password<span className="text-danger">*</span></label>
                                                <div className="input-group">
                                                    <div className="input-group-text"><i className="bi bi-lock-fill" /></div>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        className="form-control"
                                                        placeholder="Enter Password"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <button
                                                    onClick={handleLogin}
                                                    type="submit"
                                                    className="btn btn-primary px-4 float-end mt-4"
                                                >
                                                    login
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-md-5 ps-0 d-none d-md-block">
                                    <div className="form-right h-100 bg-primary text-white text-center pt-5">
                                        <i className="bi bi-bootstrap" />
                                        <h2 className="fs-1">Welcome Back!!!</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link to="/register" className="text-end text-secondary mt-3">Register</Link>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default CPLogin
