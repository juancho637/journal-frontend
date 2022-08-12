import {
  loginUserWithEmailAndPassword,
  registerUserWithEmailPassword,
  signInWithGoogle,
  logoutFirebase,
} from "../../services/firebase/providers";
import { checkingCredentials, logout, login } from "./";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, name, email, errorMessage } =
      await signInWithGoogle();

    if (!ok) return dispatch(logout(errorMessage));

    dispatch(login({ uid, photoURL, name, email }));
  };
};

export const startCreatingUserWithEmailPassword = ({
  name,
  email,
  password,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({
        name,
        email,
        password,
      });

    if (!ok) return dispatch(logout(errorMessage));

    dispatch(login({ uid, photoURL, name, email }));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, name, photoURL, errorMessage } =
      await loginUserWithEmailAndPassword({
        email,
        password,
      });

    if (!ok) return dispatch(logout(errorMessage));

    dispatch(login({ uid, photoURL, name, email }));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(logout());
  };
};
