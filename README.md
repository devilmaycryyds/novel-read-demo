# wb-cube-example

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
### publish
```
npm login
npm publish
```
### 结构目录
├── README.md
├── babel.config.js
├── dist
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── blocks
│   │   ├── h5
│   │   ├── schema.json
│   │   ├── snapshot.jpg
│   │   └── wb
│   ├── components
│   │   ├── Item
│   │   ├── Module
│   │   └── Texts
│   ├── config
│   │   └── index.js
│   ├── main.js
│   └── style
│       └── index.scss
└── vue.config.js

### 开发目录
1. h5：blocks/h5
2. 小程序：blocks/wb

### 暂时支持的schema类型
String
Color
Image
Url
Number
RichText


