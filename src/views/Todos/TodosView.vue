<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import axios from 'axios'
import TablerCheckup from '@/components/icons/tabler-checkup.vue'
import TablerNotebook from '@/components/icons/tabler-notebook.vue'
import TablerPhoto from '@/components/icons/tabler-photo.vue'
import GoHome from '@/components/icons/go-home.vue'

export default defineComponent({
  name: 'TodoView',
  components: {
    TablerCheckup,
    TablerNotebook,
    TablerPhoto,
    GoHome,
    RouterLink,
  },

  setup() {
    const route = useRoute()
    const userId = route.params.userId
    const todos = ref([])
    const user = ref({ name: '', email: '' })

    const fetchData = async () => {
      try {
        const [todosResponse, userResponse] = await Promise.all([
          axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`),
          axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`),
        ])
        todos.value = todosResponse.data
        user.value = userResponse.data
      } catch (error) {
        console.error('Veri cekme hatasi:', error)
      }
    }

    onMounted(() => {
      fetchData()
    })

    return { user, todos, userId }
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
      <RouterLink class="todo-section" :to="{ replace: true }">
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
      <RouterLink class="album-section" :to="`/albums/${userId}`">
        <div class="todos-icon">
          <TablerPhoto style="color: #4f359b" />
        </div>
        <a style="color: #4f359b; text-align: center; margin-left: 10px">Albums</a>
      </RouterLink>
    </div>

    <div class="todo-container">
      <RouterLink class="home-section" to="/"><GoHome /></RouterLink>
      <div v-if="todos.length === 0">Loading...</div>
      <div v-else>
        <ul>
          <li v-for="todo in todos" :key="todo.id" class="todo-item">
            <input type="checkbox" class="custom-checkbox" :checked="todo.completed" />
            <span>{{ todo.title }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
.custom-checkbox {
  width: 18px;
  height: 18px;
  margin-right: 15px;
  background-color: #4f359b;
  border: 2px solid #ccc;
}
.todo-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  color: #485b69;
  font-family: Poppins;
  font-weight: 400;
}

.completed {
  text-decoration: line-through;
}
.home-section {
  width: 142px;
  height: 32px;
  background-color: #ffffff;
  display: flex;
  padding: 40px;
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
.box-section {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px;
  font-family: Poppins;
  font-weight: 400;
}
.todo-section {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px;
  font-family: Poppins;
  font-weight: 400;
  margin-top: 50px;
}
.post-section {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px;
  font-family: Poppins;
  font-weight: 400;
  margin-top: 20px;
}
.album-section {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px;
  font-family: Poppins;
  font-weight: 400;
  margin-top: 20px;
}
</style>
