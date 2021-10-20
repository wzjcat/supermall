export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // payload新添加的商品
      let oldProduct = null;
      for (let item of context.state.cartList) {
        if (item.iid === payload.iid) {
          oldProduct = item
        }
      }
      // let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // 2.判断oldProduct
      if (oldProduct) { //商品数量加1
        // oldProduct.count += 1
        context.commit('addCounter', oldProduct)
        resolve('当前的商品数量+1')
      } else {  //添加新商品
        payload.count = 1;
        // context.state.cartList.push(payload)
        context.commit('addToCart', payload)
        resolve('添加了新的商品')
      }
    })
  },
}