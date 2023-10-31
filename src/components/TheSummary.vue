<template>
  <div class="summary">
    <table class="table table-striped">
      <tbody>
        <tr class="highlighted">
          <th>Element okna</th>
          <th>Wybrany</th>
        </tr>
        <tr>
          <td>System:</td>
          <td>{{ this.$store.state.windowSystem }}</td>
        </tr>
        <tr>
          <td>Typ:</td>
          <td>{{ this.$store.state.windowType }}</td>
        </tr>
        <tr>
          <td>Ilość:</td>
          <td>{{ this.$store.state.winQuantity }}</td>
        </tr>
        <tr>
          <td>Rozmiar:</td>
          <td>
            {{ this.$store.state.winWidth }} x {{ this.$store.state.winHeight }}
          </td>
        </tr>
        <tr>
          <td>Frezowanie:</td>
          <td>{{ this.$store.state.winMilling }}</td>
        </tr>
        <tr v-if="isThereHandle">
          <td>Klamki:</td>
          <td>{{ this.$store.state.winHandles }}</td>
        </tr>
        <tr v-if="isThisOpened">
          <td>Otwieranie:</td>
          <td>{{ this.$store.state.winOpen }}</td>
        </tr>
        <tr v-if="isTherePost">
          <td>Słupek:</td>
          <td>{{ this.$store.state.winPost }}</td>
        </tr>
        <tr v-if="isThereDoorstep">
          <td>Próg:</td>
          <td>{{ this.$store.state.winDoorStep }}</td>
        </tr>
        <tr>
          <td>Profil:</td>
          <td>{{ this.$store.state.winProfile }}</td>
        </tr>
        <tr>
          <td>Kolor wewnętrzny:</td>
          <td>
            {{ this.$store.state.winInsideColor }}
            {{ this.$store.state.winInsideColorRAL }}
          </td>
        </tr>
        <tr>
          <td>Kolor zewnętrzny:</td>
          <td>
            {{ this.$store.state.winOutsideColor }}
            {{ this.$store.state.winOutsideColorRAL }}
          </td>
        </tr>
        <tr>
          <td>Wypełnienie:</td>
          <td>{{ this.$store.state.winFilling }}</td>
        </tr>
        <tr>
          <td>Ilość szyb:</td>
          <td>{{ this.$store.state.winGlassesNumber }}</td>
        </tr>
        <tr v-if="isBrake">
          <td>Hamulec:</td>
          <td>{{ this.$store.state.winBrake }}</td>
        </tr>
        <tr v-if="isFitting">
          <td>Typ okucia:</td>
          <td>{{ this.$store.state.winFitting }}</td>
        </tr>
        <tr v-if="isDiffuser">
          <td>Nawiewnik i okapnik:</td>
          <td>{{ this.$store.state.winDiffuserDripCap }}</td>
        </tr>
        <tr v-if="areHooksForviders">
          <td>Haczyki:</td>
          <td>{{ this.$store.state.winHooks }}</td>
        </tr>
        <tr v-if="areHooksForviders">
          <td>Forviders:</td>
          <td>{{ this.$store.state.winForviders }}</td>
        </tr>
        <tr v-if="areWinMuntins">
          <td>Szprosy:</td>
          <td>{{ this.$store.state.winMuntins }}</td>
        </tr>
        <tr v-if="areWinMuntins">
          <td>Typ szprosów:</td>
          <td>{{ this.$store.state.winMuntinType }}</td>
        </tr>
        <tr v-if="areWinMuntins">
          <td>Kolor szprosów:</td>
          <td>
            {{ this.$store.state.winMuntinColor }}
            {{ this.$store.state.winMuntinColorRAL }}
          </td>
        </tr>
        <tr v-if="areWinMuntins">
          <td>Kolor szprosów RAL:</td>
          <td>{{ this.$store.state.winMuntinColorRAL }}</td>
        </tr>
        <tr v-if="areWinMuntins">
          <td>Ilość szprosów:</td>
          <td>
            Pionowo:
            {{ this.$store.state.winCuantityHorizontalMuntins }} Poziomo:
            {{ this.$store.state.winCuantityVerticalMuntins }}
          </td>
        </tr>
        <tr v-if="isEspagnolette">
          <td>Zwrotnica:</td>
          <td>{{ this.$store.state.winEspagnolette }}</td>
        </tr>
        <tr v-if="isGrabber">
          <td>Pochwycik balkonowy z zatrzaskiem:</td>
          <td>{{ this.$store.state.winGrabber }}</td>
        </tr>
        <tr>
          <td v-if="isInsert">Insert:</td>
          <td>{{ this.$store.state.winInsert }}</td>
        </tr>
        <tr v-if="isDescription">
          <td>Opis:</td>
          <td>{{ this.$store.state.winDescription }}</td>
        </tr>
      </tbody>
    </table>

    <form @submit.prevent="sendEmail">
      <div>
        <div id="email-container">
          <p>E-mail</p>
          <input id="yourName" type="email" v-model="yourEmail" />
        </div>
        <p v-if="invalidEmail" class="warning">Wprowadź adres e-mail</p>
      </div>
      <div v-if="emailSend" class="emailSend">
        <p>Wiadomość została wysłana. Dziękujemy!</p>
      </div>
      <div v-if="errSend">
        <p>Coś poszło nie tak, spróbuj ponownie!</p>
      </div>
      <div>
        <input type="submit" value="Wyślij" class="submit-button" />
      </div>
    </form>
    <div class="buttons">
      <div>
        <button @click="addItem">Dodaj następną pozycję</button>
      </div>

      <!-- <div>
        <button @click="fromBeginning">Calculate from the beginning</button>
      </div>-->
    </div>
  </div>
