<template>
<div class="summary">
    <table class="table table-striped">
        <tbody>
        <tr class="highlighted">
            <th>Window's item</th>
            <th>Selected</th>
        </tr>  
        <tr>
            <td>Type</td>
            <td>{{ this.$store.state.winType }}</td>
        </tr>  
        <tr>
            <td>Size</td>
            <td>{{ this.$store.state.width }} x {{this.$store.state.height }}</td>
        </tr>
        <tr v-if="isVisible">
            <td>Profile</td>
            <td>{{ this.$store.state.winProfile }}</td>
        </tr>
        <tr v-if="isVisible">
            <td>Veneer</td>
            <td>{{ this.$store.state.winVenner }}</td>
        </tr>
        <tr v-if="isVisible">
            <td>Glass</td>
            <td>{{ this.$store.state.winGlass }}</td>
        </tr>
        <tr v-if="isVisible">
            <td>Frames</td>
            <td>{{ this.$store.state.winFrame }}</td>
        </tr>
        <tr v-if="isVisible">
            <td>Muntins</td>
            <td>{{ this.$store.state.winMuntins }}</td>
        </tr>
        <tr v-if="isVisible">
            <td>Diffusers</td>
            <td>{{ this.$store.state.winDiffuser }}</td>
        </tr>
        <tr v-if="isVisible">
            <td>Blinds</td>
            <td>{{ this.$store.state.winBlind }}</td>
        </tr>
        </tbody>
    </table>
    <div>
        <p class="big">Congratulations! The price of your window is already calculated. If you want to know them, we will send you a message to your e-mail address</p> 
        <p class="small">There is no subscription to the newsletter. We will not send you any future messages.</p>      
    </div>
<form @submit.prevent="sendEmail">
<div>
    <p>E-mail</p>
    <input id='yourName' type='email' v-model='yourEmail'>
    <p v-if="invalidEmail" class="warning">Insert your e-mail address</p>  
    <div>
        <input type="submit" value="Send windows price">
    </div>   
</div >
<div v-if="emailSend" class="emailSend">
    <p>The message has been sent. Thank you!</p>
</div>
<div v-if="errSend">
    <p>Something went wrong, please try again!</p>
</div>
</form>
<div class="buttons">
    <div>
        <button @click="addItem">Add another item</button>
    </div>
    <div>
        <button @click="fromBeginning">Calculate from the beginning</button>
    </div>
</div>


</div>
</template>
<script>
import emailjs from '@emailjs/browser';
import store from '../store/index.js';  // import the store  
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
    computed: {
        isVisible() {
            const winType = this.$store.state.winType;
            if(winType == 'Single-leaf door PVC 1' || winType == 'Single-leaf door PVC 2' || winType == 'Double-leaf door PVC') {
                return false;
            } else {
                return true;
            }
        }
    },
    methods: {
        addItem() {
            const window = {
                Type: this.$store.state.winType,
                Width: this.$store.state.width,
                Height: this.$store.state.height,
                Profile: this.$store.state.winProfile,
                Venner: this.$store.state.winVenner,
                Glass: this.$store.state.winGlass,
                Frames: this.$store.state.winFrame,
                Muntins: this.$store.state.winMuntins,
                Diffusers: this.$store.state.winDiffuser,
                Blinds: this.$store.state.winBlind,
                Price: this.$store.state.winBlindPrice,
            }
            console.log(window);
            console.log(window.typ);

            this.$store.commit('addNewWindow', window);
 /* Clear store to add new window*/
            this.$store.state.winType = '',
            this.$store.state.width = '',
            this.$store.state.height = '',
            this.$store.state.winSizePrice = '',            
            this.$store.state.winArea = '',
            this.$store.state.winProfile = '',
            this.$store.state.winProfilePrice = '',
            this.$store.state.winVenner = '',
            this.$store.state.winVennerPrice = '',
            this.$store.state.winGlass = '',
            this.$store.state.winGlassPrice = '',
            this.$store.state.winFrame = '',
            this.$store.state.winFramePrice = '',
            this.$store.state.winMuntins = '',
            this.$store.state.winMuntinsPrice = '',
            this.$store.state.winDiffuser = '',
            this.$store.state.winDiffuserPrice = '',
            this.$store.state.winBlind = '',
            this.$store.state.winBlindPrice = '',
            this.$store.state.basketDisabled = false
            this.yourEmail = '',
            this.$router.push("/windowType");
        },
        sendEmail() {
        let mail = this.yourEmail;
        if(mail.includes("@")) {

            const window = {
                Type: this.$store.state.winType,
                Width: this.$store.state.width,
                Height: this.$store.state.height,
                Profile: this.$store.state.winProfile,
                Venner: this.$store.state.winVenner,
                Glass: this.$store.state.winGlass,
                Frames: this.$store.state.winFrame,
                Muntins: this.$store.state.winMuntins,
                Diffusers: this.$store.state.winDiffuser,
                Blinds: this.$store.state.winBlind,
                Price: this.$store.state.winBlindPrice,
            }

            this.$store.commit('addNewWindow', window);

            if(this.yourEmail == ''){
                this.invalidEmail = true;
                return;
            } else {
                const Windows = this.$store.state.Windows; 

                var parsed = '';
                for (let i = 0; i < Windows.length; i++) {
                 var Okna = Windows[i];
                    for (var property in Okna) {
                        parsed += property + ' : ' + Okna[property] + '\r\n' + '<br>';
                   }
                   parsed += '<br><br><br>';
              }
              
                this.mojeOkna = parsed;
                console.log(this.mojeOkna);


        }

const templateParams = {
    Okna: this.mojeOkna,
    yourEmail: this.yourEmail

};
emailjs.send('service_u5bo6u3','template_7qaf81v', templateParams, 'Bk9OW_oJI8NKfrxhJ')
.then((response) => {
this.emailSend = true;
console.log('SUCCESS!', response.status, response.text);
}, (err) => {
this.errSend = true;
console.log('FAILED...', err);
});

setTimeout(() => {
            this.$router.push("/windowType");            
            this.$store.state.winType = '',
            this.$store.state.width = '',
            this.$store.state.height = '',
            this.$store.state.winSizePrice = '',            
            this.$store.state.winArea = '',
            this.$store.state.winProfile = '',
            this.$store.state.winProfilePrice = '',
            this.$store.state.winVenner = '',
            this.$store.state.winVennerPrice = '',
            this.$store.state.winGlass = '',
            this.$store.state.winGlassPrice = '',
            this.$store.state.winFrame = '',
            this.$store.state.winFramePrice = '',
            this.$store.state.winMuntins = '',
            this.$store.state.winMuntinsPrice = '',
            this.$store.state.winDiffuser = '',
            this.$store.state.winDiffuserPrice = '',
            this.$store.state.winBlind = '',
            this.$store.state.winBlindPrice = '',
            this.$store.state.basketDisabled = false,
            this.$store.state.Windows = [],
            this.yourEmail = ''    
}, 5000);

       } else {
            return;
        }
            },

        validateEmail() {
                if(this.yourEmail == '') {
                    this.invalidEmail = true;
                } else {
                    this.invalidEmail = false;
                }
            }, 
        fromBeginning() {
            this.$store.state.winType = '',
            this.$store.state.width = '',
            this.$store.state.height = '',
            this.$store.state.winSizePrice = '',            
            this.$store.state.winArea = '',
            this.$store.state.winProfile = '',
            this.$store.state.winProfilePrice = '',
            this.$store.state.winVenner = '',
            this.$store.state.winVennerPrice = '',
            this.$store.state.winGlass = '',
            this.$store.state.winGlassPrice = '',
            this.$store.state.winFrame = '',
            this.$store.state.winFramePrice = '',
            this.$store.state.winMuntins = '',
            this.$store.state.winMuntinsPrice = '',
            this.$store.state.winDiffuser = '',
            this.$store.state.winDiffuserPrice = '',
            this.$store.state.winBlind = '',
            this.$store.state.winBlindPrice = '',
            this.$store.state.basketDisabled = false,
            this.$store.state.Windows = [],
            this.yourEmail = '',
            this.$router.push("/windowType");
        }
    },
    beforeRouteEnter(to, from, next){
                const winBlind = store.state.winBlind;
                const winType = store.state.winType;
                var letIn;
                if(winBlind == '' && winType == 'Single-leaf door PVC 1' || winType == 'Single-leaf door PVC 2' || winType == 'Double-leaf door PVC') {
                    letIn = true;
                } else if(winBlind == '') {
                    letIn = false;
                } else {
                    letIn = true;
                }         
                next( letIn);
            }
}
</script>

