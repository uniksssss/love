import { useState } from "react";
import styles from "./yes.module.css";

const photos = Array.from({ length: 10 }, (_, i) => `photo${i + 1}.jpg`);

function shuffle(array: string[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

function createCards() {
  const duplicated = shuffle([...photos, ...photos]);

  return duplicated.map((photo, index) => ({
    id: index,
    photo,
    isFlipped: false,
    isMatched: false,
  }));
}

const heartLayout = [
  { row: 1, col: 2 },
  { row: 1, col: 3 },
  { row: 1, col: 5 },
  { row: 1, col: 6 },

  { row: 2, col: 1 },
  { row: 2, col: 2 },
  { row: 2, col: 3 },
  { row: 2, col: 4 },
  { row: 2, col: 5 },
  { row: 2, col: 6 },
  { row: 2, col: 7 },

  { row: 3, col: 2 },
  { row: 3, col: 3 },
  { row: 3, col: 4 },
  { row: 3, col: 5 },
  { row: 3, col: 6 },

  { row: 4, col: 3 },
  { row: 4, col: 4 },
  { row: 4, col: 5 },

  { row: 5, col: 4 },
];

export default function YesScreen() {
  const [cards, setCards] = useState(createCards());
  const [selected, setSelected] = useState<number[]>([]);
  const isGameFinished = cards.every((c) => c.isMatched);
  const [isChecking, setIsChecking] = useState(false);
  const [showHeartCard, setShowHeartCard] = useState(false);

  const resetGame = () => {
    setCards(createCards());
    setSelected([]);
  };

  const handleClick = (id: number) => {
    if (selected.length === 2 || isChecking) return;

    const clickedCard = cards.find((c) => c.id === id);

    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, isFlipped: true } : card,
    );

    const newSelected = [...selected, id];

    setCards(updatedCards);
    setSelected(newSelected);

    // 👇 проверяем пару сразу
    if (newSelected.length === 2) {
      const [firstId, secondId] = newSelected;

      const first = updatedCards.find((c) => c.id === firstId);
      const second = updatedCards.find((c) => c.id === secondId);

      if (!first || !second) return;
      setIsChecking(true);
      if (first.photo === second.photo) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isMatched: true }
                : c,
            ),
          );
          setSelected([]);
        }, 400);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isFlipped: false }
                : c,
            ),
          );
          setSelected([]);
        }, 800);
      }
      setIsChecking(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Найди пару… как мы нашли друг друга</h1>
      <img
        src="/love/assets/heart.png"
        onClick={() => {
          setShowHeartCard(true);
          setTimeout(() => setShowHeartCard(false), 3000);
        }}
        className={styles.heartImage}
      />
      {showHeartCard && (
        <div className={styles.heartCard}>
          <p>Интересный факт:</p>
          <p>Мы вместе 321 день 💖</p>
        </div>
      )}

      <div className={styles.grid}>
        {cards.map((card, index) => {
          const pos = heartLayout[index];

          return (
            <div
              key={card.id}
              onClick={() => handleClick(card.id)}
              className={styles.card}
              style={{
                gridRow: pos.row,
                gridColumn: pos.col,
              }}
            >
              <div
                className={`${styles.inner} ${
                  card.isFlipped || card.isMatched ? styles.flipped : ""
                }`}
              >
                <div className={styles.front}>
                  <img
                    src={`/love/assets/${card.photo}`}
                    alt=""
                    className={styles.image}
                  />
                </div>

                <div className={styles.back}></div>
              </div>
            </div>
          );
        })}
      </div>
      {isGameFinished && (
        <div className={styles.winOverlay}>
          <div className={styles.winCard}>
            <h2>Люблю тебя 💖</h2>

            <button className={styles.yesButton} onClick={resetGame}>
              Пройти ещё раз
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
