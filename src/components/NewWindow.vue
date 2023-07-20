<template>
    <div class="container">
        <div class="wooden-PVC">
            <div @click="wooden" :class="isShown === 'drewniane' ? 'active' : ''">Drewniane</div>
            <div @click="PVC" :class="isShown === 'PVC' ? 'active' : ''">PVC</div>        
        </div>
        <div>
            <div v-if="isShown === 'drewniane'">
               <div class="system-container">
                    <h3>System: </h3>
                    <select v-model="woodenSystem">
                        <option disabled value="">Wybierz</option>
                        <option v-for="system in woodenSystems" :key="system">
                            {{ system.systemOption }}
                        </option>
                    </select>
                </div>
                <div v-if="typesToShow !== ''">
                    <ul class="type-container">
                        <li v-for="type in typesToShow" :key="type" >
                            <label class="type-element" :class="{ activeType: (type.name === activeId) }">
                                <div><img v-bind:src="type.url" @click="chooseType(type.name, type.areHandles, type.isPost, type.posts, type.isDoorstep, type.isOpened, type.filling)"></div>
                                <input type="radio" name="type" :value="type.name" class="element" id="type.name" @click="chooseType(type.name, type.areHandles, type.isPost, type.posts, type.isDoorstep, type.isOpened, type.filling)"><p>{{ type.name }}</p>                                
                            </label>     
                        </li>
                    </ul>
               </div>                           
            </div>
            <div v-if="isShown === 'PVC'">
                <div class="system-container">
                    <h3>System: </h3>
                    <select v-model="PVCSystem">
                        <option disabled value="">Please select one</option>
                        <option v-for="system in PVCSystems" :key="system">
                            {{ system.systemOption }}
                        </option>
                    </select>
                </div>
                <div v-if="typesToShow !== ''">
                    <ul class="type-container">
                        <li v-for="type in typesToShow" :key="type" >
                            <label class="type-element" :class="{ activeType: (type.name === activeId) }">
                                <div><img v-bind:src="type.url" @click="chooseType(type.name, type.areHandles, type.isPost, type.posts, type.isDoorstep, type.isOpened, type.filling)"></div>
                                <input type="radio" name="type" :value="type.name" class="element" id="type.name" @click="chooseType(type.name, type.areHandles, type.isPost, type.posts, type.isDoorstep, type.isOpened, type.filling)"><p>{{ type.name }}</p>                                
                            </label>     
                        </li>
                    </ul>
               </div>  

            </div>
        </div>
        <div class="error-message"><p>{{ this.errorMessage }}</p></div> 
        <button @click="setSystemAndType">Dalej</button>             
    </div>
    <div>{{ filling }}</div>

</template>
<script>

