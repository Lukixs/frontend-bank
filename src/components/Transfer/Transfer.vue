<template>
  <div class="auth-wrapper">
    <div class="auth-inner">
      <div>
        <h4>Formularz Przelewu</h4>
        <hr />
        <form @submit.prevent="validateTransfer">
          <div class="form-group">
            <label>Odbiorca:</label>
            <b-form-input
              name="form-control"
              v-model="$v.form.receiverName.$model"
              id="odbiorca"
              :class="getValidationClass('receiverName')"
              placeholder="Nazwa odbiorcy"
              maxlength="20"
            />
            <span class="error-text" v-if="$v.form.receiverName.$error"
              >Nazwa odbiorcy jest wymagana</span
            >
          </div>

          <div class="form-group">
            <label>Numer Konta Odbiorcy:</label>
            <b-form-input
              name="form-control"
              v-model="$v.form.accountNumber.$model"
              :class="getValidationClass('accountNumber')"
              placeholder="Numer konta"
              id="nrKonta"
            />
            <span
              class="error-text"
              v-if="
                !$v.form.accountNumber.maxLength ||
                  !$v.form.accountNumber.minLength
              "
              >Numer konta powinien zawierać równo 32 znaki(Wliczając
              spacje)</span
            >
            <span
              class="error-text"
              v-if="
                !$v.form.accountNumber.required &&
                  $v.form.accountNumber.$anyDirty
              "
              >Numer konta odbiorcy jest wymagany</span
            >
          </div>

          <div class="form-group">
            <label>Addres:</label>
            <b-form-input
              name="form-control"
              v-model="form.address"
              id="addres"
              maxlength="30"
              placeholder="Adres odbiorcy (Opcjonalny)"
            />
          </div>

          <div class="form-group">
            <label>Tytuł:</label>
            <b-form-input
              name="form-control"
              v-model="$v.form.title.$model"
              :class="getValidationClass('title')"
              id="title"
              maxlength="30"
              placeholder="Tytuł"
            />
            <span
              class="error-text"
              v-if="!$v.form.title.required && $v.form.title.$anyDirty"
              >Tytuł przelewu jest wymagany</span
            >
          </div>

          <div class="form-group">
            <label>Kwota:</label>
            <b-form-input
              type="number"
              name="form-control"
              v-model="$v.form.amount.$model"
              :class="getValidationClass('amount')"
              id="kwota"
              placeholder="Kwota"
            />
            <span
              class="error-text"
              v-if="!$v.form.amount.required && $v.form.amount.$anyDirty"
              >Podanie wysokości przelewu jest wymagane</span
            >
            <span class="error-text" v-if="!$v.form.amount.minValue"
              >Minimalna kwota przelewu to 1 zł</span
            >
          </div>

          <div class="form-group">
            <label>Data przelewu:</label>
            <b-form-datepicker
              name="form-control"
              v-model="$v.form.date.$model"
              :min="today"
              :max="maxDate"
              :date-disabled-fn="dateDisabled"
              :disabled="!form.type"
              class="mb-1"
              :class="getValidationClass('date')"
              placeholder="Wybierz datę przelewu"
              id="data"
            />
            <span
              class="error-text"
              v-if="!$v.form.date.required && $v.form.date.$anyDirty"
              >Podaj datę przelewu</span
            >
          </div>

          <div class="form-group">
            <b-form-group label="Typ przelewu:" v-slot="{ ariaDescribedby }">
              <b-form-radio
                v-model="form.type"
                :aria-describedby="ariaDescribedby"
                name="some-radios"
                :value="true"
                >Standardowy</b-form-radio
              >
              <b-form-radio
                v-model="form.type"
                :aria-describedby="ariaDescribedby"
                name="some-radios"
                :value="false"
                >Natychmiastowy</b-form-radio
              >
            </b-form-group>
          </div>
          <button class="btn btn-primary btn-block" :disabled="isLoading">
            Wyślij
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {
  required,
  minLength,
  maxLength,
  minValue,
} from "vuelidate/lib/validators";

