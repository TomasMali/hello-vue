<template>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
      >{{ error }}</base-dialog
    >

  <base-dialog :show="isLoading" fixed title="Authenticating...">
    <base-spinner></base-spinner>
  </base-dialog>

  <base-card>
    <form @submit.prevent="formSubmit">
      <div class="form-control">
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          v-model.trim="name.value"
          @blur="nameValidation"
        />
        <p v-if="!name.isValid">Please enter your name</p>
      </div>

      <div class="form-control">
        <label for="surname">Surname</label>
        <input
          type="text"
          id="surname"
          v-model.trim="surname.value"
          @blur="surnameValidation"
        />
        <p v-if="!surname.isValid">Please enter your surname</p>
      </div>

      <div class="form-control">
        <label for="email">E-Mail</label>
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
          v-model="password.value"
          @blur="passwordValidation"
        />
        <p v-if="!password.isValid">Please enter a valid password</p>
      </div>
      <div class="form-control">
        <label for="confirm">Confirm Password</label>
        <input
          type="password"
          id="confirm"
          v-model="confirm.value"
          @blur="confirmValidation"
        />
        <p v-if="!confirm.isValid">The password doesn't match!</p>
      </div>

      <base-button>Register</base-button>
    </form>
  </base-card>
</template>





<script>
export default {
  data() {
    return {
      name: {
        value: "",
        isValid: true,
      },
      surname: {
        value: "",
        isValid: true,
      },
      email: {
        value: "",
        isValid: true,
      },
      password: {
        value: "",
        isValid: true,
      },
      confirm: {
        value: "",
        isValid: true,
      },
      isFormValid: true,
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async formSubmit() {
      this.nameValidation();
      this.surnameValidation();
      this.emailValidation();
      this.passwordValidation();
      this.confirmValidation();
      if (!this.isFormValid) {
        return;
      }
      this.isLoading = true;
      const actionPayload = {
        name: this.name.value,
        surname: this.surname.value,
        email: this.email.value,
        password: this.password.value,
      };

      // do the post
      try {
        await this.$store.dispatch("register", actionPayload);
        const redirecturl = "/" + (this.$route.query.redirect || "public");
        this.$router.replace(redirecturl);
      } catch (error) {
        if (error)
          this.error =
            "User with email: " + actionPayload.email + " already exists" ||
            "Failed to register";
        else this.error = "Failed to register";

      }
      this.isLoading = false;
    },

    nameValidation() {
      this.isFormValid = true;
      this.name.isValid = true;
      if (this.name.value === "") {
        this.isFormValid = false;
        this.name.isValid = false;
      }
    },
    surnameValidation() {
      this.isFormValid = true;
      this.surname.isValid = true;
      if (this.surname.value === "") {
        this.isFormValid = false;
        this.surname.isValid = false;
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
    confirmValidation() {
      this.isFormValid = true;
      this.confirm.isValid = true;
      if (
        !this.confirm.value ||
        this.confirm.value < 4 ||
        this.confirm.value !== this.password.value
      ) {
        this.isFormValid = false;
        this.confirm.isValid = false;
      }
    },
        handleError() {
      this.error = null;
    },
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