<template>
  <component :is="layout === 'inline' ? 'span' : 'div'" 
             class="card" 
             :class="[layout, { 'grid-item': layout === 'grid' }]" 
             :style="[layoutStyles, cardStyle]"
             ref="pokemonCard"
             @mousemove="handleMouseMove"
             @mouseenter="handleMouseEnter"
             @mouseleave="handleMouseLeave">
    <div class="card-glow" :style="glowStyle"></div>
    <slot>
      <!-- Default content if no slot is provided -->
      <div class="card-element">
        <b class="card-name">{{ name }}</b>
      </div>
      <div class="card-element">
        <strong>
          <a :href="authorLink">Author: {{ author }}</a>
        </strong>
      </div>
      <div v-if="tags" class="card-element tags">
        <span v-for="(tag, index) in tags" :key="index" class="tag">
          {{ tag }}
        </span>
      </div>
      <div v-if="links" class="card-element links-container">
        <a v-for="(link, index) in links" :key="index" :href="link" class="link">
          <img class="logo" :src="getLogo(link)" alt="logo">
        </a>
      </div>
      <div v-if="description" class="card-element card-description">
        <p>{{ description }}</p>
      </div>
    </slot>
  </component>
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
  props: {
    height: {
      type: String,
      default: 'auto'
    },
    width: {
      type: String,
      default: 'auto'
    },
    name: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    authorLink: {
      type: String,
      required: false
    },
    qqNumber: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    tags: {
      type: Array,
      required: false
    },
    links: {
      type: Array,
      required: false
    },
    layout: {
      type: String,
      default: 'inline',
      validator: (value) => ['inline', 'grid'].includes(value)
    }
  },
  inject: ['is3dEffectEnabled'],
  computed: {
    is3dActive() {
      // is3dEffectEnabled is injected as a function from GridView
      return this.is3dEffectEnabled ? this.is3dEffectEnabled() : false;
    },
    layoutStyles() {
      const styles = {
        height: this.height,
      };
      if (this.width !== 'auto') {
        styles.width = this.width;
      }
      return styles;
    },
    cardStyle() {
      if (!this.is3dActive) {
        return {
          transform: 'none',
          transition: 'transform 0.1s ease-out'
        };
      }
      return {
        transform: `perspective(1000px) rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg)`,
        transition: 'transform 0.1s ease-out'
      };
    },
    glowStyle() {
      return {
        left: `${this.glowX}px`,
        top: `${this.glowY}px`,
        opacity: this.is3dActive ? this.glowOpacity : 0,
        transition: 'opacity 0.2s ease-out'
      };
    }
  },
  methods: {
    // TODO: 不知道这里会不会有跨域问题，可以考虑存一下 logo 到本地
    getLogo(link) {
      if (link.startsWith("https://github.com")) {
        return "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
      } else if (link.startsWith("https://typst.app/universe")) {
        return "https://typst.app/assets/favicon-16x16.png";
      } else {
        return "https://github.githubassets.com/images/icons/emoji/octocat.png";
      }
    },
    handleMouseMove(event) {
      if (!this.cardElement || !this.is3dActive) return;
      const rect = this.cardElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const maxRotation = 15; // Max rotation in degrees

      this.rotateY = ((x - centerX) / centerX) * maxRotation;
      this.rotateX = -((y - centerY) / centerY) * maxRotation;

      this.glowX = x;
      this.glowY = y;
      
      // 保持原有的CSS变量设置，用于CSS中的hover效果
      if (this.is3dActive) {
        const mouseX = Math.min(Math.max(x / rect.width, 0), 1) * 100;
        const mouseY = Math.min(Math.max(y / rect.height, 0), 1) * 100;
        this.$el.style.setProperty('--mouse-x', `${mouseX}%`);
        this.$el.style.setProperty('--mouse-y', `${mouseY}%`);
      }
    },
    handleMouseEnter() {
      if (this.is3dActive) {
        this.glowOpacity = 1;
      }
    },
    handleMouseLeave() {
      this.rotateX = 0;
      this.rotateY = 0;
      this.glowOpacity = 0;
      
      // 保持原有的CSS变量重置
      if (this.$el && this.$el.style) {
        this.$el.style.setProperty('--mouse-x', '50%');
        this.$el.style.setProperty('--mouse-y', '50%');
      }
    },
    addEffectListeners() {
      if (this.$el && typeof this.$el.addEventListener === 'function') {
        this.$el.addEventListener('mousemove', this.handleMouseMove);
        this.$el.addEventListener('mouseleave', this.handleMouseLeave);
      }
    },
    removeEffectListeners() {
      if (this.$el && typeof this.$el.removeEventListener === 'function') {
        this.$el.removeEventListener('mousemove', this.handleMouseMove);
        this.$el.removeEventListener('mouseleave', this.handleMouseLeave);
      }
    }
  },
  mounted() {
    this.cardElement = this.$refs.pokemonCard;
    this.handleMouseLeave(); // Always initialize CSS variables
    if (this.is3dActive) {
      this.addEffectListeners();
    }
  },
  beforeUnmount() {
    this.removeEffectListeners();
  },
  watch: {
    is3dActive(newValue) {
      if (newValue) {
        this.addEffectListeners();
        this.handleMouseLeave(); // Ensure initial state when activated
      } else {
        this.removeEffectListeners();
        this.handleMouseLeave(); // Ensure reset when deactivated
      }
    }
  }
}
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

