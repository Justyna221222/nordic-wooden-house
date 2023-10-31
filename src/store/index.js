import { createStore } from 'vuex';

const appStore = createStore({
    state() {
        return {
            client: [],
            dateFrom: 'BRAK',
            dateTo: 'BRAK',
            description: '',
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
            isDiffuser: true,
            areHooksForviders: true,
            areMuntins: true,
            isBrake: false,
            isFitting: false,
            isGrabber: false,
            isEspagnolette: false,
            isInsert: false,

            windowSystem: '',
            windowType: '',
            winWidth: null,
            winHeight: null,
            winQuantity: null,
            winMilling: '',
            winHandles: '',
            winOpen: '',
            winPost: '',
            winDoorStep: '',
            winProfile: '',
            winInsideColor: '',
            winInsideColorRAL: ' ',
            winOutsideColor: '',
            winOutsideColorRAL: ' ',
            winFilling: '',
            winGlassesNumber: null,
            winBrake: '',
            winDiffuserDripCap: '',
            winHooks: '',
            winForviders: '',
            winMuntins: '',
            winMuntinType: '',
            winMuntinColor: '',
            winMuntinColorRAL: '',
            winCuantityHorizontalMuntins: 0,
            winCuantityVerticalMuntins: 0,
            winFitting: '',
            winEspagnolette: '',
            winGrabber: '',
            winInsert: '',
            winDescription: '',

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
        setIsDiffuser(state, isThereDiffuser) {
            state.isDiffuser = isThereDiffuser;
        },
        setAreHooksForviders(state, areHooksAndForviders) {
            state.areHooksForviders = areHooksAndForviders;
        },
        setAreMuntins(state, areThereMuntins) {
            state.areMuntins = areThereMuntins;
        },
        setIsBrake(state, isThereBrake) {
            state.isBrake = isThereBrake;
        },
        setIsFitting(state, isThereFitting) {
            state.isFitting = isThereFitting;
        },
        setIsGrabber(state, isThereGrabber) {
            state.isGrabber = isThereGrabber;
        },
        setIsEspagnolette(state, isThereEspagnolette) {
            state.isEspagnolette = isThereEspagnolette;
        },
        setIsInsert(state, isThereInsert) {
            state.isInsert = isThereInsert;
        },

        //windows data:
        setWinWidth(state, width) {
            state.winWidth = width;
        },
        setWinHeight(state, height) {
            state.winHeight = height;
        },
        setWinQuantity(state, quantity) {
            state.winQuantity = quantity;
        },
        setWinMilling(state, milling) {
            state.winMilling = milling;
        },
        setWinHandles(state, handles) {
            state.winHandles = handles;
        },
        setWinOpen(state, open) {
            state.winOpen = open;
        },
        setWinPost(state, post) {
            state.winPost = post;
        },
        setDoorStep(state, doorStep) {
            state.winDoorStep = doorStep;
        },
        setWinProfile(state, profile) {
            state.winProfile = profile;
        },
        setWinInsideColor(state, insideColor) {
            state.winInsideColor = insideColor;
        },
        setWinInsideColorRAL(state, insideColorRAL) {
            state.winInsideColorRAL = insideColorRAL;
        },
        setWinOutsideColor(state, outsideColor) {
            state.winOutsideColor = outsideColor;
        },
        setWinOutsideColorRAL(state, outsideColorRAL) {
            state.winOutsideColorRAL = outsideColorRAL;
        },
        setWinFilling(state, filling) {
            state.winFilling = filling;
        },
        setGlassesNumber(state, number) {
            state.winGlassesNumber = number;
        },
        setWinBrake(state, brake) {
            state.winBrake = brake;
        },
        setDiffuserDripCap(state, diffuserDripCap) {
            state.winDiffuserDripCap = diffuserDripCap;
        },
        setWinHooks(state, hooks) {
            state.winHooks = hooks;
        },
        setWinForviders(state, forviders) {
            state.winForviders = forviders;
        },
        setWinMuntins(state, muntins) {
            state.winMuntins = muntins;
        },
        setWinMuntinType(state, muntinType) {
            state.winMuntinType = muntinType;
        },
        setWinMuntinColor(state, muntinColor) {
            state.winMuntinColor = muntinColor;
        },
        setWinMuntinColorRAL(state, muntinColorRAL) {
            state.winMuntinColorRAL = muntinColorRAL;
        },
        setWinCuantityHorizontalMuntins(state, horMuntins) {
            state.winCuantityHorizontalMuntins = horMuntins;
        },
        setCuantityVerticalMuntins(state, verMuntins) {
            state.winCuantityVerticalMuntins = verMuntins;
        },
        setWinFitting(state, fitting) {
            state.winFitting = fitting;
        },
        setWinEspagnolette(state, espagnolette) {
            state.winEspagnolette = espagnolette;
        },
        setWinGrabber(state, grabber) {
            state.winGrabber = grabber;
        },
        setWinInsert(state, insert) {
            state.winInsert = insert;
        },
        setWinDescription(state, desc) {
            state.winDescription = desc;
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