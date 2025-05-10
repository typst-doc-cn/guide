<template>
  <component :is="layout === 'inline' ? 'span' : 'div'" class="card" :class="[layout, { 'grid-item': layout === 'grid' }]" :style="layoutStyles">
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
  
  computed: {
    layoutStyles() {
      const styles = {
        height: this.height,
      };
      if (this.width !== 'auto') {
        styles.width = this.width;
      }
      return styles;
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
    handleMouseMove(e) {
      if (!this.$el || typeof this.$el.getBoundingClientRect !== 'function') return;
      const rect = this.$el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const mouseX = Math.min(Math.max(x / rect.width, 0), 1) * 100;
      const mouseY = Math.min(Math.max(y / rect.height, 0), 1) * 100;

      this.$el.style.setProperty('--mouse-x', `${mouseX}%`);
      this.$el.style.setProperty('--mouse-y', `${mouseY}%`);
    },
    handleMouseLeave() {
      if (!this.$el || !this.$el.style) return;
      this.$el.style.setProperty('--mouse-x', '50%');
      this.$el.style.setProperty('--mouse-y', '50%');
    }
  },
  mounted() {
    if (this.$el && typeof this.$el.addEventListener === 'function') {
        this.$el.addEventListener('mousemove', this.handleMouseMove);
        this.$el.addEventListener('mouseleave', this.handleMouseLeave);
        this.handleMouseLeave(); // Initialize CSS variables to default
    }
  },
  beforeUnmount() {
    if (this.$el && typeof this.$el.removeEventListener === 'function') {
        this.$el.removeEventListener('mousemove', this.handleMouseMove);
        this.$el.removeEventListener('mouseleave', this.handleMouseLeave);
    }
  }
}
</script>

<style scoped>
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
  /* Enhanced Pokemon-style 3D transform effect */
  transform: translateY(-15px) scale(1.03) /* Slightly more lift effect */
             rotateX(calc((var(--mouse-y) - 50%) / 25 * -10deg))  /* More dramatic X rotation */
             rotateY(calc((var(--mouse-x) - 50%) / 25 * 10deg)); /* More dramatic Y rotation */
  box-shadow: 0 20px 30px rgba(0,0,0,0.4), /* Deeper shadow for more dramatic effect */
              0 0 20px rgba(255, 215, 0, 0.2), /* Gold glow effect */
              inset 0 0 0 2px #ffffff,
              inset 0 0 0 4px #f0c040;
  filter: brightness(1.1); /* Slight brightness increase on hover */
}

.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    125deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 30%,
    rgba(255, 255, 255, 0.8) 40%, /* Brighter shine peak */
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background-position: calc(var(--mouse-x) * 1.5 - 75%) calc(var(--mouse-y) * 1.5 - 75%);
  background-size: 200% 200%;
  mix-blend-mode: overlay;
  z-index: 1; /* Above the background but below content */
  pointer-events: none; /* Ensure pseudo-element doesn't interfere with mouse events */
  opacity: 0; /* Initially hidden, will appear on hover */
  transition: opacity 0.2s ease-in-out; /* Faster transition for more responsive feel */
  filter: brightness(1.5) contrast(1.2); /* Enhanced shine effect */
}

.card:hover::before {
  opacity: 1; /* Shine becomes visible on hover */
  animation: shine-pulse 2s infinite alternate; /* Subtle pulsing effect */
}

@keyframes shine-pulse {
  0% { filter: brightness(1.3) contrast(1.1); }
  100% { filter: brightness(1.7) contrast(1.3); }
}

/* Ensure content is above the shine */
.card > * {
  position: relative;
  z-index: 2;
}

.card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    /* Enhanced sparkles with more variety and brightness */
    radial-gradient(circle at 15% 25%, rgba(255,255,255,0.5) 0.5px, transparent 2px),
    radial-gradient(circle at 85% 35%, rgba(255,255,255,0.4) 0.7px, transparent 2.2px),
    radial-gradient(circle at 40% 70%, rgba(255,255,255,0.5) 0.3px, transparent 1.8px),
    radial-gradient(circle at 60% 10%, rgba(255,255,255,0.4) 0.6px, transparent 2px),
    radial-gradient(circle at 25% 85%, rgba(255,255,255,0.5) 0.4px, transparent 1.6px),
    radial-gradient(circle at 75% 60%, rgba(255,255,255,0.4) 0.5px, transparent 1.9px),
    /* Pokemon-style holographic rainbow gradient with higher saturation */
    repeating-linear-gradient(
      45deg,
      rgba(255,0,0,0.08),
      rgba(255,165,0,0.08) 12%,
      rgba(255,255,0,0.08) 24%,
      rgba(0,128,0,0.08) 36%,
      rgba(0,0,255,0.08) 48%,
      rgba(75,0,130,0.08) 60%,
      rgba(238,130,238,0.08) 72%,
      rgba(255,0,0,0.08) 100%
    );
  background-size:
    100px 100px, /* Sparkle 1 repeat size */
    80px 80px,   /* Sparkle 2 repeat size */
    90px 90px,   /* Sparkle 3 repeat size */
    110px 110px, /* Sparkle 4 repeat size */
    85px 85px,   /* Sparkle 5 repeat size */
    95px 95px,   /* Sparkle 6 repeat size */
    300% 300%;   /* Holo effect size - slightly smaller for more visible pattern */
  background-repeat: repeat, repeat, repeat, repeat, repeat, repeat, no-repeat;
  background-position: 0% 0%;
  opacity: 0.2; /* Lower initial opacity */
  z-index: 0;
  pointer-events: none;
  mix-blend-mode: color-dodge; /* Changed to color-dodge for more vibrant effect */
  transition: opacity 0.3s ease-out, background-position 0.2s ease-out;
  filter: contrast(1.2) saturate(1.2); /* Enhanced contrast and saturation */
}

.card:hover::after {
  opacity: 0.7; /* Higher opacity on hover */
  background-position: 
    calc(var(--mouse-x) * 0.3) calc(var(--mouse-y) * 0.3), /* Sparkle 1 - slight movement */
    calc(var(--mouse-x) * -0.2) calc(var(--mouse-y) * 0.2), /* Sparkle 2 - opposite X direction */
    calc(var(--mouse-x) * 0.1) calc(var(--mouse-y) * -0.3), /* Sparkle 3 - opposite Y direction */
    calc(var(--mouse-x) * -0.3) calc(var(--mouse-y) * -0.2), /* Sparkle 4 - opposite both directions */
    calc(var(--mouse-x) * 0.2) calc(var(--mouse-y) * 0.2), /* Sparkle 5 */
    calc(var(--mouse-x) * -0.1) calc(var(--mouse-y) * -0.1), /* Sparkle 6 */
    calc(var(--mouse-x) * 2) calc(var(--mouse-y) * 2); /* Holo effect - more dramatic movement */
  animation: holo-flash 3s infinite alternate; /* Added animation for color shifting */
}

@keyframes holo-flash {
  0%, 100% { filter: contrast(1.2) saturate(1.2) hue-rotate(0deg); }
  33% { filter: contrast(1.3) saturate(1.5) hue-rotate(15deg); }
  66% { filter: contrast(1.1) saturate(1.4) hue-rotate(-15deg); }
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




