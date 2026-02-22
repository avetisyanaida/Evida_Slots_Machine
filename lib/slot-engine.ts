export interface SlotSymbol {
  id: string
  emoji: string
  name: string
  multiplier: number
  isWild?: boolean
  isScatter?: boolean
  isBonus?: boolean
}

export interface SlotTheme {
  id: string
  name: string
  description: string
  bgGradient: string
  accentColor: string
  cardBg: string
  symbols: SlotSymbol[]
  reelCount: number
  rowCount: number
  minBet: number
  maxBet: number
  bonusRounds: boolean
  freeSpinsCount: number
  rtp: number // Return to player percentage
  volatility: "low" | "medium" | "high"
  icon: string
}

export const SLOT_THEMES: SlotTheme[] = [
  {
    id: "classic-fruits",
    name: "Classic Fruits",
    description: "The timeless fruit machine experience with cherries, lemons, and lucky 7s.",
    bgGradient: "from-red-950 via-red-900 to-orange-950",
    accentColor: "text-red-400",
    cardBg: "bg-red-950/60",
    symbols: [
      { id: "cherry", emoji: "\u{1F352}", name: "Cherry", multiplier: 2 },
      { id: "lemon", emoji: "\u{1F34B}", name: "Lemon", multiplier: 3 },
      { id: "orange", emoji: "\u{1F34A}", name: "Orange", multiplier: 4 },
      { id: "grape", emoji: "\u{1F347}", name: "Grape", multiplier: 5 },
      { id: "watermelon", emoji: "\u{1F349}", name: "Watermelon", multiplier: 8 },
      { id: "bell", emoji: "\u{1F514}", name: "Bell", multiplier: 12 },
      { id: "bar", emoji: "\u{1F4B0}", name: "BAR", multiplier: 20 },
      { id: "seven", emoji: "\u{0037}\u{FE0F}\u{20E3}", name: "Lucky 7", multiplier: 50, isWild: true },
      { id: "star", emoji: "\u{2B50}", name: "Star", multiplier: 0, isScatter: true },
      { id: "diamond", emoji: "\u{1F48E}", name: "Diamond", multiplier: 0, isBonus: true },
    ],
    reelCount: 5,
    rowCount: 3,
    minBet: 10,
    maxBet: 500,
    bonusRounds: true,
    freeSpinsCount: 10,
    rtp: 96.5,
    volatility: "medium",
    icon: "\u{1F352}",
  },
  {
    id: "egyptian-pharaoh",
    name: "Pharaoh's Gold",
    description: "Uncover ancient treasures in the tombs of Egyptian pharaohs.",
    bgGradient: "from-amber-950 via-yellow-950 to-orange-950",
    accentColor: "text-amber-400",
    cardBg: "bg-amber-950/60",
    symbols: [
      { id: "ankh", emoji: "\u{2625}\u{FE0F}", name: "Ankh", multiplier: 2 },
      { id: "eye", emoji: "\u{1F441}\u{FE0F}", name: "Eye of Horus", multiplier: 3 },
      { id: "scarab", emoji: "\u{1FAB2}", name: "Scarab", multiplier: 5 },
      { id: "cat", emoji: "\u{1F408}", name: "Bastet", multiplier: 8 },
      { id: "sphinx", emoji: "\u{1F981}", name: "Sphinx", multiplier: 12 },
      { id: "pyramid", emoji: "\u{1F4D0}", name: "Pyramid", multiplier: 15 },
      { id: "pharaoh", emoji: "\u{1F451}", name: "Pharaoh", multiplier: 25 },
      { id: "goldscarab", emoji: "\u{1F31F}", name: "Gold Scarab", multiplier: 50, isWild: true },
      { id: "sunra", emoji: "\u{2600}\u{FE0F}", name: "Sun of Ra", multiplier: 0, isScatter: true },
      { id: "tomb", emoji: "\u{1F3DB}\u{FE0F}", name: "Tomb", multiplier: 0, isBonus: true },
    ],
    reelCount: 5,
    rowCount: 3,
    minBet: 20,
    maxBet: 1000,
    bonusRounds: true,
    freeSpinsCount: 12,
    rtp: 97.0,
    volatility: "high",
    icon: "\u{1F451}",
  },
  {
    id: "space-galaxy",
    name: "Galaxy Quest",
    description: "Blast through the cosmos and discover stellar fortunes among the stars.",
    bgGradient: "from-indigo-950 via-blue-950 to-cyan-950",
    accentColor: "text-cyan-400",
    cardBg: "bg-indigo-950/60",
    symbols: [
      { id: "comet", emoji: "\u{2604}\u{FE0F}", name: "Comet", multiplier: 2 },
      { id: "star", emoji: "\u{2B50}", name: "Star", multiplier: 3 },
      { id: "moon", emoji: "\u{1F319}", name: "Moon", multiplier: 4 },
      { id: "planet", emoji: "\u{1FA90}", name: "Planet", multiplier: 6 },
      { id: "saturn", emoji: "\u{1FA90}", name: "Saturn", multiplier: 10 },
      { id: "ufo", emoji: "\u{1F6F8}", name: "UFO", multiplier: 15 },
      { id: "astronaut", emoji: "\u{1F468}\u{200D}\u{1F680}", name: "Astronaut", multiplier: 25 },
      { id: "blackhole", emoji: "\u{1F300}", name: "Black Hole", multiplier: 60, isWild: true },
      { id: "nebula", emoji: "\u{1F30C}", name: "Nebula", multiplier: 0, isScatter: true },
      { id: "rocket", emoji: "\u{1F680}", name: "Rocket", multiplier: 0, isBonus: true },
    ],
    reelCount: 5,
    rowCount: 3,
    minBet: 15,
    maxBet: 750,
    bonusRounds: true,
    freeSpinsCount: 15,
    rtp: 96.8,
    volatility: "high",
    icon: "\u{1F680}",
  },
  {
    id: "pirate-treasure",
    name: "Pirate's Cove",
    description: "Sail the seven seas and plunder legendary pirate treasures.",
    bgGradient: "from-emerald-950 via-teal-950 to-cyan-950",
    accentColor: "text-emerald-400",
    cardBg: "bg-emerald-950/60",
    symbols: [
      { id: "anchor", emoji: "\u{2693}", name: "Anchor", multiplier: 2 },
      { id: "compass", emoji: "\u{1F9ED}", name: "Compass", multiplier: 3 },
      { id: "sword", emoji: "\u{2694}\u{FE0F}", name: "Sword", multiplier: 5 },
      { id: "rum", emoji: "\u{1F37A}", name: "Rum", multiplier: 6 },
      { id: "map", emoji: "\u{1F5FA}\u{FE0F}", name: "Treasure Map", multiplier: 10 },
      { id: "parrot", emoji: "\u{1F99C}", name: "Parrot", multiplier: 15 },
      { id: "pirate", emoji: "\u{1F3F4}\u{200D}\u{2620}\u{FE0F}", name: "Pirate Flag", multiplier: 25 },
      { id: "skull", emoji: "\u{2620}\u{FE0F}", name: "Skull", multiplier: 40, isWild: true },
      { id: "ship", emoji: "\u{1F3F4}\u{200D}\u{2620}\u{FE0F}", name: "Ship", multiplier: 0, isScatter: true },
      { id: "chest", emoji: "\u{1F4E6}", name: "Treasure Chest", multiplier: 0, isBonus: true },
    ],
    reelCount: 5,
    rowCount: 3,
    minBet: 10,
    maxBet: 500,
    bonusRounds: true,
    freeSpinsCount: 8,
    rtp: 95.8,
    volatility: "medium",
    icon: "\u{2620}\u{FE0F}",
  },
  {
    id: "lucky-dragon",
    name: "Lucky Dragon",
    description: "Harness the power of the dragon and unlock fortune in the East.",
    bgGradient: "from-rose-950 via-red-950 to-orange-950",
    accentColor: "text-rose-400",
    cardBg: "bg-rose-950/60",
    symbols: [
      { id: "fan", emoji: "\u{1FA80}", name: "Fan", multiplier: 2 },
      { id: "lantern", emoji: "\u{1F3EE}", name: "Lantern", multiplier: 3 },
      { id: "koi", emoji: "\u{1F41F}", name: "Koi Fish", multiplier: 5 },
      { id: "lotus", emoji: "\u{1F33A}", name: "Lotus", multiplier: 8 },
      { id: "tiger", emoji: "\u{1F42F}", name: "Tiger", multiplier: 12 },
      { id: "phoenix", emoji: "\u{1F426}\u{200D}\u{1F525}", name: "Phoenix", multiplier: 18 },
      { id: "dragon", emoji: "\u{1F409}", name: "Dragon", multiplier: 30 },
      { id: "pearl", emoji: "\u{1F311}", name: "Pearl", multiplier: 50, isWild: true },
      { id: "yin-yang", emoji: "\u{262F}\u{FE0F}", name: "Yin Yang", multiplier: 0, isScatter: true },
      { id: "temple", emoji: "\u{26E9}\u{FE0F}", name: "Temple", multiplier: 0, isBonus: true },
    ],
    reelCount: 5,
    rowCount: 3,
    minBet: 25,
    maxBet: 1000,
    bonusRounds: true,
    freeSpinsCount: 10,
    rtp: 97.2,
    volatility: "high",
    icon: "\u{1F409}",
  },
  {
    id: "neon-vegas",
    name: "Neon Vegas",
    description: "Hit the Las Vegas strip with neon lights and big jackpot energy.",
    bgGradient: "from-fuchsia-950 via-pink-950 to-rose-950",
    accentColor: "text-fuchsia-400",
    cardBg: "bg-fuchsia-950/60",
    symbols: [
      { id: "dice", emoji: "\u{1F3B2}", name: "Dice", multiplier: 2 },
      { id: "chip", emoji: "\u{1FA99}", name: "Chip", multiplier: 3 },
      { id: "cocktail", emoji: "\u{1F378}", name: "Cocktail", multiplier: 4 },
      { id: "cards", emoji: "\u{1F0CF}", name: "Cards", multiplier: 6 },
      { id: "roulette", emoji: "\u{1F3B0}", name: "Roulette", multiplier: 10 },
      { id: "showgirl", emoji: "\u{1F483}", name: "Showgirl", multiplier: 15 },
      { id: "limo", emoji: "\u{1F3CE}\u{FE0F}", name: "Limo", multiplier: 25 },
      { id: "jackpot", emoji: "\u{1F4B5}", name: "Jackpot", multiplier: 75, isWild: true },
      { id: "neon", emoji: "\u{1F4A0}", name: "Neon Sign", multiplier: 0, isScatter: true },
      { id: "vault", emoji: "\u{1F512}", name: "Vault", multiplier: 0, isBonus: true },
    ],
    reelCount: 5,
    rowCount: 3,
    minBet: 50,
    maxBet: 2000,
    bonusRounds: true,
    freeSpinsCount: 8,
    rtp: 96.0,
    volatility: "high",
    icon: "\u{1F3B0}",
  },
  // ─── 7. Aztec Temple ───
  {
    id: "aztec-temple",
    name: "Aztec Temple",
    description: "Explore ancient Aztec ruins and unlock the gold of Montezuma.",
    bgGradient: "from-lime-950 via-green-950 to-emerald-950",
    accentColor: "text-lime-400",
    cardBg: "bg-lime-950/60",
    symbols: [
      { id: "snake", emoji: "\u{1F40D}", name: "Snake", multiplier: 2 },
      { id: "mask", emoji: "\u{1F3AD}", name: "Mask", multiplier: 3 },
      { id: "jaguar", emoji: "\u{1F406}", name: "Jaguar", multiplier: 5 },
      { id: "eagle", emoji: "\u{1F985}", name: "Eagle", multiplier: 8 },
      { id: "calendar", emoji: "\u{1F4C5}", name: "Calendar", multiplier: 12 },
      { id: "idol", emoji: "\u{1F5FF}", name: "Stone Idol", multiplier: 18 },
      { id: "gold-mask", emoji: "\u{1F451}", name: "Gold Mask", multiplier: 30 },
      { id: "sun-stone", emoji: "\u{1F31E}", name: "Sun Stone", multiplier: 60, isWild: true },
      { id: "feather", emoji: "\u{1FAB6}", name: "Feather", multiplier: 0, isScatter: true },
      { id: "temple", emoji: "\u{26F2}", name: "Temple Door", multiplier: 0, isBonus: true },
    ],
    reelCount: 5, rowCount: 3, minBet: 20, maxBet: 1000,
    bonusRounds: true, freeSpinsCount: 12, rtp: 96.7, volatility: "high", icon: "\u{1F5FF}",
  },
  // ─── 8. Norse Thunder ───
  {
    id: "norse-thunder",
    name: "Norse Thunder",
    description: "Wield the power of Thor and Odin in this Viking slot adventure.",
    bgGradient: "from-sky-950 via-slate-950 to-gray-950",
    accentColor: "text-sky-400",
    cardBg: "bg-sky-950/60",
    symbols: [
      { id: "rune", emoji: "\u{16A0}", name: "Rune", multiplier: 2 },
      { id: "axe", emoji: "\u{1FA93}", name: "Axe", multiplier: 3 },
      { id: "shield", emoji: "\u{1F6E1}\u{FE0F}", name: "Shield", multiplier: 5 },
      { id: "horn", emoji: "\u{1F4EF}", name: "Horn", multiplier: 8 },
      { id: "wolf", emoji: "\u{1F43A}", name: "Fenrir", multiplier: 12 },
      { id: "valkyrie", emoji: "\u{1F9DA}", name: "Valkyrie", multiplier: 18 },
      { id: "odin", emoji: "\u{1F9D9}", name: "Odin", multiplier: 30 },
      { id: "mjolnir", emoji: "\u{26A1}", name: "Mjolnir", multiplier: 55, isWild: true },
      { id: "raven", emoji: "\u{1F426}\u{200D}\u{2B1B}", name: "Raven", multiplier: 0, isScatter: true },
      { id: "bifrost", emoji: "\u{1F308}", name: "Bifrost", multiplier: 0, isBonus: true },
    ],
    reelCount: 5, rowCount: 3, minBet: 25, maxBet: 1000,
    bonusRounds: true, freeSpinsCount: 10, rtp: 96.9, volatility: "high", icon: "\u{26A1}",
  },
  // ─── 9. Candy Kingdom ───
  {
    id: "candy-kingdom",
    name: "Candy Kingdom",
    description: "A sweet adventure through a land made of candy and chocolate.",
    bgGradient: "from-pink-950 via-rose-950 to-fuchsia-950",
    accentColor: "text-pink-400",
    cardBg: "bg-pink-950/60",
    symbols: [
      { id: "candy-cane", emoji: "\u{1F36C}", name: "Candy", multiplier: 2 },
      { id: "lollipop", emoji: "\u{1F36D}", name: "Lollipop", multiplier: 3 },
      { id: "chocolate", emoji: "\u{1F36B}", name: "Chocolate", multiplier: 4 },
      { id: "cupcake", emoji: "\u{1F9C1}", name: "Cupcake", multiplier: 6 },
      { id: "donut", emoji: "\u{1F369}", name: "Donut", multiplier: 10 },
      { id: "ice-cream", emoji: "\u{1F366}", name: "Ice Cream", multiplier: 15 },
      { id: "cake", emoji: "\u{1F382}", name: "Cake", multiplier: 25 },
      { id: "gummy-bear", emoji: "\u{1F43B}", name: "Gummy Bear", multiplier: 40, isWild: true },
      { id: "cookie", emoji: "\u{1F36A}", name: "Cookie", multiplier: 0, isScatter: true },
      { id: "pinata", emoji: "\u{1FA85}", name: "Pinata", multiplier: 0, isBonus: true },
    ],
    reelCount: 5, rowCount: 3, minBet: 10, maxBet: 500,
    bonusRounds: true, freeSpinsCount: 15, rtp: 97.1, volatility: "low", icon: "\u{1F36D}",
  },
  // ─── 10. Deep Ocean ───
  {
    id: "deep-ocean",
    name: "Deep Ocean",
    description: "Dive into the abyss and discover sunken treasures of the deep.",
    bgGradient: "from-blue-950 via-cyan-950 to-teal-950",
    accentColor: "text-blue-400",
    cardBg: "bg-blue-950/60",
    symbols: [
      { id: "shell", emoji: "\u{1F41A}", name: "Shell", multiplier: 2 },
      { id: "seahorse", emoji: "\u{1F40E}", name: "Seahorse", multiplier: 3 },
      { id: "starfish", emoji: "\u{2B50}", name: "Starfish", multiplier: 4 },
      { id: "fish", emoji: "\u{1F420}", name: "Tropical Fish", multiplier: 6 },
      { id: "octopus", emoji: "\u{1F419}", name: "Octopus", multiplier: 10 },
      { id: "dolphin", emoji: "\u{1F42C}", name: "Dolphin", multiplier: 15 },
      { id: "whale", emoji: "\u{1F433}", name: "Whale", multiplier: 25 },
      { id: "trident", emoji: "\u{1F531}", name: "Trident", multiplier: 50, isWild: true },
      { id: "pearl-oyster", emoji: "\u{1F4AB}", name: "Pearl", multiplier: 0, isScatter: true },
      { id: "treasure", emoji: "\u{1F4E6}", name: "Sunken Chest", multiplier: 0, isBonus: true },
    ],
    reelCount: 5, rowCount: 3, minBet: 15, maxBet: 750,
    bonusRounds: true, freeSpinsCount: 12, rtp: 96.5, volatility: "medium", icon: "\u{1F433}",
  },
  // ─── 11. Safari Wild ───
  {
    id: "safari-wild",
    name: "Safari Wild",
    description: "Roam the African savannah and spot the Big Five for wild wins.",
    bgGradient: "from-yellow-950 via-amber-950 to-orange-950",
    accentColor: "text-yellow-400",
    cardBg: "bg-yellow-950/60",
    symbols: [
      { id: "butterfly", emoji: "\u{1F98B}", name: "Butterfly", multiplier: 2 },
      { id: "zebra", emoji: "\u{1F993}", name: "Zebra", multiplier: 3 },
      { id: "giraffe", emoji: "\u{1F992}", name: "Giraffe", multiplier: 5 },
      { id: "hippo", emoji: "\u{1F99B}", name: "Hippo", multiplier: 8 },
      { id: "rhino", emoji: "\u{1F98F}", name: "Rhino", multiplier: 12 },
      { id: "elephant", emoji: "\u{1F418}", name: "Elephant", multiplier: 18 },
      { id: "lion", emoji: "\u{1F981}", name: "Lion", multiplier: 30 },
      { id: "sunset", emoji: "\u{1F305}", name: "Sunset", multiplier: 50, isWild: true },
      { id: "baobab", emoji: "\u{1F333}", name: "Baobab", multiplier: 0, isScatter: true },
      { id: "jeep", emoji: "\u{1F699}", name: "Safari Jeep", multiplier: 0, isBonus: true },
    ],
    reelCount: 5, rowCount: 3, minBet: 20, maxBet: 1000,
    bonusRounds: true, freeSpinsCount: 10, rtp: 96.8, volatility: "medium", icon: "\u{1F981}",
  },
  // ─── 12. Vampire Night ───
  {
    id: "vampire-night",
    name: "Vampire Night",
    description: "Enter the dark castle where vampires guard eternal riches.",
    bgGradient: "from-gray-950 via-zinc-950 to-neutral-950",
    accentColor: "text-red-500",
    cardBg: "bg-gray-950/60",
    symbols: [
      { id: "candle", emoji: "\u{1F56F}\u{FE0F}", name: "Candle", multiplier: 2 },
      { id: "potion", emoji: "\u{1F9EA}", name: "Potion", multiplier: 3 },
      { id: "bat", emoji: "\u{1F987}", name: "Bat", multiplier: 5 },
      { id: "wolf-vamp", emoji: "\u{1F43A}", name: "Werewolf", multiplier: 8 },
      { id: "coffin", emoji: "\u{26B0}\u{FE0F}", name: "Coffin", multiplier: 12 },
      { id: "rose", emoji: "\u{1F339}", name: "Blood Rose", multiplier: 18 },
      { id: "vampire", emoji: "\u{1F9DB}", name: "Vampire", multiplier: 30 },
      { id: "blood-moon", emoji: "\u{1F311}", name: "Blood Moon", multiplier: 60, isWild: true },
      { id: "garlic", emoji: "\u{1F9C4}", name: "Garlic", multiplier: 0, isScatter: true },
      { id: "castle", emoji: "\u{1F3F0}", name: "Castle", multiplier: 0, isBonus: true },
    ],
    reelCount: 5, rowCount: 3, minBet: 25, maxBet: 1000,
    bonusRounds: true, freeSpinsCount: 10, rtp: 96.4, volatility: "high", icon: "\u{1F9DB}",
  },
  // ─── 13. Samurai Honor ───
  {
    id: "samurai-honor",
    name: "Samurai Honor",
    description: "Walk the path of the samurai through feudal Japan's grandest treasures.",
    bgGradient: "from-stone-950 via-red-950 to-orange-950",
    accentColor: "text-red-400",
    cardBg: "bg-stone-950/60",
    symbols: [
      { id: "bonsai", emoji: "\u{1FAB4}", name: "Bonsai", multiplier: 2 },
      { id: "sake", emoji: "\u{1F376}", name: "Sake", multiplier: 3 },
      { id: "shuriken", emoji: "\u{2694}\u{FE0F}", name: "Shuriken", multiplier: 5 },
      { id: "geisha", emoji: "\u{1F469}\u{200D}\u{1F3A8}", name: "Geisha", multiplier: 8 },
      { id: "koi-jp", emoji: "\u{1F41F}", name: "Koi", multiplier: 12 },
      { id: "pagoda", emoji: "\u{26E9}\u{FE0F}", name: "Pagoda", multiplier: 18 },
      { id: "samurai", emoji: "\u{1F977}", name: "Samurai", multiplier: 30 },
      { id: "katana", emoji: "\u{1F5E1}\u{FE0F}", name: "Katana", multiplier: 55, isWild: true },
      { id: "sakura", emoji: "\u{1F338}", name: "Sakura", multiplier: 0, isScatter: true },
      { id: "torii", emoji: "\u{26E9}\u{FE0F}", name: "Torii Gate", multiplier: 0, isBonus: true },
    ],
    reelCount: 5, rowCount: 3, minBet: 25, maxBet: 1000,
    bonusRounds: true, freeSpinsCount: 10, rtp: 96.6, volatility: "high", icon: "\u{1F977}",
  },
  // ─── 14. Greek Myths ───
  {
    id: "greek-myths",
    name: "Greek Myths",
    description: "Climb Mount Olympus and claim the treasures of the gods.",
    bgGradient: "from-blue-950 via-indigo-950 to-violet-950",
    accentColor: "text-blue-300",
    cardBg: "bg-blue-950/60",
    symbols: [
      { id: "olive", emoji: "\u{1FAD2}", name: "Olive", multiplier: 2 },
      { id: "lyre", emoji: "\u{1FA95}", name: "Lyre", multiplier: 3 },
      { id: "helmet", emoji: "\u{1FA96}", name: "Helmet", multiplier: 5 },
      { id: "pegasus", emoji: "\u{1F984}", name: "Pegasus", multiplier: 8 },
      { id: "medusa", emoji: "\u{1F40D}", name: "Medusa", multiplier: 12 },
      { id: "athena", emoji: "\u{1F9DD}", name: "Athena", multiplier: 18 },
      { id: "zeus", emoji: "\u{1F9D4}", name: "Zeus", multiplier: 35 },
      { id: "thunderbolt", emoji: "\u{26A1}", name: "Thunderbolt", multiplier: 60, isWild: true },
      { id: "laurel", emoji: "\u{1F33F}", name: "Laurel", multiplier: 0, isScatter: true },
      { id: "parthenon", emoji: "\u{1F3DB}\u{FE0F}", name: "Parthenon", multiplier: 0, isBonus: true },
    ],
    reelCount: 5, rowCount: 3, minBet: 20, maxBet: 1000,
    bonusRounds: true, freeSpinsCount: 12, rtp: 97.0, volatility: "high", icon: "\u{26A1}",
  },
  // ─── 15. Wild West ───
  {
    id: "wild-west",
    name: "Wild West",
    description: "Ride into the sunset and strike gold in the Wild West frontier.",
    bgGradient: "from-orange-950 via-amber-950 to-yellow-950",
    accentColor: "text-orange-400",
    cardBg: "bg-orange-950/60",
    symbols: [
      { id: "horseshoe", emoji: "\u{1F3C7}", name: "Horseshoe", multiplier: 2 },
      { id: "boots", emoji: "\u{1F97E}", name: "Boots", multiplier: 3 },
      { id: "cactus", emoji: "\u{1F335}", name: "Cactus", multiplier: 4 },
      { id: "hat", emoji: "\u{1F3A9}", name: "Cowboy Hat", multiplier: 6 },
      { id: "revolver", emoji: "\u{1F52B}", name: "Revolver", multiplier: 10 },
      { id: "sheriff", emoji: "\u{1F31F}", name: "Sheriff Badge", multiplier: 18 },
      { id: "wanted", emoji: "\u{1F4DC}", name: "Wanted Poster", multiplier: 25 },
      { id: "gold-nugget", emoji: "\u{1F4B0}", name: "Gold Nugget", multiplier: 50, isWild: true },
      { id: "tumbleweed", emoji: "\u{1F32C}\u{FE0F}", name: "Tumbleweed", multiplier: 0, isScatter: true },
      { id: "saloon", emoji: "\u{1F3DA}\u{FE0F}", name: "Saloon", multiplier: 0, isBonus: true },
    ],
    reelCount: 5, rowCount: 3, minBet: 10, maxBet: 500,
    bonusRounds: true, freeSpinsCount: 10, rtp: 96.3, volatility: "medium", icon: "\u{1F3A9}",
  },
  // ─── 16. Enchanted Forest ───
  {
    id: "enchanted-forest",
    name: "Enchanted Forest",
    description: "Wander through a magical forest filled with mythical creatures and spells.",
    bgGradient: "from-green-950 via-emerald-950 to-teal-950",
    accentColor: "text-green-400",
    cardBg: "bg-green-950/60",
    symbols: [
      { id: "mushroom", emoji: "\u{1F344}", name: "Mushroom", multiplier: 2 },
      { id: "butterfly-f", emoji: "\u{1F98B}", name: "Butterfly", multiplier: 3 },
      { id: "frog", emoji: "\u{1F438}", name: "Frog Prince", multiplier: 5 },
      { id: "owl", emoji: "\u{1F989}", name: "Wise Owl", multiplier: 8 },
      { id: "deer", emoji: "\u{1F98C}", name: "Stag", multiplier: 12 },
      { id: "fairy", emoji: "\u{1F9DA}", name: "Fairy", multiplier: 18 },
      { id: "unicorn", emoji: "\u{1F984}", name: "Unicorn", multiplier: 30 },
      { id: "crystal-ball", emoji: "\u{1F52E}", name: "Crystal Ball", multiplier: 50, isWild: true },
      { id: "four-leaf", emoji: "\u{1F340}", name: "Four Leaf", multiplier: 0, isScatter: true },
      { id: "tree-portal", emoji: "\u{1F332}", name: "Tree Portal", multiplier: 0, isBonus: true },
    ],
    reelCount: 5, rowCount: 3, minBet: 10, maxBet: 500,
    bonusRounds: true, freeSpinsCount: 15, rtp: 97.2, volatility: "low", icon: "\u{1F984}",
  },
  // ─── 17. Diamond Royale ───
  {
    id: "diamond-royale",
    name: "Diamond Royale",
    description: "High-stakes luxury with diamonds, gold bars, and VIP treatment.",
    bgGradient: "from-zinc-950 via-neutral-900 to-stone-950",
    accentColor: "text-amber-300",
    cardBg: "bg-zinc-900/60",
    symbols: [
      { id: "ring", emoji: "\u{1F48D}", name: "Ring", multiplier: 2 },
      { id: "watch", emoji: "\u{231A}", name: "Watch", multiplier: 3 },
      { id: "perfume", emoji: "\u{1F48E}", name: "Perfume", multiplier: 5 },
      { id: "champagne", emoji: "\u{1F37E}", name: "Champagne", multiplier: 8 },
      { id: "gold-bar", emoji: "\u{1FA99}", name: "Gold Bar", multiplier: 12 },
      { id: "crown-d", emoji: "\u{1F451}", name: "Crown", multiplier: 20 },
      { id: "sports-car", emoji: "\u{1F3CE}\u{FE0F}", name: "Sports Car", multiplier: 30 },
      { id: "mega-diamond", emoji: "\u{1F48E}", name: "Mega Diamond", multiplier: 80, isWild: true },
      { id: "key", emoji: "\u{1F511}", name: "VIP Key", multiplier: 0, isScatter: true },
      { id: "safe", emoji: "\u{1F512}", name: "Safe", multiplier: 0, isBonus: true },
    ],
    reelCount: 5, rowCount: 3, minBet: 50, maxBet: 2000,
    bonusRounds: true, freeSpinsCount: 8, rtp: 96.0, volatility: "high", icon: "\u{1F48E}",
  },
  // ─── 18. Fiesta Mexicana ───
  {
    id: "fiesta-mexicana",
    name: "Fiesta Mexicana",
    description: "Celebrate with mariachis, tacos, and the Day of the Dead.",
    bgGradient: "from-orange-950 via-red-950 to-green-950",
    accentColor: "text-orange-400",
    cardBg: "bg-orange-950/60",
    symbols: [
      { id: "chili", emoji: "\u{1F336}\u{FE0F}", name: "Chili", multiplier: 2 },
      { id: "taco", emoji: "\u{1F32E}", name: "Taco", multiplier: 3 },
      { id: "maraca", emoji: "\u{1FA87}", name: "Maraca", multiplier: 5 },
      { id: "sombrero", emoji: "\u{1F452}", name: "Sombrero", multiplier: 8 },
      { id: "guitar", emoji: "\u{1F3B8}", name: "Guitar", multiplier: 12 },
      { id: "mariachi", emoji: "\u{1F57A}", name: "Mariachi", multiplier: 18 },
      { id: "skull-fiesta", emoji: "\u{1F480}", name: "Sugar Skull", multiplier: 30 },
      { id: "pinata-w", emoji: "\u{1FA85}", name: "Pinata", multiplier: 50, isWild: true },
      { id: "marigold", emoji: "\u{1F33B}", name: "Marigold", multiplier: 0, isScatter: true },
      { id: "pyramid-mx", emoji: "\u{1F3DB}\u{FE0F}", name: "Pyramid", multiplier: 0, isBonus: true },
    ],
    reelCount: 5, rowCount: 3, minBet: 10, maxBet: 500,
    bonusRounds: true, freeSpinsCount: 12, rtp: 96.9, volatility: "medium", icon: "\u{1F480}",
  },
  // ─── 19. Cyber Punk ───
  {
    id: "cyber-punk",
    name: "Cyber Punk",
    description: "Jack into a neon-lit dystopia and hack your way to digital riches.",
    bgGradient: "from-violet-950 via-purple-950 to-fuchsia-950",
    accentColor: "text-violet-400",
    cardBg: "bg-violet-950/60",
    symbols: [
      { id: "usb", emoji: "\u{1F4BE}", name: "Drive", multiplier: 2 },
      { id: "chip-cyber", emoji: "\u{1F4DF}", name: "Chip", multiplier: 3 },
      { id: "robot-arm", emoji: "\u{1F9BE}", name: "Cyber Arm", multiplier: 5 },
      { id: "drone", emoji: "\u{1F916}", name: "Drone", multiplier: 8 },
      { id: "hacker", emoji: "\u{1F468}\u{200D}\u{1F4BB}", name: "Hacker", multiplier: 12 },
      { id: "cyborg", emoji: "\u{1F916}", name: "Cyborg", multiplier: 18 },
      { id: "ai-core", emoji: "\u{1F4A0}", name: "AI Core", multiplier: 30 },
      { id: "matrix", emoji: "\u{1F5A5}\u{FE0F}", name: "Matrix", multiplier: 65, isWild: true },
      { id: "glitch", emoji: "\u{26A0}\u{FE0F}", name: "Glitch", multiplier: 0, isScatter: true },
      { id: "server", emoji: "\u{1F5DC}\u{FE0F}", name: "Server", multiplier: 0, isBonus: true },
    ],
    reelCount: 5, rowCount: 3, minBet: 25, maxBet: 1000,
    bonusRounds: true, freeSpinsCount: 10, rtp: 96.5, volatility: "high", icon: "\u{1F916}",
  },
  // ─── 20. Arctic Fortune ───
  {
    id: "arctic-fortune",
    name: "Arctic Fortune",
    description: "Brave the frozen tundra and uncover treasures hidden beneath the ice.",
    bgGradient: "from-slate-950 via-blue-950 to-cyan-950",
    accentColor: "text-cyan-300",
    cardBg: "bg-slate-950/60",
    symbols: [
      { id: "snowflake", emoji: "\u{2744}\u{FE0F}", name: "Snowflake", multiplier: 2 },
      { id: "penguin", emoji: "\u{1F427}", name: "Penguin", multiplier: 3 },
      { id: "seal", emoji: "\u{1F9AD}", name: "Seal", multiplier: 5 },
      { id: "walrus", emoji: "\u{1F43B}\u{200D}\u{2744}\u{FE0F}", name: "Polar Bear", multiplier: 8 },
      { id: "igloo", emoji: "\u{1F3D4}\u{FE0F}", name: "Mountain", multiplier: 12 },
      { id: "husky", emoji: "\u{1F43A}", name: "Husky", multiplier: 18 },
      { id: "aurora", emoji: "\u{1F30C}", name: "Aurora", multiplier: 30 },
      { id: "ice-crystal", emoji: "\u{1F4A0}", name: "Ice Crystal", multiplier: 55, isWild: true },
      { id: "north-star", emoji: "\u{2B50}", name: "North Star", multiplier: 0, isScatter: true },
      { id: "ice-cave", emoji: "\u{1F9CA}", name: "Ice Cave", multiplier: 0, isBonus: true },
    ],
    reelCount: 5, rowCount: 3, minBet: 15, maxBet: 750,
    bonusRounds: true, freeSpinsCount: 12, rtp: 96.7, volatility: "medium", icon: "\u{2744}\u{FE0F}",
  },
]

