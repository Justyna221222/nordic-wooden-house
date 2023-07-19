<template>
    <div class="info-container">
        <div>
            <h2>Główne</h2>
            <div>
                <label for="ilosc">ilość: </label> 
                <input type="number" id="ilosc" v-model="mainInfo.quantity">            
            </div>
            <div>
                <label for="width">Szerokość całkowita (w mm): </label> 
                <input type="number" id="width" v-model="mainInfo.winWidth">            
            </div>
            <div>
                <label for="height">Wysokość całkowita (w mm): </label> 
                <input type="number" id="height" v-model="mainInfo.winHeight">            
            </div>
            <div>
                <label for="milling">Frezowanie: </label> 
                <select id="milling" v-model="mainInfo.milling">
                    <option disabled value="">Wybierz</option>
                    <option>Tak</option>
                    <option>Nie</option>
                </select>            
            </div>
            <div v-if="isThereHandle">
                <label for="handles">Klamki: </label> 
                <select id="handles" v-model="mainInfo.handles">
                    <option disabled value="">Wybierz</option>
                    <option v-for="handle in systemsData.handles" :key="handle.name">
                        {{ handle.name }}
                    </option>
                </select>            
            </div>

            <div v-if="isTherePost">
                <label for="post">Słupek: </label> 
                <select id="post" v-model="mainInfo.post">
                   <option disabled value="">Wybierz</option>
                   <option v-for="post in posts" :key="post">
                        {{ post }}
                    </option>
                </select>            
            </div>
            <div v-if="isThisOpened">
                <label for="opened">Otwieranie: </label> 
                <select id="opened" v-model="mainInfo.open">
                   <option disabled value="">Wybierz</option>
                   <option v-for="openOption in openedOptions" :key="openOption">
                        {{ openOption }}
                    </option>
                </select>            
            </div>
            <div v-if="isThereDoorstep">
                <label for="doorstep">Próg: </label> 
                <select id="doorstep" v-model="mainInfo.post">
                   <option disabled value="">Wybierz</option>
                   <option v-for="step in doorSteps" :key="step">
                        {{ step }}
                    </option>
                </select>            
            </div>

            <h2>Kolor:</h2>
            <div>
                <label for="profile">Profil: </label> 
                <select id="profile" v-model="mainInfo.profile">
                    <option disabled value="">Wybierz</option>
                    <option v-for="profile in profilesToChoose" :key="profile">
                        {{ profile }}
                    </option>
                </select>            
            </div>
            <div>
                <label for="insideColor">Kolor wewnętrzny: </label> 
                <select id="insideColor" v-model="mainInfo.insideColor">
                    <option disabled value="">Wybierz</option>
                    <option v-for="color in colorsOutiseAndInside" :key="color">
                        {{ color }}
                    </option>
                </select> 
                <div v-if="this.mainInfo.insideColor === 'KOLOR NIESTANDARDOWY RAL'" class="colorRAL">
                    <label for="insideColorRAL">Kolor RAL numer:</label>
                    <input type="text" v-model="insideColorRAL" id="insideColorRAL">
                </div>           
            </div>
            <div>
                <label for="insideColor">Kolor zewnętrzny: </label> 
                <select id="insideColor" v-model="mainInfo.outsideColor">
                    <option disabled value="">Wybierz</option>
                    <option v-for="color in colorsOutiseAndInside" :key="color">
                        {{ color }}
                    </option>
                </select>  
                <div v-if="this.mainInfo.outsideColor === 'KOLOR NIESTANDARDOWY RAL'" class="colorRAL">
                    <label for="outsideColorRAL">Kolor RAL numer:</label>
                    <input type="text" v-model="outsideColorRAL" id="outsideColorRAL">
                </div>           
            </div>
            <h2>Wypełnienie</h2>
            <div>
                <label for="filling">Typ wypełnienia: </label> 
                <select id="filling" v-model="mainInfo.filling">
                    <option disabled value="">Wybierz</option>
                    <option v-for="filling in fillingToChoose" :key="filling">
                        {{ filling }}
                    </option>
                </select>            
            </div>
            <div>
                <label for="glassesNumber">Ilość szyb: </label> 
                <select id="glassesNumber" v-model="mainInfo.glassesNumber">
                    <option disabled value="">Wybierz</option>
                    <option>2</option>
                    <option>3</option>
                </select>            
            </div>
        </div>
        <div>ilość szyb:{{ this.mainInfo.glassesNumber }}</div>
        <div>isOpened:{{ this.$store.state.isOpened }}</div>
        <div>Open option:{{ this.$store.state.openedOptions }}</div>
<!--
        <div>Is there any handle:{{ this.$store.state.areHandles }}</div>
        <div>Is there any post:{{ this.$store.state.isPost }}</div>
        <div>{{ systemsData.handles }}</div>
        <br/><br/><br/><br/>
    <div>{{ mainInfo.quantity }}</div>
    <div>{{ mainInfo.winWidth }}</div>
    <div>{{ mainInfo.winHeight }}</div>
    <div>{{ mainInfo.milling }}</div>
    <div>{{ mainInfo.handles }}</div>
    <br/><br/><br/><br/>
    <div>{{ this.$store.state.choosenSystem }}</div>
    <div>{{ this.$store.state.windowType }}</div>
-->
    </div>


</template>

<script>

export default ({
    data() {
        return {
            mainInfo: [
                {quantity: ''},
                {winWidth: ''},
                {winHeight: ''},
                {milling: ''},
                {handles: ''},
                {profile: ''},
                {post: ''},
                {open: ''},
                {doorStep: ''},
                {insideColor: ''},
                {insideColorRAL: ''},
                {outsideColor: ''},
                {outsideColorRAL: ''},
                {filling: ''},
                {glassesNumber: ''}
            ],
            systemsData:[]
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
        }
    }
})
</script>

<style scoped>
.colorRAL {
    display: inline-block;
}
</style>