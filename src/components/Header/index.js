import styles from './styles.module.css'


export const Header = (props) => {
    return (
        <div className={styles.header}>
            <h1 className = {styles.header_title} onClick={props.onClick}>KML</h1>
        </div>
    )
}

Header.defaultProps = {
    onClick: (e) => {}
}