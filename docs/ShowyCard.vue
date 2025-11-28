<template>
  <component
    :is="layout === 'inline' ? 'span' : 'div'"
    class="card"
    :class="[
      layout,
      { 'grid-item': layout === 'grid' },
      { clickable: !!homePage },
      { 'dark-mode': isDark },
    ]"
    :style="[layoutStyles, cardStyle]"
    ref="pokemonCard"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleCardClick"
  >
    <div class="card-glow" :style="glowStyle"></div>
    <div v-if="homePage && isExternalLink" class="pop-out-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-box-arrow-up-right"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
        />
        <path
          fill-rule="evenodd"
          d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
        />
      </svg>
    </div>
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
        <a
          v-for="(link, index) in links"
          :key="index"
          :href="link"
          class="link"
        >
          <img class="logo" :src="getLogo(link)" alt="logo" />
        </a>
      </div>
      <div v-if="description" class="card-element card-description">
        <p>{{ description }}</p>
      </div>
    </slot>
  </component>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, inject } from 'vue';
import { withBase, useData } from 'vitepress';
import { useRouter } from 'vitepress'; // Import useRouter

const props = defineProps({
  height: {
    type: String,
    default: 'auto',
  },
  width: {
    type: String,
    default: 'auto',
  },
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorLink: {
    type: String,
    required: false,
  },
  qqNumber: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  tags: {
    type: Array,
    required: false,
  },
  links: {
    type: Array,
    required: false,
  },
  layout: {
    type: String,
    default: 'inline',
    validator: (value) => ['inline', 'grid'].includes(value),
  },
  homePage: {
    type: String,
    required: false,
    default: null,
  },
});

const router = useRouter(); // Initialize router
const { isDark: _vitepressIsDark } = useData();

const rotateX = ref(0);
const rotateY = ref(0);
const glowX = ref(0);
const glowY = ref(0);
const glowOpacity = ref(0);
const pokemonCard = ref(null); // Ref for the card element

// 在组件挂载后初始化暗黑模式
onMounted(() => {
  if (pokemonCard.value && _vitepressIsDark.value) {
    pokemonCard.value.classList.add('dark-mode');
  }
});

const is3dEffectEnabled = inject('is3dEffectEnabled');

const isDark = computed(() => _vitepressIsDark.value);

const is3dActive = computed(() => {
  return is3dEffectEnabled ? is3dEffectEnabled() : false;
});

const layoutStyles = computed(() => {
  const styles = {
    height: props.height,
  };
  if (props.width !== 'auto') {
    styles.width = props.width;
  }
  return styles;
});

const translateX = ref(0);
const translateY = ref(0);

const cardStyle = computed(() => {
  if (!is3dActive.value) {
    return {
      transform: 'none',
      transition: 'transform 0.1s ease-out',
    };
  }
  return {
    transform: `perspective(1000px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) translate(${translateX.value}px, ${translateY.value}px)`,
    transition: 'transform 0.1s ease-out',
  };
});

const isExternalLink = computed(() => {
  if (!props.homePage) return false;
  return /^(https?:|mailto:|tel:)/.test(props.homePage);
});

const glowStyle = computed(() => {
  return {
    left: `${glowX.value}px`,
    top: `${glowY.value}px`,
    opacity: is3dActive.value ? glowOpacity.value : 0,
    transition: 'opacity 0.2s ease-out',
  };
});

const getLogo = (link) => {
  if (link.startsWith('https://github.com')) {
    return 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';
  } else if (link.startsWith('https://typst.app/universe')) {
    return 'https://typst.app/assets/favicon-16x16.png';
  } else {
    return 'https://github.githubassets.com/images/icons/emoji/octocat.png';
  }
};

