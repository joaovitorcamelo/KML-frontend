import styles from "./styles.module.css"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"
import { useState } from "react"
import { api } from '../../services/api'
import { useNavigate, useParams } from "react-router-dom"
import { Loading } from "../Loading"
import { Modal } from "../../components/Modal"

export const Main = (props) => {
    const [modal, setModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    const handleCreateButton = async () => {
        setLoading(true);
        try {
            let json = await api.create(params.email);
            setModalTitle("Atualização Completa");
            setModalMessage("A atualização das planilhas individuais foi efetuada com sucesso.")
            setModal(true);
        }
        catch (e) {
            setModalTitle("Atenção");
            setModalMessage("Ocorreu um erro na atualização. Tente novamente.")
            setModal(true);
        }
        setLoading(false);
    }

    const handleSendButton = async () => {
        setLoading(true);
        try {
            let json = await api.send("all", params.email);
            setModalTitle("Planilhas enviadas");
            setModalMessage("O envio das planilhas individuais para os correspondentes alunos foi realizado com sucesso.")
            setModal(true);
        }
        catch (e) {
            setModalTitle("Atenção");
            setModalMessage("Ocorreu um erro no envio. Tente novamente.")
            setModal(true);
        }
        setLoading(false);
    }

    const handleDeleteButton = async () => {
        setLoading(true);
        try {
            let json = await api.delete("all", params.email);
            setModalTitle("Planilhas deletadas");
            setModalMessage("As planilhas individuais foram corretamente deletadas.")
            setModal(true);
        }
        catch (e) {
            setModalTitle("Atenção");
            setModalMessage("Ocorreu um erro ao deletar as planilhas. Tente novamente.")
            setModal(true);
        }
        setLoading(false);
    }

    return (
        <div className={styles.main_page}>
            {modal && 
                <Modal 
                    title={modalTitle}
                    message={modalMessage}
                    onClick={() => setModal(false)}
                />
            }
            <Header />
            {loading ? <Loading/> : 
                <div className={styles.main_buttonList}>
                    <Button value="atualizar planilhas" color="#F9DF59" onClick={handleCreateButton} />
                    <Button 
                        value="enviar selecionados" 
                        color="#A3FFA1"
                        onClick={() => navigate(`../send/${params.email}`)}
                    />
                    <Button value="enviar todos" color="#5EDB53" onClick={handleSendButton} />
                    <Button 
                        value="remover alunos" 
                        color="#FDA1A1" 
                        onClick={() => navigate(`../delete/${params.email}`)}
                    />
                    <Button value="deletar planilhas" color="#F55858" onClick={handleDeleteButton} />
                </div>
            }
        </div>
    )
}