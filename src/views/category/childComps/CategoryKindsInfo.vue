<template>
  <div class="kinds-info">
    <div v-for="(item, index) in kinds" :key="index" class="info-all">
      <a :href="item.link">
        <img :src="item.image" alt="" class="info-img">
        <div class="info-title">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CategoryKindsInfo',
    props: {
      kinds: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .kinds-info {
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .kinds-info .info-all {
    margin-top: 20px;
  }

  .kinds-info .info-img {
    width: 70px;
    height: 70px;
  }

  .kinds-info .info-title {
    font-size: 14px;
    text-align: center;
  }
</style>