</template>
<script>
import emailjs from '@emailjs/browser';
//import store from '../store/index.js';  // import the store
export default {
  data() {
    return {
      yourEmail: '',
      emailSend: false,
      errSend: false,
      invalidEmail: false,
      mojeOkna: []
    };
  },
  methods: {
    addItem() {
      var window = [];
      var clientName =
        this.$store.state.client.firstname +
        ' ' +
        this.$store.state.client.surname;

      var clientsName = '<br><br>Klient: ' + clientName;
      window.push(clientsName);
      var clientTel = '<br>Tel: ' + this.$store.state.client.tel;
      window.push(clientTel);
      var clientEmail = '<br>Email: ' + this.$store.state.client.email;
      window.push(clientEmail);
      var clientAddress =
        '<br>Adres: ' +
        this.$store.state.client.street +
        ' ' +
        this.$store.state.client.zipcode +
        ' ' +
        this.$store.state.client.country;
      window.push(clientAddress);
      var date =
        '<br>Termin wykonania: ' +
        'od ' +
        this.$store.state.dateFrom +
        ' do ' +
        this.$store.state.dateTo;
      window.push(date);
      var isDesc = this.$store.state.description;
      if (isDesc !== '') {
        var desc = '<br>Opis: ' + this.$store.state.description;
        window.push(desc);
      }
      var quantity = '<br>Ilość: ' + this.$store.state.winQuantity;
      window.push(quantity);
      var system = '<br>System: ' + this.$store.state.windowSystem;
      window.push(system);
      var width = '<br> Szerokość: ' + this.$store.state.winWidth;
      window.push(width);
      var height = '<br> Wysokość: ' + this.$store.state.winHeight;
      window.push(height);
      var milling = '<br> Frezowanie: ' + this.$store.state.winMilling;
      window.push(milling);
      var profil = '<br> Profil: ' + this.$store.state.winProfile;
      window.push(profil);
      var insideColorRal;
      if (
        this.$store.state.winInsideColorRAL === '' ||
        this.$store.state.winInsideColorRAL === undefined
      ) {
        insideColorRal = '';
      } else {
        insideColorRal = this.$store.state.winInsideColorRAL;
      }
      var insideColor =
        '<br> Kolor wewnętrzny: ' +
        this.$store.state.winInsideColor +
        ' ' +
        insideColorRal;
      window.push(insideColor);
      var outsideColorRal;
      if (
        this.$store.state.winOutsideColorRAL === '' ||
        this.$store.state.winOutsideColorRAL === undefined
      ) {
        outsideColorRal = '';
      } else {
        outsideColorRal = this.$store.state.winOutsideColorRAL;
      }
      var outsideColor =
        '<br> Kolor zewnętrzny: ' +
        this.$store.state.winOutsideColor +
        ' ' +
        outsideColorRal;
      window.push(outsideColor);
      var filling = '<br>Wypełnienie: ' + this.$store.state.winFilling;
      window.push(filling);
      var glassesNumber =
        '<br> Ilość szyb: ' + this.$store.state.winGlassesNumber;
      window.push(glassesNumber);
      var isBrake = this.$store.state.isBrake;
      if (isBrake) {
        var brake = '<br>Hamulec: ' + this.$store.state.winBrake;
        window.push(brake);
      }
      var isFitting = this.$store.state.isFitting;
      if (isFitting) {
        var fitting = '<br>Okucie: ' + this.$store.state.winFitting;
        window.push(fitting);
      }
      var isEspagnolette = this.$store.state.isEspagnolette;
      if (isEspagnolette) {
        var espagnolette =
          '<br>Typ zasuwnicy: ' + this.$store.state.winEspagnolette;
        window.push(espagnolette);
      }
      var isInsert = this.$store.state.isInsert;
      if (isInsert) {
        var insert = '<br>Wkładka: ' + this.$store.state.winInsert;
        window.push(insert);
      }
      var isDiffuser = this.$store.state.isDiffuser;
      if (isDiffuser) {
        var diffuser =
          '<br>Nawiewnik i okapnik: ' + this.$store.state.winDiffuserDripCap;
        window.push(diffuser);
      }
      var areHooksForviders = this.$store.state.areHooksForviders;
      if (areHooksForviders) {
        var hooks = '<br>Haczyki: ' + this.$store.state.winHooks;
        window.push(hooks);
        var forviders = '<br>Forviders: ' + this.$store.state.winForviders;
        window.push(forviders);
      }
      var areMuntins = this.$store.state.areMuntins;
      if (areMuntins === 'TAK') {
        var muntinColorRal = this.$store.state.winMuntinColorRAL;
        var muntinRAL;
        if (muntinColorRal === ' ' || muntinColorRal === undefined) {
          muntinRAL = '';
        } else {
          muntinRAL = this.$store.state.winMuntinColorRAL;
        }
        var muntins =
          '<br>Szprosy: ' +
          this.$store.state.winMuntinType +
          ' <br>Kolor szpros: ' +
          this.$store.state.winMuntinColor +
          ' ' +
          muntinRAL +
          '<br> Ilość pól poziomo: ' +
          this.$store.state.winCuantityHorizontalMuntins +
          '<br> Iość pól pionowo: ' +
          this.$store.state.winCuantityHorizontalMuntins;
        window.push(muntins);
      }
      var isGrabber = this.$store.state.isGrabber;
      if (isGrabber) {
        var grabber =
          '<br>Pochwycik balkonowy z zatrzaskiem: ' +
          this.$store.state.winGrabber;
        window.push(grabber);
      }
      var winDescription = this.$store.state.winDescription;
      if (winDescription !== undefined) {
        var description =
          '<br>Dodatkowy opis: ' + this.$store.state.winDescription;
        window.push(description);
      }

      /*

      const window = {
        Klient:
          this.$store.state.client.firstname +
          ' ' +
          this.$store.state.client.surname +
          ' tel: ' +
          this.$store.state.client.tel +
          ' Email: ' +
          this.$store.state.client.email +
          ' Adres: ' +
          this.$store.state.client.street +
          ' ' +
          this.$store.state.client.zipcode +
          ' ' +
          this.$store.state.client.country,
        Data:
          'od ' +
          this.$store.state.dateFrom +
          ' do ' +
          this.$store.state.dateTo,
        Opis: this.$store.state.description,
        Ilość: this.$store.state.winQuantity,
        System: this.$store.state.windowSystem,
        Typ: this.$store.state.windowType,
        Szerokość: this.$store.state.winWidth,
        Wysokość: this.$store.state.winHeight,
        Profil: this.$store.state.winProfile,
        Frezowanie: this.$store.state.winMilling,
        Klamki: this.$store.state.winHandles,
        Otwieranie: this.$store.state.winOpen,
        Słupek: this.$store.state.winPost,
        Próg: this.$store.state.winDoorStep,
        'Kolor wewnętrzny':
          this.$store.state.winInsideColor +
          ' ' +
          this.$store.state.winInsideColorRAL,
        'Kolor zewnętrzny':
          this.$store.state.winOutsideColor +
          ' ' +
          this.$store.state.winOutsideColorRAL,
        Wypełnienie: this.$store.state.winFilling,
        'Ilość szyb': this.$store.state.winGlassesNumber,
        Hamulec: this.$store.state.winBrake,
        'Nawiewnik i okapnik': this.$store.state.winDiffuserDripCap,
        Haczyk: this.$store.state.winHooks,
        Forviders: this.$store.state.winForviders,
        Szprosy:
          this.$store.state.winMuntins +
          'Typ: ' +
          this.$store.state.winMuntinType +
          ' ' +
          this.$store.state.winMuntinColor +
          this.$store.state.winMuntinColorRAL,
        'Szprosy ilość poziomo/pionowo':
          this.$store.state.winCuantityHorizontalMuntins +
          ' / ' +
          this.$store.state.winCuantityVerticalMuntins,
        Okucia: this.$store.state.winFitting,
        Zasuwnica: this.$store.state.winEspagnolette,
        'Pochwycik balkonowy': this.$store.state.winGrabber,
        'Dodatkowy opis': this.$store.state.winDescription
      };
      console.log(window);
      console.log(window.typ);*/

      this.$store.commit('addNewWindow', window);
      /* Clear store to add new window*/
      (this.$store.state.winQuantity = ''),
        (this.$store.state.windowSystem = ''),
        (this.$store.state.windowType = ''),
        (this.$store.state.winWidth = ''),
        (this.$store.state.winHeight = ''),
        (this.$store.state.winProfile = ''),
        (this.$store.state.winMilling = ''),
        (this.$store.state.winHandles = ''),
        (this.$store.state.winOpen = ''),
        (this.$store.state.winPost = ''),
        (this.$store.state.winDoorStep = ''),
        (this.$store.state.winInsideColor = ''),
        (this.$store.state.winInsideColorRAL = ''),
        (this.$store.state.winOutsideColor = ''),
        (this.$store.state.winOutsideColorRAL = ''),
        (this.$store.state.winFilling = ''),
        (this.$store.state.winGlassesNumber = ''),
        (this.$store.state.winBrake = ''),
        (this.$store.state.winDiffuserDripCap = ''),
        (this.$store.state.winHooks = '');
      this.$store.state.winForviders = '';
      this.$store.state.winMuntins = '';
      this.$store.state.winMuntinType = '';
      this.$store.state.winMuntinColor = '';
      this.$store.state.winMuntinColorRAL = '';
      this.$store.state.winCuantityHorizontalMuntins = '';
      this.$store.state.winCuantityVerticalMuntins = '';
      this.$store.state.winFitting = '';
      this.$store.state.winEspagnolette = '';
      this.$store.state.winGrabber = '';
      this.$store.state.winDescription = '';
      (this.yourEmail = ''), this.$router.push('/newWindow');
    },
    sendEmail() {
      let mail = this.yourEmail;
      if (mail === '' || mail.includes('@')) {
        var window = [];
        var clientName =
          this.$store.state.client.firstname +
          ' ' +
          this.$store.state.client.surname;

        var clientsName = '<br><br>Klient: ' + clientName;
        window.push(clientsName);
        var clientTel = '<br>Tel: ' + this.$store.state.client.tel;
        window.push(clientTel);
        var clientEmail = '<br>Email: ' + this.$store.state.client.email;
        window.push(clientEmail);
        var clientAddress =
          '<br>Adres: ' +
          this.$store.state.client.street +
          ' ' +
          this.$store.state.client.zipcode +
          ' ' +
          this.$store.state.client.country;
        window.push(clientAddress);
        var date =
          '<br>Termin wykonania: ' +
          'od ' +
          this.$store.state.dateFrom +
          ' do ' +
          this.$store.state.dateTo;
        window.push(date);
        var isDesc = this.$store.state.description;
        if (isDesc !== '') {
          var desc = '<br>Opis: ' + this.$store.state.description;
          window.push(desc);
        }
        var quantity = '<br>Ilość: ' + this.$store.state.winQuantity;
        window.push(quantity);
        var system = '<br>System: ' + this.$store.state.windowSystem;
        window.push(system);
        var width = '<br> Szerokość: ' + this.$store.state.winWidth;
        window.push(width);
        var height = '<br> Wysokość: ' + this.$store.state.winHeight;
        window.push(height);
        var milling = '<br> Frezowanie: ' + this.$store.state.winMilling;
        window.push(milling);
        var profil = '<br> Profil: ' + this.$store.state.winProfile;
        window.push(profil);
        var insideColorRal;
        if (
          this.$store.state.winInsideColorRAL === '' ||
          this.$store.state.winInsideColorRAL === undefined
        ) {
          insideColorRal = '';
        } else {
          insideColorRal = this.$store.state.winInsideColorRAL;
        }
        var insideColor =
          '<br> Kolor wewnętrzny: ' +
          this.$store.state.winInsideColor +
          ' ' +
          insideColorRal;
        window.push(insideColor);
        var outsideColorRal;
        if (
          this.$store.state.winOutsideColorRAL === '' ||
          this.$store.state.winOutsideColorRAL === undefined
        ) {
          outsideColorRal = '';
        } else {
          outsideColorRal = this.$store.state.winOutsideColorRAL;
        }
        var outsideColor =
          '<br> Kolor zewnętrzny: ' +
          this.$store.state.winOutsideColor +
          ' ' +
          outsideColorRal;
        window.push(outsideColor);
        var filling = '<br>Wypełnienie: ' + this.$store.state.winFilling;
        window.push(filling);
        var glassesNumber =
          '<br> Ilość szyb: ' + this.$store.state.winGlassesNumber;
        window.push(glassesNumber);
        var isBrake = this.$store.state.isBrake;
        if (isBrake) {
          var brake = '<br>Hamulec: ' + this.$store.state.winBrake;
          window.push(brake);
        }
        var isFitting = this.$store.state.isFitting;
        if (isFitting) {
          var fitting = '<br>Okucie: ' + this.$store.state.winFitting;
          window.push(fitting);
        }
        var isEspagnolette = this.$store.state.isEspagnolette;
        if (isEspagnolette) {
          var espagnolette =
            '<br>Typ zasuwnicy: ' + this.$store.state.winEspagnolette;
          window.push(espagnolette);
        }
        var isInsert = this.$store.state.isInsert;
        if (isInsert) {
          var insert = '<br>Wkładka: ' + this.$store.state.winInsert;
          window.push(insert);
        }
        var isDiffuser = this.$store.state.isDiffuser;
        if (isDiffuser) {
          var diffuser =
            '<br>Nawiewnik i okapnik: ' + this.$store.state.winDiffuserDripCap;
          window.push(diffuser);
        }
        var areHooksForviders = this.$store.state.areHooksForviders;
        if (areHooksForviders) {
          var hooks = '<br>Haczyki: ' + this.$store.state.winHooks;
          window.push(hooks);
          var forviders = '<br>Forviders: ' + this.$store.state.winForviders;
          window.push(forviders);
        }
        var areMuntins = this.$store.state.areMuntins;
        if (areMuntins === 'TAK') {
          var muntinColorRal = this.$store.state.winMuntinColorRAL;
          var muntinRAL;
          if (muntinColorRal === ' ' || muntinColorRal === undefined) {
            muntinRAL = '';
          } else {
            muntinRAL = this.$store.state.winMuntinColorRAL;
          }
          var muntins =
            '<br>Szprosy: ' +
            this.$store.state.winMuntinType +
            ' <br>Kolor szpros: ' +
            this.$store.state.winMuntinColor +
            ' ' +
            muntinRAL +
            '<br> Ilość pól poziomo: ' +
            this.$store.state.winCuantityHorizontalMuntins +
            '<br> Iość pól pionowo: ' +
            this.$store.state.winCuantityHorizontalMuntins;
          window.push(muntins);
        }
        var isGrabber = this.$store.state.isGrabber;
        if (isGrabber) {
          var grabber =
            '<br>Pochwycik balkonowy z zatrzaskiem: ' +
            this.$store.state.winGrabber;
          window.push(grabber);
        }
        var winDescription = this.$store.state.winDescription;
        if (winDescription !== undefined) {
          var description =
            '<br>Dodatkowy opis: ' + this.$store.state.winDescription;
          window.push(description);
        }

        this.$store.commit('addNewWindow', window);

        //  if (this.yourEmail == '') {
        //   this.invalidEmail = true;
        //   return;
        // } else {
        const Windows = this.$store.state.Windows;

        //   var parsed = '';
        //  for (let i = 0; i < Windows.length; i++) {
        //   var Okna = Windows[i];
        //   for (var el in Okna) {
        //     parsed += Windows[el] + '<br>';
        //   }
        //   parsed += '<br><br><br>';
        //  }

        // var parsed = '';
        // for (let i = 0; i < Windows.length; i++) {
        //   var Okna = Windows[i];
        //   for (var property in Okna) {
        //     parsed += property + ' : ' + Okna[property] + '\r\n' + '<br>';
        //   }
        //   parsed += '<br><br><br>';
        // }

        // this.mojeOkna = parsed;
        console.log(this.mojeOkna);
        // }

        const templateParams = {
          Okna: Windows,
          // Okna: this.mojeOkna,
          yourEmail: this.yourEmail
        };
        emailjs
          .send(
            'service_u5bo6u3',
            'template_7qaf81v',
            templateParams,
            'Bk9OW_oJI8NKfrxhJ'
          )
          .then(
            response => {
              this.emailSend = true;
              console.log('SUCCESS!', response.status, response.text);
            },
            err => {
              this.errSend = true;
              console.log('FAILED...', err);
            }
          );

        setTimeout(() => {
          this.$router.push('/');
          (this.$store.state.winQuantity = ''),
            (this.$store.state.windowSystem = ''),
            (this.$store.state.windowType = ''),
            (this.$store.state.winWidth = ''),
            (this.$store.state.winHeight = ''),
            (this.$store.state.winProfile = ''),
            (this.$store.state.winMilling = ''),
            (this.$store.state.winHandles = ''),
            (this.$store.state.winOpen = ''),
            (this.$store.state.winPost = ''),
            (this.$store.state.winDoorStep = ''),
            (this.$store.state.winInsideColor = ''),
            (this.$store.state.winInsideColorRAL = ''),
            (this.$store.state.winOutsideColor = ''),
            (this.$store.state.winOutsideColorRAL = ''),
            (this.$store.state.winFilling = ''),
            (this.$store.state.winGlassesNumber = ''),
            (this.$store.state.winBrake = ''),
            (this.$store.state.winDiffuserDripCap = ''),
            (this.$store.state.winHooks = '');
          this.$store.state.winForviders = '';
          this.$store.state.winMuntins = '';
          this.$store.state.winMuntinType = '';
          this.$store.state.winMuntinColor = '';
          this.$store.state.winMuntinColorRAL = '';
          this.$store.state.winCuantityHorizontalMuntins = '';
          this.$store.state.winCuantityVerticalMuntins = '';
          this.$store.state.winFitting = '';
          this.$store.state.winEspagnolette = '';
          this.$store.state.winGrabber = '';
          this.$store.state.winDescription = '';
          (this.$store.state.Windows = []), (this.yourEmail = '');
        }, 5000);
      } else {
        return;
      }
    },

    validateEmail() {
      if (this.yourEmail == '') {
        this.invalidEmail = true;
      } else {
        this.invalidEmail = false;
      }
    }
    /* fromBeginning() {
      (this.$store.state.winType = ''),
        (this.$store.state.width = ''),
        (this.$store.state.height = ''),
        (this.$store.state.winSizePrice = ''),
        (this.$store.state.winArea = ''),
        (this.$store.state.winProfile = ''),
        (this.$store.state.winProfilePrice = ''),
        (this.$store.state.winVenner = ''),
        (this.$store.state.winVennerPrice = ''),
        (this.$store.state.winGlass = ''),
        (this.$store.state.winGlassPrice = ''),
        (this.$store.state.winFrame = ''),
        (this.$store.state.winFramePrice = ''),
        (this.$store.state.winMuntins = ''),
        (this.$store.state.winMuntinsPrice = ''),
        (this.$store.state.winDiffuser = ''),
        (this.$store.state.winDiffuserPrice = ''),
        (this.$store.state.winBlind = ''),
        (this.$store.state.winBlindPrice = ''),
        (this.$store.state.basketDisabled = false),
        (this.$store.state.Windows = []),
        (this.yourEmail = ''),
        this.$router.push('/');
    }*/
  },
  computed: {
    isThereHandle() {
      let isHandle = this.$store.state.areHandles;
      return isHandle;
    },
    isTherePost() {
      let isPost = this.$store.state.isPost;
      return isPost;
    },
    posts() {
      let posts = this.$store.state.posts;
      return posts;
    },
    isThisOpened() {
      let isOpened = this.$store.state.isOpened;
      return isOpened;
    },
    openedOptions() {
      let openOptions = this.$store.state.openedOptions;
      return openOptions;
    },
    isThereDoorstep() {
      let isDoorstep = this.$store.state.isDoorstep;
      return isDoorstep;
    },
    doorSteps() {
      let doorsteps = this.$store.state.doorSteps;
      return doorsteps;
    },
    profilesToChoose() {
      let chooseProfiles = this.$store.state.profilesToChoose;
      return chooseProfiles;
    },
    colorsOutiseAndInside() {
      let colorsOutIn = this.$store.state.colorsOutiseAndInside;
      return colorsOutIn;
    },
    fillingToChoose() {
      let filling = this.$store.state.filling;
      return filling;
    },
    isBrake() {
      let brake = this.$store.state.isBrake;
      return brake;
    },
    isFitting() {
      let fitting = this.$store.state.isFitting;
      return fitting;
    },
    isEspagnolette() {
      let espagnolette = this.$store.state.isEspagnolette;
      return espagnolette;
    },
    isInsert() {
      let insert = this.$store.state.isInsert;
      return insert;
    },
    isDiffuser() {
      let isDiffuser = this.$store.state.isDiffuser;
      return isDiffuser;
    },
    areHooksForviders() {
      let areHF = this.$store.state.areHooksForviders;
      return areHF;
    },
    areWinMuntins() {
      let arethereMuntins = this.$store.state.winMuntins;
      if (arethereMuntins === 'NIE') {
        return false;
      } else {
        return true;
      }
    },
    isGrabber() {
      let isThereGrabber = this.$store.state.isGrabber;
      return isThereGrabber;
    },
    isDescription() {
      let desc = this.$store.state.winDescription;
      if (desc === undefined) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.summary {
  font-size: 16px;
  margin: 20px;
}
table {
  border: 1px solid black;
  border-collapse: collapse;
  margin: 20px;
}

tr {
  line-height: 30px;
  border: 1px solid rgb(106, 106, 106);
  font-size: 17px;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}

td {
  padding: 0 10px;
  border: 1px solid rgb(146, 146, 146);
}
.highlighted {
  background-color: #cfac58;
  line-height: 30px;
}
table {
  margin: 0;
  padding: 0;
}
.big {
  font-size: 19px;
  font-weight: bold;
  color: #cb2c2c;
  margin: 20px 0 0 0;
}
.small {
  font-size: 15px;
}
#email-container {
  margin: 20px;
}
.emailSend p {
  color: green;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
}
input {
  margin: 0 0 20px 0;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 30px 0;
}
button {
  padding: 0.75rem 1.5rem;
  width: 300px;
  font-family: inherit;
  background-color: #cfac58;
  border: 1px solid #000000;
  color: black;
  cursor: pointer;
  margin: 0;
}
input[type='submit'] {
  padding: 0.75rem 1.5rem;
  width: 300px;
  font-family: inherit;
  font-size: 18px;
  background-color: darkgreen;
  border: 1px solid #000000;
  color: white;
  cursor: pointer;
  margin: 0;
}
input[type='submit']:hover {
  background-color: green;
  border: 2px solid #003300;
}

button:hover,
button:active {
  background-color: #947e4a;
  border: 1px solid #270041;
}
.warning {
  color: red;
}
@media only screen and (min-width: 0px) and (max-width: 900px) {
  .header {
    margin: 20px 0;
  }
  .next {
    padding: 5px 20px;
    font-size: 14px;
    margin: 20px 20px 20px 0;
  }
  .previous {
    padding: 5px 20px;
    font-size: 14px;
    margin: 20px 0 20px 20px;
  }
  .buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0;
    margin: 0;
  }
  .add-new {
    display: block;
    width: 100%;
    margin: 3px 0;
    font-family: inherit;
    background-color: #cb2c2c;
    border: 1px solid #3a0061;
    color: white;
    cursor: pointer;
  }
  input[type='submit'] {
    padding: 0.75rem 1.5rem;
    width: 300px;
    font-family: inherit;
    font-size: 18px;
    background-color: darkgreen;
    border: 1px solid #000000;
    color: white;
    cursor: pointer;
    margin: 10px;
  }
}
</style>
