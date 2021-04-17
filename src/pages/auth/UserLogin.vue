<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
      >{{ error }}</base-dialog
    >

    <base-dialog :show="isLoading" fixed title="Login...">
      <base-spinner></base-spinner>
    </base-dialog>

    <base-card>
      <form @submit.prevent="formSubmit">
        <div class="form-control">
          <label for="email">Login</label>
          <input
            type="email"
            id="email"
            v-model.trim="email.value"
            @blur="emailValidation"
          />
          <p v-if="!email.isValid">Please enter a valid email</p>
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model.number="password.value"
            @blur="passwordValidation"
          />
          <p v-if="!password.isValid">Password is required!!</p>
        </div>

        <base-button>Login</base-button>
<p>
        If not yet, <router-link to="/register">Register</router-link> to signup!
</p>
<p v-if="wrongPassword > 2">
      Seems like You dont remember your pssword, <router-link :to="linkWithEmail">Reset password</router-link> 
</p>

      </form>
    </base-card>
  </div>
</template>





<script>
export default {
  data() {
    return {
      email: {
        value: "",
        isValid: true,
      },
      password: {
        value: "",
        isValid: true,
      },
      isFormValid: true,
      error: null,
      isLoading: false,
      wrongPassword: 0
    };
  },
  methods: {
    async formSubmit() {
      this.emailValidation();
      this.passwordValidation();
      if (!this.isFormValid) {
        return;
      }
      this.isLoading = true;

      const actionPayload = {
        email: this.email.value,
        password: this.password.value,
      };

      try {
        await this.$store.dispatch("login", actionPayload);
        // this.$route.query.redirect serve per prendere la query ?redirect=login
        const redirecturl = "/" + (this.$route.query.redirect || "public");
        this.$router.replace(redirecturl);
      } catch (error) {
        this.wrongPassword++
        this.error = error.message || "Failed to authenticate";
        this.password.value = ""
      }

      this.isLoading = false;
    },
    emailValidation() {
      this.email.isValid = true;
      this.isFormValid = true;
      if (!this.email.value || !this.email.value.includes("@")) {
        this.email.isValid = false;
        this.isFormValid = false;
      }
    },
    passwordValidation() {
      this.isFormValid = true;
      this.password.isValid = true;
      if (!this.password.value || this.password.value.length < 4) {
        this.isFormValid = false;
        this.password.isValid = false;
      }
    },
    handleError() {
      this.error = null;
    },
  },
  computed: {
    linkWithEmail(){
      return "/resetPassword" +  (this.email.value !== '' ? ("?email=" + this.email.value) : "")
    }
  },
};
</script>







<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;

  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>