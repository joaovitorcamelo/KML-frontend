import { useEffect, useState } from 'react';
import styles from './styles.module.css'

export const Loading = () => {
    const [text, setText] = useState('Carregando');

    useEffect(() => {
        const interval = setInterval(() => {
            if(text === "Carregando") setText("Carregando.");
            else if(text === "Carregando.") setText("Carregando..");
            else if(text === "Carregando..") setText("Carregando...");
            else setText("Carregando");
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, [text]);

    return(
        <div className={styles.loading}>
            <p>{text}</p>
        </div>
    );
}