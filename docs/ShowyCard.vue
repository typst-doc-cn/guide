<template>
  <span class="inline-card" :style="{ width: nameWidth, height: nameWidth * 0.8, lineHeight: 1, marginBottom: '0.5em' }">
    <b class="card-name">{{ name }}</b>
    <strong>
      <a :href="authorLink">Author: {{ author }}</a>
    </strong>
    <span v-if="tags" class="tags">
      <span v-for="(tag, index) in tags" :key="index" class="tag">
        {{ tag }}
      </span>
    </span>
    <span v-if="links">
      <a v-for="(link, index) in links" :key="index" :href="link" class="link">
        <img class="logo" :src="getLogo(link)" alt="logo">
      </a>
    </span>
    <p v-if="description" style="margin: 0.5em 0;">{{ description }}</p>
  </span>
</template>

<script>
export default {
  props: {
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
    }
  },
  computed: {
    nameWidth() {
      return this.name.length * 2 + "em";
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
    }
  }
}
</script>

<style scoped>
.inline-card {
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 0.25em;
  box-shadow: 0 0 0.1em #ccc;
}

.card-name {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.tags {
  margin-bottom: 0.5em;
}

.tag {
  display: inline-block;
  margin: 2px 5px;
  padding: 3px 5px;
  background-color: #f0f0f0;
  border-radius: 0.25em;
  box-shadow: 0 0 0.1em #ccc;
}

.link {
  display: inline-block;
  margin: 2px 5px;
  padding: 3px 5px;
}

.link:hover {
  background-color: #e0e0e0;
}

.logo {
  width: 1.2em;
  height: auto;
}
</style>




