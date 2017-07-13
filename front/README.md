# 教师综合考评 #

- 安装（使用cnpm比较快)
```
npm install cnpm -g --registry=https://registry.npm.taobao.org
cnpm install
```
- 启动服务器
```
$ npm run dev-hrm
```

- 然后请手动打开浏览器，在地址栏里输入`http://localhost:10086`

- 需要注意的
1.调用后台的接口写在"src/api"，然后注明下参数
2.变量统一用/**/在变量上面加注释方便idea可以查看到（Win: Ctrl+Q, Mac: Control+J）


## CLI命令(npm scripts)
| 命令            | 作用&效果          |
| --------------- | ------------- |
| npm run clean-build     | 清空build代码 |
| npm run clean-node_modules     | 清空项目依赖 |
| npm run build     | 执行清空操作并build出一份生产环境的代码 |
| npm run build-dev     | 执行清空操作并build出一份开发环境的代码 |
| npm run dev-hrm   | 执行清空操作并运行项目（热更新） |



