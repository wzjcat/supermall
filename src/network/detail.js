import { request } from './request'

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid,
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

// 构造函数
// 详情页里面的商品简介
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

// 详情页里面的商家介绍
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goosCount = shopInfo.cGppds
  }
}

// 商品参数
export class GoodsParam {
  constructor(info, rule) {
    this.image = info.images ? info.images[0] : ''
    this.infos = info.set
    this.sizes = rule.tables
  }
}

