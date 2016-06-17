#快聚财jsbridge协议

- 请求: `kjc://jsbridge/{params}
- params: json转义后的字符串,键值对的格式
    - eg: `kjc://jsbridge/{"type":"action","name":"share","callback":"callback_1466131023000","params":{"title":"title","description":"description","image":"image","link":"link"}}`
- 参数
    - type: 类型
        - event 事件
        - action 操作
        - open 打开本地页面
    - name: 名字
        - eg: event/close 关闭事件
        
            open/product-list 打开产品列表
    - callback: 回调方法名
        - JSBridge.callback(callback,params) 
        - 回调参数:
            - callback: 请求时发送的callback参数的值
            - params: 转义后的json字符串  
    - params: 发送的参数键值对
        - 格式: `key1=value1&key2=value2`

## 打开相关
- 打开产品列表
    - type: `open`
    - name: `product-list`
    - params: `/`
- 打开资产详情页
    - type: `open`
    - name: `financing`
    - params: 
        - id: 资产ID(serial)
        - product: 产品名字 

## 操作相关
- 分享操作
    - 描述: 打开分享菜单
    - type: `action`
    - name: `share`
    - params: 
        - title: 分享的标题
        - description: 分享的内容
        - image: 图片url
        - link: 跳转链接

## 事件相关
- 关闭页面
    - 描述: 用户关闭页面
    - type: `event`
    - name: `close`
    - params: `/`
