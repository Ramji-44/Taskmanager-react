import styles from "./Modal.module.css"

export default function DeleteModal({name, onCancel, onConfirm}) {
    return (
        <div className={styles.overlay}>
            <div className={styles.confirmBox}>
                <p>"This action will permanently delete this task"</p>

                <div className={styles.deleteText}>
                    <span>Are you sure want to delete </span>
                    <h4>{name} ?</h4>
                </div>

                <div className={styles.modalBtns}>
                    <button onClick={onCancel} className={styles.cancelBtn} >Cancel</button>
                    <button onClick={onConfirm} className={styles.deleteBtn} >Delete</button>
                </div>
            </div>
        </div>
    )
}