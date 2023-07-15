import styles from './styles.module.css'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { useState } from 'react'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../Loading'
import { Modal } from '../../components/Modal'

export const Login = () => {
    const [loading, setLoading] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [modal, setModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("Login efetuado");
    const [modalMessage, setModalMessage] = useState("Seja bem-vindo! Seu login foi efetuado com sucesso.");
    const [errorLogin, setErrorLogin] = useState(false);

    const navigate = useNavigate();

    const handleCloseModal = () => {
        if(!errorLogin) navigate(`/main/${emailInput}`);
        else setModal(false);
    }

    const handleLoginButton = async (e) => {
        setLoading(true);
        setErrorLogin(false);
        try {
            let json = await api.login(emailInput);
            setLoading(false);
            setModalTitle("Login efetuado");
            setModalMessage("Seja bem-vindo! Seu login foi efetuado com sucesso.");
            setModal(true);
        }
        catch(e){
            setLoading(false);
            setModalTitle("Atenção")
            setModalMessage(`O login não foi realizado corretamente. Tente mais uma vez.`);
            setErrorLogin(true);
            setModal(true);
        }
    }

    return(
        <div className={styles.login_page}>
            {modal && 
                <Modal 
                    title = {modalTitle}
                    message = {modalMessage}
                    onClick = {handleCloseModal}
                />
            }
            <Header/>
            {loading ? <Loading/> :
                <form className={styles.login_content} onSubmit={handleLoginButton}>
                    <label>
                        <input 
                            type="email" 
                            placeholder="Email da conta do Google" 
                            required = {true}
                            autoFocus
                            autoComplete='on'
                            value = {emailInput}
                            onChange = {(e) => setEmailInput(e.target.value)}
                        />
                    </label>
                    <Button 
                        className = {styles.login_button} 
                        color="#D2C1A6" 
                        value="login"
                        type = "submit"
                    />
                </form>
            }
        </div>
    )
}