import { DeleteTask } from "./DeleteTask";
import { UpdateTaskButton } from "./UpdateTaskButton";
import styles from "./TaskItem.module.css";

export const TaskItem = (props) => {
  return (
    <div className={styles.taskItem}>
      <div className={styles.nameNotes}>
        <h3>{props.taskTitle}</h3>
        <p>{props.notes}</p>
      </div>
      <div className={styles.dueDate}>
        <h6>Due date</h6>
        <span>{props.dueDate}</span>
      </div>
      <div className={styles.updateDelete}>
        <UpdateTaskButton id={props.id.toString()}
          taskTitle={props.taskTitle}
          notes={props.notes}
          dueDate={props.expiryDate}
          reminder={props.reminder} />
        <DeleteTask taskId={props.id} onDelete={props.onDelete} />
      </div>
    </div>
  );
};
