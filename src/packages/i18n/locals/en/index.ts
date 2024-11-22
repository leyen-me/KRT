export default {
  pages: {
    common: {
      i18n: {
        en: "English",
        zhCn: "Chinese",
        system: "System",
      },
      theme: {
        light: "Light",
        dark: "Dark",
        system: "System",
      },
      sonner: {
        success: {
          title: "Success",
          confirm: "Ok",
        },
        error: {
          title: "Error",
          confirm: "Ok",
        },
      },
    },
    login: {
      title: "Login",
      desc: "Enter your email below to login to your account",
      email: "Email",
      emailPlacehoder: "m@example.com",
      password: "Password",
      forgetPassword: "Forgot your password?",
      login: "Login",
      loginWithGoogle: "Login with Google",
      registerDesc: "Don't have an account?",
      register: "Sign up",

      toast: {
        success: {
          description: "Login success",
        },
        error: {
          description: "Uh oh! Something went wrong.",
        },
      },
    },
  },
  server: {
    error: {
      code: {
        success: "Success",
        not_found: "API Not Found",
        internal_error: "Internal Error",

        sys: {
          auth: {
            user_not_found: "User not found",
            password_not_incorrect: "Password not incorrect",
            password_decrypt: "Password decrypt error",
            user_disabled: "User disabled",
          },
        },
      },
    },
  },
};