const handleMouseMove = (event) => {
  if (!pokemonCard.value || !is3dActive.value) return;
  const rect = pokemonCard.value.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const maxRotation = -15; // Max rotation in degrees
  const maxTranslation = 8; // Max translation in pixels

  rotateX.value = -((y - centerY) / centerY) * maxRotation;
  rotateY.value = ((x - centerX) / centerX) * maxRotation;

  // 计算平移距离
  translateX.value = ((x - centerX) / centerX) * maxTranslation;
  translateY.value = ((y - centerY) / centerY) * maxTranslation;

  glowX.value = x;
  glowY.value = y;

  if (is3dActive.value) {
    const mouseX = Math.min(Math.max(x / rect.width, 0), 1) * 100;
    const mouseY = Math.min(Math.max(y / rect.height, 0), 1) * 100;
    pokemonCard.value.style.setProperty('--mouse-x', `${mouseX}%`);
    pokemonCard.value.style.setProperty('--mouse-y', `${mouseY}%`);
  }
};

const handleMouseEnter = () => {
  if (is3dActive.value) {
    glowOpacity.value = 1;
  }
};

const handleMouseLeave = () => {
  rotateX.value = 0;
  rotateY.value = 0;
  translateX.value = 0;
  translateY.value = 0;
  glowOpacity.value = 0;

  if (pokemonCard.value && pokemonCard.value.style) {
    pokemonCard.value.style.setProperty('--mouse-x', '50%');
    pokemonCard.value.style.setProperty('--mouse-y', '50%');
  }
};

const addEffectListeners = () => {
  if (
    pokemonCard.value &&
    typeof pokemonCard.value.addEventListener === 'function'
  ) {
    pokemonCard.value.addEventListener('mousemove', handleMouseMove);
    pokemonCard.value.addEventListener('mouseleave', handleMouseLeave);
  }
};

const handleCardClick = () => {
  if (props.homePage) {
    let targetPage = props.homePage;

    if (!isExternalLink.value && targetPage.endsWith('.md')) {
      targetPage = targetPage.substring(0, targetPage.length - 3) + '.html';
    }

    if (isExternalLink.value) {
      window.open(targetPage, '_blank');
    } else {
      const finalUrl = withBase(targetPage);
      // 对于HTML文件使用window.location.href进行导航
      if (targetPage.endsWith('.html')) {
        window.location.href = finalUrl;
      } else if (router) {
        router.go(finalUrl); // 对于其他文件使用路由导航
      } else {
        window.location.href = finalUrl;
      }
    }
  }
};

const removeEffectListeners = () => {
  if (
    pokemonCard.value &&
    typeof pokemonCard.value.removeEventListener === 'function'
  ) {
    pokemonCard.value.removeEventListener('mousemove', handleMouseMove);
    pokemonCard.value.removeEventListener('mouseleave', handleMouseLeave);
  }
};

onMounted(() => {
  // pokemonCard.value is already assigned by ref in template
  handleMouseLeave(); // Always initialize CSS variables
  if (is3dActive.value) {
    addEffectListeners();
  }
});

onBeforeUnmount(() => {
  removeEffectListeners();
});

watch(is3dActive, (newValue) => {
  if (newValue) {
    addEffectListeners();
    handleMouseLeave(); // Ensure initial state when activated
  } else {
    removeEffectListeners();
    handleMouseLeave(); // Ensure reset when deactivated
  }
});
</script>

<style scoped>
.card-glow {
  position: absolute;
  width: 150px; /* Adjust size as needed */
  height: 150px; /* Adjust size as needed */
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  border-radius: 50%;
  pointer-events: none; /* So it doesn't interfere with mouse events on the card */
  transform: translate(-50%, -50%); /* Center the glow on the mouse pointer */
  z-index: 1; /* Ensure glow is on top of other card content */
}

