# 创建 request 对象

使用提供的  `createRequest`  API 即可创建一个 request 实例，该 request 实例拥有多个方法，`Interface`  如下



## createRequest

创建返回的对象分别有以下方法，一下方法都只针对于自身的 axios 而言

- **getInstance**

  获取 axios 实例

- **request**

  发起 http 请求

- **addReqInterceptor**

  增加请求拦截器

- **addResInterceptor**

  增加响应拦截器

- **clearReqInterceptor**

  清空/删除请求拦截器队列

- **clearResInterceptor**

  清空/删除响应拦截器队列

- **addSuccessHandler**

  增加成功响应处理器

- **addErrorHandler**

  增加错误/失败响应处理器

- **clearSuccessHandler**

  清空/删除成功响应处理器队列

- **clearErrorHandler**

  清空/删除错误/失败处理器队列



## 使用

```typescript
import { createRequest } from 'service'

const http = createRequest({ baseURL: 'http://host' })
```



createRequest 函数需要传入一个配置参数，具体的配置请参考：[创建 axios 实例文档](https://github.com/axios/axios#request-config)