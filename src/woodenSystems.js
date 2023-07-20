//import img: types for WoodlineClassic95
import KW1 from '../docs/images/NWH/woodline95classic/1-KW(F).png';
import TOP_SWING from '../docs/images/NWH/woodline95classic/TOP_SWING.png';
import SHL from '../docs/images/NWH/woodline95classic/SIDE_HANG_LEWY(SHL).png';
import SHP from '../docs/images/NWH/woodline95classic/SIDE_HANG_PRAWY(SHP).png';
import KW2 from '../docs/images/NWH/woodline95classic/2-KW(SHL_SHP).png';

//import img:types for Woodline95 Drzwi balkonowe
import KW1RL from '../docs/images/NWH/woodline95drzwi/1-KW(RL).png';
import KW1RP from '../docs/images/NWH/woodline95drzwi/1-KW(RP).png';
import KW2RLWRP from '../docs/images/NWH/woodline95drzwi/2-KW(RL_W-RP).png';
import KW2RLRPW from '../docs/images/NWH/woodline95drzwi/2-KW(RL_RP_W).png';


const windowSystems =[  
    {systemOption: 'Woodline 95 Classic',
        types: [
            {name:'1-KW(F)', url: KW1, areHandles: false, isPost:false, isDoorstep: false, isOpened: false, filling: ['szyba', 'częściowe wypełnienie + szyba', 'bez wypełnienia'], isBrake: false},
            {name:'TOP SWING', url: TOP_SWING, areHandles: true,  isPost:false, isDoorstep: false, isOpened: true, filling: ['szyba', 'częściowe wypełnienie + szyba', 'bez wypełnienia'], isBrake: false}, 
            {name: 'SIDE HUNG LEWY(SHL)', url: SHL, areHandles: true,  isPost:false, isDoorstep: false, isOpened: true, filling: ['szyba', 'częściowe wypełnienie + szyba', 'bez wypełnienia'], isBrake: false},
            {name: 'SIDE HUNG PRAWY(SHP)', url: SHP, areHandles: true,  isPost:false, isDoorstep: false, isOpened: true, filling: ['szyba', 'częściowe wypełnienie + szyba', 'bez wypełnienia'], isBrake: false},
            {name: '2-KW(SHL_SHP)', url: KW2, areHandles: true,  isPost:false, isDoorstep: false, isOpened: true, filling: ['szyba', 'częściowe wypełnienie + szyba', 'bez wypełnienia'], isBrake: false},
        ],
        handles: [
            {name: 'Srebrna HOPPE TOKYO MINI'},
            {name: 'Srebrna z KISI HOPPE TOKYO MINI'},
            {name: 'Srebrny mat'},
            {name: 'Czarna'}
        ],
        profiles: [
            'sosna'
        ],
        openOption: [
            'Na zewnątrz'
        ]
},
    {systemOption: 'Woodline 95 Drzwi balkonowe',
    types: [
            {name:'1-KW.(RL)', url: KW1RL, areHandles: true,  isPost:false, isDoorstep: true, isOpened: true, filling: ['szyba', 'częściowe wypełnienie + szyba'], isBrake: true},
            {name:'1-KW.(RP)', url: KW1RP, areHandles: true,  isPost:false, isDoorstep: true, isOpened: true, filling: ['szyba', 'częściowe wypełnienie + szyba'], isBrake: true}, 
            {name: '2-KW.(RL.W_RP)', url: KW2RLWRP, areHandles: true,  isPost:true, posts: ['RUCHOMY'], isDoorstep: true, isOpened: true, filling: ['szyba', 'częściowe wypełnienie + szyba'], isBrake: true},
            {name: '2-KW.(RL_RP.W)', url: KW2RLRPW, areHandles: true,  isPost:true, posts: ['RUCHOMY'], isDoorstep: true, isOpened: true, filling: ['szyba', 'częściowe wypełnienie + szyba'], isBrake: true},
        ],
        handles: [
            {name: 'Srebrny mat klamka (obustronnie), gałka od wewnątrz'},
            {name: 'Srebrny mat klamka (obustronnie), wkładka tylko od wewnątrz'},
            {name: 'Srebrny mat klamka (obustronnie), wkładka tylko od zewnątrz'},
            {name: 'Srebrny mat klamka (obustronnie), wkładka od zewnątrz i od wewnątrz'},
            {name: 'Srebrna klamka Hoppe Tokyo (obustronnie), gałka od wewnątrz'},
            {name: 'Srebrna klamka Hoppe Tokyo (obustronnie), wkładka od wewnątrz'},
            {name: 'Srebrna klamka Hoppe Tokyo (obustronnie), wkładka od zewnątrz'},
            {name: 'Srebrna klamka Hoppe Tokyo (obustronnie), wkładka od zewnątrz i od wewnątrz'},
            {name: 'Czarna klamka Hoppe Tokyo (obustronnie), gałka od wewnątrz'},
            {name: 'Czarna klamka Hoppe Tokyo (obustronnie), wkładka od zewnątrz i od wewnątrz'},

        ],
        profiles: [
            'SOSNA'
        ],
        doorsteps: [
            'ALU + DREWNO 25mm',
            'PRÓG DĘBOWY 57mm'
        ],
        openOption: [
            'Na zewnątrz'
        ],
        brakeOptions: [
            'BRAK',
            'HAMULEC W KLAMCE W DRZWIACH'
        ]
    }
]

export default windowSystems;