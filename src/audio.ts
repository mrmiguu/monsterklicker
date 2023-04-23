import { Howl } from 'howler'
import { keys } from './utils'

const soundImports = import.meta.glob<{ default: string }>('./assets/audio/sounds/**/*')
const musicImports = import.meta.glob<{ default: string }>('./assets/audio/music/**/*')
const audioCache: Record<string, AsyncAudio> = {}

const pathBySound = {
  move: './assets/audio/sounds/move.wav',
  jump: './assets/audio/sounds/jump.wav',
  land: './assets/audio/sounds/land.wav',
  attack: './assets/audio/sounds/attack.wav',
  attackCritical: './assets/audio/sounds/attack-critical.wav',
  levelUp: './assets/audio/sounds/level-up.wav',
  sleep1: './assets/audio/sounds/sleep1.wav',
  sleep2: './assets/audio/sounds/sleep2.wav',
  sleep3: './assets/audio/sounds/sleep3.wav',
  sleep4: './assets/audio/sounds/sleep4.wav',
  sleep5: './assets/audio/sounds/sleep5.wav',
} as const

const pathByMusic = {
  A_Place_To_Hide:
    './assets/audio/music/A Place To Hide by Purrple Cat [ Lo-Fi _ Hip-Hop _ Chill-Hop _ Downtempo ] _ free-stock-music.com [Td7eE8v_uBg].mp3',
  Premonition_of_Tomorrow:
    './assets/audio/music/Premonition of Tomorrow by Keys of Moon [ Cinematic _ Sci-Fi _ Downtempo ] _ free-stock-music.com [e2r_LUaEu3Y].mp3',
  Home: './assets/audio/music/Home by yoitrax [ Electronica _ Synthwave _ Downtempo _ Chillwave ] _ free-stock-music.com [vozLd2IYZUM].mp3',
  Way_Up_High:
    './assets/audio/music/Way Up High by Pyrosion [ Electronica _ Epic _ Downtempo ] _ free-stock-music.com [Ju1yyEhkRpU].mp3',
  Peace:
    './assets/audio/music/Peace by Vlad Gluschenko [ Lo-Fi _ Downtempo _ Relaxing _ Gentle ] _ free-stock-music.com [0PR-Bx5ixk8].mp3',
  Droplets:
    './assets/audio/music/Droplets by Pyrosion [ Electronic _ Lo-Fi _ Downtempo _ Mystic ] _ free-stock-music.com [XD7ZfZ0Kq0Q].mp3',
  Pink_Cadillac:
    './assets/audio/music/Pink Cadillac by tubebackr [ Downtempo _ Trip-Hop ] _ free-stock-music.com [9Pp_xayCFxg].mp3',
  Cafezinho_Com_Leite:
    './assets/audio/music/Cafezinho Com Leite by Popoi [ Lo-Fi _ Hip-Hop _ Chill-Hop _ Downtempo ] _ free-stock-music.com [EqON2mmco8k].mp3',
  TANGERINE:
    './assets/audio/music/TANGERINE by Audionautix [ Lo-Fi _ Downtempo _ Trip Hop _ Hip-Hop _ Misc ] _ free-stock-music.com [N-EruYvZgsM].mp3',
  Cozy_Place:
    './assets/audio/music/Cozy Place by Keys of Moon [ Lo-Fi _ Hip-Hop _ Chill-Hop _ Downtempo ] _ free-stock-music.com [siedYnVExRo].mp3',
  You_Cant_Turn_Back_Time:
    './assets/audio/music/You Can’t Turn Back Time by Punch Deck [ Electronica _ Downtempo ] _ free-stock-music.com [eEwnn8MnnBc].mp3',
  Black_Cherry:
    './assets/audio/music/Black Cherry by Purrple Cat [ Lo-Fi _ Hip-Hop _ Ambient _ Downtempo ] _ free-stock-music.com [7ilKYXxzUww].mp3',
  Take_It_Easy:
    './assets/audio/music/Take It Easy by yoitrax [ Electronica _ Chill-Out _ Downtempo _ Trap ] _ free-stock-music.com [pXwlZ9OY4vQ].mp3',
  The_Reason:
    './assets/audio/music/The Reason by yoitrax [ Electronica _ Ambient _ Chill-Out _ Downtempo ] _ free-stock-music.com [LZbk8nvHuVM].mp3',
  Ripple:
    './assets/audio/music/Ripple by tubebackr [ Funky _ Groove _ Downtempo ] _ free-stock-music.com [FjF7Sq2sBZ4].mp3',
  Flying_Leaves:
    './assets/audio/music/Flying Leaves by Vlad Gluschenko [ Electronica _ Downtempo _ Inspiring ] _ free-stock-music.com [C828HyqFGmw].mp3',
  View_Of_Night_Sky:
    './assets/audio/music/View Of Night Sky by Vlad Gluschenko [ Downtempo _ Trip Hop _ Romantic ] _ free-stock-music.com [xzJ9CYgdApY].mp3',
  Our_Past_Lives_Together:
    './assets/audio/music/Our Past Lives Together by Artificial.Music [ Electronica _ Downtempo ] _ free-stock-music.com [VLLxRP7Y3Ws].mp3',
  Calma:
    './assets/audio/music/Calma by Electronic Senses [ Electronica _ Synthwave _ Downtempo ] _ free-stock-music.com [-nIE2tHLxY8].mp3',
  Twilight_City:
    './assets/audio/music/Twilight City by _ e s c p _ [ Electronica _ Chillstep _ Chillwave ] _ free-stock-music.com [AXCHKLE3BpQ].mp3',
  Kats_Anthem:
    './assets/audio/music/Kat’s Anthem by tubebackr [ Downtempo _ Trip-Hop ] _ free-stock-music.com [DfKSr1Yjhls].mp3',
  Privy:
    './assets/audio/music/Privy by Joe Crotty [ R&B _ Soul _ Downtempo _ Trip Hop _ Chill-Out ] _ free-stock-music.com [4c8keojjKY8].mp3',
  One_Last_TIme:
    './assets/audio/music/One Last TIme by ADERIN [ Electronica _ Downtempo _ Trip Hop ] _ free-stock-music.com [M1ZlRuXYQ8k].mp3',
  Ascent:
    './assets/audio/music/Ascent by Pyrosion [ Downtempo _ Nostalgic _ Melancholic _ Sad ] _ free-stock-music.com [PWqi-DWVvVI].mp3',
  Skip: './assets/audio/music/Skip by Joe Crotty [ Downtempo _ Trip Hop _ Experimental _ Miscellaneous ] _ free-stock-music.com [H4GxdrWA8l8].mp3',
  Out_Of_Sync:
    './assets/audio/music/Out Of Sync by Artificial.Music [ Chill-Out _ Romantic _ Downtempo _ Trip Hop _ Shoegaze ] [NUeOcpSEVq8].mp3',
  Echoes_Of_The_Soul:
    './assets/audio/music/Echoes Of The Soul by Ron Gelinas [ Lo-Fi _ R&B _ Chill-Hop _ Downtempo ] _ free-stock-music.com [kudHtasjBTE].mp3',
  Aura: './assets/audio/music/Aura by Ron Gelinas [ Chill-Out _ Downtempo _ Trip Hop _ Romantic _ Piano ] _ free-stock-music.com [N07qlo7tbAo].mp3',
  Stranded:
    './assets/audio/music/Stranded by Purrple Cat [ Lo-Fi _ Hip-Hop _ Chill-Hop _ Downtempo ] _ free-stock-music.com [LP0f0rlGhTQ].mp3',
  The_Two_Of_Us:
    './assets/audio/music/The Two Of Us by Pyrosion [ R&B _ Soul _ Chill-Out _ Lo-Fi _ Downtempo ] _ free-stock-music.com [f7wKLmEqpw8].mp3',
  Landscape:
    './assets/audio/music/Landscape by yoitrax [ Electronica _ Downtempo _ Trip Hop ] _ free-stock-music.com [uR7KXGo_J9o].mp3',
  Learning_To_Fly:
    './assets/audio/music/Learning To Fly by FSM Team [ Electronica _ Downtempo ] _ free-stock-music.com [5dueMVxUiVY].mp3',
  Northern_Lights_by_Vlad_Gluschenko:
    './assets/audio/music/Northern Lights by Vlad Gluschenko [ Downtempo _ Lo-Fi _ Inspirational ] _ free-stock-music.com [o-LAF3iej3U].mp3',
  Fragile:
    './assets/audio/music/Fragile by Keys of Moon [ Lo-Fi _ Chill-Out _ Piano _ Downtempo _ Trip Hop ] _ free-stock-music.com [M3KVgaXpjXg].mp3',
  The_Chase:
    './assets/audio/music/The Chase by tubebackr [ Electronica _ Downtempo _ Trip Hop ] _ free-stock-music.com [YFrmUdNzDsU].mp3',
  Sanctuary:
    './assets/audio/music/Sanctuary by AERØHEAD feat. Idyllic [ Lo-Fi _ Chill-Out _ Hip-Hop _ Downtempo _ Trip Hop ] [ssmLdx4ZxiQ].mp3',
  Eyes_On_Me:
    './assets/audio/music/Eyes On Me by tubebackr [ Groove _ Downtempo _ Trip-Hop ] _ free-stock-music.com [UhDSAr_FJoM].mp3',
  The_View:
    './assets/audio/music/The View by Pyrosion [ Electronica _ Downtempo _ Lo-Fi _ Chill-Out ] _ free-stock-music.com [YnlG0CLTxK4].mp3',
  Sunset:
    './assets/audio/music/Sunset by AERØHEAD [ Electronica _ Downtempo _ Chillstep ] _ free-stock-music.com [bI7A-qgv8S0].mp3',
  I_Think_About_You_All_The:
    './assets/audio/music/I Think About You All The... [ Trip Hop _ Lo-Fi _ Jazzy ] by Artificial.Music _ free-stock-music.com [aPhzA9z8xA4].mp3',
  Light_Of_Daytime:
    './assets/audio/music/Light Of Daytime by Vlad Gluschenko [ Downtempo _ Inspirational _ Misc ] _ free-stock-music.com [lJbCv4PNw4k].mp3',
  Going_With_The_Flow:
    './assets/audio/music/Going With The Flow by Purrple Cat [ Lo-Fi _ Downtempo _ Trip Hop _ Ambient ] _ free-stock-music.com [oyc1c36fE9g].mp3',
  Shadow_Inside:
    './assets/audio/music/Shadow Inside by Joshua McLean [ Cinematic _ Piano _ Downtempo _ VGM ] _ free-stock-music.com [vDj_6Hpszmw].mp3',
  Mechanical_Precision:
    './assets/audio/music/Mechanical Precision by Glitch [ Electronica _ D&B _ Trip Hop _ Electro ] _ free-stock-music.com [j8ZACgf_05Y].mp3',
  CANDYLAND:
    './assets/audio/music/CANDYLAND by Audionautix [ Electronica _ Lo-Fi _ Downtempo ] _ free-stock-music.com [HNnQAPK2cGw].mp3',
  Dandelion:
    './assets/audio/music/Dandelion by _ e s c p _ [ Lo-Fi _ Chill-Hop _ Shoegaze _ Downtempo ] _ free-stock-music.com [DJG_JlfmxBg].mp3',
  Come_On_Up:
    './assets/audio/music/Come On Up by Joe Crotty [ Electronica _ Downtempo _ Experimental _ Misc ] _ free-stock-music.com [4f8k44fxce0].mp3',
  Autumn_Walk:
    './assets/audio/music/Autumn Walk by Vlad Gluschenko [ Electronica _ Lo-Fi _ Downtempo _ Positive ] _ free-stock-music.com [GXi7QFxSmPY].mp3',
  Calling_Out:
    './assets/audio/music/Calling Out by AERØHEAD [ Electronica _ Downtempo _ Chill-Out _ Romantic ] _ free-stock-music.com [RE-yu277MlE].mp3',
  Winter_Sunrise:
    './assets/audio/music/Winter Sunrise by Peyton Ross [ Lo-Fi _ Electronica _ Downtempo _ Hip-Hop ] _ free-stock-music.com [_DTpTp-M_4o].mp3',
  Somewhere_Down_The_Line:
    './assets/audio/music/Somewhere Down The Line by AERØHEAD [ Downtempo _ Chillstep _ Piano ] _ free-stock-music.com [CjxxQ2S68qU].mp3',
  Neon_Tiger:
    './assets/audio/music/Neon Tiger by Purrple Cat [ Lo-Fi _ Hip-Hop _ Chillhop _ Downtempo ] _ free-stock-music.com [Yvc02sTjnDc].mp3',
  Trip_Hop:
    './assets/audio/music/Trip Hop by Glitch [ Hip-Hop _ Rap _ Downtempo _ Trip Hop _ Chill-Hop ] _ free-stock-music.com [9pZlobIX-PU].mp3',
  Northern_Lights_by_yoitrax:
    './assets/audio/music/Northern Lights by yoitrax [ Lo-Fi _ Downtempo _ Trip Hop ] _ free-stock-music.com [k-YEsrKC1ao].mp3',
  Intermezzo:
    './assets/audio/music/Intermezzo by [friendzoned] [ Electronica _ Downtempo _ Chill-Out _ Lo-Fi ] _ free-stock-music.com [rdhKps9NNu8].mp3',
  Moonlight_Romances_Embrace:
    './assets/audio/music/Moonlight Romance’s Embrace by Artificial.Music [ Electronica _ Downtempo ] _ free-stock-music.com [yTv4Bb36MAI].mp3',
  Time_Dust:
    './assets/audio/music/Time Dust by Schematist [ Electronica _ Hip-Hop _ Downtempo ] _ free-stock-music.com [2ThF4gvJb-c].mp3',
  Spring_Tune:
    './assets/audio/music/Spring Tune by Vlad Gluschenko [ Lo-Fi _ Downtempo _ Relaxing _ Romantic ] _ free-stock-music.com [DnSHz-F3pc8].mp3',
  Hope: './assets/audio/music/Hope by yoitrax [ Downtempo _ Trip Hop _ Hip-Hop ] _ free-stock-music.com [s7b92DE6guM].mp3',
  Muse: './assets/audio/music/Muse by Purrple Cat [ Lofi _ Downtempo _ Chillhop _ Piano _ Sad _ Nostalgic ] _ free-stock-music.com [Fkwsf-IL1-Q].mp3',
  Equinox:
    './assets/audio/music/Equinox by Ron Gelinas Chillout Lounge [ Piano _ Downtempo _ Romantic ] _ free-stock-music.com [Tonc350gbtc].mp3',
  Freshness_Of_Air:
    './assets/audio/music/Freshness Of Air by Vlad Gluschenko [ Lo-Fi _ Downtempo _ Folktronica ] _ free-stock-music.com [mh0dcm46v-E].mp3',
  Sundae_Sunset:
    './assets/audio/music/Sundae Sunset by Purrple Cat [ Lo-Fi _ Chill-Out _ Downtempo _ Trip Hop _ Jazzy ] [39p60MSPe_E].mp3',
} as const

