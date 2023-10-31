<template>
  <div class="container">
    <div class="horizontal">
      <div @click="sendTo('/newWindow')" class="block">
        <img src="../../docs/images/NWH/window.png" />
        <p>Okna lub drzwi balkonowe</p>
      </div>
      <div class="block">
        <img src="../../docs/images/NWH/drzwi_wewnetrzne.png" />
        <p>Drzwi wewnętrzne</p>
      </div>
    </div>
    <div class="horizontal">
      <div class="block">
        <img src="../../docs/images/NWH/drzwi_zewnetrzne.png" />
        <p>Drzwi wejściowe</p>
      </div>
      <div class="block">
        <img src="../../docs/images/NWH/zabudowa_tarasowa.png" />
        <p>Zabudowa tarasowa</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    sendTo(path) {
      this.$router.push(path);
    }
  }
};
</script>
<style scoped>
.container {
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.horizontal {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.horizontal div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: 380px;
  height: 380px;
  border: 5px solid #cfac58;
}
.horizontal div:hover {
  border: 5px solid #ebc774;
  cursor: pointer;
}
.horizontal div p {
  margin: 10px;
  color: #323730;
  font-size: 25px;
  font-weight: bold;
}
@media only screen and (min-width: 0px) and (max-width: 1200px) {
  .container {
    width: 100%;
    margin: 0;
  }
  .horizontal {
    width: 100%;
  }
  .horizontal div {
    width: 100%;
    margin: 5px;
    border: 3px solid #cfac58;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .horizontal div:hover {
    border: 3px solid #ae2121;
    cursor: pointer;
  }
  .horizontal div p {
    margin: 8px;
    font-size: 20px;
  }
  .block img {
    height: 150px;
  }
}
</style>
