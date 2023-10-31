<template>
  <div class="container">
    <error-message v-if="inputIsInvalid" @close="confrimError">
      <template #default>
        <p>Uzupełnij wszystkie obowiązkowe pola.</p>
      </template>
      <template #actions>
        <button @click="confrimError">Ok</button>
      </template>
    </error-message>

    <div class="clientsList">
      <div class="main-header">
        <img :src="this.imgLogo" alt="NWH" />
        <h2>Wybierz klienta z listy lub utwórz nowego</h2>
      </div>
      <div class="button-container-new-client">
        <button @click="newClient">Nowy klient</button>
      </div>

      <table id="clients" v-if="clients != ''">
        <tr>
          <th>IMIĘ</th>
          <th>TEL</th>
          <th class="mobileInvisible">EMAIL</th>
          <th>ADRES</th>

          <th class="button-container"></th>
        </tr>
        <tr v-for="client in clients" :key="client.id">
          <td>{{ client.firstname }} <br />{{ client.surname }}</td>
          <td>{{ client.tel }}</td>
          <td class="mobileInvisible">{{ client.email }}</td>
          <td>
            {{ client.street }}<br />
            {{ client.zipcode }}<br />
            {{ client.city }}<br />
            {{ client.country }}
          </td>
          <td class="button-container">
            <button @click="chooseClient(client.id)" class="choose">
              wybierz
            </button>
          </td>
        </tr>
      </table>
    </div>

    <div v-if="showNewClientBox" class="containerOfClientBox">
      <div class="background"></div>
      <div class="new-client">
        <div class="header">
          <p>Dane klienta</p>
        </div>
        <form>
          <div class="form-field">
            <label for="clientName">Imię: </label><br />
            <input type="text" id="clientName" v-model="client.name" />
          </div>
          <div class="form-field">
            <label for="clientSurname">Nazwisko: </label><br />
            <input type="text" id="clientSurname" v-model="client.surname" />
          </div>
          <div class="form-field">
            <label for="tel">tel: </label><br />
            <input type="tel" id="tel" v-model="client.tel" />
          </div>
          <div class="form-field">
            <label for="tel">email: </label><br />
            <input type="email" id="email" v-model="client.email" />
          </div>
          <h3>Adres:</h3>
          <div class="form-field">
            <label for="street">Ulica: </label><br />
            <input type="text" id="street" v-model="client.street" />
          </div>
          <div class="form-field">
            <label for="city">Miasto: </label><br />
            <input type="text" id="city" v-model="client.city" />
          </div>
          <div class="form-field">
            <label for="zipcode">Kod pocztowy: </label><br />
            <input type="text" id="zipcode" v-model="client.zipcode" />
          </div>
          <div class="form-field">
            <label for="country">Kraj: </label><br />
            <input type="text" id="country" v-model="client.country" />
          </div>
        </form>
        <div class="buttons-container">
          <button @click="backToClientList" type="button" class="next">
            Powrót
          </button>
          <button @click="sendClient" type="button" class="next">Zapisz</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '../../docs/images/NWH/NWH.png';
export default {
  data() {
    return {
      client: {
        name: '',
        surname: '',
        tel: '',
        email: '',
        street: '',
        city: '',
        zipcode: '',
        country: ''
      },
      clients: [],
      showNewClientBox: false,
      inputIsInvalid: false,
      imgLogo: logo
    };
  },
  mounted() {
    fetch(
      'https://nwhwindows-default-rtdb.europe-west1.firebasedatabase.app/test.json'
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        const results = [];
        for (const id in data) {
          results.push({
            id: id,
            firstname: data[id]['name'],
            surname: data[id]['surname'],
            tel: data[id]['tel'],
            email: data[id]['email'],
            street: data[id]['street'],
            city: data[id]['city'],
            zipcode: data[id]['zipcode'],
            country: data[id]['country']
          });
        }
        this.clients = results;
      });
  },
  methods: {
    sendClient() {
      this.setClient();
      let name = this.client.name;
      let lastname = this.client.surname;
      let tel = this.client.tel;
      let duplicatedClient = this.clients.find(
        client =>
          client.firstname === name &&
          client.surname === lastname &&
          client.tel === tel
      );
      //console.log(duplicatedClient.firstname);

      if (duplicatedClient == null) {
        console.log('send client do database');

        fetch(
          'https://nwhwindows-default-rtdb.europe-west1.firebasedatabase.app/test.json',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: this.client.name,
              surname: this.client.surname,
              tel: this.client.tel,
              email: this.client.email,
              street: this.client.street,
              city: this.client.city,
              zipcode: this.client.zipcode,
              country: this.client.country
            })
          }
        );
      } else {
        console.log(duplicatedClient);
      }
      this.showNewClientBox = false;
      this.$router.push('/newOffer');
    },
    setClient() {
      const clientData = this.client;
      if (this.client.name == '' || this.client.surname == '') {
        this.inputIsInvalid = true;
        return;
      } else {
        this.$store.commit('setClient', clientData);
      }
    },
    fetchClients() {
      fetch(
        'https://nwhwindows-default-rtdb.europe-west1.firebasedatabase.app/test.json'
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          const results = [];
          for (const id in data) {
            results.push({
              id: id,
              firstname: data[id]['name'],
              surname: data[id]['surname'],
              tel: data[id]['tel'],
              email: data[id]['email'],
              street: data[id]['street'],
              city: data[id]['city'],
              zipcode: data[id]['zipcode'],
              country: data[id]['country']
            });
          }
          this.clients = results;
        });
    },
    backToClientList() {
      this.client = [];
      this.showNewClientBox = false;
    },
    chooseClient(id) {
      const choosenClient = this.clients.find(client => client.id === id);
      this.$store.commit('setClient', choosenClient);
      this.$router.push('/newOffer');
    },
    newClient() {
      this.showNewClientBox = true;
    },
    confrimError() {
      this.inputIsInvalid = false;
    }
  }
};
</script>

