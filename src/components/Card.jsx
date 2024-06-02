import head from '../assets/react.svg'; // 引入卡片正面的图像
import './Card.css'; // 引入卡片组件的样式
import { useState } from 'react'; // 引入useState钩子用于在函数组件中添加状态

// Card组件，用于渲染卡片
const Card = ({ card, handleCardClick, disabled }) => {
  // 使用useState钩子来创建名为flip的状态，并初始化为0
  const [flip, setFlip] = useState(0);

  return (
    <button
      className={`card ${card.matchFound ? 'matched' : ''} ${
        flip % 2 === 1 ? 'flip' : ''
      }`}
      disabled={disabled}
      onClick={(e) => {
        handleCardClick(e, card.key); // 处理卡片点击事件
        setFlip(flip + 1); // 更新flip状态来实现翻转效果
      }}
      data-id={card.id}
    >
      <div className="front side">
        <img src={head} alt="head" width="60" /> 
        {/* // 正面图像 */}
      </div>
      <div className="side back">{card.emoji}</div> 
      {/* // 反面显示emoji */}
    </button>
  );
};

export default Card; // 导出Card组件供其他模块使用
