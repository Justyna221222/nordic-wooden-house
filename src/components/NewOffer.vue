<template>
    <div class="container">
        <h3>Klient</h3>
        <div class="clients-data">
            <div class="two-columns">
                <div>
                    <div><p>{{ this.$store.state.client.firstname }}</p></div>
                    <div><p>{{ this.$store.state.client.surname }}</p></div>
                    <div><p>tel: {{ this.$store.state.client.tel }}</p></div>
                    <div><p>email: {{ this.$store.state.client.email }}</p></div>           
                </div>
                <div>
                    <div><h4>Adres dostawy:</h4></div>
                    <div><p>{{ this.$store.state.client.street }}</p></div>
                    <div><p>{{ this.$store.state.client.zipcode }} {{ this.$store.state.client.city }}</p></div>
                    <div><p>{{ this.$store.state.client.country }}</p></div>            
                </div> 
            </div> 
        <button class="change-client" @click="changeClient">Zmień klienta</button>                            
        </div>
        <h3>Nowa oferta</h3>
        <div class="new-offer">
            <div class="dates">
                <p>Data od: <input type="date"  v-model="dateFrom"/></p>
                <p>Data do: <input type="date" :min="dateFrom" v-model="dateTo"/></p>
            </div>
            <div class="descritpion">
                <p>Opis:</p>
                <textarea type="textarea" id="desc" name="desc" rows="4" cols="50" v-model="description"></textarea>
            </div>
        </div>
        <button class="set-offer" @click="setOffer">Dalej</button> 
 <div>{{ this.$store.state.dateFrom }}</div>
 <div>{{ this.$store.state.dateTo }}</div>
 <div>{{ this.$store.state.description }}</div>
    </div>
</template>

<script>
export default ({
    data() {
        return {
            dateFrom: '',
            dateTo: '',
            description: ''
        };
    },
    methods: {
        changeClient() {
            this.$router.push("/clientData"); 
        },
        setOffer() {
            this.$store.commit('setDateFrom', this.dateFrom);
            this.$store.commit('setDateTo', this.dateTo);  
            this.$store.commit('setDescription', this.description);  
            this.$router.push("/offerList"); 
        }
    }
})
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
    flex-direction:column;
    justify-content: center;
    align-items: center;
}
textarea {
    resize: none;
}
button {
    width: 600px;
}

</style>
