import { useAsync } from 'react-use'
import { keys } from './utils'

const graphicImports = import.meta.glob<{ default: string }>('./assets/graphics/**/*')

const pathByBackground = {
  twilight_cityscape: './assets/graphics/backgrounds/twilight_cityscape.jpeg',
  ocean_view: './assets/graphics/backgrounds/ocean_view.webp',
  night_lakefront: './assets/graphics/backgrounds/night_lakefront.png',
  lake_view: './assets/graphics/backgrounds/lake_view.jpeg',
  city_scape: './assets/graphics/backgrounds/city_scape.jpeg',
  mountain_view: './assets/graphics/backgrounds/mountain_view.jpeg',
  overgrown_city: './assets/graphics/backgrounds/overgrown_city.jpeg',
  eastern_mountain_tops: './assets/graphics/backgrounds/eastern_mountain_tops.png',
  forest_waterfalls: './assets/graphics/backgrounds/forest_waterfalls.png',
  forest_clearing: './assets/graphics/backgrounds/forest_clearing.jpeg',
}

const pathByMonster = {
  The_Scuttler: './assets/graphics/sprites/monsters/001 The Scuttler.png',
  Mad_Fish: './assets/graphics/sprites/monsters/002 Mad Fish.png',
  See_er: './assets/graphics/sprites/monsters/003 See-er.png',
  Slome: './assets/graphics/sprites/monsters/004 Slome.png',
  Kerpant: './assets/graphics/sprites/monsters/005 Kerpant.png',
  Ghost_a_Sleep: './assets/graphics/sprites/monsters/006 Ghost-a-Sleep.png',
  Cadaver: './assets/graphics/sprites/monsters/007 Cadaver.png',
  Golem: './assets/graphics/sprites/monsters/008 Golem.png',
  Vampire: './assets/graphics/sprites/monsters/009 Vampire.png',
  Slimeclops: './assets/graphics/sprites/monsters/010 Slimeclops.png',
  Despereaux: './assets/graphics/sprites/monsters/011 Despereaux.png',
  Thriller: './assets/graphics/sprites/monsters/013 Thriller.png',
  NagaSan: './assets/graphics/sprites/monsters/014 NagaSan.png',
  Scorbster: './assets/graphics/sprites/monsters/015 Scorbster.png',
  Cockatrix: './assets/graphics/sprites/monsters/017 Cockatrix.png',
  AstroWoman: './assets/graphics/sprites/monsters/020 AstroWoman.png',
  Centicrede: './assets/graphics/sprites/monsters/021 Centicrede.png',
  Glost: './assets/graphics/sprites/monsters/022 Glost.png',
  Prehistoric_Rex: './assets/graphics/sprites/monsters/023 Prehistoric Rex.png',
  Madusa: './assets/graphics/sprites/monsters/024 Madusa.png',
  Ninji: './assets/graphics/sprites/monsters/025 Ninji.png',
  Sporet: './assets/graphics/sprites/monsters/026 Sporet.png',
  Thugshroom: './assets/graphics/sprites/monsters/027 Thugshroom.png',
  Beholden: './assets/graphics/sprites/monsters/028 Beholden.png',
  Death_Gaze: './assets/graphics/sprites/monsters/029 Death Gaze.png',
  Baby_Dragon: './assets/graphics/sprites/monsters/032 Baby Dragon.png',
  Giant_Worman: './assets/graphics/sprites/monsters/033 Giant Worman.png',
  Nellyfish: './assets/graphics/sprites/monsters/034 Nellyfish.png',
  Man_Eater: './assets/graphics/sprites/monsters/035 Man Eater.png',
  Mole_Man: './assets/graphics/sprites/monsters/036 Mole Man.png',
  Mimicry: './assets/graphics/sprites/monsters/037 Mimicry.png',
  Impster: './assets/graphics/sprites/monsters/038 Impster.png',
  Afterlife: './assets/graphics/sprites/monsters/039 Afterlife.png',
  Boldude: './assets/graphics/sprites/monsters/040 Boldude.png',
  Hamguard: './assets/graphics/sprites/monsters/041 Hamguard.png',
  Trimoeba: './assets/graphics/sprites/monsters/042 Trimoeba.png',
  Haniwa_Sir: './assets/graphics/sprites/monsters/043 Haniwa Sir.png',
  Haunted_Sword: './assets/graphics/sprites/monsters/044 Haunted Sword.png',
  Sphunx: './assets/graphics/sprites/monsters/046 Sphunx.png',
  Gobber: './assets/graphics/sprites/monsters/048 Gobber.png',
  Crowdiction: './assets/graphics/sprites/monsters/049 Crowdiction.png',
  Executionite: './assets/graphics/sprites/monsters/050 Executionite.png',
  Gigantron: './assets/graphics/sprites/monsters/051 Gigantron.png',
  Mummified: './assets/graphics/sprites/monsters/052 Mummified.png',
  Tourist: './assets/graphics/sprites/monsters/053 Tourist.png',
  El_Tigre: './assets/graphics/sprites/monsters/054 El Tigre.png',
  Froad: './assets/graphics/sprites/monsters/055 Froad.png',
  Magic_Man: './assets/graphics/sprites/monsters/056 Magic Man.png',
  Mothaboid: './assets/graphics/sprites/monsters/057 Mothaboid.png',
  Natures_Revenge: './assets/graphics/sprites/monsters/058 Natures Revenge.png',
  Porcudine: './assets/graphics/sprites/monsters/059 Porcudine.png',
  Sahwahgin: './assets/graphics/sprites/monsters/060 Sahwahgin.png',
  Skrid: './assets/graphics/sprites/monsters/061 Skrid.png',
  GlutWyrm: './assets/graphics/sprites/monsters/062 GlutWyrm.png',
  Treant: './assets/graphics/sprites/monsters/063 Treant.png',
  Cultist: './assets/graphics/sprites/monsters/064 Cultist.png',
  Lizord: './assets/graphics/sprites/monsters/065 Lizord.png',
  Dark_Knight: './assets/graphics/sprites/monsters/066 Dark Knight.png',
  Yeti: './assets/graphics/sprites/monsters/067 Yeti.png',
  The_Pincher: './assets/graphics/sprites/monsters/068 The Pincher.png',
  Bad_Dog: './assets/graphics/sprites/monsters/070 Bad Dog.png',
  Batling: './assets/graphics/sprites/monsters/071 Batling.png',
  Bozo: './assets/graphics/sprites/monsters/072 Bozo.png',
  Clownette: './assets/graphics/sprites/monsters/073 Clownette.png',
  Dude: './assets/graphics/sprites/monsters/074 Dude.png',
  False_Door: './assets/graphics/sprites/monsters/075 False Door.png',
  The_Finisher: './assets/graphics/sprites/monsters/076 The Finisher.png',
  Alice: './assets/graphics/sprites/monsters/077 Alice.png',
  Boot_Lizard: './assets/graphics/sprites/monsters/078 Boot Lizard.png',
  Hypnotizer: './assets/graphics/sprites/monsters/079 Hypnotizer.png',
  Joan: './assets/graphics/sprites/monsters/080 Joan.png',
  King_Grip: './assets/graphics/sprites/monsters/081 King Grip.png',
  Mortoise: './assets/graphics/sprites/monsters/082 Mortoise.png',
  nethette: './assets/graphics/sprites/monsters/083 nethette.png',
  The_Stinger: './assets/graphics/sprites/monsters/084 The Stinger.png',
  tired_turtle: './assets/graphics/sprites/monsters/085 tired turtle.png',
  Wanted: './assets/graphics/sprites/monsters/086 Wanted.png',
  Attack_Slug: './assets/graphics/sprites/monsters/087 Attack Slug.png',
  Bandito: './assets/graphics/sprites/monsters/088 Bandito.png',
  Dark_Nun: './assets/graphics/sprites/monsters/089 Dark Nun.png',
  Dark_Priest: './assets/graphics/sprites/monsters/090 Dark Priest.png',
  Piratio: './assets/graphics/sprites/monsters/091 Piratio.png',
  Retro_Robo: './assets/graphics/sprites/monsters/092 Retro Robo.png',
  Hob_Gobber: './assets/graphics/sprites/monsters/093 Hob Gobber.png',
  White_Knight: './assets/graphics/sprites/monsters/094 White Knight.png',
  Salamander: './assets/graphics/sprites/monsters/095 Salamander.png',
  The_Widower: './assets/graphics/sprites/monsters/096 The Widower.png',
  Boss_Big_No: './assets/graphics/sprites/monsters/098 Boss 02 Big No.png',
  Boss_Gibbering_Atrocity: './assets/graphics/sprites/monsters/099 Boss 03 Gibbering Atrocity.png',
  Boss_Death_Majestic: './assets/graphics/sprites/monsters/100 Boss 04 Death Majestic.png',
  apel: './assets/graphics/sprites/monsters/apel.png',
  arachnoid: './assets/graphics/sprites/monsters/arachnoid.png',
  archo_bat: './assets/graphics/sprites/monsters/archo_bat.png',
  awe_slug: './assets/graphics/sprites/monsters/awe_slug.png',
  baby_poop: './assets/graphics/sprites/monsters/baby_poop.png',
  bad_battler: './assets/graphics/sprites/monsters/bad_battler.png',
  bad_general: './assets/graphics/sprites/monsters/bad_general.png',
  bae_hoe: './assets/graphics/sprites/monsters/bae_hoe.png',
  baffle_ice: './assets/graphics/sprites/monsters/baffle_ice.png',
  bee_fall: './assets/graphics/sprites/monsters/bee_fall.png',
  Behemoth_: './assets/graphics/sprites/monsters/Behemoth_128.png',
  birdle: './assets/graphics/sprites/monsters/birdle.png',
  Black_Candle_: './assets/graphics/sprites/monsters/Black Candle_32.png',
  blackmack: './assets/graphics/sprites/monsters/blackmack.png',
  bleel: './assets/graphics/sprites/monsters/bleel.png',
  bleye_dye: './assets/graphics/sprites/monsters/bleye_dye.png',
  boodalf: './assets/graphics/sprites/monsters/boodalf.png',
  box_bird: './assets/graphics/sprites/monsters/box_bird.png',
  cactle: './assets/graphics/sprites/monsters/cactle.png',
  champ_son: './assets/graphics/sprites/monsters/champ_son.png',
  chucky_drop: './assets/graphics/sprites/monsters/chucky_drop.png',
  cobless: './assets/graphics/sprites/monsters/cobless.png',
  coraler: './assets/graphics/sprites/monsters/coraler.png',
  Coward_: './assets/graphics/sprites/monsters/Coward_64.png',
  crab_high: './assets/graphics/sprites/monsters/crab_high.png',
  cracked_pharaoh: './assets/graphics/sprites/monsters/cracked_pharaoh.png',
  crazy_tim: './assets/graphics/sprites/monsters/crazy_tim.png',
  crop_slop: './assets/graphics/sprites/monsters/crop_slop.png',
  crush_puff: './assets/graphics/sprites/monsters/crush_puff.png',
  cubey: './assets/graphics/sprites/monsters/cubey.png',
  cyclobber: './assets/graphics/sprites/monsters/cyclobber.png',
  demon_dork: './assets/graphics/sprites/monsters/demon_dork.png',
  demon_purple: './assets/graphics/sprites/monsters/demon_purple.png',
  dinopitch: './assets/graphics/sprites/monsters/dinopitch.png',
  divinifly: './assets/graphics/sprites/monsters/divinifly.png',
  double_dog: './assets/graphics/sprites/monsters/double_dog.png',
  double_roo: './assets/graphics/sprites/monsters/double_roo.png',
  drill_doe: './assets/graphics/sprites/monsters/drill_doe.png',
  droolzy: './assets/graphics/sprites/monsters/droolzy.png',
  druggy_hand_l: './assets/graphics/sprites/monsters/druggy-hand-l.png',
  druggy_hand_r: './assets/graphics/sprites/monsters/druggy-hand-r.png',
  druggy_head: './assets/graphics/sprites/monsters/druggy-head.png',
  dust_golem: './assets/graphics/sprites/monsters/dust_golem.png',
  earth_wind_warrior: './assets/graphics/sprites/monsters/earth_wind_warrior.png',
  employee_hook: './assets/graphics/sprites/monsters/employee_hook.png',
  fake_mystic: './assets/graphics/sprites/monsters/fake_mystic.png',
  fake_vapor: './assets/graphics/sprites/monsters/fake_vapor.png',
  fennix: './assets/graphics/sprites/monsters/fennix.png',
  fight_wife: './assets/graphics/sprites/monsters/fight_wife.png',
  flake_fairy: './assets/graphics/sprites/monsters/flake_fairy.png',
  Flame_: './assets/graphics/sprites/monsters/Flame_48.png',
  flare_flow: './assets/graphics/sprites/monsters/flare_flow.png',
  flash_elf: './assets/graphics/sprites/monsters/flash_elf.png',
  flat_slither: './assets/graphics/sprites/monsters/flat_slither.png',
  flim_flam: './assets/graphics/sprites/monsters/flim_flam.png',
  floor_fly: './assets/graphics/sprites/monsters/floor_fly.png',
  flowick: './assets/graphics/sprites/monsters/flowick.png',
  frozenstein: './assets/graphics/sprites/monsters/frozenstein.png',
  full_oxide: './assets/graphics/sprites/monsters/full_oxide.png',
  galapuddle: './assets/graphics/sprites/monsters/galapuddle.png',
  ghost_cupid: './assets/graphics/sprites/monsters/ghost_cupid.png',
  glare: './assets/graphics/sprites/monsters/glare.png',
  good_chef: './assets/graphics/sprites/monsters/good_chef.png',
  grayja: './assets/graphics/sprites/monsters/grayja.png',
  grayngel: './assets/graphics/sprites/monsters/grayngel.png',
  greatoucan: './assets/graphics/sprites/monsters/greatoucan.png',
  grump: './assets/graphics/sprites/monsters/grump.png',
  guardian_bug: './assets/graphics/sprites/monsters/guardian_bug.png',
  half_zeus: './assets/graphics/sprites/monsters/half_zeus.png',
  half_on_orc: './assets/graphics/sprites/monsters/half-on_orc.png',
  hammer_j: './assets/graphics/sprites/monsters/hammer-j.png',
  hawaiidol: './assets/graphics/sprites/monsters/hawaiidol.png',
  her_spark: './assets/graphics/sprites/monsters/her_spark.png',
  hissy_slide: './assets/graphics/sprites/monsters/hissy_slide.png',
  hop_rex: './assets/graphics/sprites/monsters/hop_rex.png',
  horned_hornet: './assets/graphics/sprites/monsters/horned_hornet.png',
  hot_cold_kid: './assets/graphics/sprites/monsters/hot_cold_kid.png',
  ice_foo: './assets/graphics/sprites/monsters/ice_foo.png',
  ice_orc: './assets/graphics/sprites/monsters/ice_orc.png',
  jelliquid: './assets/graphics/sprites/monsters/jelliquid.png',
  jelly_crawl: './assets/graphics/sprites/monsters/jelly_crawl.png',
  johnny_droop: './assets/graphics/sprites/monsters/johnny_droop.png',
  jump_devil: './assets/graphics/sprites/monsters/jump_devil.png',
  king_hoppity: './assets/graphics/sprites/monsters/king_hoppity.png',
  king_james_violet: './assets/graphics/sprites/monsters/king_james_violet.png',
  kitty_demon: './assets/graphics/sprites/monsters/kitty_demon.png',
  last_war_bird: './assets/graphics/sprites/monsters/last_war_bird.png',
  lick_larry: './assets/graphics/sprites/monsters/lick_larry.png',
  lion_rock: './assets/graphics/sprites/monsters/lion_rock.png',
  low_wolf: './assets/graphics/sprites/monsters/low_wolf.png',
  magnet_devil: './assets/graphics/sprites/monsters/magnet_devil.png',
  manny_pup: './assets/graphics/sprites/monsters/manny_pup.png',
  maskete: './assets/graphics/sprites/monsters/maskete.png',
  meal_metal: './assets/graphics/sprites/monsters/meal_metal.png',
  mecha_bull: './assets/graphics/sprites/monsters/mecha_bull.png',
  memoranha: './assets/graphics/sprites/monsters/memoranha.png',
  memory_flash: './assets/graphics/sprites/monsters/memory_flash.png',
  mighteeta: './assets/graphics/sprites/monsters/mighteeta.png',
  mighty_mouse: './assets/graphics/sprites/monsters/mighty_mouse.png',
  muscle_elf: './assets/graphics/sprites/monsters/muscle_elf.png',
  mystery_moth: './assets/graphics/sprites/monsters/mystery_moth.png',
  neuroto_walk: './assets/graphics/sprites/monsters/neuroto_walk.png',
  never_gnome: './assets/graphics/sprites/monsters/never_gnome.png',
  never_pot: './assets/graphics/sprites/monsters/never_pot.png',
  no_box: './assets/graphics/sprites/monsters/no_box.png',
  octolight: './assets/graphics/sprites/monsters/octolight.png',
  one_kay_idol: './assets/graphics/sprites/monsters/one_kay_idol.png',
  orco_fro: './assets/graphics/sprites/monsters/orco_fro.png',
  papa_poop: './assets/graphics/sprites/monsters/papa_poop.png',
  party_drill: './assets/graphics/sprites/monsters/party_drill.png',
  pegacorn: './assets/graphics/sprites/monsters/pegacorn.png',
  pegawk: './assets/graphics/sprites/monsters/pegawk.png',
  pencil_boy: './assets/graphics/sprites/monsters/pencil_boy.png',
  pentaserpent: './assets/graphics/sprites/monsters/pentaserpent.png',
  phony_prophet: './assets/graphics/sprites/monsters/phony_prophet.png',
  pickle_wind: './assets/graphics/sprites/monsters/pickle_wind.png',
  pincer_pinch: './assets/graphics/sprites/monsters/pincer_pinch.png',
  pingja: './assets/graphics/sprites/monsters/pingja.png',
  plower: './assets/graphics/sprites/monsters/plower.png',
  point_lobster: './assets/graphics/sprites/monsters/point_lobster.png',
  polar_hand_l: './assets/graphics/sprites/monsters/polar-hand-l.png',
  polar_hand_r: './assets/graphics/sprites/monsters/polar-hand-r.png',
  polar_head: './assets/graphics/sprites/monsters/polar-head.png',
  portal_wolf: './assets/graphics/sprites/monsters/portal_wolf.png',
  powertool_lizzy: './assets/graphics/sprites/monsters/powertool_lizzy.png',
  prickle_pop: './assets/graphics/sprites/monsters/prickle_pop.png',
  raptorrior: './assets/graphics/sprites/monsters/raptorrior.png',
  red_kraken: './assets/graphics/sprites/monsters/red_kraken.png',
  red_ragon: './assets/graphics/sprites/monsters/red_ragon.png',
  rise_rock: './assets/graphics/sprites/monsters/rise_rock.png',
  roove: './assets/graphics/sprites/monsters/roove.png',
  row__column_: './assets/graphics/sprites/monsters/row-16-column-3.png',
  ruby_dragonette: './assets/graphics/sprites/monsters/ruby_dragonette.png',
  sflish: "./assets/graphics/sprites/monsters/s'flish.png",
  salaheat: './assets/graphics/sprites/monsters/salaheat.png',
  sandy_max: './assets/graphics/sprites/monsters/sandy_max.png',
  schiger: './assets/graphics/sprites/monsters/schiger.png',
  sci_fi_centaur: './assets/graphics/sprites/monsters/sci-fi_centaur.png',
  scorpo: './assets/graphics/sprites/monsters/scorpo.png',
  shadow_clown: './assets/graphics/sprites/monsters/shadow_clown.png',
  shallow_hands: './assets/graphics/sprites/monsters/shallow_hands.png',
  sharp_alpha: './assets/graphics/sprites/monsters/sharp_alpha.png',
  shindig_robocat: './assets/graphics/sprites/monsters/shindig_robocat.png',
  shroom_guide: './assets/graphics/sprites/monsters/shroom_guide.png',
  shull_kield: './assets/graphics/sprites/monsters/shull_kield.png',
  skele_deep: './assets/graphics/sprites/monsters/skele_deep.png',
  skele_ruby: './assets/graphics/sprites/monsters/skele_ruby.png',
  slash_shadow: './assets/graphics/sprites/monsters/slash_shadow.png',
  sleepy_doom: './assets/graphics/sprites/monsters/sleepy_doom.png',
  slice_wolf: './assets/graphics/sprites/monsters/slice_wolf.png',
  slith: './assets/graphics/sprites/monsters/slith.png',
  snotogre: './assets/graphics/sprites/monsters/snotogre.png',
  sole_fuego: './assets/graphics/sprites/monsters/sole_fuego.png',
  solo_deemo: './assets/graphics/sprites/monsters/solo_deemo.png',
  son_scream: './assets/graphics/sprites/monsters/son_scream.png',
  spike_o_drago: './assets/graphics/sprites/monsters/spike-o_drago.png',
  spiker: './assets/graphics/sprites/monsters/spiker.png',
  sprout_slime: './assets/graphics/sprites/monsters/sprout_slime.png',
  st_jason: './assets/graphics/sprites/monsters/st_jason.png',
  standoffrus: './assets/graphics/sprites/monsters/standoffrus.png',
  stone_gold_augustine: './assets/graphics/sprites/monsters/stone_gold_augustine.png',
  stone_golem: './assets/graphics/sprites/monsters/stone_golem.png',
  studded_tri: './assets/graphics/sprites/monsters/studded_tri.png',
  susroot: './assets/graphics/sprites/monsters/susroot.png',
  tall_tigre: './assets/graphics/sprites/monsters/tall_tigre.png',
  terror_tree: './assets/graphics/sprites/monsters/terror_tree.png',
  thoughtless: './assets/graphics/sprites/monsters/thoughtless.png',
  tiny_daughter: './assets/graphics/sprites/monsters/tiny_daughter.png',
  toolbot: './assets/graphics/sprites/monsters/toolbot.png',
  tough_worm: './assets/graphics/sprites/monsters/tough_worm.png',
  tri_bite: './assets/graphics/sprites/monsters/tri_bite.png',
  under_clam: './assets/graphics/sprites/monsters/under_clam.png',
  unihorn: './assets/graphics/sprites/monsters/unihorn.png',
  valet_golem: './assets/graphics/sprites/monsters/valet_golem.png',
  vulfur: './assets/graphics/sprites/monsters/vulfur.png',
  walkaway_swine: './assets/graphics/sprites/monsters/walkaway_swine.png',
  war_turtle: './assets/graphics/sprites/monsters/war_turtle.png',
  water_boo: './assets/graphics/sprites/monsters/water_boo.png',
  water_wham: './assets/graphics/sprites/monsters/water_wham.png',
  wind_thief: './assets/graphics/sprites/monsters/wind_thief.png',
  wind_wizard: './assets/graphics/sprites/monsters/wind_wizard.png',
  wisp_wizard: './assets/graphics/sprites/monsters/wisp_wizard.png',
  wizzy_light: './assets/graphics/sprites/monsters/wizzy_light.png',
  womantis: './assets/graphics/sprites/monsters/womantis.png',
  wonder_girl: './assets/graphics/sprites/monsters/wonder_girl.png',
  young_monk: './assets/graphics/sprites/monsters/young_monk.png',
  z_king: './assets/graphics/sprites/monsters/z_king.png',
  zap_elf: './assets/graphics/sprites/monsters/zap_elf.png',
  zentipede: './assets/graphics/sprites/monsters/zentipede.png',
  zog: './assets/graphics/sprites/monsters/zog.png',
  zork: './assets/graphics/sprites/monsters/zork.png',
}

