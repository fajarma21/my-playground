import { useCallback } from 'react';
import styles from './View.module.css';
import type { MessageProps } from './View.types';

const Message = ({ messages }: MessageProps) => {
  const bottomLine = useCallback(
    (node: HTMLParagraphElement) => {
      if (node && messages.length) node.scrollIntoView();
    },
    [messages.length]
  );

  return (
    <div className={styles.messageContainer}>
      <div className={styles.messages}>
        {messages.map((item, index) => (
          <p key={`msg-${index}`}>{item}</p>
        ))}
        <p ref={bottomLine} className={styles.tick}>
          <b>|</b>
        </p>
      </div>
    </div>
  );
};

export default Message;
