import { createRouter, createWebHistory } from 'vue-router';
import TheSummary from './components/TheSummary.vue';


import ClientData from './components/ClientData.vue';
import NewOffer from './components/NewOffer.vue';
import OfferList from './components/OfferList.vue';
import NewWindow from './components/NewWindow.vue';
import MainInfo from './components/MainInfo.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: ClientData},


        {path: '/clientData', component: ClientData},
        {path: '/newOffer', component: NewOffer},
        {path: '/offerList', component: OfferList},
        {path: '/newWindow', component: NewWindow},
        {path: '/mainInfo', component: MainInfo},
        {path: '/theSummary', component: TheSummary}
    ]
});

export default router;