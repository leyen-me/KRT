export default {
  // common
  common: {
    // client and server validation
    validate: {
      required: "This field is required",
      email: "Please enter a valid email address",
      register: {
        password_min_error: "Password must be at least 6 characters",
      },
      login: {
        password_min_error: "Password must be at least 6 characters",
      },
    },
  },
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
      toast: {
        success: {
          description: "Success",
        },
        error: {
          try_again: "Try again",
          description: "Uh oh! Something went wrong.",
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
    error: {
      not_found: {
        title: "Oops! Page Not Found!",
        desc: "It seems like the page you're looking for does not exist or might have been removed.",
        back: "Go Back",
        home: "Back to Home",
      },
    },
  },
  server: {
    error: {
      code: {
        success: "Success",
        not_found: "API Not Found",
        internal_error: "Internal Error",
        validate_error: "Invalid parameters",

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
