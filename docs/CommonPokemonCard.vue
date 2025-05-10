<template>
  <div class="pokemon-card common" 
       ref="pokemonCard"
       @mousemove="handleMouseMove"
       @mouseenter="handleMouseEnter"
       @mouseleave="handleMouseLeave"
       :style="cardStyle">
    <div class="card-glow" :style="glowStyle"></div>
    <div class="card-header">
      <span class="name">{{ card.name }}</span>
      <span class="hp">HP {{ card.hp }}</span>
      <span class="type" :style="{ backgroundColor: typeColor(card.type) }">{{ card.type }}</span>
    </div>
    <div class="card-image">
      <img :src="card.imageUrl || 'https://via.placeholder.com/240x170?text=Pokemon+Image'" :alt="card.name">
    </div>
    <div class="card-body">
      <div class="attacks" v-if="card.attacks && card.attacks.length">
        <div v-for="(attack, index) in card.attacks" :key="index" class="attack">
          <span class="attack-name">{{ attack.name }}</span>
          <span class="attack-damage">{{ attack.damage }}</span>
        </div>
      </div>
      <p class="description" v-if="card.description">{{ card.description }}</p>
    </div>
    <div class="card-footer">
      <div class="weakness" v-if="card.weakness">
        Weakness: {{ card.weakness.type }} {{ card.weakness.value }}
      </div>
      <div class="resistance" v-if="card.resistance">
        Resistance: {{ card.resistance.type }} {{ card.resistance.value }}
      </div>
      <div class="retreat" v-if="card.retreatCost">
        Retreat Cost: {{ card.retreatCost }}
      </div>
    </div>
    <div class="card-info">
      <span class="artist">Illus. {{ card.artist || 'Unknown Artist' }}</span>
      <span class="rarity">{{ card.rarity || 'Common' }}</span>
      <span class="set-number">{{ card.setAbbr }}/{{ card.setNumber }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rotateX: 0,
      rotateY: 0,
      glowX: 0,
      glowY: 0,
      glowOpacity: 0,
      cardElement: null
    };
  },
  name: 'CommonPokemonCard',
  props: {
    card: {
      type: Object,
      required: true,
      default: () => ({
        name: 'Pikachu',
        hp: '60',
        type: 'Lightning',
        imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png', // Example image
        attacks: [
          { name: 'Quick Attack', damage: '10' },
          { name: 'Thunder Shock', damage: '20' }
        ],
        description: 'When several of these POKéMON gather, their electricity could build and cause lightning storms.',
        weakness: { type: 'Fighting', value: 'x2' },
        resistance: { type: 'Metal', value: '-20' },
        retreatCost: '1',
        artist: 'Ken Sugimori',
        rarity: 'Common',
        setAbbr: 'BS',
        setNumber: '104'
      })
    }
  },
  computed: {
    cardStyle() {
      return {
        transform: `perspective(1000px) rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg)`,
        transition: 'transform 0.1s ease-out'
      };
    },
    glowStyle() {
      return {
        left: `${this.glowX}px`,
        top: `${this.glowY}px`,
        opacity: this.glowOpacity,
        transition: 'opacity 0.2s ease-out'
      };
    }
  },
  mounted() {
    this.cardElement = this.$refs.pokemonCard;
  },
  methods: {
    handleMouseMove(event) {
      if (!this.cardElement) return;
      const rect = this.cardElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const maxRotation = 10; // Max rotation in degrees

      this.rotateY = ((x - centerX) / centerX) * maxRotation;
      this.rotateX = -((y - centerY) / centerY) * maxRotation;

      this.glowX = x;
      this.glowY = y;
    },
    handleMouseEnter() {
      this.glowOpacity = 1;
    },
    handleMouseLeave() {
      this.rotateX = 0;
      this.rotateY = 0;
      this.glowOpacity = 0;
    },
    typeColor(type) {
      const colors = {
        Grass: '#78C850',
        Fire: '#F08030',
        Water: '#6890F0',
        Lightning: '#F8D030',
        Fighting: '#C03028',
        Psychic: '#F85888',
        Colorless: '#A8A878',
        Darkness: '#705848',
        Metal: '#B8B8D0',
        Dragon: '#7038F8',
        Fairy: '#EE99AC',
        Poison: '#A040A0',
        Ground: '#E0C068',
        Rock: '#B8A038',
        Ice: '#98D8D8',
        Bug: '#A8B820',
      };
      return colors[type] || '#666'; // Default color
    }
  }
};
</script>

<style scoped>
.card-glow {
  position: absolute;
  width: 150px; /* Adjust size as needed */
  height: 150px; /* Adjust size as needed */
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%);
  border-radius: 50%;
  pointer-events: none; /* So it doesn't interfere with mouse events on the card */
  transform: translate(-50%, -50%); /* Center the glow on the mouse pointer */
  z-index: 1; /* Ensure glow is on top of other card content */
}

.pokemon-card {
  position: relative; /* Add this for glow positioning */
  transform-style: preserve-3d; /* Enhance 3D effect */
  width: 280px; /* Adjusted width */
  height: 390px; /* Adjusted height */
  border: 10px solid #f0d868; /* Yellowish border like Pokemon cards */
  border-radius: 15px;
  background-color: #fefdf5; /* Light cream background */
  font-family: 'Arial', sans-serif;
  color: #333;
  display: flex;
  flex-direction: column;
  box-shadow: 5px 5px 15px rgba(0,0,0,0.2);
  margin: 10px;
  overflow: hidden; /* Ensure content fits */
}

.pokemon-card.common {
  /* Specific styles for common cards if any, for now same as base */
}

.card-header {
  padding: 8px;
  background-color: #e0e0e0; /* Light gray header */
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9em;
  border-bottom: 2px solid #ccc;
}

.card-header .name {
  font-weight: bold;
  font-size: 1.1em;
}

.card-header .hp {
  font-weight: bold;
  color: #d00;
}

.card-header .type {
  padding: 3px 8px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
}

.card-image {
  width: 100%;
  height: 170px; /* Fixed height for image area */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e8f5e9; /* Light green background for image */
  overflow: hidden;
  border-bottom: 2px solid #ccc;
}

.card-image img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}

.card-body {
  padding: 10px;
  flex-grow: 1;
  font-size: 0.8em;
  overflow-y: auto; /* Scroll if content overflows */
}

.attacks {
  margin-bottom: 8px;
}

.attack {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  padding: 3px;
  background-color: #f5f5f5;
  border-radius: 3px;
}

.attack-name {
  font-weight: bold;
}

.description {
  font-style: italic;
  margin-top: 8px;
  line-height: 1.3;
}

.card-footer {
  padding: 8px;
  background-color: #e0e0e0; /* Light gray footer */
  font-size: 0.75em;
  border-top: 2px solid #ccc;
  display: flex;
  justify-content: space-around;
}

.card-footer > div {
  margin: 0 5px;
}

.card-info {
  font-size: 0.7em;
  padding: 5px 8px;
  text-align: center;
  border-top: 1px solid #ddd;
  background-color: #f9f9f9;
  color: #555;
  display: flex;
  justify-content: space-between;
}
</style>