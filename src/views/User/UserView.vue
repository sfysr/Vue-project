<script lang="ts">
import axios from 'axios'
import tabler_user from '@/components/icons/tabler_user.vue'
import tabler_pin from '@/components/icons/tabler_pin.vue'
import tabler_skyscraper from '@/components/icons/tabler_skyscraper.vue'
import tabler_world from '@/components/icons/tabler_world.vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'UserView',

  components: {
    tabler_user,
    tabler_pin,
    tabler_skyscraper,
    tabler_world,
    RouterLink,
  },
  setup() {
    const router = useRouter()
    const users = ref([])

    onMounted(async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        users.value = response.data
      } catch (error) {
        console.error('Kullanici verilerini cekerken hata:', error)
      }
    })
    const goToTodos = (userId: number) => {
      router.push({ name: 'TodoView', params: { userId } })
    }

    return { users, goToTodos }
  },
})
</script>

<template>
  <div class="container">
    <div class="sidebar">
      <RouterLink class="user-section" to="/">
        <div class="user-icon">
          <tabler_user style="color: #4f359b" />
        </div>
        <a style="color: #4f359b; text-align: center; margin-left: 10px">Users</a>
      </RouterLink>
    </div>
    <div>
      <h2
        style="
          font-family: Poppins;
          font-weight: 600;
          color: #26303e;
          padding-left: 20px;
          margin-bottom: 15px;
        "
      >
        All Users
      </h2>
      <div class="user-list">
        <div class="user-card" v-for="user in users" :key="user.id" @click="goToTodos(user.id)">
          <div>
            <img style="width: 100px; height: 100px; border-radius: 50px" />
            <h3 style="font-family: Poppins; font-weight: 500">{{ user.name }}</h3>
            <p style="font-family: Poppins; font-weight: 300">{{ user.email }}</p>
            <p style="font-family: Poppins; font-weight: 300">{{ user.phone }}</p>
          </div>
          <div>
            <ul>
              <p>
                <tabler_pin style="color: #26303e" />
                <strong style="font-family: Poppins; font-weight: 500"> Address:</strong>
                <a style="font-family: Poppins; font-weight: 300">{{ user.address.street }}</a>
              </p>
              <p>
                <tabler_skyscraper />
                <strong style="font-family: Poppins; font-weight: 500"> Company:</strong>
                <a style="font-family: Poppins; font-weight: 300">{{ user.company.name }}</a>
              </p>
              <p>
                <tabler_world />
                <strong style="font-family: Poppins; font-weight: 500"> Website:</strong>
                <a style="font-family: Poppins; font-weight: 300" :href="user.website">{{
                  user.website
                }}</a>
              </p>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.container {
  display: flex;
  background-color: #ffffff;
}
.sidebar {
  width: 260px;
  height: 100%;
  border-right: 1px solid;
  justify-content: space-between;
  padding-top: 32px;
  padding-bottom: 32px;
  background-color: #f5f5f5;
  font-family: Poppins;
  font-weight: 400;
}
.user-section {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px;
  font-family: Poppins;
  font-weight: 400;
}

.user-list {
  width: 100%;
  height: 100%;
  padding: 20px;
  padding-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  color: #26303e;
}

.user-card {
  display: grid;
  align-items: center;
  flex-direction: column;
  border: 1px solid #d8d9dd;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  color: #26303e;
  flex-wrap: wrap;
  justify-content: space-around;
}

.user-card:hover {
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  transform: scale(1.05);
  transition: all 0.2s ease-in-out;
}
</style>
