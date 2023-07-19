<template>
    <div class="container">
        <div class="horizontal">
            <div @click="sendTo('/newWindow')">
                <img src="../../public/images/NWH/window.png"/>
                <p>Okna lub drzwi balkonowe</p>
            </div>
            <div>
                <img src="../../public/images/NWH/drzwi_wewnetrzne.png"/>
                <p>Drzwi wewnętrzne</p>
            </div>            
        </div>
        <div class="horizontal">
            <div>
                <img src="../../public/images/NWH/drzwi_zewnetrzne.png"/>
                <p>Drzwi wejściowe</p>
            </div>
            <div>
                <img src="../../public/images/NWH/zabudowa_tarasowa.png"/>
                <p>Zabudowa tarasowa</p>
            </div>             
        </div>     
    </div>

</template>

<script>

export default ({
    data() {
        return {

        };
    },
    methods: {
        sendTo(path) {
            this.$router.push(path); 
        }
    }
})
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
    border: 5px solid #ced496;
}
.horizontal div:hover {
    border: 5px solid #909a6b;
    cursor: pointer;
}
.horizontal div p {
    margin: 10px;
    color: #323730;
    font-size: 25px;
    font-weight: bold;
}
</style>