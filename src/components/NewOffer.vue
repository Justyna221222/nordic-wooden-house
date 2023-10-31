<template>
  <div class="container">
    <h2>Klient</h2>
    <div class="clients-data">
      <div class="two-columns">
        <div>
          <div class="name">
            <p>{{ this.$store.state.client.firstname }}</p>
          </div>
          <div class="name">
            <p>{{ this.$store.state.client.surname }}</p>
          </div>
          <div>
            <p>tel: {{ this.$store.state.client.tel }}</p>
          </div>
          <div>
            <p>email: {{ this.$store.state.client.email }}</p>
          </div>
        </div>
        <div>
          <div><h4>Adres dostawy:</h4></div>
          <div>
            <p>{{ this.$store.state.client.street }}</p>
          </div>
          <div>
            <p>
              {{ this.$store.state.client.zipcode }}
              {{ this.$store.state.client.city }}
            </p>
          </div>
          <div>
            <p>{{ this.$store.state.client.country }}</p>
          </div>
        </div>
      </div>
      <button class="change-client" @click="changeClient">Zmień klienta</button>
    </div>
    <h2>Nowa oferta</h2>
    <div class="new-offer">
      <div class="dates">
        <p>Data od: <input type="date" v-model="dateFrom" /></p>
        <p>Data do: <input type="date" :min="dateFrom" v-model="dateTo" /></p>
      </div>
      <div class="descritpion">
        <p>Opis:</p>
        <textarea
          type="textarea"
          id="desc"
          name="desc"
          rows="4"
          cols="50"
          v-model="description"
        ></textarea>
      </div>
    </div>
    <div v-if="error" class="error-message">
      <p>Uzupełnij daty rozpoczęścia i zakończenia oferty.</p>
    </div>
    <button class="set-offer" @click="setOffer">Dalej</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateFrom: '',
      //dateTo: '',
      description: '',
      error: false
    };
  },
  computed: {
    dateTo() {
      var dateFrom = this.dateFrom;
      console.log(dateFrom);
      var dateTo = new Date(dateFrom);
      var newDateTo = new Date(dateTo.getTime() + 14 * 86400000);
      console.log(newDateTo);
      var d = new Date(newDateTo),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [year, month, day].join('-');
    }
  },
  methods: {
    changeClient() {
      this.$router.push('/clientData');
    },
    setOffer() {
      if (this.dateFrom === '' || this.dateTo === '') {
        this.error = true;
        return;
      } else {
        this.error = false;
        this.$store.commit('setDateFrom', this.dateFrom);
        this.$store.commit('setDateTo', this.dateTo);
        this.$store.commit('setDescription', this.description);
        this.$router.push('/offerList');
      }
    }
  }
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px;
}
.clients-data {
  margin: 0 auto 50px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border: 1px solid #ced496;
  width: 600px;
}
.two-columns {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.two-columns div {
  margin: 20px;
}
.two-columns .name {
  font-weight: bold;
}
h4 {
  font-weight: bold;
}
.change-client {
  margin: 0;
  width: 100%;
}

.new-offer {
  width: 600px;
  border: 1px solid #ced496;
  padding: 20px;
  justify-content: center;
  align-items: center;
}
.dates {
  display: flex;
  flex-direction: row;
  margin: 20px;
}
.dates p {
  margin: 15px;
}
.description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
textarea {
  width: 100%;
  resize: none;
  padding: 5px;
}
input[type='date'] {
  padding: 5px;
  font-size: 17px;
}
button {
  width: 600px;
}
.error-message p {
  margin: 15px 0 0 0;
  color: red;
  font-size: 18px;
}
@media only screen and (min-width: 0px) and (max-width: 1200px) {
  .container {
    width: 100%;
    margin: 0;
  }
  h2 {
    margin: 10px auto 0 auto;
  }
  .clients-data {
    width: 95%;
    margin: 10px;
    display: flex;
    font-size: 18px;
  }

  .two-columns div {
    margin: 10px;
  }
  .new-offer {
    width: 95%;
  }
  .dates {
    margin: 10px;
    display: flex;
    flex-basis: row;
    justify-content: center;
    align-items: center;
  }
  .dates p {
    margin: 5px;
  }
  button {
    width: 95%;
  }
}
</style>
