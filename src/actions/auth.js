import { AUTH, LOGOUT } from '../constants/actionTypes';
import userService from "../services/UserServices";
import GeoSeetingService from '../services/GeoSeetingService';


export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await userService.signIn(formData);

    if(!data.message){
      dispatch({ type: AUTH, data }); 
      router.push('/map');
    }else{
      alert("Identifiant ou Mot de passe incorrect !")
      console.log(data.message);
    }

  } catch (error) {
    console.log(error);
  }
};

export const update = (formData, id, router) => async (dispatch) => {
  try {
    
    const { data } = await userService.updateUserProfil(formData, id);
    
    dispatch({ type: AUTH, data }); 
    router.push('/map');
    
  } catch (error) {
    console.log(error);
  }
};

export const updateGeoSeetings = (formData, router) => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem('profile'));
    const { data } = await GeoSeetingService.updateGeoAuthorization(formData);
    user.result.geolocalisation = data;
    
    dispatch({ type: AUTH, data: user }); 
    router.push('/map');
    
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await userService.signUp(formData);
    dispatch({ type: AUTH, data });
    router.push('/map');
  } catch (error) {
    console.log(error);
  }
};

export const deleteProfil = (id, router) => async (dispatch) => {
  try {
    
    const { data } = await userService.deleteUser(id);
    console.log(data);
    dispatch({ type: LOGOUT, data }); 
    router.push('/map');
    
  } catch (error) {
    console.log(error);
  }
};

export const logout = (formData, router) => async (dispatch) => {
try {
  dispatch({ type: LOGOUT });
  router.push('/map');
} catch (error) {
  console.log(error);
}
};
