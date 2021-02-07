<template>
  <div class="auth-wrapper">
    <div class="auth-inner">
      <form @submit.prevent="validateLogin">
        <h3 class="login-header">Logowanie</h3>
        <hr />
        <div class="form-group">
          <label> Login </label>
          <b-form-input
            v-model="$v.form.login.$model"
            :class="getValidationClass('login')"
            name="form-control"
            id="Email"
          />
        </div>

        <div class="form-group">
          <label> Hasło </label>
          <b-form-input
            type="password"
            v-model="$v.form.password.$model"
            :class="getValidationClass('password')"
            name="form-control"
            id="Password"
          />
        </div>
        <span v-if="wrongAuth" class="error-text"
          >Podane login lub hasło nie są poprawne</span
        >
        <button class="btn btn-primary btn-block" :disabled="isLoading">
          <b-icon icon="lock-fill" aria-hidden="true" /> Zaloguj
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators";

export default {
  name: "Login",
  data() {
    return {
      isLoading: false,
      wrongAuth: false,
      form: {
        login: null,
        password: null,
      },
    };
  },
  validations: {
    form: {
      login: { required },
      password: { required },
    },
  },
  created() {
    if (localStorage.login != null) {
      console.log("jesteś już zalogowany");
      this.$router.push("/home");
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.isLoading = true;
        const response = await axios.post("/login", this.form);

        //Local storage do ogarnięcia
        console.log(response.data);
        localStorage.login = this.form.login;
        localStorage.password = this.form.password;
        localStorage.userId = response.data.account.id;
        localStorage.name = `${response.data.client.firstName} ${response.data.client.lastName}`;
        localStorage.userAccountNumber = response.data.account.accountNumber;
        this.$router.push("/");
      } catch (error) {
        this.form.password = null;
        this.wrongAuth = true;
        this.isLoading = false;
        console.log(error);
      }
      // const data = {
      //   login: this.login,
      //   password: this.password,
      // };
      // console.log(data);
      // if (data.password === "haslo") {
      //   // localStorage.setItem("token", data);
      //   localStorage.login = this.login;
      //   localStorage.money = Math.floor(Math.random() * 1000);
      //   this.$router.push("/");
      // }
    },

    validateLogin() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.handleSubmit();
      }
      console.log("Kliknięto submit");
    },

    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        if (field.$dirty) {
          if (field.$invalid) return "is-invalid";
          else return "is-valid";
        }
      }
    },
  },
};
</script>
<style scoped>
/* .auth-wrapper {
  width: 100%;
  height: 100%;
} */

.auth-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
  margin-top: 200px;
}
.auth-inner {
  max-width: 500px;
  min-width: 350px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px;
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
}

.error-text {
  color: #ff1744;
  opacity: 1;
  transform: translateZ(0);
  font-size: 12px;
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.login-header {
  position: center;
}
</style>