const pathByTexture = {
  techwallb: './assets/graphics/textures/techwallb.png',
  garage: './assets/graphics/textures/garage.png',
  flatstones: './assets/graphics/textures/flatstones.png',
  techwalla: './assets/graphics/textures/techwalla.png',
  dirthexagons: './assets/graphics/textures/dirthexagons.png',
  crosswall: './assets/graphics/textures/crosswall.png',
  sand: './assets/graphics/textures/sand.png',
  rapids: './assets/graphics/textures/rapids.png',
  tallgrass: './assets/graphics/textures/tallgrass.png',
  castlebricks: './assets/graphics/textures/castlebricks.png',
  metaltile: './assets/graphics/textures/metaltile.png',
  creakywood: './assets/graphics/textures/creakywood.png',
  hexagons: './assets/graphics/textures/hexagons.png',
  tinysquares: './assets/graphics/textures/tinysquares.png',
  storage: './assets/graphics/textures/storage.png',
  darkwood: './assets/graphics/textures/darkwood.png',
  brickstopright: './assets/graphics/textures/brickstopright.png',
  water: './assets/graphics/textures/water.png',
  redbricks: './assets/graphics/textures/redbricks.png',
  hightechwall: './assets/graphics/textures/hightechwall.png',
  window: './assets/graphics/textures/window.png',
  wooda: './assets/graphics/textures/wooda.png',
  bigtrunk: './assets/graphics/textures/bigtrunk.png',
  goobricks: './assets/graphics/textures/goobricks.png',
  bigbricks: './assets/graphics/textures/bigbricks.png',
  woodb: './assets/graphics/textures/woodb.png',
  slimbricks: './assets/graphics/textures/slimbricks.png',
  spookydoor: './assets/graphics/textures/spookydoor.png',
  roundbricks: './assets/graphics/textures/roundbricks.png',
  bigleaves: './assets/graphics/textures/bigleaves.png',
  crosscube: './assets/graphics/textures/crosscube.png',
  trunks: './assets/graphics/textures/trunks.png',
  creakydoor: './assets/graphics/textures/creakydoor.png',
  tinyleaves: './assets/graphics/textures/tinyleaves.png',
  snow: './assets/graphics/textures/snow.png',
  pipes: './assets/graphics/textures/pipes.png',
  graywall: './assets/graphics/textures/graywall.png',
  claybricks: './assets/graphics/textures/claybricks.png',
  sandmarks: './assets/graphics/textures/sandmarks.png',
  goldrocks: './assets/graphics/textures/goldrocks.png',
  pavement: './assets/graphics/textures/pavement.png',
  bigsquares: './assets/graphics/textures/bigsquares.png',
  dungeonbricks: './assets/graphics/textures/dungeonbricks.png',
  dungeoncell: './assets/graphics/textures/dungeoncell.png',
  officedoor: './assets/graphics/textures/officedoor.png',
  bricksbotright: './assets/graphics/textures/bricksbotright.png',
  pathrocks: './assets/graphics/textures/pathrocks.png',
  longlights: './assets/graphics/textures/longlights.png',
  porcelainbricks: './assets/graphics/textures/porcelainbricks.png',
  chess: './assets/graphics/textures/chess.png',
  bigwindow: './assets/graphics/textures/bigwindow.png',
  tinylights: './assets/graphics/textures/tinylights.png',
  starwallb: './assets/graphics/textures/starwallb.png',
  dirt: './assets/graphics/textures/dirt.png',
  bricks: './assets/graphics/textures/bricks.png',
  woodtile: './assets/graphics/textures/woodtile.png',
  starwalla: './assets/graphics/textures/starwalla.png',
  bricksbotmid: './assets/graphics/textures/bricksbotmid.png',
  doublelights: './assets/graphics/textures/doublelights.png',
  dentwall: './assets/graphics/textures/dentwall.png',
  bricksbotleft: './assets/graphics/textures/bricksbotleft.png',
  grayrocks: './assets/graphics/textures/grayrocks.png',
  brickstopleft: './assets/graphics/textures/brickstopleft.png',
  support: './assets/graphics/textures/support.png',
  slimrocks: './assets/graphics/textures/slimrocks.png',
  lavarocks: './assets/graphics/textures/lavarocks.png',
  iceyrocks: './assets/graphics/textures/iceyrocks.png',
  hightech: './assets/graphics/textures/hightech.png',
  lava: './assets/graphics/textures/lava.png',
} as const

