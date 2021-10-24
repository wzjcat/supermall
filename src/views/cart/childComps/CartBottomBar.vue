<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate" @click="computedClick">
      去计算({{checkLength}})
    </div>
    <toast :message="message" :show="show"></toast>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import Toast from 'components/common/toast/Toast'
  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton,
      Toast
    },
    data() {
      return {
        message: '',
        show: false
      }
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.$store.state.cartList.length === 0) return false
        // return !(this.$store.state.cartList.filter(item => !item.checked).length) 没下面的高效
        return !(this.$store.state.cartList.find(item => !item.checked))
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) { //全部选中
          this.$store.state.cartList.forEach(item => item.checked = false)
        } else { //部分选中
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
      computedClick() {
        if (!this.checkLength) {
          this.message = '请选商品'
          this.show = true
          setTimeout(() => {
            this.show = false
          }, 2000);
        }
      }
    },
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    position: relative;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    font-size: 14px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 100px;
    text-align: center;
    background-color: red;
    color: #fff;
  }
</style>