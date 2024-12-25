<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import axios from 'axios'
import tablerX from './icons/tabler-x.vue'

export default defineComponent({
  name: 'PostDetailPopup',
  components: {
    tablerX,
  },
  props: {
    postId: {
      type: Number,
      required: true,
    },
    isVisible: {
      type: Boolean,
      required: true,
    },
    closePopup: {
      type: Function,
      required: true,
    },
    posts: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const comments = ref([])

    // İlgili postu almak için computed bir değişken
    const post = computed(() => {
      return props.posts.find((p) => p.id === props.postId)
    })

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?postId=${props.postId}`,
        )
        comments.value = response.data
      } catch (error) {
        console.error('Yorumlari çekme hatasi:', error)
      }
    }

    onMounted(() => {
      if (props.isVisible) {
        fetchComments()
      }
    })

    return { comments, post }
  },
})
</script>

<template>
  <div class="popup-overlay" @click.self="closePopup">
    <div class="popup-content">
      <div>
        <h2 style="font-weight: 500;color: #26303E;margin-bottom: 40px;">
          {{ post.title }}
        </h2>
        <p style="font-weight: 400;color: #000000B2;text-align: justify;">{{ post.body }}</p>
      </div>

      <div class="comments-section">
        <h3 style="font-weight: 600;color: #26303E;padding-inline-start: 40px;margin-bottom: 20px;">
          Comments <tablerX @click="closePopup" style="height: 36px; width: 36px; float: right" />
        </h3>
        <ul>
          <p v-for="comment in comments" :key="comment.id">
            <strong style="font-weight: 500; display: flex; flex-direction: column; color: #26303e"
              >{{ comment.name }} :</strong
            >
            <p style="font-weight: 400; color: #5c6672">{{ comment.body }}</p>
          </p>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: white;
  padding: 20px;
  border-radius: 24px;
  height: 600px;
  width: 1024px;
  font-family: Poppins;
}
.comments-section{
  text-align: justify;
}
</style>
