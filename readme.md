커스텀 라우트를 추가하기 위해 아래와 같이 lowdb를 설치하고, server.js를 프로젝트 루트에 생성한다.

```bash
## https://github.com/typicode/lowdb
npm install lowdb
```

```javascript
// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// db.json를 조작하기 위해 lowdb를 사용
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.delete('/todos/completed', (req, res) => {
  // lowdb를 사용해서 db.json에서 completed: true인 todo를 제거
  db.get('todos')
    .remove({ completed: true })
    .write();

  // todos를 응답
  res.send(db.get('todos').value());
})

// Use default router
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running')
});
```

package.json을 아래와 같이 수정한다.

```json
...
- "scripts": {
    "start": "json-server --watch db.json"
  },
+ "scripts": {
    "start": "node server.js"
  },
...
```

```bash
$ npm start
```