<template>
    <div id="category">
        <nav-bar class="nav-bar">
            <div slot="center">商品分类</div>
        </nav-bar>
        <!-- 左边分类选项栏 -->
        <category-left-bar :title="listdata" @itemClick="itemClick"></category-left-bar>
        <!-- 备用覆盖控制选项栏 -->
        <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" ref="tabcontrol2"
            v-show="isTabFixed">
        </tab-control>
        <scroll class="content" :probe-type='3' :pull-up-load='true' ref="scroll" @scroll="contentScroll">
            <!-- 分类总类数据展示 -->
            <category-kinds-info :kinds="kindsdata"></category-kinds-info>
            <!-- 控制选项栏 -->
            <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabcontrol1">
            </tab-control>
            <!-- goods商品展示 -->
            <goods-list :goods="showGoods"></goods-list>
        </scroll>
    </div>
</template>

<script>
    // 引入公共组件
    import Scroll from 'components/common/scroll/Scroll'
    import NavBar from 'components/common/navbar/NavBar'

    // 引入项目公共组件
    import TabControl from 'components/content/tabControl/TabControl'
    import GoodsList from 'components/content/goods/GoodsList'

    // 引入组件
    import CategoryLeftBar from './childComps/CategoryLeftBar.vue'
    import CategoryKindsInfo from './childComps/CategoryKindsInfo.vue'

    // 引入网络请求组件
    import { getCategory, getSubcategory, getSubcategoryDetail } from 'network/category'

    export default {
        name: 'Category',
        components: {
            Scroll,
            NavBar,
            TabControl,
            GoodsList,
            CategoryLeftBar,
            CategoryKindsInfo,
        },
        data() {
            return {
                listdata: [],
                kindsdata: [],
                goodsdata: {
                    'pop': { list: [] },
                    'new': { list: [] },
                    'sell': { list: [] }
                },
                miniWallkey: 0,
                currentType: 'pop',
                isTabFixed: false,
            }
        },
        created() {
            // 请求左边分类数据
            getCategory().then(res => {
                this.listdata = res.data.data.category.list
                // console.log(this.listdata);
                // 获取第一页的数据
                getSubcategory(this.listdata[0].maitKey).then(res => {
                    // console.log(res);
                    this.kindsdata = res.data.data.list
                    // console.log(this.kindsdata);
                })
                this.miniWallkey = this.listdata[0].miniWallkey
                this.getSubcategoryDetail(this.miniWallkey, 'pop')
                this.getSubcategoryDetail(this.miniWallkey, 'new')
                this.getSubcategoryDetail(this.miniWallkey, 'sell')
            })


        },
        methods: {
            // 获取商品展示的数据
            getSubcategoryDetail(miniWallkey, type) {
                getSubcategoryDetail(miniWallkey, type).then((res) => {
                    this.goodsdata[type].list = res.data
                    // console.log(this.goodsdata);
                })

            },

            // 获取tancontrol 上index的值
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
                this.$refs.tabcontrol1.currentIndex = index
                this.$refs.tabcontrol2.currentIndex = index
            },
            // 获取categoryleftbar上index的值
            itemClick(index) {
                this.miniWallkey = this.listdata[index].miniWallkey
                this.getSubcategoryDetail(this.miniWallkey, 'pop')
                this.getSubcategoryDetail(this.miniWallkey, 'new')
                this.getSubcategoryDetail(this.miniWallkey, 'sell')

                // 点击后定位去tabcontrol位置
                console.log(this.$refs.tabcontrol1.$el.offsetTop);
                this.$refs.scroll.scroll.scrollTo(0, -(this.$refs.tabcontrol1.$el.offsetTop), 200)
                this.$refs.scroll.refresh()
            },
            // 监听当前滚动位置
            contentScroll(positon) {
                // 判断是否tabcontrol是否（fixed）吸顶
                this.isTabFixed = (-positon.y) > this.$refs.tabcontrol1.$el.offsetTop
            },
        },
        computed: {
            showGoods() {
                return this.goodsdata[this.currentType].list
            }
        },
    }
</script>

<style scoped>
    #category {
        height: 100vh;
    }

    .nav-bar {
        position: relative;
        background-color: var(--color-tint);
        color: #fff;
        font-weight: 700;
        z-index: 9;
    }

    .content {
        /* height: calc(100% - 93px); */
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 105px;
        right: 0;
        overflow: hidden;
    }

    .tab-control {
        position: relative;
        z-index: 9;
    }
</style>