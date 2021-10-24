<template>
  <div class="left-bar">
    <scroll class="content" ref="scroll" :probe-type='3' :pull-up-load='true'>
      <div v-for="(item, index) in title" :key="index" :class="{active : currentIndex === index}"
        @click="itemClick(index)">
        <div class="item-title">{{item.title}}</div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  export default {
    name: 'CategoryLeftBar',
    components: {
      Scroll,
    },
    data() {
      return {
        currentIndex: 0,
      }
    },
    props: {
      title: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('itemClick', index)
      }
    },
  }
</script>

<style scoped>
  .left-bar {
    float: left;
    height: calc(100% - 93px);
    background-color: #f2f2f2;
  }

  .content {
    height: 100%;
    overflow: hidden;
  }

  .item-title {
    width: 100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .active {
    color: var(--color-high-text);
    border-left: 5px solid var(--color-tint);
  }
</style>