type Sound = keyof typeof pathBySound
type Music = keyof typeof pathByMusic
type Audio = Sound | Music

const sleepSoundChoices = ['sleep1', 'sleep2', 'sleep3', 'sleep4', 'sleep5'] as Sound[]
const musicChoices = keys(pathByMusic) as Music[]

type Options = {
  volume: number
  loop: boolean
}

class AsyncAudio {
  static playingSolo: AsyncAudio | null = null

  constructor(private howlPromise: Promise<Howl>, private isSolo: boolean) {}

  play = async ({ volume = 0.25, loop = false }: Partial<Options> = {}) => {
    const howl = await this.howlPromise

    if (this.isSolo && AsyncAudio.playingSolo) {
      await AsyncAudio.playingSolo.stop()
    }

    howl.volume(volume)
    howl.loop(loop)
    howl.play()

    if (this.isSolo) {
      AsyncAudio.playingSolo = this
    }
  }

  stop = async () => {
    const howl = await this.howlPromise
    howl.stop()

    if (this.isSolo) {
      AsyncAudio.playingSolo = null
    }
  }
}

function getAudio(audio: Audio): AsyncAudio {
  const path = audio in pathBySound ? pathBySound[audio as Sound] : pathByMusic[audio as Music]
  const isSolo = audio in pathByMusic

  if (!(path in audioCache)) {
    audioCache[path] = new AsyncAudio(
      new Promise(async resolve => {
        const audioImport = soundImports[path] ?? musicImports[path]
        if (!audioImport) throw new Error(`Failed to find audio: "${path}"`)

        const { default: src } = await audioImport()

        resolve(new Howl({ src }))
      }),
      isSolo,
    )
  }

  return audioCache[path]!
}

function playSound(sound: Sound, options: Partial<Options> = {}) {
  getAudio(sound).play(options)
}
function playMusic(music: Music, { loop = true, ...options }: Partial<Options> = {}) {
  getAudio(music).play({ loop, ...options })
}

export type { Sound, Music, Audio }
export { sleepSoundChoices, musicChoices, getAudio, playSound, playMusic }
