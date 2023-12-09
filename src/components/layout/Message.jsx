import styles from './Message.module.css';

import { useState, useEffect } from 'react';

export default function Message({ type, text }) {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!text) {
            setVisible(false);
            return;
        }
        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000);

        return () => clearTimeout(timer); 
    }, [text]);

    return (
        <>
            {visible && (
                <div className={`${styles.message} ${styles[type]}`}>
                    {text}
                </div>
            )}
        </>
    );
};