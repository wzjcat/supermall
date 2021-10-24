<template>
    <div id="home">
        <!-- 标题导航栏 -->
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <!-- 控制栏标题 -->
        <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control"
            v-show="isTabFixed">
        </tab-control>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true"
            @pullingUp="loadMore">
            <!-- 轮播图 -->
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
            <!-- 推荐 -->
            <recommend-view :recommends="recommends"></recommend-view>
            <!-- 特色 -->
            <feature-view></feature-view>
            <!-- 控制栏标题 -->
            <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2">
            </tab-control>
            <!-- 商品 -->
            <goods-list :goods="showGoods"></goods-list>
        </scroll>
        <!-- 向上返回小按钮 -->
        <back-top @click.native='backClick' v-show="isShowBcakTop"></back-top>
    </div>
</template>

<script>
    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView from './childComps/RecommendView'
    import FeatureView from './childComps/FeatureView.vue'

    import NavBar from '../../components/common/navbar/NavBar.vue'
    import Scroll from 'components/common/scroll/Scroll'
    import TabControl from 'components/content/tabControl/TabControl'
    import GoodsList from 'components/content/goods/GoodsList'
    import GoodsListItem from 'components/content/goods/GoodsListItem'
    import BackTop from 'components/content/backTop/BackTop'


    import { getHomeMultidata, getHomeGoods } from 'network/home'
    import { debounce } from 'common/utils'


    export default {
        name: 'Home',
        components: {
            HomeSwiper,
            RecommendView,
            FeatureView,
            NavBar,
            Scroll,
            TabControl,
            GoodsList,
            GoodsListItem,
            BackTop
        },
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    'pop': { page: 0, list: [] },
                    'new': { page: 0, list: [] },
                    'sell': { page: 0, list: [] },
                },
                currentType: 'pop',
                isShowBcakTop: false,
                tabOffsetTop: 0,
                isTabFixed: false,
                saveY: 0,
                itemImgListener: null
            }
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        activated() {
            this.$refs.scroll.scroll.scrollTo(0, this.saveY, 200)
            this.$refs.scroll.refresh()
        },
        deactivated() {
            // 保存Y值
            this.saveY = this.$refs.scroll.getScrollY()

            // 取消全局事件的监听
            this.$bus.$off('itemImgLoad', this.itemImgListener)
        },
        created() {
            //1.请求多个数据
            this.getHomeMultidata()
            //2.请求商品数据
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')

        },
        mounted() {
            //1.监听item中图片加载完成
            const refresh = debounce(this.$refs.scroll.refresh, 200)

            // 2.对监听的事件进行保存
            this.itemImgListener = () => {
                refresh()
            }
            this.$bus.$on('itemImageLoad', this.itemImgListener)

        },
        methods: {
            /**
             * 事件监听相关的方法
             */

            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break;
                    case 1:
                        this.currentType = 'new'
                        break;
                    case 2:
                        this.currentType = 'sell'
                        break;
                }
                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index;
            },
            // 返回顶端按钮
            backClick() {
                this.$refs.scroll.scroll.scrollTo(0, 0, 500)
            },
            // 当前滚动位置
            contentScroll(position) {
                // 1.判断BackTop是否显示
                this.isShowBcakTop = (-position.y) > 1000

                // 2.决定tabControl是否吸顶（position:fixed）
                this.isTabFixed = (-position.y) > this.tabOffsetTop
            },
            // 上拉加载
            loadMore() {
                this.getHomeGoods(this.currentType)
                this.$refs.scroll.scroll.refresh()
            },
            //轮播图是否加载完成
            swiperImageLoad() {
                //2.获取tabControl的offsetTop
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
            },



            /**
             * 网络请求相关的方法
             */
            getHomeMultidata() {
                getHomeMultidata().then(res => {
                    this.banners = res.data.data.banner.list;
                    this.recommends = res.data.data.recommend.list;
                })
            },
            getHomeGoods(type) {
                const page = this.goods[type].page + 1
                getHomeGoods(type, page).then(res => {
                    this.goods[type].list.push(...res.data.data.list)
                    this.goods[type].page += 1
                    //取消上拉 方法
                    this.$refs.scroll.scroll.finishPullUp();
                })
            }
        },
    }
</script>

<style scoped>
    #home {
        height: 100vh;
        position: relative;
        /* overflow: hidden; */
    }

    .home-nav {
        background-color: var(--color-tint);
        color: #fff;
        font-weight: 700;
        /* position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 9; */
    }

    .tab-control {
        position: relative;
        z-index: 9;
    }

    .content {
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
        /* height: calc(100% - 93px); */
        /* margin-top: 44px; */
        /* touch-action: none; */

    }
</style>