<style scoped>
.summary {
    font-size: 16px;
    margin: 20px;
}
table {
    border: 1px solid black;
}
.highlighted {
  background-color: #f3c2bd;
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
.emailSend p{
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
    justify-content: space-between;
    padding: 0;
    margin: 30px 0;
}
button {
  padding: 0.75rem 1.5rem;
  width: 300px;
  font-family: inherit;
  background-color: #cb2c2c;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
}
input[type=submit] {
  padding: 0.75rem 1.5rem;
  width: 300px;
  font-family: inherit;
  background-color:darkgreen;
  border: 2px solid #3a0061;
  color: white;
  cursor: pointer;
}
input[type=submit]:hover {
background-color:green;
border: 2px solid white;
}

button:hover,
button:active {
  background-color: #690f0f;
  border-color: #270041;
}
.warning {
    color: red;
}
@media only screen and (min-width: 0px) and (max-width: 576px) {
    .header {
        margin: 20px 0;
    }
    .next {
        padding: 5px 20px;
        font-size: 14px;
        margin:20px 20px 20px 0;
    }
    .previous {
        padding: 5px 20px;
        font-size: 14px;  
        margin:20px 0 20px 20px;              
    }
    .buttons {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0;
        margin: 0;
    }
    button {
        padding: 0.75rem 1.5rem;
        width: 100%;
        margin: 3px 0;
        font-family: inherit;
        background-color: #cb2c2c;
        border: 1px solid #3a0061;
        color: white;
        cursor: pointer;
        }
    input[type=submit] {
        width: 100%;
    }
}
@media only screen and (min-width: 577px) and (max-width: 768px) {
    .header {
        margin: 20px 0 20px 0;
    }
    .previous {
        margin: 20px 0 20px 20px;
        padding: 5px 20px;
        font-size: 14px;
    }
    .next {
        margin: 20px 20px 20px 0;
        padding: 5px 20px;
        font-size: 14px;
    }
    .buttons {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0;
        margin: 0;
    }
    button {
        padding: 0.75rem 1.5rem;
        width: 100%;
        margin: 3px 0;
        font-family: inherit;
        background-color: #cb2c2c;
        border: 1px solid #3a0061;
        color: white;
        cursor: pointer;
        }
    input[type=submit] {
        width: 100%;
    }
}
@media only screen and (min-width: 769px) and (max-width: 1200px) {

    .header {
        margin: 20px 0 20px 0;
    }
    .previous {
        margin: 0 0 20px 20px;
    }
    .next {
        margin: 0 20px 20px 0;
    }
}
</style>
