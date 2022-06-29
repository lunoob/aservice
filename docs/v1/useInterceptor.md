# 使用拦截器

拦截器分为全局拦截器和 request 对象的拦截器，而拦截器又分为

- 请求拦截器
- 响应拦截器



## 全局拦截器

全局注册的拦截器，在接下来创建的每个 request 对象都会继承来自全局的拦截器



### 请求拦截器

#### createReqInterceptor

创建全局的请求拦截器，记得将配置项 return

```typescript
import { createRequestInterceptor } from 'service'

createRequestInterceptor((config) => {
  	// doing something before request sent
  	return config
})
```



#### deleteReqInterceptor

删除指定的全局请求拦截器

```typescript
import { createRequestInterceptor, deleteReqInterceptor } from 'service'

const code = createRequestInterceptor((config) => {
  	// doing something before request sent
  	return config
})

deleteReqInterceptor(code)
```



#### clearReqInterceptor

清空所有已注册的全局请求拦截器

```typescript
import { clearReqInterceptor, createRequestInterceptor } from 'service'

createRequestInterceptor(/** ...01 **/)
createRequestInterceptor(/** ...02 **/)
createRequestInterceptor(/** ...03 **/)

// 会将上述 3 个全局请求拦截器全部删除
clearReqInterceptor()
```



### 响应拦截器

#### createResInterceptor

创建全局的响应拦截器，记得将配置项 return

```typescript
import { createResInterceptor } from 'service'

createRequestInterceptor((config) => {
  	// doing something before response be handle
  	return config
})
```



#### deleteResInterceptor

删除指定的全局响应拦截器

```typescript
import { createResInterceptor, deleteResInterceptor } from 'service'

const code = createRequestInterceptor((config) => {
  	// doing something before request sent
  	return config
})

deleteReqInterceptor(code)
```



#### clearResInterceptor

清空所有已注册的全局请求拦截器

```typescript
import { clearResInterceptor, createResInterceptor } from 'service'

createResInterceptor(/** ...01 **/)
createResInterceptor(/** ...02 **/)
createResInterceptor(/** ...03 **/)

// 会将上述 3 个全局响应拦截器全部删除
clearReqInterceptor()
```



### 内置拦截器

#### carryParamsInterceptor(params)

内置的一个请求拦截器，用于提供添加额外的参数。当需要全局的携带参数时很有用

```typescript
import { carryParamsInterceptor, createReqInterceptor, createRequest } from 'service'

// 使用方式：01 传入一个字面量对象
createReqInterceptor(carryParamsInterceptor({
  version: 'v1'
}))

// 使用方式：02 传入一个函数，return 一个字面量对象
createReqInterceptor(carryParamsInterceptor(() => {
  return {
    aId: 'xxx'
  }
}))

const http = createRequest({ baseURL: 'http://host' })

http.request('get', '/data')('')
// http://host/data?version=v1&aid=xxx

http.request('post', '/up', { nickname: 'luoob' })
// http://host/data
// data => { nickname: 'luoob', version: 'v1', aId: 'xxx' }
```



## request 对象拦截器

### 请求拦截器

#### addReqInterceptor

创建请求拦截器

```typescript
http.addReqInterceptor((config) => {
  // to do something
  return config
})
```



#### clearReqInterceptor(code)

删除请求拦截器

```typescript
const code = http.addReqInterceptor((config) => {
  // to do something
  return config
})

http.clearReqInterceptor(code)
```



#### clearReqInterceptor

清空请求拦截器队列

```typescript
http.clearReqInterceptor()
```



### 响应拦截器

#### addResInterceptor

创建响应拦截器

```typescript
http.addResInterceptor((config) => {
  // to do something
  return config
})
```



#### clearResInterceptor(code)

删除响应拦截器

```typescript
const code = http.addResInterceptor((config) => {
  // to do something
  return config
})

http.clearResInterceptor(code)
```



#### clearResInterceptor

清空响应拦截器队列

```typescript
http.clearResInterceptor()
```