.card {
  border: 4px solid #f0c040; /* Gold-ish border */
  border-radius: 0.75em; /* Slightly larger radius */
  box-shadow: 0 4px 12px rgba(0,0,0,0.2), /* Outer shadow */
              inset 0 0 0 2px #ffffff, /* Inner white highlight */
              inset 0 0 0 4px #f0c040; /* Inner gold border to complement the outer one */
  background: radial-gradient(circle, #fdfdfd 60%, #f0f0f0 100%); /* Subtle light radial gradient */
  padding: 1em;
  margin-bottom: 1em;
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out, opacity 0.2s ease-in-out; /* Faster transition for more responsive feel */
  height: v-bind(height);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  position: relative; /* For potential pseudo-elements later */
  overflow: hidden; /* To ensure pseudo-elements don't spill if they are larger */
  perspective: 1200px; /* Enhanced perspective for more dramatic 3D effect */
  transform-style: preserve-3d; /* Ensures child elements maintain 3D positioning */
  will-change: transform, box-shadow; /* Optimizes animation performance */
}

.card.inline {
  display: inline-block;
}

.card.grid {
  display: inline-block;
  vertical-align: top;
}

.grid-item {
  width: 100%;
}

.card-element {
  display: block;
  margin-bottom: 0.5em;
}

.card-element:last-child {
  margin-bottom: 0;
}

.card-name {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: bold;
  color: #333; /* Darker color for better readability */
  text-shadow: 1px 1px 1px rgba(255,255,255,0.7), /* Light shadow for depth */
               -1px -1px 1px rgba(0,0,0,0.1); /* Subtle dark top-left shadow */
  margin-bottom: 0.25em; /* Add some space below the name */
}

.tags {
  display: inline-block;
  vertical-align: center;
}

.tags, .links {
    display: flex;
    flex-wrap: wrap;
    overflow-x: auto;
}

.tag {
  display: inline-block;
  margin: 2px 5px;
  padding: 4px 8px; /* Slightly more padding */
  background-color: #e0aa30; /* Gold-ish background, complementing the border */
  color: #fff; /* White text for contrast */
  border-radius: 0.35em;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2); /* Softer shadow */
  font-size: 0.85em;
  font-weight: 500;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.1);
}

.card-description p {
  margin: 0.5em 0;
  font-size: 0.9em; /* Slightly smaller for description */
  line-height: 1.4; /* Improve readability */
  color: #555; /* Slightly lighter than main text */
}

.links-container {
  /* Ensure links start from the very left */
  padding-left: 0;
  /* margin-left: -4px; */ /* Removed to allow natural alignment */
}

.link {
  display: inline-flex;
  align-items: center;
  margin: 4px 6px;
  padding: 5px 7px;
  vertical-align: middle;
  line-height: 1;
  border-radius: 0.35em;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.link:hover {
  background-color: rgba(255,255,255,0.2); /* Light background on hover */
  transform: scale(1.1); /* Slight scale effect on hover */
}

.logo {
  width: 1.5em; /* Slightly larger logo */
  height: 1.5em;
  min-width: 1.5em;
  min-height: 1.5em;
  object-fit: contain;
  filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.3)); /* Enhanced shadow */
  vertical-align: middle;
  transition: transform 0.2s ease;
}

.link:hover .logo {
  transform: rotate(10deg); /* Slight rotation on link hover */
}

.card:hover {
  /* 修改hover效果，使其与JS控制的3D旋转协调工作 */
  transform: translateY(-15px) scale(1.03); /* 只保留上移和缩放效果，旋转由JS控制 */
  box-shadow: 0 20px 30px rgba(0,0,0,0.4), /* Deeper shadow for more dramatic effect */
              0 0 20px rgba(255, 215, 0, 0.2), /* Gold glow effect */
              inset 0 0 0 2px #ffffff,
              inset 0 0 0 4px #f0c040;
  filter: brightness(1.1); /* Slight brightness increase on hover */
}

.card strong a {
  color: #005a9c; /* A distinct blue, often used for links */
  text-decoration: none;
  transition: color 0.2s ease;
  font-size: 0.95em; /* Slightly adjust size */
}

.card strong a:hover {
  color: #003366; /* Darker blue on hover */
  text-decoration: underline;
}
</style>




