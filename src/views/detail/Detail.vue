<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" :probe-type="3" :pull-up-load="true" ref="scroll" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods='recommends'></goods-list>
    </scroll>
    <!-- 向上返回小按钮 -->
    <back-top @click.native='backClick' v-show="isShowBcakTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <toast :message="message" :show="show"></toast>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'

  import Scroll from 'components/common/scroll/Scroll'
  import Toast from 'components/common/toast/Toast'

  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'

  import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'
  import { debounce } from '../../common/utils.js'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList,
      DetailBottomBar,
      BackTop,
      Toast,
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        itemImgListener: null,
        themeTopYs: [],
        // getThemeTopYs: null
        currentIndex: 0,
        isShowBcakTop: false,
        message: '',
        show: false
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid

      // 2.根据iid请求数据
      getDetail(this.iid).then(res => {
        // 1.获取数据
        // console.log(res);
        const data = res.data.result
        // 2.获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages

        // 3.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 4.获取商家信息
        this.shop = new Shop(data.shopInfo)

        // 5.获取商品详细信息
        this.detailInfo = data.detailInfo

        // 6.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 7.获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      // 3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.data.list
      })

      // this.getThemeTopYs = debounce(() => {
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs);
      // }, 100)
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
        // this.getThemeTopYs()
      },
      titleClick(index) {
        this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position) {
        // 1.获取y的值
        const positionY = -position.y
        let length = this.themeTopYs.length
        // 2.positionY和主题中值进行对比
        for (let i = 0; i < this.themeTopYs.length; i++) {
          // if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
          //   console.log(i);
          // }
          if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
            // console.log(this.currentIndex);
          }
        }
        // 判断是否显示backTop
        this.isShowBcakTop = (-position.y) > 1000
      },
      // 返回顶端按钮
      backClick() {
        this.$refs.scroll.scroll.scrollTo(0, 0, 500)
      },
      addToCart() {
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid

        // 2.将商品添加到购物车里面
        // this.$store.commit('addCart', product)
        this.$store.dispatch('addCart', product).then(res => {
          this.show = true;
          this.message = res;
          setTimeout(() => {
            this.show = false;
            this.message = ''
          }, 1500);
        })
      }
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      this.itemImgListener = () => {
        refresh()
      }
      this.$bus.$on('itemImgLoad', this.itemImgListener)
      // 有bug 要点进去1秒之后再拖动 不然定位不准
      // setTimeout(() => {
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs);
      // }, 1000);

    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    updated() {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      console.log(this.themeTopYs);
    },
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    overflow: hidden;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 93px);
  }
</style>