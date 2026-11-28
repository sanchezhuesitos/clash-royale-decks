export const CARDS_API = [
  { id: 1, name: "Montapuercos", elixir: 4, rarity: "Especial", type: "Tropa", role: "Condición de Victoria", image: "https://cdn.royaleapi.com/static/img/cards-150/hog-rider.png" },
  { id: 2, name: "Caballero", elixir: 3, rarity: "Común", type: "Tropa", role: "Mini Tanque", image: "https://cdn.royaleapi.com/static/img/cards-150/knight.png" },
  { id: 3, name: "Mosquetera", elixir: 4, rarity: "Especial", type: "Tropa", role: "Antiaéreo / Apoyo", image: "https://cdn.royaleapi.com/static/img/cards-150/musketeer.png" },
  { id: 4, name: "Bola de Fuego", elixir: 4, rarity: "Especial", type: "Hechizo", role: "Daño Directo", image: "https://cdn.royaleapi.com/static/img/cards-150/fireball.png" },
  { id: 5, name: "El Tronco", elixir: 2, rarity: "Legendaria", type: "Hechizo", role: "Control de Masas", image: "https://cdn.royaleapi.com/static/img/cards-150/the-log.png" },
  { id: 6, name: "Esqueletos", elixir: 1, rarity: "Común", type: "Tropa", role: "Ciclo / Distracción", image: "https://cdn.royaleapi.com/static/img/cards-150/skeletons.png" },
  { id: 7, name: "Espíritu de Hielo", elixir: 1, rarity: "Común", type: "Tropa", role: "Ciclo / Congelación", image: "https://cdn.royaleapi.com/static/img/cards-150/ice-spirit.png" },
  { id: 8, name: "Cañón", elixir: 3, rarity: "Común", type: "Estructura", role: "Defensa Terrestre", image: "https://cdn.royaleapi.com/static/img/cards-150/cannon.png" },
  { id: 9, name: "P.E.K.K.A", elixir: 7, rarity: "Épica", type: "Tropa", role: "Tanque / Destructor", image: "https://cdn.royaleapi.com/static/img/cards-150/pekka.png" },
  { id: 10, name: "Mago Eléctrico", elixir: 4, rarity: "Legendaria", type: "Tropa", role: "Aturdimiento / Aire", image: "https://cdn.royaleapi.com/static/img/cards-150/electro-wizard.png" },
  { id: 11, name: "Ariete de Batalla", elixir: 4, rarity: "Especial", type: "Tropa", role: "Condición de Victoria", image: "https://cdn.royaleapi.com/static/img/cards-150/battle-ram.png" },
  { id: 12, name: "Bandida", elixir: 3, rarity: "Legendaria", type: "Tropa", role: "Presión Rápida", image: "https://cdn.royaleapi.com/static/img/cards-150/bandit.png" },
  { id: 13, name: "Fantasma Real", elixir: 3, rarity: "Legendaria", type: "Tropa", role: "Sigilo / Salpicadura", image: "https://cdn.royaleapi.com/static/img/cards-150/royal-ghost.png" },
  { id: 14, name: "Descarga", elixir: 2, rarity: "Común", type: "Hechizo", role: "Reinicio / Enjambres", image: "https://cdn.royaleapi.com/static/img/cards-150/zap.png" },
  { id: 15, name: "Veneno", elixir: 4, rarity: "Épica", type: "Hechizo", role: "Control de Área", image: "https://cdn.royaleapi.com/static/img/cards-150/poison.png" },
  { id: 16, name: "Arquero Mágico", elixir: 4, rarity: "Legendaria", type: "Tropa", role: "Daño a Distancia", image: "https://cdn.royaleapi.com/static/img/cards-150/magic-archer.png" },
  { id: 17, name: "Barril de Duendes", elixir: 3, rarity: "Épica", type: "Hechizo", role: "Condición de Victoria", image: "https://cdn.royaleapi.com/static/img/cards-150/goblin-barrel.png" },
  { id: 18, name: "Princesa", elixir: 3, rarity: "Legendaria", type: "Tropa", role: "Hostigamiento", image: "https://cdn.royaleapi.com/static/img/cards-150/princess.png" },
  { id: 19, name: "Torre Infernal", elixir: 5, rarity: "Especial", type: "Estructura", role: "Antitanques", image: "https://cdn.royaleapi.com/static/img/cards-150/inferno-tower.png" },
  { id: 20, name: "Pandilla de Duendes", elixir: 3, rarity: "Común", type: "Tropa", role: "Enjambre / Carnada", image: "https://cdn.royaleapi.com/static/img/cards-150/goblin-gang.png" },
  { id: 21, name: "Cohete", elixir: 6, rarity: "Especial", type: "Hechizo", role: "Remate / Daño Masivo", image: "https://cdn.royaleapi.com/static/img/cards-150/rocket.png" },
  { id: 22, name: "Megacaballero", elixir: 7, rarity: "Legendaria", type: "Tropa", role: "Tanque / Salpicadura", image: "https://cdn.royaleapi.com/static/img/cards-150/mega-knight.png" },
  { id: 23, name: "Minero", elixir: 3, rarity: "Legendaria", type: "Tropa", role: "Condición de Victoria", image: "https://cdn.royaleapi.com/static/img/cards-150/miner.png" },
  { id: 24, name: "Murciélagos", elixir: 2, rarity: "Común", type: "Tropa", role: "Enjambre Aéreo", image: "https://cdn.royaleapi.com/static/img/cards-150/bats.png" }
];

export const META_DECKS = [
  {
    id: "hog-26",
    name: "Montapuercos Ciclo 2.6",
    archetype: "Ciclo Rápido",
    color: "from-cyan-500 to-blue-600",
    description: "Un clásico inmortal. Defiende con bajo coste y cicla el Montapuercos constantemente.",
    cardIds: [1, 3, 4, 5, 6, 7, 8, 2]
  },
  {
    id: "pekka-bs",
    name: "P.E.K.K.A Bridge Spam",
    archetype: "Presión en Puente",
    color: "from-fuchsia-500 to-purple-700",
    description: "Frena ataques pesados con el P.E.K.K.A y castiga ambas líneas con Bandida y Ariete.",
    cardIds: [9, 10, 11, 12, 13, 14, 15, 16]
  },
  {
    id: "log-bait",
    name: "Log Bait Clásico",
    archetype: "Carnada de Hechizos",
    color: "from-emerald-500 to-teal-700",
    description: "Fuerza al rival a gastar El Tronco con la Princesa o Pandilla para conectar el Barril.",
    cardIds: [17, 18, 2, 19, 20, 5, 7, 21]
  }
];