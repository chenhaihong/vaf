import { PiniaPluginContext } from "pinia";

const createPersistedTokenPlugin =
  (vafAppId: string) =>
  ({ store }: PiniaPluginContext) => {
    const authStoreId = `VafAuthStore--${vafAppId}`;
    if (store.$id !== authStoreId) {
      return;
    }

    // 回填token
    const key = `vaf_auth_token--${vafAppId}`;
    const token = localStorage.getItem(key);
    if (token) {
      store.token = token;
    }

    // 监听与更新token的本地存贮
    store.$onAction(({ name, store, after }) => {
      const actionNames = ["login", "logout"];
      if (actionNames.includes(name)) {
        after(() => {
          localStorage.setItem(key, store.token);
        });
      }
    });
  };

export default createPersistedTokenPlugin;