// ─── Real Casino Paylines (20 lines for a 3-row, 5-reel machine) ───
// Each payline is an array of 5 row-indices (one per reel).
// These are the standard 20 paylines used in most real video slot machines.
const PAYLINES_3x5: number[][] = [
  // Straight lines
  [1, 1, 1, 1, 1], // Line 1  - center row
  [0, 0, 0, 0, 0], // Line 2  - top row
  [2, 2, 2, 2, 2], // Line 3  - bottom row
  // V shapes
  [0, 1, 2, 1, 0], // Line 4  - V shape
  [2, 1, 0, 1, 2], // Line 5  - inverted V
  // Zigzags
  [0, 0, 1, 2, 2], // Line 6  - descending stairs
  [2, 2, 1, 0, 0], // Line 7  - ascending stairs
  [1, 0, 0, 0, 1], // Line 8  - shallow U top
  [1, 2, 2, 2, 1], // Line 9  - shallow U bottom
  [0, 1, 0, 1, 0], // Line 10 - zigzag top
  [2, 1, 2, 1, 2], // Line 11 - zigzag bottom
  // Wave patterns
  [1, 0, 1, 0, 1], // Line 12 - wave up
  [1, 2, 1, 2, 1], // Line 13 - wave down
  [0, 1, 1, 1, 0], // Line 14 - bump top
  [2, 1, 1, 1, 2], // Line 15 - bump bottom
  // Extended patterns
  [0, 0, 1, 0, 0], // Line 16 - center dip
  [2, 2, 1, 2, 2], // Line 17 - center peak
  [1, 0, 1, 2, 1], // Line 18 - S-curve
  [1, 2, 1, 0, 1], // Line 19 - reverse S
  [0, 2, 0, 2, 0], // Line 20 - wide zigzag
]