.card {
  border: 4px solid #f0c040; /* Gold-ish border */
  border-radius: 0.75em; /* Slightly larger radius */
  box-shadow:
    /* Outer shadow */
    0 4px 12px rgba(0, 0, 0, 0.2),
    /* Inner white highlight */ inset 0 0 0 2px #ffffff,
    /* Inner gold border to complement the outer one */ inset 0 0 0 4px #f0c040;
  background: radial-gradient(
    circle,
    #fdfdfd 60%,
    #f0f0f0 100%
  ); /* Subtle light radial gradient */
  padding: 1em;
  margin-bottom: 1em;
  transition:
    transform 0.2s ease-out,
    box-shadow 0.2s ease-out,
    opacity 0.2s ease-in-out; /* Faster transition for more responsive feel */
  height: v-bind(height);
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
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
  text-shadow:
    /* Light shadow for depth */
    1px 1px 1px rgba(255, 255, 255, 0.7),
    /* Subtle dark top-left shadow */ -1px -1px 1px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.25em; /* Add some space below the name */
}

.tags {
  display: inline-block;
  vertical-align: center;
}

.tags,
.links {
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
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); /* Softer shadow */
  font-size: 0.85em;
  font-weight: 500;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
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
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.link:hover {
  background-color: rgba(255, 255, 255, 0.2); /* Light background on hover */
  transform: scale(1.1); /* Slight scale effect on hover */
}

.logo {
  width: 1.5em; /* Slightly larger logo */
  height: 1.5em;
  min-width: 1.5em;
  min-height: 1.5em;
  object-fit: contain;
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3)); /* Enhanced shadow */
  vertical-align: middle;
  transition: transform 0.2s ease;
}

.link:hover .logo {
  transform: rotate(10deg); /* Slight rotation on link hover */
}

.card.clickable:hover {
  cursor: pointer;
}

.pop-out-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2; /* Above glow but below other potential absolute elements if any */
  color: #555;
}

.card:hover {
  /* 修改hover效果，使其与JS控制的3D旋转协调工作 */
  transform: translateY(-15px) scale(1.03); /* 只保留上移和缩放效果，旋转由JS控制 */
  box-shadow:
    /* Deeper shadow for more dramatic effect */
    0 20px 30px rgba(0, 0, 0, 0.4),
    /* Gold glow effect */ 0 0 20px rgba(255, 215, 0, 0.2),
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

/* Dark Mode Styles */
.card.dark-mode {
  border-color: #7a6320; /* Darker gold */
  box-shadow:
    /* Darker shadow */
    0 4px 12px rgba(0, 0, 0, 0.5),
    /* Inner dark highlight */ inset 0 0 0 2px #333,
    /* Inner darker gold border */ inset 0 0 0 4px #7a6320;
  background: radial-gradient(
    circle,
    #4a4a4a 60%,
    #303030 100%
  ); /* Dark gradient */
}

.card.dark-mode .card-name {
  color: #f5f5f5; /* Lighter name color */
  text-shadow:
    1px 1px 1px rgba(0, 0, 0, 0.7),
    -1px -1px 1px rgba(255, 255, 255, 0.1);
}

.card.dark-mode .tag {
  background-color: #b08020; /* Slightly adjusted tag color */
  color: #121212; /* Darker text for contrast on gold */
  text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.1);
}

.card.dark-mode .card-description p {
  color: #c0c0c0; /* Lighter description text */
}

.card.dark-mode strong a {
  color: #87cefa; /* Light sky blue for links */
}

.card.dark-mode strong a:hover {
  color: #add8e6; /* Lighter blue on hover */
}

.card.dark-mode .pop-out-icon {
  color: #c0c0c0; /* Lighter icon color */
}

.card.dark-mode:hover {
  box-shadow:
    /* Deeper shadow for dark mode */
    0 20px 30px rgba(0, 0, 0, 0.7),
    /* Darker gold glow effect */ 0 0 20px rgba(122, 99, 32, 0.3),
    inset 0 0 0 2px #333,
    inset 0 0 0 4px #7a6320;
  filter: brightness(1.15);
}

.card.dark-mode .card-glow {
  background: radial-gradient(
    circle,
    rgba(200, 200, 200, 0.6) 0%,
    rgba(200, 200, 200, 0) 70%
  );
}
</style>
