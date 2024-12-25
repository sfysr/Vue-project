<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import GoHome from '@/components/icons/go-home.vue'
import TablerCheckup from '@/components/icons/tabler-checkup.vue'
import TablerNotebook from '@/components/icons/tabler-notebook.vue'
import TablerPhoto from '@/components/icons/tabler-photo.vue'
import seeMore from '@/components/icons/see-more.vue'
import PostDetailPopup from '@/components/PostDetailPopup.vue'

export default defineComponent({
  name: 'PostsView',
  components: {
    TablerCheckup,
    TablerNotebook,
    TablerPhoto,
    GoHome,
    seeMore,
    PostDetailPopup,
  },

  setup() {
    const route = useRoute()
    const userId = route.params.userId
    const posts = ref([])
    const user = ref({ name: '', email: '' })
    const isPopupVisible = ref(false)
    const selectedPostId = ref(null)

    const fetchData = async () => {
      try {
        const [postsResponse, userResponse] = await Promise.all([
          axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`),
          axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`),
        ])
        posts.value = postsResponse.data
        user.value = userResponse.data
      } catch (error) {
        console.error('Veri cekme hatasi:', error)
      }
    }

    onMounted(() => {
      fetchData()
    })

    const openPopup = (postId) => {
      selectedPostId.value = postId
      isPopupVisible.value = true
    }

    const closePopup = () => {
      isPopupVisible.value = false
      selectedPostId.value = null
    }

    return { user, posts, userId, openPopup, closePopup, isPopupVisible, selectedPostId }
  },
})
</script>

<template>
  <div class="container">
    <div class="sidebar">
      <div class="user-info">
        <span style="font-family: Poppins; font-weight: 500; color: #26303e">
          {{ user.name }}
        </span>
        <span
          style="font-family: Poppins; font-weight: 300; color: #5c6672; word-wrap: break-word"
          >{{ user.email }}</span
        >
      </div>
      <RouterLink class="todo-section" :to="`/todos/${userId}`">
        <div class="todos-icon">
          <TablerCheckup style="color: #4f359b" />
        </div>
        <a style="color: #4f359b; text-align: center; margin-left: 10px">Todos</a>
      </RouterLink>
      <RouterLink class="post-section" :to="{ replace: true }">
        <div class="todos-icon">
          <TablerNotebook style="color: #4f359b" />
        </div>
        <a style="color: #4f359b; text-align: center; margin-left: 10px">Posts</a>
      </RouterLink>
      <RouterLink class="album-section" :to="`/albums/${userId}`">
        <div class="todos-icon">
          <TablerPhoto style="color: #4f359b" />
        </div>
        <a style="color: #4f359b; text-align: center; margin-left: 10px">Albums</a>
      </RouterLink>
    </div>
  </div>
  <div class="posts-view">
    <RouterLink class="home-section" to="/"><GoHome /></RouterLink>
    <div>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <div class="post-box">
            <h2 style="font-family: Poppins; font-weight: 500; color: #26303e">{{ post.title }}</h2>
            <p style="font-family: Poppins; font-weight: 400; color: #000000b2">
              {{ post.body }}
            </p>
            <button
              class="Pop-up-button"
              style="float: right; background-color: #ebebeba3; border: 0px"
              @click.prevent="openPopup(post.id)"
            >
              <seeMore />
            </button>
          </div>
        </li>
      </ul>
    </div>
    <PostDetailPopup
      v-if="isPopupVisible"
      :postId="selectedPostId"
      :isVisible="isPopupVisible"
      :closePopup="closePopup"
      :posts="posts"
    />
    />
  </div>
</template>

<style>
.posts-view {
  display: grid;
}
.post-box {
  display: block;
  padding: 30px;
  margin-top: 20px;
  border-bottom: 1px solid #d8d9dd;
}
.Pop-up-button {
  width: auto;
  height: 30px;
  border-radius: 3px;
}
.user-info {
  background-color: #ffffff;
  display: grid;
  align-items: center;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px;
  font-family: Poppins;
  font-weight: 400;
}
.user-info img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
</style>
