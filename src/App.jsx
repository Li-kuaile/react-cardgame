import { useEffect,useState } from 'react';
import './App.css';
import Card from './components/Card';

function App() {
  // 定义状态变量
  const [cards, setCards] = useState(null); // 存储卡片信息的状态
  const [score, setScore] = useState(0); // 存储分数的状态
  const [moves, setMoves] = useState(0); // 存储移动次数的状态
  const [disabled, setDisabled] = useState(false); // 存储是否禁用卡片点击的状态
  const [firstSelection, setFirstSelection] = useState(null); // 存储第一次选择的卡片
  const [secondSelection, setSecondSelection] = useState(null); // 存储第二次选择的卡片

  const [firstSelectionKey, setFirstSelectionKey] = useState(null); // 存储第一次选择的卡片的键

  const items = [
    {
      emoji: '👇',
      id: '1',
      matchFound: false,
      flipped: false,
    },
    {
      emoji: '👀',
      id: '2',
      matchFound: false,
      flipped: false,
    },
    {
      emoji: '🙌',
      id: '3',
      matchFound: false,
      flipped: false,
    },
    {
      emoji: '👋',
      id: '4',
      matchFound: false,
      flipped: false,
    },
    {
      emoji: '🙏',
      id: '5',
      matchFound: false,
      flipped: false,
    },
    {
      emoji: '🤔',
      id: '6',
      matchFound: false,
      flipped: false,
    },
    {
      emoji: '🤦‍♂️',
      id: '7',
      matchFound: false,
      flipped: false,
    },
    {
      emoji: '😔',
      id: '8',
      matchFound: false,
      flipped: false,
    },
  ];

// 重置卡片信息，重新洗牌并设置到状态中
function resetCards() {
  const shuffled = [...items, ...items]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, key: Math.random() })); // 添加一个随机键
  setCards(shuffled);
}

// 处理卡片点击事件
function handleCardClick(e, key) {
  if (firstSelection && firstSelectionKey !== key) {
    setSecondSelection(e.target.dataset.id);
  } else {
    setFirstSelection(e.target.dataset.id);
    setFirstSelectionKey(key);
  }
  // to do: 处理重复点击同一张卡片
}

// 重置回合状态
function resetTurn() {
  setFirstSelection(null);
  setFirstSelectionKey(null);
  setSecondSelection(null);
  setMoves((m) => m + 1); // 移动次数加一
  setDisabled(false);
}

// 处理新游戏点击事件
function handleNewGameClick() {
  resetTurn();
  setMoves(0);
  setScore(0);
  resetCards();
}

// 使用 useEffect 实现副作用
useEffect(() => {
  if (!secondSelection) {
    return;
  }
  setDisabled(true);
  // 检查两次选择是否匹配
  if (firstSelection === secondSelection) {
    // 匹配成功的处理
    setCards((prev) => {
      return prev.map((card) => {
        if (card.id === firstSelection) {
          return { ...card, matchFound: true };
        } else {
          return card;
        }
      });
    });
    // 分数加一，并重置回合状态
    setScore((prev) => prev + 1);
    resetTurn();
  } else {
    // 未匹配的处理
    setTimeout(() => resetTurn(), 500); // 500ms后重置回合状态
  }
}, [firstSelection, secondSelection]); // 监听 firstSelection 和 secondSelection 的变化

// 初次渲染时重置卡片信息
useEffect(() => {
  resetCards();
}, []); // 依赖项为空，只在初次渲染时执行

// 渲染界面
return (
  <div className="App">
    {/* 新游戏按钮 */}
    <button onClick={() => handleNewGameClick()}>New Game</button>
    <div className="gameboard">
      {/* 渲染卡片 */}
      {cards &&
        Object.values(cards).map((card) => (
          <Card
            key={card.key}
            card={card}
            disabled={disabled}
            handleCardClick={(e) => handleCardClick(e, card.key)}
          />
        ))}
    </div>
    <div className="score">
      {/* 显示移动次数和分数 */}
      <p style={{ fontSize: 30, fontWeight: 'bold' }}>Total Moves: {moves}</p>
      <p style={{ fontSize: 30, fontWeight: 'bold' }}>Total Score: {score}</p>
    </div>
  </div>
);
}
export default App;
