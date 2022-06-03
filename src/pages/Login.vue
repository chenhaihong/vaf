<template>
  <div class="vaf-login">
    <div class="vaf-login__form">
      <img v-if="logo" class="vaf-login__logo" :src="logo" alt="logo" />
      <p class="vaf-login__title">{{ name }}</p>
      <p class="vaf-login__slogan">{{ slogan }}</p>
      <input
        class="vaf-login__input"
        type="text"
        placeholder="用户名"
        v-model="username"
        @keyup.enter="login"
      />
      <input
        class="vaf-login__input"
        type="password"
        placeholder="密码"
        v-model="password"
        @keyup.enter="login"
      />
      <button
        class="vaf-login__btn"
        :class="{ disabled: disabled }"
        @click="login"
      >
        <template v-if="isLoading">
          <i class="el-icon-loading"></i>
          <span>登陆中</span>
        </template>
        <template v-else>登录</template>
      </button>
    </div>

    <div class="vaf-copyright" v-html="copyright"></div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => {
    return {
      // VafAppConfig.settingConfig 配置传递进来的参数
      name: "",
      slogan: "",
      logo: "",
      copyright: "",

      // 登录参数
      isLoading: false,
      username: "",
      password: "",
    };
  },
  computed: {
    disabled() {
      return this.isLoading || !this.username || !this.password;
    },
  },
  methods: {
    async login() {
      if (this.disabled) return;
      this.isLoading = true;
      const { username, password } = this;
      const [err] = await this.$store.dispatch("VafAuth/login", {
        username,
        password,
      });
      this.isLoading = false;
      if (err) return;
      this.$message({
        type: "success",
        message: `登录成功`,
      });
      const { redirect } = this.$route.query;
      if (redirect) {
        const dec = decodeURIComponent(decodeURIComponent(redirect));
        if (dec.startsWith(`http://`) || dec.startsWith(`https://`)) {
          location.href = dec;
        } else {
          this.$router.replace(dec);
        }
      } else {
        this.$router.replace("/");
      }
    },
  },
  created() {
    const conf = this.$vafAppConfig?.settingConfig || {};

    this.name = conf.name || "Vue Admin Framework";
    this.slogan = conf.slogan || "方便、快捷、精准";
    this.logo = conf.logo || "";
    this.copyright = conf.copyright || "本网站属于个人技术分享网站";
  },
};
</script>
<style lang="scss">
$mgb: 20px;
$glay: #ccc;

@include b(login) {
  position: relative;
  margin: 80px auto 0 auto;
  padding-bottom: 1px;
  width: 500px;
  max-width: 100%;

  @include e(form) {
    margin: auto;
    width: 300px;
    max-width: 90%;
    text-align: center;
  }

  @include e(logo) {
    margin-bottom: 20px;
    height: 120px;
  }

  @include e(title) {
    font-size: 14px;
    line-height: 1.6;
    color: $glay;
  }

  @include e(slogan) {
    margin-bottom: $mgb;
    font-size: 14px;
    line-height: 1.6;
    color: $glay;
  }

  @include e(input) {
    display: block;
    margin-bottom: 20px;
    width: 300px;
    max-width: 100%;
    height: 46px;
    line-height: 46px;
    font-size: 14px;
    text-indent: 12px;
    border: solid 1px #d9d9d9;
    border-radius: 3px;
    outline: none;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

    &:focus {
      border-color: #20a0ff;
    }
  }
  @include e(btn) {
    display: block;
    margin-bottom: 40px;
    width: 300px;
    max-width: 100%;
    height: 46px;
    line-height: 46px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    border: none;
    background: #03aaf4;
    border-radius: 3px;
    cursor: pointer;

    &.disabled {
      background: #cccccc;
      cursor: default;
    }
  }
}

@include b(copyright) {
  margin-bottom: 30px;
  width: 100%;
  font-size: 12px;
  color: $glay;
  text-align: center;
  line-height: 22px;

  :deep(a) {
    color: $glay;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  @include e(devider) {
    margin-right: 5px;
    margin-left: 5px;
  }
}
</style>
