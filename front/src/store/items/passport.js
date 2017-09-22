/**
 * Created by edwin on 2017/9/8.
 */
import { objectMerge } from '@/utils/base'

const autoSort= function(sourceData){
  sourceData.sort(function(a,b){
    return a.sort - b.sort
  })
  sourceData.forEach(function(el){
    if(el.children){
      autoSort(el.children)
    }
  })
}

const findOrigin = function(sourceData){
  let origin =''
  sourceData.every(function (el) {
    if(el.level == 2){
      origin=el.path
    }else if(el.children){
      origin=findOrigin(el.children)
    }
    if(origin !== '') return false
    else return true
  })
  return origin
}

const parsePassport = function(sourceData,level) {
  let hash = {}
  let filterSourceData = []
  let list = []
  let origin = ''
  sourceData.forEach(function(el){
    el.children = []
    if(el.level >= level) {
      filterSourceData.push(el)
      hash[el.code] = el
    }
  })
  filterSourceData.forEach(function(el){
      let parentEl = hash[el.pCode]
      if(parentEl) {
        parentEl.children.push(objectMerge(el,{component: (resolve) => require(['@/views'+el.path+'/index.vue'], resolve)}))
      }else{
        list.push(objectMerge(el,{component: (resolve) => require(['@/views/index.vue'], resolve)}))
      }
  })
  autoSort(list)
  origin = findOrigin(list)
  return {list,origin}
}

export function getPassport(auth) {
   auth=[
    {code:1,name:'管理后台',path:'/admin',sort:1,pCode:0,level:0},
    {code:7,name:'微博管理',path:'/cd',sort:2,pCode:1,level:1},
    {code:2,name:'权限管理',path:'/purview',sort:1,pCode:1,level:1},
    {code:5,name:'分组管理',path:'/purview/group',sort:4,pCode:2,level:2},
    {code:3,name:'用户管理',path:'/purview/user',sort:1,pCode:2,level:2},
    {code:3,name:'角色管理',path:'/purview/role',sort:2,pCode:2,level:2},
    {code:4,name:'节点管理',path:'/purview/node',sort:3,pCode:2,level:2}
  ]
  const passport = parsePassport(auth,1)
  return passport
}