//import wooden systems with thier types and handles
import systemsOfWood from '../woodenSystems.js';
//import PVC systems with thier types and handles
import systemsOfPVC from '../PVCSystems.js';
export default ({
    data() {
        return {
            isShown: '',
            woodenSystems: systemsOfWood,
            PVCSystems: systemsOfPVC,
           
            woodenSystem: '',
            woodenType: '',
            PVCSystem: '',
            PVCType:'',
            //typesToShow: this.types,
            typesToShow: [],
            errorMessage: '',
            activeId: '',
            isHandle: true,
            profilesToChoose:[],
            isPost: false,
            posts: [],
            isDoorstep: false,
            doorstepsToChoose: [],
            isOpened: false,
            openedOption: [],
            PVCcolorsOutsideOrInside: [
                'I-ANTRACYT 1701605', 'I-BIAŁA FX 915205-168', '1-BRĄZ CZEKOLADOWY 887505', 'I-CIEMNY DĄB 2052089', 'I-MACORE 3162002', 'I-MAHOŃ 2097013', 'I-ORZECH 2178007', 'I-SHEFFIELD OAK LIGHT F456-3081', 'I-WINCHESTER XA 49240-015', 'I-ZŁOTY DĄB 2178001',
                'II-SZARY 715505', 'II-BAZALTOWY SZARY 701205', 'II-CIEMNY CZERWONY 308105', 'II-CIEMNY ZIELONY 612505', 'II-DAGLEZJA 3152009', 'DĄB NATURALNY 3118076', 'II-KREMOWY 1137905', 'II-KWARCYTOWY SZARY 703905', 'II-OREGON 2115008', 'II-PALISANDER 851805', 'II-ZIELEŃ MCHU 1600505', 'II-ANTRACYT GŁADKI 701605-097',
                'III-BAZALTOWY SZARY GŁADKI 701205-083', 'III-BETONOWY SZARY 702305', 'III-CROWN PLATINUM 9.1293001-195', 'III-JASNY SZARY(7251)725105-167', 'III-KWARCYTOWY SZARY GŁADKI 703905-097', 'III-ŁUPKOWY(DB703)1.0065002', 'ŁUPKOWY SZARY GŁADKI(7015)', 'CZARNY ULTI-MATT 02.20.01.000002-504700', 'III-ANTRACYT ULTI-MATT 02.20.71.000001-504700'
            ],
            WoodenColorsOutsideOrInside: [
                'STANDARDOWY BIAŁY RAL9020',
                'KOLOR NIESTANDARDOWY RAL'
            ],
            filling: []

        }
    },
    watch: {
        woodenSystem() {
            const system = this.woodenSystem;
            if(system != '') {
                let typesArray = this.woodenSystems.find(option => option.systemOption == system);
                this.$store.commit('setChoosenSystem', typesArray); 
                let profilesList = typesArray.profiles;
                this.profilesToChoose = profilesList;
                let doorstepsList = typesArray.doorsteps;
                this.doorstepsToChoose = doorstepsList;
                let optionsToOpen = typesArray.openOption;
                this.openedOption = optionsToOpen;
                let typesList = typesArray.types;
                this.typesToShow = typesList;
                return typesList;                
            }


        },
        PVCSystem() {
            const system = this.PVCSystem;
            console.log(system);
           if(system !=""){
                let typesArray = this.PVCSystems.find(option => option.systemOption == system);
                this.$store.commit('setChoosenSystem', typesArray); 
                let typesList = typesArray.types;
                this.typesToShow = typesList;
                let profilesList = typesArray.profiles;
                this.profilesToChoose = profilesList;
                let doorstepsList = typesArray.doorsteps;
                this.doorstepsToChoose = doorstepsList;
                let optionsToOpen = typesArray.openOption;
                this.openedOption = optionsToOpen;
                return typesList;                
           // } else{
            //    return system;                
           // }
        }
    }
},
    methods: {
        chooseType(typeName, areHandles, isPost, posts, isDoorstep, isOpened, filling) {
            this.isPost = isPost;
            this.posts = posts;
            this.activeId = typeName;
            this.isDoorstep = isDoorstep;
            this.isOpened = isOpened;
            this.filling = filling;
            if(this.isShown === 'drewniane') {
                this.woodenType = typeName;
                this.isHandle = areHandles;                
            } else {
                this.PVCType = typeName;
                this.isHandle = areHandles;
            }
        },
        wooden() {
            this.isShown = 'drewniane';
            this.typesToShow = [];
            this.PVCSystem = '';
        },
        PVC() {
            this.isShown = 'PVC';
            this.typesToShow = [];
            this.woodenSystem ='';
        },
        setSystemAndType() {
            if(this.woodenSystem !=="" || this.PVCSystem !=="") {
                this.$store.commit('setAreHandles', this.isHandle);
                this.$store.commit('setProfilesToChoose', this.profilesToChoose);
                this.$store.commit('setIsPost', this.isPost);
                this.$store.commit('setPosts', this.posts);
                this.$store.commit('setIsDoorstep', this.isDoorstep);
                this.$store.commit('setDoorSteps', this.doorstepsToChoose);
                this.$store.commit('setIsOpened', this.isOpened);
                this.$store.commit('setOpenedOptions', this.openedOption);
                this.$store.commit('setFilling', this.filling);
                if(this.woodenSystem !== "" && this.woodenType !=="") {
                    this.errorMessage = "";
                    this.$store.commit('setSystem', this.woodenSystem); 
                    this.$store.commit('setType', this.woodenType);
                    this.$store.commit('setColorsInsideOrOutside', this.WoodenColorsOutsideOrInside); 
                } else if(this.PVCSystem !=="" && this.PVCType !== "") {
                    this.errorMessage = "";
                    this.$store.commit('setSystem', this.PVCSystem); 
                    this.$store.commit('setType', this.PVCType);
                    this.$store.commit('setColorsInsideOrOutside', this.PVCcolorsOutsideOrInside);                  
                } else {
                    this.errorMessage = "Wprowadź typ okna."
                    return;
                }
            } else {
                this.errorMessage = "Wprowadź system i typ okna."
                return;
            }
            this.$router.push('/mainInfo');
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
    width: 80%;
}
h3 {
    font-size: 23px;
    font-weight: 400;
    margin: 20px;
}
.system-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;    
}
.system-container option{
    height: 20px;
}
.wooden-PVC {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.wooden-PVC div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    margin: 10px;
    border: 3px solid #909a6b;
    padding: 10px;
    font-size: 18px;
}
.wooden-PVC div:hover {
    cursor: pointer;
    border: 4px solid  #323730;
    color: black;
}
.wooden-PVC .active {
    border: 4px solid rgb(184, 40, 40);
    color: black;
    font-weight: bold;
}
ul {
    margin: 20px;
}

li {
    list-style-type: none;
}
.type-container {
    height: 500px;
    overflow: auto;
}
.type-element {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid rgb(193, 189, 189);
    width: 500px;   
}
.type-element p {
    margin: 15px;
}
.type-element:hover {
    cursor: pointer;
    border-bottom: 1px solid rgb(246, 86, 86);
}
input[type="radio"]{
  visibility: hidden;
  height: 0;
  width: 0;
}
.error-message p{
    margin: 20px;
    color: red;
    font-size: 18px;
}
button {
    width: 400px;
}
.activeType {
    background-color: rgb(138, 186, 186);
    color: red;
}
select {
    font-size: 18px;
    padding:5px;
}

</style>
