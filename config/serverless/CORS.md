
Proxy configuration for CORS
---

When configuring OPTIONS method to proxy NICCI calls, you need to be sure
that the following headers are in the response method.

```
Access-Control-Request-Method				'post,options'
Access-Control-Allow-Headers				'authorization,cache-control,content-type'
Access-Control-Allow-Origin				  '*'	 
```

The method POST or GET or else should only contain

```
Access-Control-Allow-Origin				  '*'
```