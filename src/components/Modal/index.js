import { useState } from 'react';
import styles from './styles.module.css'
import { Button } from '../Button';

export const Modal = (props) => {

    return (
        <div className = {styles.modal_background}>
            <div className={styles.modal}>
                <div className={styles.modal_content}>
                    <h1>{props.title}</h1>
                    <p>{props.message}</p>
                </div>
                <div className={styles.modal_buttonSpace}>
                    <Button 
                        className={styles.modal_button} 
                        value = "fechar" 
                        color = "#F55858"
                        onClick = {props.onClick}
                    />
                </div>
            </div>
        </div>
    );
}