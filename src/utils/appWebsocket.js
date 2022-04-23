import uuid from 'uuid';
import {getStore} from '@/utils/store';

// 创建全局websocket
let appWebsocket = {
    uuid: uuid()
};

// websocket对象
appWebsocket.websocket = null;
// 避免websocket重复连接
appWebsocket.lockReConnect = false;
// 打开时发送消息通知后台登陆成功
appWebsocket.send = function (message = {}) {
    message.uuid = appWebsocket.uuid;
    message.token = getStore({type: 'local', key: 'token'});
    appWebsocket.websocket.send(JSON.stringify(message));
};
// 接收消息的方法集合
appWebsocket.message = null;
// 心跳
appWebsocket.heartCheck = {
    timeout: 2000, // 2s发一次心跳
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function () {
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
    },
    start: function () {
        let self = this;
        this.timeoutObj = setTimeout(function () {
            // 这里发送一个心跳，后端收到后，返回一个心跳消息，onmessage拿到返回的心跳就说明连接正常
            appWebsocket.websocket.send('ping');
            // 如果超过一定时间还没重置，说明后端主动断开了
            self.serverTimeoutObj = setTimeout(function () {
                // 如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect会触发onclose导致重连两次
                appWebsocket.websocket.close();
            }, self.timeout);
        }, this.timeout);
    }
};
// 创建websocket对象
appWebsocket.createWebsocket = function () {
    try {
        let wsUrl = location.origin.replace('http://', 'ws://').replace('https://', 'wss://');
        appWebsocket.websocket = new WebSocket(wsUrl + '/boot/websocket/app');
        appWebsocket.initWebsocket();
    } catch (e) {
        appWebsocket.reconnect();
    }
};
// 重连
appWebsocket.reconnect = function () {
    if (appWebsocket.lockReConnect) {
        return;
    }
    appWebsocket.lockReConnect = true;
    // 连接失败会一直重连，设置延迟避免请求过多
    setTimeout(() => {
        appWebsocket.createWebsocket();
        appWebsocket.lockReConnect = false;
    }, 2000);
};
// 初始化
appWebsocket.initWebsocket = function () {
    appWebsocket.websocket.onopen = (message) => {
        appWebsocket.heartCheck.reset().start();
        appWebsocket.send();
    };
    appWebsocket.websocket.onerror = (message) => {
        appWebsocket.reconnect();
    };
    appWebsocket.websocket.onclose = (message) => {
        appWebsocket.reconnect();
    };
    appWebsocket.websocket.onmessage = (message) => {
        appWebsocket.heartCheck.reset().start();
        if (message.data !== 'pong') {
            appWebsocket.message && appWebsocket.message(message.data);
        }
    };
};
// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常
window.onbeforeunload = function () {
    appWebsocket.refresh();
    appWebsocket.websocket.close();
};
// 组件引用websocket.js时创建websocket
appWebsocket.createWebsocket();
export default appWebsocket;
