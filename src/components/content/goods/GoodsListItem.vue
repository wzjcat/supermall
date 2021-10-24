<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="collet">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.img || this.goodsItem.show.img
      }
    },
    methods: {
      // img旁边加 @load=“imageLoad”
      imageLoad() {
        this.$bus.$emit('itemImageLoad')
        // if (this.$router.path.indexOf('/home')) {
        //   this.$bus.$emit('homeItemImageLoad')
        // } else if (this.$router.path.indexOf('/detail')) {
        //   this.$bus.$emit('detailItemImageLoad')
        // }

      },
      itemClick() {
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    },
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 8px;
    /* text-align: center; */
    font-size: 13px;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    position: relative;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 3px 0;

  }

  .goods-info .price {
    color: var(--color-high-text);
    margin: 0 20px;
  }

  .goods-info .collet::after {
    content: '';
    position: absolute;
    top: 15px;
    width: 14px;
    height: 14px;
    background: url(../../../assets/img/common/collect.svg) 0 0/14px 14px;
  }
</style>