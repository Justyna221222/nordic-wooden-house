<template>
  <div class="info-container">
    <div>
      <h2>Główne</h2>
      <div class="input-container">
        <label for="ilosc">Ilość: </label>
        <input type="number" id="ilosc" v-model="mainInfo.quantity" />
      </div>
      <div class="input-container">
        <label for="width">Szerokość całkowita (w mm): </label>
        <input type="number" id="width" v-model="mainInfo.winWidth" />
      </div>
      <div class="input-container">
        <label for="height">Wysokość całkowita (w mm): </label>
        <input type="number" id="height" v-model="mainInfo.winHeight" />
      </div>
      <div class="input-container">
        <label for="milling">Frezowanie: </label>
        <select id="milling" v-model="mainInfo.milling">
          <option disabled value="">Wybierz</option>
          <option>Tak</option>
          <option>Nie</option>
        </select>
      </div>
      <div v-if="isThereHandle" class="input-container">
        <label for="handles">Klamki: </label>
        <select id="handles" v-model="mainInfo.handles">
          <option disabled value="">Wybierz</option>
          <option v-for="handle in systemsData.handles" :key="handle.name">
            {{ handle.name }}
          </option>
        </select>
      </div>

      <div v-if="isTherePost" class="input-container">
        <label for="post">Słupek: </label>
        <select id="post" v-model="mainInfo.post">
          <option disabled value="">Wybierz</option>
          <option v-for="post in posts" :key="post">
            {{ post }}
          </option>
        </select>
      </div>
      <div v-if="isThisOpened" class="input-container">
        <label for="opened">Otwieranie: </label>
        <select id="opened" v-model="mainInfo.open">
          <option disabled value="">Wybierz</option>
          <option v-for="openOption in openedOptions" :key="openOption">
            {{ openOption }}
          </option>
        </select>
      </div>
      <div v-if="isThereDoorstep" class="input-container">
        <label for="doorstep">Próg: </label>
        <select id="doorstep" v-model="mainInfo.doorStep">
          <option disabled value="">Wybierz</option>
          <option v-for="step in doorSteps" :key="step">
            {{ step }}
          </option>
        </select>
      </div>

      <h2>Kolor:</h2>
      <div class="input-container">
        <label for="profile">Profil: </label>
        <select id="profile" v-model="mainInfo.profile">
          <option disabled value="">Wybierz</option>
          <option v-for="profile in profilesToChoose" :key="profile">
            {{ profile }}
          </option>
        </select>
      </div>
      <div class="input-container">
        <label for="insideColor">Kolor wewnętrzny: </label>
        <select id="insideColor" v-model="mainInfo.insideColor">
          <option disabled value="">Wybierz</option>
          <option v-for="color in colorsOutiseAndInside" :key="color">
            {{ color }}
          </option>
        </select>
        <div
          v-if="this.mainInfo.insideColor === 'KOLOR NIESTANDARDOWY RAL'"
          class="colorRAL"
        >
          <label for="insideColorRAL">Kolor RAL numer:</label>
          <input
            type="text"
            v-model="mainInfo.insideColorRAL"
            id="insideColorRAL"
          />
        </div>
      </div>
      <div class="input-container">
        <label for="insideColor">Kolor zewnętrzny: </label>
        <select id="insideColor" v-model="mainInfo.outsideColor">
          <option disabled value="">Wybierz</option>
          <option v-for="color in colorsOutiseAndInside" :key="color">
            {{ color }}
          </option>
        </select>
        <div
          v-if="this.mainInfo.outsideColor === 'KOLOR NIESTANDARDOWY RAL'"
          class="colorRAL"
        >
          <label for="outsideColorRAL">Kolor RAL numer:</label>
          <input
            type="text"
            v-model="mainInfo.outsideColorRAL"
            id="outsideColorRAL"
          />
        </div>
      </div>
      <h2>Wypełnienie</h2>
      <div class="input-container">
        <label for="filling">Typ wypełnienia: </label>
        <select id="filling" v-model="mainInfo.filling">
          <option disabled value="">Wybierz</option>
          <option v-for="filling in fillingToChoose" :key="filling">
            {{ filling }}
          </option>
        </select>
      </div>
      <div class="input-container">
        <label for="glassesNumber">Ilość szyb: </label>
        <select id="glassesNumber" v-model="mainInfo.glassesNumber">
          <option disabled value="">Wybierz</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
      <div class="input-container">
        <h2 v-if="isBrake || isFitting || isEspagnolette || isInsert">
          Okucia
        </h2>
        <div v-if="isBrake" class="input-container">
          <label for="brakes">Hamulec: </label>
          <select id="brakes" v-model="mainInfo.brake">
            <option disabled value="">Wybierz</option>
            <option v-for="brake in systemsData.brakeOptions" :key="brake">
              {{ brake }}
            </option>
          </select>
        </div>
        <div v-if="isFitting" class="input-container">
          <label for="fitting">Typ okucia: </label>
          <select id="fitting" v-model="mainInfo.fitting">
            <option disabled value="">Wybierz</option>
            <option
              v-for="fitting in systemsData.fittingOptions"
              :key="fitting"
            >
              {{ fitting }}
            </option>
          </select>
        </div>
        <div v-if="isEspagnolette" class="input-container">
          <label for="espagnolette">Typ zasuwnicy: </label>
          <select id="espagnolette" v-model="mainInfo.espagnolette">
            <option disabled value="">Wybierz</option>
            <option
              v-for="espagnolette in systemsData.espagnoletteOptions"
              :key="espagnolette"
            >
              {{ espagnolette }}
            </option>
          </select>
        </div>
        <div v-if="isInsert" class="input-container">
          <label for="insert">Wkładka: </label>
          <select id="insert" v-model="mainInfo.insert">
            <option disabled value="">Wybierz</option>
            <option v-for="insert in systemsData.insertOptions" :key="insert">
              {{ insert }}
            </option>
          </select>
        </div>
      </div>

      <h2>Dodatki</h2>
      <div v-if="isDiffuser" class="input-container">
        <label for="diffuserDripCap">Nawiewnik i okapnik: </label>
        <select id="diffuserDripCap" v-model="mainInfo.diffuserDripCap">
          <option disabled value="">Wybierz</option>
          <option>TAK</option>
          <option>NIE</option>
        </select>
      </div>
      <div v-if="areHooksForviders" class="input-container">
        <label for="hooks">Haczyki: </label>
        <select id="hooks" v-model="mainInfo.hooks">
          <option disabled value="">Wybierz</option>
          <option>TAK</option>
          <option>NIE</option>
        </select>
      </div>
      <div v-if="areHooksForviders" class="input-container">
        <label for="forviders">Forviders: </label>
        <select id="forviders" v-model="mainInfo.forviders">
          <option disabled value="">Wybierz</option>
          <option>TAK</option>
          <option>NIE</option>
        </select>
      </div>
      <div v-if="areMuntins" class="input-container">
        <label for="forviders">Szprosy: </label>
        <select id="forviders" v-model="mainInfo.muntins">
          <option disabled value="">Wybierz</option>
          <option>TAK</option>
          <option>NIE</option>
        </select>
      </div>
      <div v-if="mainInfo.muntins === 'TAK'">
        <button @click="triggleMuntinsBox">Wprowadź szprosy</button>
      </div>

      <div v-if="showMuntinsBox" class="muntins-box">
        <div class="background"></div>
        <div class="muntins">
          <div>
            <div class="input-container">
              <h2>Dodaj siatkę szprosów</h2>
            </div>
            <label for="muntinType">Wybierz szpros: </label>
            <select id="muntinType" v-model="mainInfo.muntinType">
              <option disabled value="">Wybierz</option>
              <option>Szpros międzyszybowy 18 mm</option>
              <option>Szpros międzyszybowy 26 mm</option>
              <option>Szpros międzyszybowy 45 mm</option>
              <option>Szpros naklejany 28 mm (drewno-duplex-drewno)</option>
              <option>Szpros nakładany clip-on PVC 28 mm</option>
              <option>Szpros nakładany drewniany clip-on PVC 28 mm</option>
            </select>
          </div>
          <div class="input-container">
            <label for="muntinColor">Wybierz kolor: </label>
            <select id="muntinColor" v-model="mainInfo.muntinColor">
              <option disabled value="">Wybierz</option>
              <option>BIAŁY</option>
              <option>Kolor niestandardowy według palety RAL</option>
            </select>
            <div
              v-if="
                mainInfo.muntinColor == 'Kolor niestandardowy według palety RAL'
              "
              class="colorRAL"
            >
              <label for="colorRAL">Kolor RAL: </label>
              <input
                id="colorRAL"
                type="text"
                v-model="mainInfo.muntinColorRAL"
              />
            </div>
          </div>
          <div>
            <label for="cuantityHorizontalMuntins">L.pól poziomo: </label>
            <input
              id="cuantityHorizontalMuntins"
              type="number"
              v-model="mainInfo.cuantityHorizontalMuntins"
            />
          </div>
          <div>
            <label for="cuantityVerticalMuntins">L.pól pionowo: </label>
            <input
              id="cuantityVerticalMuntins"
              type="number"
              v-model="mainInfo.cuantityVerticalMuntins"
            />
          </div>
          <button @click="cancelMuntins()">Anuluj</button>
          <button @click="setMuntins()">Zapisz</button>
        </div>
      </div>
      <div v-if="isGrabber">
        <label for="grabber">Pochwycik balkonowy z zatrzaskiem: </label>
        <select id="grabber" v-model="mainInfo.grabber">
          <option disabled value="">Wybierz</option>
          <option>BRAK</option>
          <option>BIAŁY</option>
          <option>SREBRNY</option>
          <option>BRĄZOWY</option>
        </select>
      </div>
      <h2>Dodatkowy opis</h2>
      <textarea rows="4" cols="50" v-model="mainInfo.description"></textarea>
      <!--<div>
        <input type="file" @change="uploadFile" ref="file" />
        <button @click="submitFile">Upload!</button>
      </div>-->
      <div v-if="errorMessage">
        <p class="error-message">Uzupełnij wszystkie dane!</p>
      </div>
      <div><button @click="saveData">Podsumowanie</button></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainInfo: [
        { quantity: '' },
        { winWidth: '' },
        { winHeight: '' },
        { milling: '' },
        { handles: '' },
        { profile: '' },
        { post: '' },
        { open: '' },
        { doorStep: '' },
        { insideColor: '' },
        { insideColorRAL: '' },
        { outsideColor: '' },
        { outsideColorRAL: '' },
        { filling: '' },
        { glassesNumber: '' },
        { brake: '' },
        { diffuserDripCap: '' },
        { hooks: '' },
        { forviders: '' },
        { muntins: '' },
        { muntinType: '' },
        { muntinColor: '' },
        { muntinColorRAL: '' },
        { cuantityHorizontalMuntins: '' },
        { cuantityVerticalMuntins: '' },
        { fitting: '' },
        { espagnolette: '' },
        { grabber: '' },
        { description: '' },
        { insert: '' }
      ],
      systemsData: [],
      showMuntinsBox: false,
      images: [],
      yourEmail: 'justynaskurzok@gmail.com',
      errorMessage: false
    };
  },
  mounted() {
    const systemData = this.$store.state.choosenSystem;
    this.systemsData = systemData;
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
    areMuntins() {
      let areMuntins = this.$store.state.areMuntins;
      return areMuntins;
    },
    isGrabber() {
      let isThereGrabber = this.$store.state.isGrabber;
      return isThereGrabber;
    },
    checkedData() {
      if (
        this.mainInfo.quantity === undefined ||
        this.mainInfo.winWidth === undefined ||
        this.mainInfo.winHeight === undefined ||
        this.mainInfo.milling === undefined ||
        this.mainInfo.profile === undefined ||
        this.mainInfo.insideColor === undefined ||
        this.mainInfo.outsideColor === undefined ||
        this.mainInfo.filling === undefined ||
        this.mainInfo.glassesNumber === undefined
      ) {
        return false;
      } else if (
        this.isThereHandle === true &&
        this.mainInfo.handles === undefined
      ) {
        return false;
      } else if (
        this.isTherePost === true &&
        this.mainInfo.post === undefined
      ) {
        return false;
      } else if (
        this.isThisOpened === true &&
        this.mainInfo.open === undefined
      ) {
        return false;
      } else if (
        this.isThereDoorstep === true &&
        this.mainInfo.doorStep === undefined
      ) {
        return false;
      } else if (
        this.isThereDoorstep === true &&
        this.mainInfo.doorStep === undefined
      ) {
        return false;
      } else if (
        this.isBrake === true &&
        this.mainInfo.brake === undefined
      ) {
        return false;
      } else if (
        this.isFitting === true &&
        this.mainInfo.fitting === undefined
      ) {
        return false;
      } else if (
        this.isEspagnolette === true &&
        this.mainInfo.espagnolette === undefined
      ) {
        return false;
      } else if (
        this.isInsert === true &&
        this.mainInfo.insert === undefined
      ) {
        return false;
      } else if (
        this.isDiffuser === true &&
        this.mainInfo.diffuserDripCap === undefined
      ) {
        return false;
      } else if (
        this.areHooksForviders === true &&
        this.mainInfo.hooks === undefined ||
        this.areHooksForviders === true &&
        this.mainInfo.forviders === undefined
      ) {
        return false;
      } else if (
        this.areMuntins === true &&
        this.mainInfo.muntins === undefined
      ) {
        return false;
      } else if (
        this.isGrabber === true &&
        this.mainInfo.grabber === undefined
      ) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    cancelMuntins() {
      this.mainInfo.muntinType = '';
      this.mainInfo.muntinColor = '';
      this.mainInfo.colorRAL = '';
      this.mainInfo.cuantityHorizontalMuntins = '';
      this.mainInfo.cuantityVerticalMuntins = '';
      this.mainInfo.muntins = 'NIE';
      this.showMuntinsBox = false;
    },
    setMuntins() {
      this.showMuntinsBox = false;
    },
    triggleMuntinsBox() {
      if (this.showMuntinsBox === false) {
        this.showMuntinsBox = true;
      } else {
        this.showMuntinsBox = false;
      }
    },
    uploadFile() {
      this.images = this.$refs.file.files[0];
    },

    saveData() {
      if (this.checkedData) {
        console.log(this.checkedData);
        console.log(this.mainInfo.quantity);
        this.$store.commit('setWinWidth', this.mainInfo.winWidth);
        this.$store.commit('setWinHeight', this.mainInfo.winHeight);
        this.$store.commit('setWinQuantity', this.mainInfo.quantity);
        this.$store.commit('setWinMilling', this.mainInfo.milling);
        this.$store.commit('setWinHandles', this.mainInfo.handles);
        this.$store.commit('setWinOpen', this.mainInfo.open);
        this.$store.commit('setWinPost', this.mainInfo.post);
        this.$store.commit('setDoorStep', this.mainInfo.doorStep);
        this.$store.commit('setWinProfile', this.mainInfo.profile);
        this.$store.commit('setWinInsideColor', this.mainInfo.insideColor);
        this.$store.commit(
          'setWinInsideColorRAL',
          this.mainInfo.insideColorRAL
        );
        this.$store.commit('setWinOutsideColor', this.mainInfo.outsideColor);
        this.$store.commit(
          'setWinOutsideColorRAL',
          this.mainInfo.outsideColorRAL
        );
        this.$store.commit('setWinFilling', this.mainInfo.filling);
        this.$store.commit('setGlassesNumber', this.mainInfo.glassesNumber);
        this.$store.commit('setWinBrake', this.mainInfo.brake);
        this.$store.commit('setDiffuserDripCap', this.mainInfo.diffuserDripCap);
        this.$store.commit('setWinHooks', this.mainInfo.hooks);
        this.$store.commit('setWinForviders', this.mainInfo.forviders);
        this.$store.commit('setWinMuntins', this.mainInfo.muntins);
        this.$store.commit('setWinMuntinType', this.mainInfo.muntinType);
        this.$store.commit('setWinMuntinColor', this.mainInfo.muntinColor);
        this.$store.commit(
          'setWinMuntinColorRAL',
          this.mainInfo.muntinColorRAL
        );
        this.$store.commit(
          'setWinCuantityHorizontalMuntins',
          this.mainInfo.cuantityHorizontalMuntins
        );
        this.$store.commit(
          'setCuantityVerticalMuntins',
          this.mainInfo.cuantityVerticalMuntins
        );
        this.$store.commit('setWinFitting', this.mainInfo.fitting);
        this.$store.commit('setWinEspagnolette', this.mainInfo.espagnolette);
        this.$store.commit('setWinGrabber', this.mainInfo.grabber);
        this.$store.commit('setWinInsert', this.mainInfo.insert);
        this.$store.commit('setWinDescription', this.mainInfo.description);
        this.$router.push('/theSummary');
      } else {
        this.errorMessage = true;
        return;
      }
    }
  }
};
</script>

<style scoped>
h2 {
  margin-top: 20px;
  font-size: 22px;
  color: #8a7034;
}
.info-container {
  width: 60%;
  font-size: 17px;
}
.input-container {
  margin: 5px;
}
.input-container label {
  margin-right: 5px;
  width: 300px;
}
input {
  height: 23px;
  font-size: 17px;
}
select {
  height: 23px;
  font-size: 17px;
}
.colorRAL {
  display: inline-block;
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
.muntins-box button {
  margin: 10px;
}
.muntins {
  position: fixed;
  top: 20vh;
  left: 25%;
  width: 50%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  background: white;
  padding: 20px;
  margin: 0;
  overflow: hidden;
}

.muntins select {
  margin: 5px;
}
.muntins input {
  margin: 5px;
}
.error-message {
  color: red;
  font-size: bolder;
  font-size: 19px;
}
</style>
