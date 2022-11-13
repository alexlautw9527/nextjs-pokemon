## 使用方法

- `npm install`: 安裝
- `npm run dev`: 開發模式
- `npm run build`: 編譯模式，靜態頁面會在此初步生成
- `npm start`: production 模式

## 路徑說明

- `pages/demo/pokemon-list`: SSR 的渲染 demo，渲染出 pokemon api 列表第一頁
- `pages/demo/pokemon/[id]`: 列表第一頁的口袋妖怪會先 SSG，其他使用 ISR 的方式（強烈建議用 `npm run build && npm start` 才能實際體驗到）
