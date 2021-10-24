import { request } from './request'

// 获取左边分类的数据
export function getCategory() {
  return request({
    url: '/category'
  })
}

// 获取详细数据
export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey,
    }
  })
}

// 获取底下数据
export function getSubcategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type,
    }
  })
}