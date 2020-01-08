import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import { auth } from "../../store/actions/auth";
import Spinner from "../../components/UI/Spinner/Spinner";
import { updateObject, checkValidity } from "../../shared/utility";

export class Auth extends Component {
  state = {
    controls: {
      username: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Username"
        },
        value: "",
        valueType: "username",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 15
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address"
        },
        value: "",
        valueType: "email",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        valueType: "password",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    formError: false,
    isSignup: false,
    animate: false
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      })
    });
    let formError = true;

    for (let key in updatedControls) {
      formError = updatedControls[key].valid && formError;
    }

    this.setState({ controls: updatedControls, formError: !formError });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.auth(
      this.state.controls.username.value,
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup, animate: !prevState.animate };
    });
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      if (key === "username" && !this.state.isSignup) continue;
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        valueType={formElement.config.valueType}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));
    let authOption = this.state.isSignup ? "SIGN IN" : "SIGN UP";
    let submitOption = this.state.isSignup ? "SIGN UP" : "SIGN IN";

    if (this.props.loading) form = <Spinner />;

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message.replace("_", " ").toLowerCase()}</p>
      );
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/favs" />;
      console.log("authed");
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">{submitOption}</Button>
        </form>
        <Button
          clicked={this.switchAuthModeHandler}
          btnType="Danger"
          animate={this.state.animate}
        >
          SWITCH TO {authOption} INSTEAD
        </Button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps, { auth })(Auth);