/** Calculate the dynamic max bet based on the player's current balance. */
export function getDynamicMaxBet(balance: number, themeMinBet: number): number {
  // Base max bet tiers
  if (balance >= 500_000) return 100_000
  if (balance >= 200_000) return 50_000
  if (balance >= 100_000) return 20_000
  if (balance >= 50_000) return 10_000
  if (balance >= 20_000) return 5_000
  if (balance >= 10_000) return 2_000
  if (balance >= 5_000) return 1_000
  if (balance >= 2_000) return 500
  return Math.max(themeMinBet, Math.floor(balance * 0.2))
}

// Calculate win from a grid of symbols
export function calculateWin(
  grid: SlotSymbol[][],
  bet: number,
  theme: SlotTheme
): {
  totalWin: number
  winningLines: { lineIndex: number; cells: number[]; symbol: SlotSymbol; count: number }[]
  isBonus: boolean
  isFreeSpins: boolean
  bigWin: boolean
  winningCellSet: Set<number>
} {
  const rows = theme.rowCount
  const cols = theme.reelCount
  let totalWin = 0
  const winningLines: { lineIndex: number; cells: number[]; symbol: SlotSymbol; count: number }[] = []
  const winningCellSet = new Set<number>()
  let scatterCount = 0
  let bonusCount = 0
  const scatterCells: number[] = []
  const bonusCells: number[] = []

  // Count scatters and bonuses (they pay anywhere)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r]?.[c]?.isScatter) { scatterCount++; scatterCells.push(r * cols + c) }
      if (grid[r]?.[c]?.isBonus) { bonusCount++; bonusCells.push(r * cols + c) }
    }
  }

  // Evaluate each payline
  const paylines = (rows === 3 && cols === 5) ? PAYLINES_3x5 : PAYLINES_3x5.slice(0, 5)

  // Bet per line (total bet divided among active paylines)
  const betPerLine = bet / paylines.length

  for (let lineIdx = 0; lineIdx < paylines.length; lineIdx++) {
    const payline = paylines[lineIdx]

    // Get the first non-wild symbol to determine the matching symbol
    let matchSymbol: SlotSymbol | null = null
    const firstSym = grid[payline[0]]?.[0]
    if (!firstSym || firstSym.isScatter || firstSym.isBonus) continue

    if (firstSym.isWild) {
      // Find first non-wild to determine what the wild chain matches
      for (let c = 1; c < cols; c++) {
        const sym = grid[payline[c]]?.[c]
        if (!sym) break
        if (!sym.isWild && !sym.isScatter && !sym.isBonus) {
          matchSymbol = sym
          break
        }
      }
      // All wilds? Use wild multiplier
      if (!matchSymbol) matchSymbol = firstSym
    } else {
      matchSymbol = firstSym
    }

    // Count consecutive matching symbols from the left
    let consecutive = 0
    for (let c = 0; c < cols; c++) {
      const sym = grid[payline[c]]?.[c]
      if (!sym) break
      if (sym.isScatter || sym.isBonus) break
      if (sym.id === matchSymbol.id || sym.isWild) {
        consecutive++
      } else {
        break
      }
    }

    if (consecutive >= 3) {
      // Standard pay table: 3-of-a-kind, 4-of-a-kind, 5-of-a-kind
      const baseMultiplier = matchSymbol.isWild
        ? (theme.symbols.find(s => s.isWild)?.multiplier || 50)
        : matchSymbol.multiplier
      // Scaling: 3-match = 1x, 4-match = 3x, 5-match = 10x of the base
      const countMultiplier = consecutive === 3 ? 1 : consecutive === 4 ? 3 : 10
      const lineWin = betPerLine * baseMultiplier * countMultiplier

      totalWin += lineWin
      const cells = Array.from({ length: consecutive }, (_, i) => payline[i] * cols + i)
      cells.forEach(c => winningCellSet.add(c))
      winningLines.push({ lineIndex: lineIdx, cells, symbol: matchSymbol, count: consecutive })
    }
  }

  // Scatter wins (3+ anywhere) -- pays on total bet
  const isFreeSpins = scatterCount >= 3
  if (scatterCount >= 3) {
    const scatterPay = scatterCount === 3 ? bet * 5 : scatterCount === 4 ? bet * 20 : bet * 50
    totalWin += scatterPay
    scatterCells.forEach(c => winningCellSet.add(c))
  }

  // Bonus trigger (3+ anywhere)
  const isBonus = bonusCount >= 3
  if (isBonus) {
    bonusCells.forEach(c => winningCellSet.add(c))
  }

  const bigWin = totalWin >= bet * 15

  return { totalWin, winningLines, isBonus, isFreeSpins, bigWin, winningCellSet }
}

// Generate random grid
export function spinReels(theme: SlotTheme): SlotSymbol[][] {
  const grid: SlotSymbol[][] = []
  const symbols = theme.symbols
  // Weight: common symbols appear more, wilds/scatter/bonus are rare
  const weightedPool: SlotSymbol[] = []
  for (const s of symbols) {
    let weight = 10
    if (s.isWild) weight = 1
    else if (s.isScatter) weight = 2
    else if (s.isBonus) weight = 2
    else if (s.multiplier >= 20) weight = 3
    else if (s.multiplier >= 10) weight = 5
    else if (s.multiplier >= 5) weight = 7
    for (let i = 0; i < weight; i++) {
      weightedPool.push(s)
    }
  }

  for (let r = 0; r < theme.rowCount; r++) {
    const row: SlotSymbol[] = []
    for (let c = 0; c < theme.reelCount; c++) {
      row.push(weightedPool[Math.floor(Math.random() * weightedPool.length)])
    }
    grid.push(row)
  }
  return grid
}