export default {
  name: "Przelew",
  data() {
    return {
      form: {
        receiverName: "",
        accountNumber: "",
        address: "",
        title: "",
        amount: null,
        date: "",
        type: true,
      },
      today: new Date(),
      maxDate: new Date(this.today),
      isLoading: false,
    };
  },
  validations: {
    form: {
      receiverName: { required },
      accountNumber: {
        required,
        minLength: minLength(32),
        maxLength: maxLength(32),
      },
      address: {},
      title: { required },
      amount: { required, minValue: minValue(1) },
      date: { required },
      type: {},
    },
  },
  watch: {
    "form.type": function(isStandard) {
      // console.log("W ogóle działamy");
      if (isStandard) {
        // console.log("Przelew standardowy");
        this.setFormDateToNextWorkingDay();
      } else {
        // console.log("Przelew natychmiastowy");
        this.form.date = this.today;
      }
    },
  },
  created() {
    if (localStorage.login == null) {
      console.log("Nie jesteś zalogowany");
      this.$router.push("/login");
    }
    this.maxDate.setMonth(this.maxDate.getMonth() + 2);
    // this.today.setDate(new Date().getDate() + 1);
    this.setFormDateToNextWorkingDay();
  },
  methods: {
    transfer() {
      this.isLoading = true;

      const splittedAddres = this.form.accountNumber.split(" ");

      if (this.form.amount > 1000) {
        // setTimeout(function() {
        this.$swal
          .fire({
            title: "Czy jesteś pewien wykonania tego przelewu?",
            showDenyButton: true,
            confirmButtonText: `Wykonaj przelew`,
            denyButtonText: `Anuluj`,
          })
          .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              if (
                splittedAddres[1] === "1060" &&
                splittedAddres[2] === "0076"
              ) {
                this.sendTransferInside();
                console.log("Nasz bank");
              } else {
                this.sendTransferOutside();
                console.log("Nie nasz bank");
              }
            } else if (result.isDenied) {
              this.$swal.fire("Upewnij się i spróbuj ponownie", "", "info");
              this.isLoading = false;
            }
          });
        // }, 550);
      } else {
        if (splittedAddres[1] === "1060" && splittedAddres[2] === "0076") {
          this.sendTransferInside();
          console.log("Nasz bank");
        } else {
          this.sendTransferOutside();
          console.log("Nie nasz bank");
        }
      }
    },

    async sendTransferInside() {
      try {
        const response = await axios.post("/new-payment", {
          debitedAccountNumber: localStorage.userAccountNumber,
          debitedNameAndAddress: localStorage.name,
          creditedAccountNumber: this.form.accountNumber,
          creditedNameAndAddress: this.form.receiverName,
          title: this.form.title,
          amount: this.form.amount,
          status: "1",
        });
        this.$swal
          .fire({
            icon: "success",
            title: "Zrobione!",
            text: "Twój przelew właśnie wyruszył w trasę!",
          })
          .then(() => {
            this.$router.push("/");
          });
        console.log(response);
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },

    async sendTransferOutside() {
      // const instance = axios.create({
      //   baseURL: "https://jednroz.herokuapp.com",
      // });
      const instance = axios.create();
      // instance.headers.common['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
      try {
        const response = instance.post(
          "https://jednroz.herokuapp.com/send",
          {
            DebitedAccountNumber: localStorage.userAccountNumber,
            DebitedNameAndAddress: localStorage.name,
            CreditedAccountNumber: this.form.accountNumber,
            CreditedNameAndAddress: this.form.receiverName,
            Title: this.form.title,
            Amount: this.form.amount,
            PaymentSum: this.form.amount,
          },
          {
            headers: {
              //   "Access-Control-Allow-Origin": "*",
              //   "Access-Control-Allow-Headers": "*",
              debet:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjEyNDcwMzI5fQ.56WfkfWjKZFo_M-E1PSZrQ_MbRDlRz8br1zRAFF-kOs",
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
      try {
        const zapytanie = await axios.post("/new-payment", {
          debitedAccountNumber: localStorage.userAccountNumber,
          debitedNameAndAddress: localStorage.name,
          creditedAccountNumber: this.form.accountNumber,
          creditedNameAndAddress: this.form.receiverName,
          title: this.form.title,
          amount: this.form.amount,
          status: "1",
        });

        console.log(zapytanie);

        this.$swal
          .fire({
            icon: "success",
            title: "Zrobione!",
            text: "Twój przelew właśnie wyruszył w trasę!",
          })
          .then(() => {
            this.$router.push("/");
          });
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },

    dateDisabled(ymd, date) {
      // Disable weekends (Sunday = `0`, Saturday = `6`) and
      // disable days that fall on the 13th of the month
      const weekday = date.getDay();
      // Return `true` if the date should be disabled
      return weekday === 0 || weekday === 6;
    },

    validateTransfer() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.transfer();
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

    setFormDateToNextWorkingDay() {
      if (this.today.getDay() == 6) {
        this.form.date = new Date();
        this.form.date.setDate(this.today.getDate() + 2);
      } else if (this.today.getDay() == 0) {
        this.form.date = new Date();
        this.form.date.setDate(this.today.getDate() + 1);
      } else {
        this.form.date = this.today;
      }
    },
  },
};
</script>
<style scoped>
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

.auth-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
  margin-top: 150px;
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
</style>
