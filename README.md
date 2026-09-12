# VTT Game 3D - Course Extrême

## 🚴 Bienvenue dans le jeu VTT 3D le plus réaliste!

Un jeu d'action complet avec vélos, armes, PNJ et un monde ouvert à explorer.

## 🎮 Caractéristiques

### Vélos Disponibles (Bikes Républic)
- **Mountain Bike**: Équilibré, bonne accélération
- **Road Bike**: Très rapide, moins de maniabilité
- **BMX**: Léger, excellent pour les sauts
- **E-Bike**: Rapide et stable
- **Downhill**: Robuste, bonne descente

### Armes
- 🔫 Pistolet (damage: 25)
- 🔫 Fusil à pompe (damage: 60)
- 🔫 Fusil (damage: 50)
- 🚀 Lance-roquettes (damage: 150)

### Systèmes de Jeu
- **Ville dynamique** avec bâtiments et PNJ
- **Routes multiples** à explorer
- **Cycle jour/nuit** réaliste
- **Système de santé et d'endurance**
- **Argent illimité** pour acheter des vélos
- **Voitures** circulant sur les mêmes routes

## ⌨️ Contrôles

| Touche | Action |
|--------|--------|
| **A** | Pédaler (Accélérer) |
| **B** | Freiner |
| **D** | Drain (Boost de Rapidité) |
| **X** | Sauter avec le vélo |
| **Q/E** | Tourner à gauche/droite |
| **Clic Souris** | Tirer |

## 🛠️ Installation

```bash
npm install
npm start
```

Puis ouvrez `index.html` dans votre navigateur.

## 📦 Structure du Projet

```
vtt-game-3d/
├── src/
│   ├── main.js              # Point d'entrée principal
│   ├── player/
│   │   ├── player.js        # Classe joueur
│   │   └── bikeTypes.js     # Types de vélos
│   ├── npc/
│   │   ├── npcManager.js    # Gestionnaire des PNJ
│   │   └── npc.js          # Classe PNJ
│   ├── input/
│   │   └── inputManager.js  # Gestion des contrôles
│   ├── vehicles/
│   │   └── car.js          # Classe voiture
│   ├── environment/
│   │   └── weather.js      # Système météo
│   └── game/
│       └── gameManager.js   # Gestionnaire de jeu
├── index.html              # Interface HTML
├── package.json            # Dépendances
└── README.md              # Ce fichier
```

## 🎯 Objectifs de Jeu

1. Explorare la ville et les routes
2. Affronter les PNJ avec vos armes
3. Collectionner différents vélos
4. Atteindre les vitesses maximales
5. Survivre aux voitures!

## 🚗 Danger: Voitures

Des voitures circulent constamment sur les routes! Soyez prudent!

## 💰 Économie du Jeu

- **Argent**: Illimité
- **Vélos**: Disponibles à l'achat (gratuit avec argent illimité)
- **Armes**: Achetables en boutique

## 🔄 Versions de Vélos Disponibles

Chaque vélo a des stats uniques:

```javascript
{
  'Mountain': { speed: 30, acceleration: 2, handling: 0.8 },
  'Road': { speed: 45, acceleration: 1.5, handling: 0.6 },
  'BMX': { speed: 25, acceleration: 3, handling: 0.95 },
  'E-Bike': { speed: 50, acceleration: 2.5, handling: 0.7 },
  'Downhill': { speed: 35, acceleration: 2, handling: 0.85 }
}
```

## 🎓 Prochaines Mises à Jour

- [ ] Système de quête
- [ ] Boutique complète
- [ ] Multiplayer en ligne
- [ ] Plus de cartes
- [ ] Véhicules additionnels
- [ ] Customization des vélos

## 📝 Licence

MIT License - Libre d'utilisation

---

**Amusez-vous bien dans VTT Game 3D! 🎮🚴💨**
