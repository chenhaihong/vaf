import createPersistedState from "vuex-persistedstate";

const makePersistedStatePlugin = (vafAppId) => {
  return createPersistedState({
    key: `Vuex__Vaf__${vafAppId}`,
    paths: ["VafAuth.token"],
    filter: (mutation) => {
      const arr = ["VafAuth/setToken", "VafAuth/clear"];
      return arr.includes(mutation.type);
    },
  });
};

export default makePersistedStatePlugin;
