import { useRef, useEffect, useState } from "react";
import styles from "./main-screen.module.css";
import { Link } from "react-router-dom";

type Heart = {
  id: number;
  left: number;
  duration: number;
  size: number;
  delay: number;
};

export default function MainScreen() {
  const noBtnRef = useRef<HTMLButtonElement | null>(null);
  const [hearts, setHearts] = useState<Heart[]>([]);

  const spawnHearts = () => {
    const newHearts = Array.from({ length: 120 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      duration: 4 + Math.random() * 3,
      size: 20 + Math.random() * 40,
      delay: Math.random() * 3,
    }));

    setHearts((prev) => [...prev, ...newHearts]);
  };

  useEffect(() => {
    const handleMouseMove = (e: unknown) => {
      const btn = noBtnRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();

      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const distanceX = e.clientX - btnCenterX;
      const distanceY = e.clientY - btnCenterY;

      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < 150) {
        const moveX = -distanceX * 0.9;
        const moveY = -distanceY * 0.9;

        btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
      } else {
        btn.style.transform = `translate(0px, 0px)`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.container}>
      <img src="/assets/we.png" className={styles.weImage} />
      {hearts.map((heart) => (
        <img
          key={heart.id}
          src="/assets/heart.png"
          className={styles.flyingHeart}
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            width: `${heart.size}px`,
          }}
        />
      ))}

      <div className={styles.modal}>
        <img
          src="/assets/heart.png"
          onClick={spawnHearts}
          className={styles.heartImage}
        />
        <h1 className={styles.header}>Будешь моей валентинкой?</h1>
        <div className={styles.buttons}>
          <Link to="/yes">
            <button className={styles.yesButton}>Да</button>
          </Link>

          <Link to="/no">
            <button
              ref={noBtnRef}
              className={styles.noButton}
            >
              Нет
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
