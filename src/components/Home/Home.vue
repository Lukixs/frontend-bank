<template>
  <div>
    <b-container class="personal-container">
      <div v-if="login">
        <h1 class="personal-container-title">
          {{ data.client.firstName }} {{ data.client.lastName }}
        </h1>
        <h4 class="personal-conatainer-cardNumber">
          {{ data.account.accountNumber }}
        </h4>

        <div class="personal-balance-card">
          <div class="personal-balance">
            <div class="personal-balance-header">Dostępne środki</div>
            <div class="personal-balance-amount">
              <div class="personal-balance-amount-header">
                {{ data.account.accountBalance }}
              </div>
              <div class="personal-balance-amount-unit">PLN</div>
            </div>
          </div>
        </div>
        <div class="personal-buttons">
          <b-button variant="primary" to="/transfer" class="personal-button"
            ><b-icon icon="cash-stack" aria-hidden="true" /> Przelew</b-button
          >
          <b-button
            variant="outline-primary"
            to="/history"
            class="personal-button"
            ><b-icon icon="clock-history" aria-hidden="true" />
            Historia</b-button
          >
        </div>
      </div>
      <div v-else>
        <p>Brak zalogowanego użytkownika</p>
      </div>
    </b-container>
    <b-container class="home-container">
      <div class="home-overlay">
        <b-card
          overlay
          img-src="https://picsum.photos/900/250/?image=4"
          img-alt="Card Image"
          text-variant="white"
          title="Witamy w naszym banku"
        >
          <b-card-text>
            Some quick example text to build on the card and make up the bulk of
            the card's content.
          </b-card-text>
        </b-card>
      </div>
      <b-card-group deck>
        <b-card
          title="Gtówka na życzenie!"
          img-src="https://picsum.photos/300/300/?image=5"
          img-alt="Image"
          img-top
        >
          <b-card-text>
            Szybko sprawnie i przez internet. W naszej placówce dajemy Ci
            nieograniczone możliwości do trzymania kredytu.
          </b-card-text>
          <template #footer>
            <small class="text-muted">Last updated 3 mins ago</small>
          </template>
        </b-card>
        <b-card
          title="Kredyt na wakacje"
          img-src="https://picsum.photos/300/300/?image=13"
          img-alt="Image"
          img-top
        >
          <b-card-text>
            Szybko sprawnie i przez internet. W naszej placówce dajemy Ci
            nieograniczone możliwości do trzymania kredytu.
          </b-card-text>
          <template #footer>
            <small class="text-muted">Last updated 3 mins ago</small>
          </template>
        </b-card>
        <b-card
          title="Spresonalizowana forma kontaktu"
          img-src="https://picsum.photos/300/300/?image=7"
          img-alt="Image"
          img-top
        >
          <b-card-text>
            Szybko sprawnie i przez internet. W naszej placówce dajemy Ci
            nieograniczone możliwości do trzymania kredytu.
          </b-card-text>
          <template #footer>
            <small class="text-muted">Last updated 3 mins ago</small>
          </template>
        </b-card>
      </b-card-group>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      login: null,
      money: null,
      data: null,
    };
  },
  components: {},
  async created() {
    // const response = await axios.get("user");
    if (localStorage.login == null) {
      console.log("Nie jesteś zalogowany");
      this.$router.push("/login");
    } else {
      try {
        const response = await axios.post("/login", {
          login: localStorage.login,
          password: localStorage.password,
        });
        this.data = response.data;
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      this.login = localStorage.login;
      this.money = localStorage.money;
    }
  },
};
</script>

<style>
@import "./css/home.scss";
</style>
