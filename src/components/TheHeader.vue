<template>
    <div class="buttons">
       <!-- <div class="buttonFrame">
            <router-link to="/windowType" type="button" class="button">Type</router-link>
        </div>
        <div class="buttonFrame">
            <router-link to="/windowSize" type="button" class="button">Size</router-link>
        </div>
        <div class="buttonFrame">
            <router-link to="/windowProfile" type="button" class="button">Profile</router-link>
        </div>        
        <div class="buttonFrame">
            <router-link to="/windowVenner" type="button" class="button">Veneer</router-link>
        </div>
        <div class="buttonFrame">
            <router-link to="/windowGlass" type="button" class="button">Glass</router-link>
        </div>
        <div class="buttonFrame">
            <router-link to="/windowFrames" type="button" class="button">Frames</router-link>
        </div>
        <div class="buttonFrame">
            <router-link to="/windowMuntins" type="button" class="button">Muntins</router-link>
        </div>
        <div class="buttonFrame">
            <router-link to="/windowDiffusers" type="button" class="button">Diffusers</router-link>
        </div>
        <div class="buttonFrame">
            <router-link to="/windowBlind" type="button" class="button">Blinds</router-link>
        </div>
        <div class="buttonFrame">
            <router-link to="/summary" type="button" class="button">Summary</router-link>
        </div>
-->
    </div>
</template>
<script>
    export default {
        data() {
            return {
                whateverActivatesThisLink: true
            };
        },
    }
</script>

<style scoped>
.buttons {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin: 20px 0;
    padding: 0;
 }
/*.button {
    padding:10px 20px;
    float: left;
    min-width: 100px;
}*/
.button {
    display: inline-block;
    padding: 1.2rem 2.2rem;
    margin: 0;
    font-family: inherit;
    background-color: #690f0f;
    border: 1px solid #690f0f;
    color: white;
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;    
}

.button:hover,
.button:active {
  background-color: #f3e0d1;
  border-color: #f3e0d1;
  color: black;
}
.buttonFrame {
    margin: 0;
    padding: 0;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.flat:hover,
.flat:active {
  background-color: #f3e0d1;
}
a.router-link-active {
    color: black;
    background-color: #f3e0d1;
}
.highlighted {
    background-color: blue;
}

@media all and (max-width: 576px) {
    .buttons {
        display: none;
    }
}
@media only screen and (min-width: 577px) and (max-width: 922px) {
    .buttons {
        display: none;
    }    
}
@media only screen and (min-width: 922px) and (max-width: 1200px) {
.button {
    padding: 0.5rem 1rem;
    margin: 0;
    font-family: inherit;
    background-color: #690f0f;
    border: 1px solid #690f0f;
    color: white;
    cursor: pointer;
    text-decoration: none;
    font-size: 15px;
    white-space: nowrap;
}
}
</style>