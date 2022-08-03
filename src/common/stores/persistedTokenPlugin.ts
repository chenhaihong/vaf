import { PiniaPluginContext } from "pinia";

const createPersistedTokenPlugin =
  (vafAppId: string) =>
  ({ store }: PiniaPluginContext) => {
    const authStoreId = `VafAuthStore--${vafAppId}`;
    if (store.$id !== authStoreId) {
      return;
    }

    const tokenName = `vaf_auth_token--${vafAppId}`;
    const token = localStorage.getItem(tokenName);
    if (token) {
      store.token = token;
    }

    store.$onAction(({ name, store, after }) => {
      const actionNames = ["login", "logout"];
      if (actionNames.includes(name)) {
        after(() => {
          localStorage.setItem(tokenName, store.token);
        });
      }
    });
  };

export default createPersistedTokenPlugin;
