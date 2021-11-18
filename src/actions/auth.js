import { AUTH, LOGOUT } from '../constants/actionTypes';
import userService from "../services/UserServices";


export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await userService.signIn(formData);
    
    if(!data.message){
      dispatch({ type: AUTH, data }); 
      router.push('/');
    }else{
      alert("Identifiant ou Mot de passe incorrect !")
      console.log(data.message);
    }

  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await userService.signUp(formData);
    dispatch({ type: AUTH, data });
    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const logout = (formData, router) => async (dispatch) => {
try {
  dispatch({ type: LOGOUT });
  router.push('/');
} catch (error) {
  console.log(error);
}
};
