<template>
  <b-container class="personal-container">
    <div class="name-holding">
      <h3 class="personal-container-title">
        {{ this.name }}
      </h3>
      <h5 class="personal-conatainer-cardNumber">
        {{ this.accountNr }}
      </h5>
      <hr />
      <h2 class="name-holding-title">Historia</h2>
    </div>

    <b-table
      striped
      hover
      :busy="isBusy"
      :items="payments"
      headerTitle="Historia transakcji"
    >
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>

      <template v-slot:cell(Kwota)="{ value }">
        <span
          :class="{
            'text-red': value < 0,
            'text-green': value > 0,
          }"
        >
          {{ value }} PLN
        </span>
      </template>
    </b-table>
  </b-container>
</template>
<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      isBusy: false,
      name: null,
      accountNr: null,
      payments: [],
    };
  },
  methods: {
    async getData() {
      this.name = localStorage.name;
      this.accountNr = localStorage.userAccountNumber;
      this.isBusy = !this.isBusy;
      try {
        const response = await axios.get(
          `/account/${localStorage.userId}/payments`
        );
        const rawPayments = response.data._embedded.payments;
        console.log(rawPayments);
        rawPayments.forEach((payment, index) => {
          this.payments.push({
            Nr: index + 1,
            Tytuł: payment.title,
            Adresat: payment.creditedNameAndAddress,
            NumerKonta: payment.creditedAccountNumber,
            DataWykonania: payment.dateCreated.substring(0, 10),
            Kwota: payment.amount,
          });
        });
        console.log(this.payments);
        this.isBusy = !this.isBusy;
      } catch (error) {
        this.isBusy = !this.isBusy;
        console.log(error);
      }
    },
  },
  created() {
    if (localStorage.login == null) {
      console.log("Nie jesteś zalogowany");
      this.$router.push("/login");
    } else {
      this.getData();
    }
  },
};
</script>

<style>
.personal-container {
  margin-top: 120px;
  /* background: linear-gradient(to bottom, #33ccff 0%, #ff99cc 100%); */
  background: #ffffff;
  box-shadow: 0px 14px 40px;
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
}

.text-red {
  color: red;
}

.text-green {
  color: green;
}

.name-holding {
  padding-bottom: 30px;
}

.name-holding-title {
  text-align: center;
}
</style>
