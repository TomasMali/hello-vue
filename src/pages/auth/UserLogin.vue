<template>
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
    </form>
  </base-card>
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
    };
  },
  methods: {
    formSubmit() {
      this.emailValidation();
      this.passwordValidation();
      if (!this.isFormValid) {
        return;
      }
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
  },
  computed: {},
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