<style scoped>
.container {
  margin: 20px auto;
}
.main-header {
  display: flex;
  justify-content: space-around;
}
h3 {
  margin: 30px 0 10px 0;
}
.next {
  float: right;
  padding: 10px 50px;
  display: inline-block;
  margin-top: 20px;
  margin-right: 20px;
  width: 200px;
}
.clientsList {
  margin: 10%;
}
#clients {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin: 30px 0;
}

#clients td,
#clients th {
  border: 1px solid rgb(191, 189, 189);
  padding: 8px;
}

#clients tr:nth-child(even) {
  background-color: #f2f2f2;
}

#clients tr:hover {
  background-color: #ddd;
}

#clients th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #f7e8c5;
  color: black;
}
.containerOfClientBox {
  width: 100vw;
  height: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}
.background {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}
.new-client {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 10vh;
  left: 33%;
  width: 33%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 20px;
  margin: 0 auto;
  overflow: hidden;
  background-color: rgba(251, 251, 251, 0.9);
}
.new-client form {
  width: 70%;
}
.new-client .header p {
  background-color: #f7e8c5;
  padding: 10px;
}
.container form div {
  margin: 10px;
}
form .form-field {
  width: 100%;
}
form .form-field input {
  border: 1px solid rgb(183, 173, 173);
  width: 100%;
  height: 25px;
}
.header {
  width: 100%;
}
.buttons-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 70%;
}
.buttons-container button {
  width: 100%;
  margin: 10px;
}
.main-header img {
  margin: 10px;
}
.main-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}
.main-header button {
  width: 100%;
  font-size: 15px;
  padding: 8px;
  margin: 8px;
}
.button-container-new-client {
  display: flex;
  justify-content: center;
  align-items: center;
}
.button-container-new-client button {
  width: 100%;
  align-items: center;
  padding: 8px;
  margin: 10px auto 5px auto;
}
@media only screen and (min-width: 0px) and (max-width: 1200px) {
  body {
    width: 100%;
  }
  .container1 {
    margin: 0;
    padding: 0;
    display: block;
    width: 100%;
  }
  .clientsList {
    margin: 5px;
  }
  .mobileInvisible {
    display: none;
  }
  #clients {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    margin: 5px 0;
    font-size: 13px;
  }
  .choose {
    font-size: 14px;
    padding: 10px;
    margin: 0x;
  }
  #clients td,
  #clients th {
    padding: 5px;
    width: 24%;
    text-align: left;
  }
  .button-container {
    align-items: center;
    padding: 0;
    margin: 0;
  }
  .button-container button {
    margin: 0;
  }
  .main-header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
  }
  .main-header button {
    width: 100%;
    font-size: 15px;
    padding: 8px;
    margin: 8px;
  }
  .main-header img {
    margin: 10px;
  }
  h2 {
    font-size: 18px;
  }
  .button-container-new-client button {
    width: 100%;
    align-items: center;
    padding: 8px;
    margin: 10px auto 5px auto;
  }
  .new-client {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    position: fixed;
    margin: 10px auto;
    top: 0;
    left: 0;
    width: 100%;
  }
  .buttons-container button {
    width: 80%;
    margin: 5px;
  }
}
</style>
