<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll" :pull-up-load="true" :probe-type='3'>
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"></cart-list-item>
    </scroll>
  </div>

</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem.vue'
  export default {
    name: 'CartList',
    components: {
      Scroll,
      CartListItem,
    },
    computed: {
      cartList() {
        return this.$store.getters.cartList
      }
    },
    methods: {

    },
    activated() {
      this.$refs.scroll.refresh()
    },
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 133px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>