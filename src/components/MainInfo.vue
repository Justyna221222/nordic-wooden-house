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
      <div v-if="isThereHandle" class="input-container handles">
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
        <label for="outsideColor">Kolor zewnętrzny: </label>
        <select id="outsideColor" v-model="mainInfo.outsideColor">
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
        <label for="muntins">Szprosy: </label>
        <select id="muntins" v-model="mainInfo.muntins">
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
      errorMessage: false,
      errNumber: 0
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
    }

    /* checkedData() {
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
    }*/
  },
  watch: {
    'mainInfo.quantity': function() {
      this.validateQuantity();
    },
    'mainInfo.winWidth': function() {
      this.validateWinWidth();
    },
    'mainInfo.winHeight': function() {
      this.validateWinHeight();
    },
    'mainInfo.milling': function() {
      this.validateWinMilling();
    },
    'mainInfo.profile': function() {
      this.validateWinProfile();
    },
    'mainInfo.insideColor': function() {
      this.validateWinInsideColor();
    },
    'mainInfo.outsideColor': function() {
      this.validateWinOutsideColor();
    },
    'mainInfo.filling': function() {
      this.validateWinFilling();
    },
    'mainInfo.glassesNumber': function() {
      this.validateWinGlassesNumber();
    },
    'mainInfo.handles': function() {
      this.validateWinHandles();
    },
    'mainInfo.post': function() {
      this.validateWinPost();
    },
    'mainInfo.open': function() {
      this.validateWinOpen();
    },
    'mainInfo.doorStep': function() {
      this.validateWinDoorstep();
    },
    'mainInfo.brake': function() {
      this.validateWinBrake();
    },
    'mainInfo.diffuserDripCap': function() {
      this.validateWinDIffuserDripCap();
    },
    'mainInfo.hooks': function() {
      this.validateWinHooks();
    },
    'mainInfo.forviders': function() {
      this.validateWinForviders();
    },
    'mainInfo.muntins': function() {
      this.validateWinMuntins();
    },
    'mainInfo.fitting': function() {
      this.validateWinFitting();
    },
    'mainInfo.espagnolette': function() {
      this.validateWinEspagnolette();
    },
    'mainInfo.grabber': function() {
      this.validateWinGrabber();
    },
    'mainInfo.insert': function() {
      this.validateWinInsert();
    }
  },
  methods: {
    validateQuantity() {
      console.log(this.mainInfo.quantity);
      var quantity = document.querySelector('#ilosc');
      if (
        this.mainInfo.quantity === undefined ||
        this.mainInfo.quantity === ''
      ) {
        quantity.classList.add('error-input');
        this.errorMessage = true;
      } else {
        quantity.classList.remove('error-input');
      }
    },
    validateWinWidth() {
      var winWidth = document.querySelector('#width');
      if (
        this.mainInfo.winWidth === undefined ||
        this.mainInfo.winWidth === ' '
      ) {
        winWidth.classList.add('error-input');
        this.errorMessage = true;
      } else {
        winWidth.classList.remove('error-input');
      }
    },
    validateWinHeight() {
      var winHeight = document.querySelector('#height');
      if (
        this.mainInfo.winHeight !== undefined ||
        this.mainInfo.winHeight !== ' '
      ) {
        winHeight.classList.remove('error-input');
      } else {
        winHeight.classList.add('error-input');
        this.errorMessage = true;
      }
    },
    validateWinMilling() {
      var milling = document.querySelector('#milling');
      if (this.mainInfo.milling !== undefined || this.mainInfo.milling !== '') {
        milling.classList.remove('error-input');
      } else {
        milling.classList.add('error-input');
        this.errorMessage = true;
      }
    },
    validateWinProfile() {
      var profile = document.querySelector('#profile');
      if (this.mainInfo.profile !== undefined || this.mainInfo.profile !== '') {
        profile.classList.remove('error-input');
      } else {
        profile.classList.add('error-input');
        this.errorMessage = true;
      }
    },
    validateWinInsideColor() {
      var insideColor = document.querySelector('#insideColor');
      if (
        this.mainInfo.insideColor !== undefined ||
        this.mainInfo.insideColor !== ''
      ) {
        insideColor.classList.remove('error-input');
      } else {
        insideColor.classList.add('error-input');
        this.errorMessage = true;
      }
    },
    validateWinOutsideColor() {
      var outsideColor = document.querySelector('#outsideColor');
      if (
        this.mainInfo.outsideColor !== undefined ||
        this.mainInfo.outsideColor !== ''
      ) {
        outsideColor.classList.remove('error-input');
      } else {
        outsideColor.classList.add('error-input');
        this.errorMessage = true;
      }
    },
    validateWinFilling() {
      var filling = document.querySelector('#filling');
      if (this.mainInfo.filling !== undefined || this.mainInfo.filling !== '') {
        filling.classList.remove('error-input');
      } else {
        filling.classList.add('error-input');
        this.errorMessage = true;
      }
    },
    validateWinGlassesNumber() {
      var glassesNumber = document.querySelector('#glassesNumber');
      if (
        this.mainInfo.glassesNumber !== undefined ||
        this.mainInfo.glassesNumber !== ''
      ) {
        glassesNumber.classList.remove('error-input');
      } else {
        glassesNumber.classList.add('error-input');
        this.errorMessage = true;
      }
    },
    validateWinHandles() {
      var handles = document.querySelector('#handles');
      if (this.mainInfo.handles !== undefined || this.mainInfo.handles !== '') {
        handles.classList.remove('error-input');
      } else {
        handles.classList.add('error-input');
        this.errorMessage = true;
      }
    },
    validateWinPost() {
      var post = document.querySelector('#post');
      if (this.mainInfo.post !== undefined || this.mainInfo.post !== '') {
        post.classList.remove('error-input');
      } else {
        post.classList.add('error-input');
        this.errorMessage = true;
      }
    },
    validateWinOpen() {
      var open = document.querySelector('#opened');
      if (this.mainInfo.open !== undefined || this.mainInfo.open !== '') {
        open.classList.remove('error-input');
      } else {
        open.classList.add('error-input');
        this.errorMessage = true;
      }
    },
    validateWinDoorstep() {
      var doorStep = document.querySelector('#doorstep');
      if (
        this.mainInfo.doorStep !== undefined ||
        this.mainInfo.doorStep !== ''
      ) {
        doorStep.classList.remove('error-input');
      } else {
        doorStep.classList.add('error-input');
        this.errorMessage = true;
      }
    },
    validateWinBrake() {
      var brake = document.querySelector('#brakes');
      if (this.mainInfo.brake !== undefined || this.mainInfo.brake !== '') {
        brake.classList.remove('error-input');
      } else {
        brake.classList.add('error-input');
        this.errorMessage = true;
      }
    },
    validateWinDIffuserDripCap() {
      var diffuserDripCap = document.querySelector('#diffuserDripCap');
      if (
        this.mainInfo.diffuserDripCap !== undefined ||
        this.mainInfo.diffuserDripCap !== ''
      ) {
        diffuserDripCap.classList.remove('error-input');
      } else {
        diffuserDripCap.classList.add('error-input');
        this.errorMessage = true;
      }
    },
    validateWinHooks() {
      var hook = document.querySelector('#hooks');
      if (this.mainInfo.hooks !== undefined || this.mainInfo.hooks !== '') {
        hook.classList.remove('error-input');
      } else {
        hook.classList.add('error-input');
        this.errorMessage = true;
      }
    },
    validateWinForviders() {
      var forviders = document.querySelector('#forviders');
      if (
        this.mainInfo.forviders !== undefined ||
        this.mainInfo.forviders !== ''
      ) {
        forviders.classList.remove('error-input');
      } else {
        forviders.classList.add('error-input');
        this.errorMessage = true;
      }
    },
    validateWinMuntins() {
      var muntins = document.querySelector('#muntins');
      if (this.mainInfo.muntins !== undefined || this.mainInfo.muntins !== '') {
        muntins.classList.remove('error-input');
      } else {
        muntins.classList.add('error-input');
        this.errorMessage = true;
      }
    },
    validateWinFitting() {
      var fitting = document.querySelector('#fitting');
      if (this.mainInfo.fitting !== undefined || this.mainInfo.fitting !== '') {
        fitting.classList.remove('error-input');
      } else {
        fitting.classList.add('error-input');
        this.errorMessage = true;
      }
    },
    validateWinEspagnolette() {
      var espagnolette = document.querySelector('#espagnolette');
      if (
        this.mainInfo.espagnolette !== undefined ||
        this.mainInfo.espagnolette !== ''
      ) {
        espagnolette.classList.remove('error-input');
      } else {
        espagnolette.classList.add('error-input');
        this.errorMessage = true;
      }
    },
    validateWinGrabber() {
      var grabber = document.querySelector('#grabber');
      if (this.mainInfo.grabber !== undefined || this.mainInfo.grabber !== '') {
        grabber.classList.remove('error-input');
      } else {
        grabber.classList.add('error-input');
        this.errorMessage = true;
      }
    },
    validateWinInsert() {
      var insert = document.querySelector('#insert');
      if (this.mainInfo.insert !== undefined || this.mainInfo.insert !== '') {
        insert.classList.remove('error-input');
      } else {
        insert.classList.add('error-input');
        this.errorMessage = true;
      }
    },
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

    checkedData() {
      this.errNumber = 0;
      // this.validateQuantity();
      // this.validateWinWidth();
      // this.validateWinHeight();
      // this.validateWinMilling();
      // this.validateWinProfile();
      // this.validateWinInsideColor();
      // this.validateWinOutsideColor();
      var quantity = document.getElementById('ilosc');
      var width = document.getElementById('width');
      var height = document.getElementById('height');
      var milling = document.getElementById('milling');
      var profile = document.querySelector('#profile');
      var insideColor = document.querySelector('#insideColor');
      var outsideColor = document.querySelector('#outsideColor');
      var filling = document.querySelector('#filling');
      var glassesNumber = document.querySelector('#glassesNumber');
      var handles = document.querySelector('#handles');
      var posts = document.querySelector('#post');
      var open = document.querySelector('#opened');
      var doorStep = document.querySelector('#doorstep');
      var brake = document.querySelector('#brakes');
      var diffuserDripCap = document.querySelector('#diffuserDripCap');
      var hook = document.querySelector('#hooks');
      var forviders = document.querySelector('#forviders');
      var muntins = document.querySelector('#muntins');
      var fitting = document.querySelector('#fitting');
      var espagnolette = document.querySelector('#espagnolette');
      var grabber = document.querySelector('#grabber');
      var insert = document.querySelector('#insert');
      if (
        this.mainInfo.quantity === undefined ||
        this.mainInfo.quantity === ''
      ) {
        this.errNumber = this.errNumber + 1;
        quantity.classList.add('error-input');
        this.errorMessage = true;
      } else {
        quantity.classList.remove('error-input');
      }
      if (
        this.mainInfo.winWidth === undefined ||
        this.mainInfo.winWidth === ''
      ) {
        this.errNumber = this.errNumber + 1;
        width.classList.add('error-input');
        this.errorMessage = true;
      } else {
        width.classList.remove('error-input');
      }
      if (
        this.mainInfo.winHeight === undefined ||
        this.mainInfo.winHeight === ''
      ) {
        this.errNumber = this.errNumber + 1;
        height.classList.add('error-input');
        this.errorMessage = true;
      } else {
        height.classList.remove('error-input');
      }
      if (this.mainInfo.milling === undefined || this.mainInfo.milling === '') {
        this.errNumber = this.errNumber + 1;
        milling.classList.add('error-input');
        this.errorMessage = true;
      } else {
        milling.classList.remove('error-input');
      }
      if (this.mainInfo.profile === undefined || this.mainInfo.profile === '') {
        this.errNumber = this.errNumber + 1;
        profile.classList.add('error-input');
        this.errorMessage = true;
      } else {
        profile.classList.remove('error-input');
      }
      if (
        this.mainInfo.insideColor === undefined ||
        this.mainInfo.insideColor === ''
      ) {
        this.errNumber = this.errNumber + 1;
        insideColor.classList.add('error-input');
        this.errorMessage = true;
      } else {
        insideColor.classList.remove('error-input');
      }
      if (
        this.mainInfo.insideColor === undefined ||
        this.mainInfo.insideColor === ''
      ) {
        this.errNumber = this.errNumber + 1;
        insideColor.classList.add('error-input');
        this.errorMessage = true;
      } else {
        insideColor.classList.remove('error-input');
      }
      if (
        this.mainInfo.outsideColor === undefined ||
        this.mainInfo.outsideColor === ''
      ) {
        this.errNumber = this.errNumber + 1;
        outsideColor.classList.add('error-input');
        this.errorMessage = true;
      } else {
        outsideColor.classList.remove('error-input');
      }
      if (this.mainInfo.filling === undefined || this.mainInfo.filling === '') {
        this.errNumber = this.errNumber + 1;
        filling.classList.add('error-input');
        this.errorMessage = true;
      } else {
        filling.classList.remove('error-input');
      }
      if (
        this.mainInfo.glassesNumber === undefined ||
        this.mainInfo.glassesNumber === ''
      ) {
        this.errNumber = this.errNumber + 1;
        glassesNumber.classList.add('error-input');
        this.errorMessage = true;
      } else {
        glassesNumber.classList.remove('error-input');
      }
      if (this.isThereHandle) {
        if (
          this.mainInfo.handles === undefined ||
          this.mainInfo.handles === ''
        ) {
          this.errNumber = this.errNumber + 1;
          handles.classList.add('error-input');
          this.errorMessage = true;
        } else {
          handles.classList.remove('error-input');
        }
      }
      if (this.isTherePost === true) {
        if (this.mainInfo.post === undefined) {
          this.errNumber = this.errNumber + 1;
          posts.classList.add('error-input');
          this.errorMessage = true;
        } else {
          posts.classList.remove('error-input');
        }
      }
      if (this.isThisOpened === true) {
        if (this.mainInfo.open === undefined || this.mainInfo.open === '') {
          this.errNumber = this.errNumber + 1;
          open.classList.add('error-input');
          this.errorMessage = true;
        } else {
          open.classList.remove('error-input');
        }
      }
      if (this.isThereDoorstep === true) {
        if (
          this.mainInfo.doorStep === undefined ||
          this.mainInfo.doorStep === ''
        ) {
          this.errNumber = this.errNumber + 1;
          doorStep.classList.add('error-input');
          this.errorMessage = true;
        } else {
          doorStep.classList.remove('error-input');
        }
      }
      if (this.isBrake === true) {
        if (this.mainInfo.brake === undefined || this.mainInfo.brake === '') {
          this.errNumber = this.errNumber + 1;
          brake.classList.add('error-input');
          this.errorMessage = true;
        } else {
          brake.classList.remove('error-input');
        }
      }
      if (this.isDiffuser === true) {
        if (
          this.mainInfo.diffuserDripCap === undefined ||
          this.mainInfo.diffuserDripCap === ''
        ) {
          this.errNumber = this.errNumber + 1;
          diffuserDripCap.classList.add('error-input');
          this.errorMessage = true;
        } else {
          diffuserDripCap.classList.remove('error-input');
        }
      }

      if (this.areHooksForviders === true) {
        if (this.mainInfo.hooks === undefined || this.mainInfo.hooks === '') {
          this.errNumber = this.errNumber + 1;
          hook.classList.add('error-input');
          this.errorMessage = true;
        } else {
          hook.classList.remove('error-input');
        }
        if (
          this.mainInfo.forviders === undefined ||
          this.mainInfo.forviders === ''
        ) {
          this.errNumber = this.errNumber + 1;
          forviders.classList.add('error-input');
          this.errorMessage = true;
        } else {
          forviders.classList.remove('error-input');
        }
      }
      if (this.areMuntins === true) {
        if (
          this.mainInfo.muntins === undefined ||
          this.mainInfo.muntins === ''
        ) {
          this.errNumber = this.errNumber + 1;
          muntins.classList.add('error-input');
          this.errorMessage = true;
        } else {
          muntins.classList.remove('error-input');
        }
      }
      if (this.isFitting === true) {
        if (
          this.mainInfo.fitting === undefined ||
          this.mainInfo.fitting === ''
        ) {
          this.errNumber = this.errNumber + 1;
          fitting.classList.add('error-input');
          this.errorMessage = true;
        } else {
          fitting.classList.remove('error-input');
        }
      }
      if (this.isEspagnolette === true) {
        if (
          this.mainInfo.espagnolette === undefined ||
          this.mainInfo.espagnolette === ''
        ) {
          this.errNumber = this.errNumber + 1;
          espagnolette.classList.add('error-input');
          this.errorMessage = true;
        } else {
          espagnolette.classList.remove('error-input');
        }
      }
      if (this.isGrabber === true) {
        if (
          this.mainInfo.grabber === undefined ||
          this.mainInfo.grabber === ''
        ) {
          this.errNumber = this.errNumber + 1;
          grabber.classList.add('error-input');
          this.errorMessage = true;
        } else {
          grabber.classList.remove('error-input');
        }
      }
      if (this.isInsert === true) {
        if (this.mainInfo.insert === undefined || this.mainInfo.insert === '') {
          this.errNumber = this.errNumber + 1;
          insert.classList.add('error-input');
          this.errorMessage = true;
        } else {
          insert.classList.remove('error-input');
        }
      }

      console.log(this.errNumber);
    },

    saveData() {
      this.checkedData();
      if (this.errNumber === 0) {
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
.error-input {
  border: 1px solid red;
}

@media only screen and (min-width: 0px) and (max-width: 1200px) {
  .info-container {
    padding: 20px;
    width: 100%;
  }
  textarea {
    width: 100%;
    resize: none;
  }

  .handles option {
    font-size: 13px;
    height: 20px;
  }
}
</style>
