import * as types from "../types";
import { User } from "../../models/User";
import { Alerte } from "../../models/Alerte";
import { make } from "vuex-pathify";
import axios from "axios";
import * as constants from "../../constants/constants";
import Router from "../../router"


const state = () => ({
  user: new User()
})

const mutations = {
    ...make.mutations(state)
}

const actions = {
  ...make.actions('user'),

  // Connexion
  async [types.connexion]({ state, dispatch }, user) {
    let request = { "username": user.username,"password": user.password };
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
    axios
    .post(constants.API_URL + 'authentication', request)
    .then(response => {
      dispatch(types.setUser, new User(user.username, response.data.user_key, response.data.user_id));
      dispatch((`alerte/${types.setAlerte}`), new Alerte('success', `L'utilisateur ${state.user.username} est bien connecté`), { root: true });
      console.log(state.user);
      Router.push('/chat');
    })
    .catch(() => {
      dispatch((`alerte/${types.setAlerte}`), new Alerte('error', `Informations saisies invalides`), { root: true })
    });
  },

    // Deconnexion
    async [types.deconnexion]({ state, dispatch}) {
        dispatch((`alerte/${types.setAlerte}`), new Alerte('error', `L'utilisateur ${state.user.username} est bien déconnecté`), { root: true });
        dispatch(types.setUser, new User());
        Router.push('/login');
    },

  // Inscription
  async [types.register]({ state, dispatch }, registeringUser) {
    console.log(state);
    let request = { "username": registeringUser.username,"password": registeringUser.password,"passwordConfirm": registeringUser.passwordConfirm };
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
    axios
    .post(constants.API_URL + 'registration', request)
    .then(() => {
      Router.push('/login');
      dispatch((`alerte/${types.setAlerte}`), new Alerte('success', "Vous êtes maintenant inscrit, connectez vous !"), { root: true })
    })
    .catch(error => {
      let errorMessage = error.response.data.errorMessage || "une erreur est survenue";
      dispatch((`alerte/${types.setAlerte}`), new Alerte('error', errorMessage), { root: true })
    });
  }


}

export const user = {
  namespaced: true,
  state,
  mutations,
  actions
}