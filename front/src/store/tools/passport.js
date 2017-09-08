/**
 * Created by edwin on 2017/9/8.
 */
import { translateTreeData,objectMerge } from '@/utils/baseUtil'


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

const collectMap = function(sourceData,collectArry,pathChain){
  let children = []
  sourceData.forEach(function(el){
    const curPathChain = el.level!=0?((pathChain?pathChain:'')+"/" + el.path):''
    if(el.level === 2){
      children.push(objectMerge(el,{path:el.path,component: (resolve) => require(['@/views'+curPathChain+'/index.vue'], resolve)}))
    }
    if(el.children){
      collectMap(el.children,collectArry,curPathChain,el)
    }
  })
  if(children.length){
    collectArry.push({
      path: pathChain?pathChain:"/",
      component: (resolve) => require(['@/views/index.vue'], resolve),
      children: children
    })
  }
}

export function getPassport(auth) {
   auth=[
    {code:1,name:'管理后台',path:'admin',sort:1,pCode:0,level:0},
    {code:2,name:'权限管理',path:'purview',sort:1,pCode:1,level:1},
    {code:5,name:'分组管理',path:'group',sort:4,pCode:2,level:2},
    {code:3,name:'用户管理',path:'user',sort:1,pCode:2,level:2},
    {code:3,name:'角色管理',path:'role',sort:2,pCode:2,level:2},
    {code:4,name:'功能管理',path:'function',sort:3,pCode:2,level:2}
  ]
  let sourceData = translateTreeData(auth,'code','pCode','children')
  let mapArray = []
  collectMap(sourceData,mapArray)
  autoSort(mapArray)
  return mapArray
}