import { useState } from "react";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import styles from "./styles.module.css"
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Loading } from "../Loading";
import { Modal } from "../../components/Modal";

export const Send = () => {
    const [modal, setModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [list, setList] = useState([]);
    const [dre, setDRE] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const addItemList = () => {
        if(dre !== "" && list.length < 5) {
            let tempL = list;
            tempL.push(dre);
            setList(tempL);
            setDRE("");
        }
    }

    const deleteItem = (index) => {
        let tempL = list.filter((item, i) => i !== index);
        setList(tempL);
    }

    const handleSendButton = async () => {
        setLoading(true);
        let errorList = []
        let i = 0;
        for(let item of list){
            try {
                let json = await api.send(item);
                deleteItem(i++);
            }
            catch(e){
                errorList.push(item)
            }
        }
        setLoading(false);

        if (errorList.length === 0) {
            setModalTitle("Planilhas enviadas");
            setModalMessage("O envio das planilhas individuais para os correspondentes alunos foi realizado com sucesso.");
        } 
        else {
            setModalTitle("Atenção");
            setModalMessage(
                <>
                  Ocorreu um erro no envio das seguintes planilhas:
                  <ul>
                    {errorList.map((item) => (
                      <li>{String(item)}</li>
                    ))}
                  </ul>
                </>
            );
        }
        setModal(true);
    }

    return(
        <div className={styles.send_page}>
            {modal && 
                <Modal 
                    title={modalTitle}
                    message={modalMessage}
                    onClick={() => setModal(false)}
                />
            }
            <Header onClick = {() => navigate(-1)}/>
            {loading ? <Loading/> :
                <div className={styles.send_content}>
                    <div className={styles.send_add}>
                        <label>
                            <input 
                            type="text" 
                            placeholder="Insira o DRE" 
                            value={dre} 
                            onChange={(e) => setDRE(e.target.value)}
                            />
                        </label>
                        <Button color="#D2C1A6" onClick={addItemList} value="adicionar"/>
                    </div>
                    <div className={styles.send_list}>
                        <label>
                            <p>LISTA DE ENVIO</p>
                            <ul>
                                {
                                    list.length > 0 && list.map((item, i) => 
                                        <li onClick={() => deleteItem(i)}>{item}</li>
                                    )
                                }
                            </ul>
                        </label>
                        <Button color="#5EDB53" value="enviar" onClick={handleSendButton}/>
                    </div>
                </div>
            }
        </div>
    );
}