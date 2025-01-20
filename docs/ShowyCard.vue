<template>
  <span class="inline-card" :style="{ width: nameWidth, height: nameWidth * 0.8, lineHeight: 1, marginBottom: '0.5em' }">
    <b class="card-name">{{ name }}</b><br>
    <strong>
      Author: <a :href="authorLink" class="author">{{ author }}</a>
    </strong>
    <br>
    <span v-if="qqNumber">QQ: {{ qqNumber }}</span>
    <span v-if="tags" class="tags">
      <span v-for="(tag, index) in tags" :key="index" class="tag">
        {{ tag }}
      </span>
    </span>
    <span v-if="links" class="links">
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
    }
  },
  
  computed: {
    nameWidth() {
      return this.name.length * 6 + "em";
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

.author {
  padding-top: 5%;
  padding-bottom: 5%;
}

a img {
  margin: 0;
  padding: 0;
  display: block; /* Optional, but helps with spacing */
}

.card-name {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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
  padding: 3px 5px;
  background-color: #f0f0f0;
  border-radius: 0.25em;
  box-shadow: 0 0 0.1em #ccc;
}

.links {
  display: inline-block;
  justify-content: center;
  vertical-align: center;
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




