<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import TablerCheckup from '@/components/icons/tabler-checkup.vue'
import TablerNotebook from '@/components/icons/tabler-notebook.vue'
import TablerPhoto from '@/components/icons/tabler-photo.vue'
import GoHome from '@/components/icons/go-home.vue'

export default defineComponent({
  name: 'AlbumPage',
  components: {
    TablerCheckup,
    TablerNotebook,
    TablerPhoto,
    GoHome,
  },
  setup() {
    const route = useRoute()
    const userId = route.params.userId
    const albums = ref([])
    const user = ref({ name: '', email: '' })

    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        user.value = userResponse.data

        const albumsResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/albums?userId=${userId}`,
        )
        albums.value = await Promise.all(
          albumsResponse.data.map(async (album) => {
            const photosResponse = await axios.get(
              `https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`,
            )
            return { ...album, photos: photosResponse.data }
          }),
        )
      } catch (error) {
        console.error('Veri cekme hatasi:', error)
      }
    }

    onMounted(() => {
      fetchData()
    })

    return { user, albums, userId }
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
      <RouterLink class="post-section" :to="`/posts/${userId}`">
        <div class="todos-icon">
          <TablerNotebook style="color: #4f359b" />
        </div>
        <a style="color: #4f359b; text-align: center; margin-left: 10px">Posts</a>
      </RouterLink>
      <RouterLink class="album-section" :to="{ replace: true }">
        <div class="todos-icon">
          <TablerPhoto style="color: #4f359b" />
        </div>
        <a style="color: #4f359b; text-align: center; margin-left: 10px">Albums</a>
      </RouterLink>
    </div>
  </div>
  <div class="album-page">
    <RouterLink class="home-section" to="/"><GoHome /></RouterLink>
    <div class="album-grid">
      <div v-for="album in albums" :key="album.id" class="album">
        <div class="photo-grid">
          <img
            v-for="photo in album.photos.slice(0, 4)"
            :key="photo.id"
            :src="photo.url"
            alt="Album Photo"
          />
        </div>
        <h2>{{ album.title }}</h2>
      </div>
    </div>
  </div>
</template>

<style>
.album-page {
  display: block;
}
.album-grid {
  display: grid;
  margin-top: 10px;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
}
.album {
  border: 1px solid #ccc;
  padding: 20px;
  text-align: justify;
  font-family: Poppins;
  font-weight: 400;
  color: #26303e;
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
.photo-grid {
  display: grid;
  width: auto;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 5px;
  color: #26303e;
}
.photo-grid img {
  width: 50%;
  height: 125px;
  object-fit: cover;
}
</style>
