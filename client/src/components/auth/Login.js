import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import Alert from '../layout/Alert';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Navbar className="menu" id="menu-dark" />
      <section className="container">
        <Alert />
        <h1 className="text-primary">Sign in</h1>
        <p className="lead">
          {' '}
          <i className="fas fa-user" /> Sign into your account{' '}
        </p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email address"
              name="email"
              required
              value={email}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={e => onChange(e)}
            />
          </div>

          <input type="submit" className="btn btn-primary" value="Login" />
        </form>

        <p className="lead">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </section>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
