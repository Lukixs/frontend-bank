<template>
  <div class="auth-wrapper">
    <div class="auth-inner">
      <b-form @submit.prevent="validateRegistration">
        <h3>Rejestracja:</h3>
        <hr />
        <h5>Dane Logowania</h5>

        <div class="form-group">
          <b-form-group>
            <label>Login </label>
            <b-form-input
              id="login"
              name="login"
              v-model="$v.form.login.login.$model"
              :class="getValidationClass('login', 'login')"
            />
          </b-form-group>

          <span class="error-text" v-if="$v.form.login.login.$error"
            >Login jest wymagany, oraz powinien zawierać mieć długość od 5 do 20
            znaków</span
          >
        </div>

        <div class="row">
          <div class="form-group col-lg-6">
            <label>Hasło </label>
            <b-form-input
              type="password"
              name="form-control"
              v-model="$v.form.login.password.$model"
              :class="getValidationClass('login', 'password')"
              id="password"
            />

            <span class="error-text" v-if="$v.form.login.password.$error"
              >Hasło jest wymagany, oraz powinien zawierać mieć długość od 5 do
              20 znaków</span
            >
          </div>

          <b-form-group class="form-group col-lg-6">
            <label>Powtórz hasło </label>
            <b-form-input
              type="password"
              name="form-control"
              v-model="$v.password.repeatedPassword.$model"
              :class="getValidationClassForRepeatedPassword('repeatedPassword')"
              id="passwordRepeat"
            />
            <span class="error-text" v-if="$v.password.repeatedPassword.$error"
              >Hasła nie są identyczne.</span
            >
          </b-form-group>
        </div>

        <hr />
        <h5>Dane Osobowe</h5>

        <div class="row">
          <div class="form-group col-lg-6">
            <label>Twoje imie:</label>
            <b-form-input
              name="form-control"
              v-model="$v.form.client.firstName.$model"
              :class="getValidationClass('client', 'firstName')"
              id="firstName"
            />
            <span class="error-text" v-if="$v.form.client.firstName.$error"
              >Podaj imie (powinno ono zawierać przyanjmniej 2 znaki</span
            >
          </div>

          <div class="form-group col-lg-6">
            <label>Twoje Nazwisko:</label>
            <b-form-input
              name="form-control"
              v-model="$v.form.client.lastName.$model"
              :class="getValidationClass('client', 'lastName')"
              id="lastName"
            />
            <span class="error-text" v-if="$v.form.client.lastName.$error"
              >Podaj imie (powinno ono zawierać przyanjmniej 2 znaki</span
            >
          </div>
        </div>

        <div class="form-group">
          <label>PESEL:</label>
          <b-form-input
            type="number"
            name="form-control"
            v-model="$v.form.client.pesel.$model"
            :class="getValidationClass('client', 'pesel')"
            id="pesel"
          />
          <span class="error-text" v-if="$v.form.client.pesel.$error"
            >Podaj prawidłowy nr. PESEL (11 znaków)</span
          >
        </div>

        <div class="row">
          <div class="form-group col-lg-6">
            <label>Obywatelstwo:</label>
            <b-form-input
              name="form-control"
              v-model="$v.form.client.citizenship.$model"
              :class="getValidationClass('client', 'citizenship')"
              id="citizenship"
            />
            <span class="error-text" v-if="$v.form.client.citizenship.$error"
              >Podaj prawidłowy nr. PESEL (11 znaków)</span
            >
          </div>

          <div class="form-group col-lg-6">
            <label>Data urodzenia:</label>
            <b-form-datepicker
              name="form-control"
              v-model="$v.form.client.dateOfBirth.$model"
              :class="getValidationClass('client', 'dateOfBirth')"
              :max="today"
              class="mb-1"
              id="dateOfBirth"
            />
            <span class="error-text" v-if="$v.form.client.dateOfBirth.$error"
              >Podaj swoją datę urodzenia</span
            >
          </div>
        </div>

        <div class="row">
          <div class="form-group col-lg-6">
            <label>Numer Dowodu:</label>
            <b-form-input
              name="form-control"
              v-model="$v.form.client.identityCardNumber.$model"
              :class="getValidationClass('client', 'identityCardNumber')"
              id="identityCardNumber"
            />
            <span
              class="error-text"
              v-if="$v.form.client.identityCardNumber.$error"
              >Podaj numer dowodu (Widnieje na odwrocie)</span
            >
          </div>

          <div class="form-group col-lg-6">
            <label>Numer telefonu:</label>
            <b-form-input
              type="number"
              name="form-control"
              v-model="$v.form.client.telephone.$model"
              :class="getValidationClass('client', 'telephone')"
              id="telephone"
            />
            <span class="error-text" v-if="$v.form.client.telephone.$error"
              >Podaj numer telefonu</span
            >
          </div>
        </div>

        <div class="form-group">
          <label>Adres email:</label>
          <b-form-input
            type="email"
            name="form-control"
            v-model="$v.form.client.email.$model"
            :class="getValidationClass('client', 'email')"
            id="email"
          />
          <span class="error-text" v-if="$v.form.client.email.$error"
            >Podaj adres email</span
          >
        </div>

        <hr />
        <h5>Dane Zamieszkania</h5>

        <div>
          <div class="form-group">
            <label>Kraj:</label>
            <b-form-input
              name="form-control"
              v-model="$v.form.address.country.$model"
              :class="getValidationClass('address', 'country')"
              id="country"
            />
            <span class="error-text" v-if="$v.form.address.country.$error"
              >Podaj prawidłowy kraj zamieszkania</span
            >
          </div>

          <div class="row">
            <div class="form-group col-lg-6">
              <label>Miasto:</label>
              <b-form-input
                name="form-control"
                v-model="$v.form.address.city.$model"
                :class="getValidationClass('address', 'city')"
                id="city"
              />
              <span class="error-text" v-if="$v.form.address.city.$error"
                >Podaj miasto w którym przebywasz</span
              >
            </div>

            <div class="form-group col-lg-6">
              <label>Województwo:</label>
              <b-form-input
                name="form-control"
                v-model="$v.form.address.state.$model"
                :class="getValidationClass('address', 'state')"
                id="state"
              />
              <span class="error-text" v-if="$v.form.address.city.$error"
                >Podaj województwo w którym przebywasz</span
              >
            </div>
          </div>

          <div class="row">
            <div class="form-group col-lg-6">
              <label>Ulica:</label>
              <b-form-input
                name="form-control"
                v-model="form.address.street"
                id="street"
              />
            </div>

            <div class="form-group col-lg-6">
              <label>Kod pocztowy:</label>
              <b-form-input
                name="form-control"
                v-model="$v.form.address.zipCode.$model"
                :class="getValidationClass('address', 'zipCode')"
                id="zipCode"
              />
              <span class="error-text" v-if="$v.form.address.zipCode.$error"
                >Podaj poprawny kod pocztowy</span
              >
            </div>
          </div>
        </div>

        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="addressCorrespondenceCheckBox"
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            Mój adres Korspondencyjny różni się od adresu zamieszkania
          </label>
        </div>

        <div v-if="addressCorrespondenceCheckBox">
          <hr />
          <h5>Dane Korspondencyjne</h5>
          <div class="form-group">
            <label>Kraj:</label>
            <b-form-input
              name="form-control"
              v-model="$v.form.addressCorrespondence.country.$model"
              :class="getValidationClass('addressCorrespondence', 'country')"
              id="countryCorrespondence"
            />
            <span
              class="error-text"
              v-if="$v.form.addressCorrespondence.country.$error"
              >Podaj prawidłowy kraj zamieszkania</span
            >
          </div>

          <div class="row">
            <div class="form-group col-lg-6">
              <label>Miasto:</label>
              <b-form-input
                name="form-control"
                v-model="$v.form.addressCorrespondence.city.$model"
                :class="getValidationClass('addressCorrespondence', 'city')"
                id="cityCorrespondence"
              />
              <span
                class="error-text"
                v-if="$v.form.addressCorrespondence.city.$error"
                >Podaj miasto w którym przebywasz</span
              >
            </div>

            <div class="form-group col-lg-6">
              <label>Województwo:</label>
              <b-form-input
                name="form-control"
                v-model="$v.form.addressCorrespondence.state.$model"
                :class="getValidationClass('addressCorrespondence', 'state')"
                id="stateCorrespondence"
              />
              <span
                class="error-text"
                v-if="$v.form.addressCorrespondence.state.$error"
                >Podaj województwo w którym przebywasz</span
              >
            </div>
          </div>

          <div class="row">
            <div class="form-group col-lg-6">
              <label>Ulica:</label>
              <b-form-input
                name="form-control"
                v-model="form.addressCorrespondence.street"
                id="streetCorrespondence"
              />
            </div>

            <div class="form-group col-lg-6">
              <label>Kod pocztowy:</label>
              <b-form-input
                name="form-control"
                v-model="$v.form.addressCorrespondence.zipCode.$model"
                :class="getValidationClass('addressCorrespondence', 'zipCode')"
                id="zipCodeCorrespondence"
              />
              <span
                class="error-text"
                v-if="$v.form.addressCorrespondence.zipCode.$error"
                >Podaj poprawny kod pocztowy</span
              >
            </div>
          </div>
        </div>

        <button :disabled="isLoading" class="btn btn-primary btn-block">
          Zarejestruj się
        </button>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  required,
  minLength,
  maxLength,
  sameAs,
  email,
  requiredIf,
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      today: new Date(),

      isLoading: false,
      addressCorrespondenceCheckBox: false,
      form: {
        address: {
          city: null,
          country: null,
          state: null,
          street: null,
          zipCode: null,
        },
        addressCorrespondence: {
          city: null,
          country: null,
          state: null,
          street: null,
          zipCode: null,
        },
        client: {
          firstName: null,
          lastName: null,
          citizenship: null,
          pesel: null,
          dateOfBirth: null,
          identityCardNumber: null,
          telephone: null,
          email: null,
        },
        login: {
          login: null,
          password: null,
        },
      },
      password: {
        repeatedPassword: null,
      },
    };
  },
  validations: {
    form: {
      address: {
        city: { required },
        country: { required },
        state: { required },
        street: {},
        zipCode: { required },
      },
      addressCorrespondence: {
        city: {
          required: requiredIf(function() {
            return this.addressCorrespondenceCheckBox;
          }),
        },
        country: {
          required: requiredIf(function() {
            return this.addressCorrespondenceCheckBox;
          }),
        },
        state: {
          required: requiredIf(function() {
            return this.addressCorrespondenceCheckBox;
          }),
        },
        street: {},
        zipCode: {
          required: requiredIf(function() {
            return this.addressCorrespondenceCheckBox;
          }),
        },
      },
      client: {
        firstName: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(50),
        },
        lastName: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(50),
        },
        citizenship: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(50),
        },
        pesel: { required, minLength: minLength(11), maxLength: maxLength(11) },
        dateOfBirth: { required },
        identityCardNumber: {
          required,
          minLength: minLength(9),
          maxLength: maxLength(9),
        },
        telephone: {
          required,
          minLength: minLength(9),
          maxLength: maxLength(12),
        },
        email: { required, maxLength: maxLength(50), email },
      },
      login: {
        login: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(20),
        },
        password: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(20),
        },
      },
    },
    password: {
      repeatedPassword: {
        required,
        sameAsPassword: sameAs(function() {
          return this.form.login.password;
        }),
      },
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
      this.isLoading = true;
      if (!this.addressCorrespondenceCheckBox) {
        this.clearAddressCorrespondence();
      }
      const data = this.form;
      console.log(data);
      try {
        const response = await axios.post("/registry", data);
        console.log(response);
        this.$swal
          .fire({
            icon: "success",
            title: "Udało się!",
            text: "Rejestracja przebiegła pomyślnie!",
          })
          .then(() => {
            this.$router.push("/");
          });
      } catch (error) {
        console.error(error);
        this.isLoading = false;
      }
    },

    getValidationClass(categoryName, fieldName) {
      const field = this.$v.form[categoryName][fieldName];
      if (field) {
        if (field.$dirty) {
          if (field.$invalid) return "is-invalid";
          else return "is-valid";
        }
      }
    },
    getValidationClassForRepeatedPassword(fieldName) {
      const field = this.$v.password[fieldName];
      console.log(field);
      if (field) {
        if (field.$dirty) {
          console.log("DilemA");
          if (field.$invalid) return "is-invalid";
          else return "is-valid";
        }
      }
    },

    clearAddressCorrespondence() {
      this.form.addressCorrespondence.city = null;
      this.form.addressCorrespondence.country = null;
      this.form.addressCorrespondence.state = null;
      this.form.addressCorrespondence.street = null;
      this.form.addressCorrespondence.zipCode = null;
    },

    validateRegistration() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.handleSubmit();
      }
      console.log("Kliknięto submit");
    },
  },
};
</script>
<style>
.auth-wrapper {
  margin-top: 100px;
  padding-bottom: 150px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}
.auth-inner {
  max-width: 800px;
  width: 100%;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px;
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
}
.btn-block {
  margin-top: 50px;
}

.error-text {
  color: #ff1744;
  opacity: 1;
  transform: translateZ(0);
  font-size: 12px;
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