type PathByBackground = typeof pathByBackground
type PathByMonster = typeof pathByMonster
type PathByTexture = typeof pathByTexture

type Background = keyof typeof pathByBackground
type Monster = keyof typeof pathByMonster
type Texture = keyof typeof pathByTexture
type Graphic = Background | Monster | Texture

type GraphicPath = PathByBackground[Background] | PathByMonster[Monster] | PathByTexture[Texture]

const graphicCache: { [path in GraphicPath]?: Promise<string> } = {}

const backgroundChoices = keys(pathByBackground) as Background[]
const monsterChoices = keys(pathByMonster) as Monster[]
const textureChoices = keys(pathByTexture) as Texture[]

function getGraphic(graphic: Graphic): Promise<string> {
  const path = (pathByBackground[graphic as Background] ??
    pathByMonster[graphic as Monster] ??
    pathByTexture[graphic as Texture]) as GraphicPath

  if (!(path in graphicCache)) {
    graphicCache[path] = new Promise(async resolve => {
      if (!path) {
        resolve('')
        return
      }

      const graphicImport = graphicImports[path]
      if (!graphicImport) {
        throw new Error(`Failed to find graphic: "${path}"`)
      }

      const { default: src } = await graphicImport()

      resolve(src)
    })
  }

  return graphicCache[path]!
}

const getBackground = (background: Background) => getGraphic(background)
const getMonster = (monster: Monster) => getGraphic(monster)
const getTexture = (texture: Texture) => getGraphic(texture)

const useGraphic = (graphic: Graphic) => {
  const { value: graphicSrc } = useAsync(() => getGraphic(graphic), [graphic])
  return graphicSrc
}
const useBackground = (background: Background) => useGraphic(background)
const useMonster = (monster: Monster) => useGraphic(monster)
const useTexture = (texture: Texture) => useGraphic(texture)

export type { PathByBackground, PathByMonster, PathByTexture, Graphic, Background, Monster, Texture }
export {
  pathByBackground,
  pathByMonster,
  pathByTexture,
  backgroundChoices,
  monsterChoices,
  textureChoices,
  getBackground,
  getMonster,
  getTexture,
  getGraphic,
  useBackground,
  useMonster,
  useTexture,
  useGraphic,
}
