import { createStore } from 'vuex';

const appStore = createStore({
    state() {
        return {
            client: [],
            dateFrom: '',
            dateTo: '',
            description: '',
            windowSystem: '',
            windowType: '',
            choosenSystem: [],
            areHandles: true,
            profilesToChoose: [],
            isPost: false,
            posts: [],
            colorsOutiseAndInside:[],
            isDoorstep: false,
            doorSteps: [],
            isOpened: false,
            openedOptions: [],
            filling: [],


            basketDisabled: false,
            Windows: []
        };
    },
    mutations: {
        setClient(state, client) {
            state.client = client;
        },
        setDateFrom(state, dateFrom) {
            state.dateFrom = dateFrom;
        },
        setDateTo(state, dateTo) {
            state.dateTo = dateTo;
        },
        setDescription(state, desc) {
            state.description = desc;
        },
        setSystem(state, system) {
            state.windowSystem = system;
        },
        setType(state, type) {
            state.windowType = type;
        },
        setChoosenSystem(state, choosenSystem) {
            state.choosenSystem = choosenSystem;
        },
        setAreHandles(state, areThereHandles) {
            state.areHandles = areThereHandles;
        },
        setProfilesToChoose(state, profilesToChoose) {
            state.profilesToChoose = profilesToChoose;
        },
        setIsPost(state, isTherePost) {
            state.isPost = isTherePost;
        },
        setPosts(state, typesPosts) {
            state.posts = typesPosts;
        },
        setColorsInsideOrOutside(state, colors) {
            state.colorsOutiseAndInside = colors;
        },
        setIsDoorstep(state, isThereDoorstep) {
            state.isDoorstep = isThereDoorstep;
        },
        setDoorSteps(state, doorsteps) {
            state.doorSteps = doorsteps;
        },
        setIsOpened(state, canOpen) {
            state.isOpened = canOpen;
        },
        setOpenedOptions(state, howOpen) {
            state.openedOptions = howOpen;
        },
        setFilling(state, winFilling) {
            state.filling = winFilling;
        },




        setBasketDisabled(state) {
            state.basketDisabled = true;
        },
        addNewWindow(state, window) {
            state.Windows.push(window);
        }
    },
    actions: {

    }
});


export default appStore;