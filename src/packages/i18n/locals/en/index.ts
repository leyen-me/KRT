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
      email_placeholder: "m@example.com",
      password: "Password",
      forget_password: "Forgot your password?",
      login: "Login",
      login_with_google: "Login with Google",
      register_desc: "Don't have an account?",
      register: "Sign up",
      email_error: "Email is invalid",
      password_error: "Password must be at least 6 characters",
      toast: {
        success: {
          description: "Login success",
        },
        error: {
          try_again: "Try again",
          description: "Uh oh! Something went wrong.",
        },
      },
    },
    register: {
      title: "Register",
      desc: "Enter your email below to create your account",
      email: "Email",
      email_placeholder: "m@example.com",
      password: "Password",
      confirm_password: "Confirm Password",
      login: "Login",
      login_desc: "Already have an account?",
      register: "Register",

      email_error: "Email is invalid",
      password_error: "Password must be at least 6 characters",

      toast: {
        success: {
          description: "Register success",
        },
        error: {
          try_again: "Try again",
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
            user_already_exists: "User already exists",
          },
        },
      },
    },
  },
};
