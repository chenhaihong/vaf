import hasIntersect from "@/common/helpers/hasIntersect";
import { getUseAuthStore } from "@/common/stores/createUseAuthStore";

export default { getPermittedMainmenu, getPermittedSubmenu };

// 获取当前角色拥有的主菜单
export function getPermittedMainmenu(
  menus: Menu[] = [],
  vafAppId: string,
  enableFilter: boolean = true // 启用过滤器，启用时才根据内置规则进行过滤
): Menu[] {
  const authStore = getUseAuthStore(vafAppId)();
  const adminUsername = authStore.userinfo?.username;
  const roles = authStore.roles;

  return menus
    .map((item) => {
      // 取菜单的第一层
      return {
        type: item.type,
        id: item.id,
        path: item.path,
        title: item.title,
        icon: item.icon,
        hidden: item.hidden,
        authLevel: item.authLevel,
        authRoles: item.authRoles,
      };
    })
    .filter((item) => {
      // 如果设置了隐藏显示，则过滤掉当前item
      if (item.hidden) return false;

      // 关闭了过滤器，不进行过滤
      if (!enableFilter) return true;

      // 只返回有权限的菜单
      let { authLevel = 1, authRoles = [] } = item;
      if (![0, 1, 2].includes(authLevel)) {
        // 修正 authLevel 的值
        authLevel = 1;
      }
      return (
        authLevel === 0 || // 可匿名访问
        (authLevel === 1 && adminUsername) || // 登录即可访问
        hasIntersect(authRoles, roles) // 有访问权限
      );
    });
}

// 获取当前角色拥有的子菜单
export function getPermittedSubmenu(
  menus: Menu[] = [], // 用户传递进来的全部菜单
  mainmenu: Menu, // 用户选中的主菜单
  vafAppId: string,
  enableFilter: boolean = true // 启用过滤器，启用时才根据内置规则进行过滤
): Menu[] {
  const authStore = getUseAuthStore(vafAppId)();
  const adminUsername = authStore.userinfo?.username;
  const roles = authStore.roles;

  const hit = menus.find((item) => item.id === mainmenu?.id);
  const tree = hit ? hit.children : [];
  return filter(tree, adminUsername, roles, enableFilter);
}

function filter(
  tree: Menu[] = [],
  adminUsername: string,
  adminRoles: string[] = [],
  enableFilter: boolean = true // 启用过滤器，启用时才根据内置规则进行过滤
): Menu[] {
  return tree
    .map((item) => ({ ...item })) // 因为源数据可能已经被模板使用, 所欲需要浅拷贝出item, 避免直接修改原数据, 导致意外的重复渲染
    .filter((item) => {
      // 如果设置了隐藏显示，则过滤掉当前item
      if (item.hidden) return false;

      // 关闭了过滤器，不进行过滤
      if (!enableFilter) return true;

      const { authLevel = 1, authRoles = [], children = [] } = item;
      if (children.length > 0) {
        item.children = filter(
          children,
          adminUsername,
          adminRoles,
          enableFilter
        );
      }
      return (
        authLevel === AuthLevel.Anonymous || // 可匿名访问
        (authLevel === AuthLevel.LoggedIn && adminUsername) || // 登录即可访问
        hasIntersect(authRoles, adminRoles) // 有访问权限
      );
    });
}

export interface Menu {
  type: MenuType;
  // sidebar 菜单必须传入id: 1.依靠这个id来确认选中状态, 2.依靠这个id来获取子菜单
  // navbar  菜单需要传入id: 1.依靠这个id来获取子菜单
  id: string;
  path: string;
  title: string;
  icon?: string;
  hidden?: boolean; // 是否隐藏显示, 默认为 false
  authLevel?: AuthLevel;
  authRoles?: string[];
  children?: undefined | null | Menu[];
  hasChildren?: boolean;
}

export enum MenuType {
  RouterLink = "router-link",
  HttpLink = "http-link",
}

export enum AuthLevel {
  Anonymous = 0, // 无需登录
  LoggedIn = 1, // 已登录
  SpecifiedRoles = 2, // 已登录并且需要拥有指定角色
}
