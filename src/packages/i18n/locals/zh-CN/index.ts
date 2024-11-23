export default {
  pages: {
    common: {
      i18n: {
        en: "英语",
        zhCn: "中文",
        system: "系统",
      },
      theme: {
        light: "明亮",
        dark: "暗黑",
        system: "系统",
      },
      sonner: {
        success: {
          title: "成功",
          confirm: "确定",
        },
        error: {
          title: "错误",
          confirm: "确定",
        },
      },
    },
    login: {
      title: "登录",
      desc: "请输入邮箱登录您的账号",
      email: "邮箱",
      email_placeholder: "m@example.com",
      password: "密码",
      forget_password: "忘记密码?",
      login: "登录",
      login_with_google: "使用谷歌账号登录",
      register_desc: "还没有账号?",
      register: "注册",
      email_error: "邮箱格式错误",
      password_error: "密码长度至少为6位",

      toast: {
        success: {
          description: "登录成功",
        },
        error: {
          try_again: "重试",
          description: "哎呀！出错了。",
        },
      },
    },
    register: {
      title: "注册",
      desc: "请输入邮箱创建您的账号",
      email: "邮箱",
      email_placeholder: "m@example.com",
      password: "密码",
      confirm_password: "确认密码",
      login: "登录",
      login_desc: "已有账号?",
      register: "注册",
      email_error: "邮箱格式错误",
      password_error: "密码长度至少为6位",
      toast: {
        success: {
          description: "注册成功",
        },
        error: {
          try_again: "重试",
          description: "哎呀！出错了。",
        },
      },
    },
  },
  server: {
    error: {
      code: {
        success: "成功",
        not_found: "API 未找到",
        internal_error: "服务器内部错误",
        sys: {
          auth: {
            user_not_found: "用户不存在",
            password_not_incorrect: "密码不正确",
            password_decrypt: "密码格式错误",
            user_disabled: "用户已禁用",
            user_already_exists: "用户已存在",
          },
        },
      },
    },
  },
};
