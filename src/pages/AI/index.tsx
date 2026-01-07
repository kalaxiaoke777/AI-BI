import React from "react";
// import { useAppSelector } from '../../hooks/useRedux';
// import styles from './index.module.scss';
import Chat, { Bubble, useMessages, Think } from "@chatui/core";
// 引入样式
import "@chatui/core/dist/index.css";

const initialMessages = [
  {
    type: "system",
    content: { text: "专属智能助理 为您服务" },
  },
  {
    type: "text",
    content: { text: "本经理仅为您提供建议，不构成投资建议！" },
    user: {
      avatar:
        "https://gw.alicdn.com/imgextra/i2/O1CN01fPEB9P1ylYWgaDuVR_!!6000000006619-0-tps-132-132.jpg",
    },
  },
];

// 默认快捷短语，可选
const defaultQuickReplies = [
  {
    icon: "message",
    name: "提供今日创业板指数信息",
    isHighlight: true,
  },
  {
    name: "提供我目前的仓位信息",
    isHighlight: true,
  },
  {
    name: "对我的仓位进行建议",
    isHighlight: true,
  },
  {
    name: "分析当下热门环境",
    isHighlight: true,
  },
];
const UserProfile: React.FC = () => {
  const { messages, appendMsg, updateMsg, deleteMsg } =
    useMessages(initialMessages);

  // 发送回调
  function handleSend(type, val) {
    if (type === "text" && val.trim()) {
      // 发送用户消息
      const userMsgId = appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
      });

      // 添加 Think 消息（思考中）
      const thinkMsgId = appendMsg({
        type: "think",
        content: { text: "思考中..." },
      });

      // TODO: 发送请求到后端
      // 模拟回复消息
      setTimeout(() => {
        // 先删除 Think 消息
        deleteMsg(thinkMsgId);
        // 再显示实际回复
        appendMsg({
          type: "text",
          content: { text: "亲，您遇到什么问题啦？请简要描述您的问题~" },
        });
      }, 1500);
    }
  }

  // 快捷短语回调，可根据 item 数据做出不同的操作，这里以发送文本消息为例
  function handleQuickReplyClick(item) {
    handleSend("text", item.name);
  }

  function renderMessageContent(msg) {
    const { type, content } = msg;

    // 根据消息类型来渲染不同的内容
    switch (type) {
      case "think":
        return (
          <Bubble type="think">
            <Think>
              <p>{content.text}</p>
            </Think>
          </Bubble>
        );
      case "text":
        return <Bubble content={content.text} />;
      case "image":
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      default:
        return null;
    }
  }

  return (
    <Chat
      navbar={{ title: "智能助理" }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      quickReplies={defaultQuickReplies}
      onQuickReplyClick={handleQuickReplyClick}
      onSend={handleSend}
    />
  );
};

export default UserProfile;
