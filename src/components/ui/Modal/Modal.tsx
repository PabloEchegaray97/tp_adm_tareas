import { FC, useState, ChangeEvent, FormEvent } from "react";
import styles from "./Modal.module.css";
import { useTaskStore, useSprintStore } from "../../../store";

type IModal = {
  handleCloseModal: VoidFunction;
  sprintId?: string;
};

interface ITaskForm {
  title: string;
  description: string;
  deadline: string;
}

const initialState: ITaskForm = {
  title: "",
  description: "",
  deadline: "",
};

export const Modal: FC<IModal> = ({ handleCloseModal, sprintId }) => {
  const { activeTask, setActiveTask, createTask, updateTask: updateBacklogTask } = useTaskStore();
  const { addTask, updateTask: updateSprintTask } = useSprintStore();
  const [formValues, setFormValues] = useState<ITaskForm>(
    activeTask 
      ? { 
          title: activeTask.title, 
          description: activeTask.description, 
          deadline: activeTask.deadline || "" 
        } 
      : initialState
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Si estamos editando una tarea existente
      if (activeTask) {
        // Si estamos editando una tarea dentro de un sprint
        if (sprintId) {
          await updateSprintTask(sprintId, activeTask.id, {
            title: formValues.title,
            description: formValues.description,
            deadline: formValues.deadline
          });
        } else {
          // Si estamos editando una tarea del backlog
          await updateBacklogTask({
            ...activeTask,
            title: formValues.title,
            description: formValues.description,
            deadline: formValues.deadline,
          });
        }
      } 
      // Si estamos creando una tarea en un sprint específico
      else if (sprintId) {
        await addTask(sprintId, {
          title: formValues.title,
          description: formValues.description,
          deadline: formValues.deadline,
        });
      } 
      // Si estamos creando una tarea en el backlog
      else {
        await createTask({
          title: formValues.title,
          description: formValues.description,
          deadline: formValues.deadline,
          status: 'pending'
        });
      }
      
      setActiveTask(null);
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.containerPrincipalModal}>
      <div className={styles.contentPopUP}>
        <div className={styles.title}>
          <h3>{activeTask ? "Editar tarea" : sprintId ? "Crear Tarea en Sprint" : "Crear Tarea en Backlog"}</h3>
        </div>

        <form onSubmit={handleSubmit} className={styles.formContent}>
          <div>
            <div className={styles.inputContainer}>
              <div className={styles.inputContainerItem}>
                <label htmlFor="title">
                  Título de la tarea
                </label>
                <input
                  placeholder="Ingrese un Titulo"
                  type="text"
                  required
                  onChange={handleChange}
                  value={formValues.title}
                  autoComplete="off"
                  name="title"
                />
              </div>
              <div className={styles.inputContainerItem}>
                <label htmlFor="deadline">
                  Seleccione una fecha
                </label>
                <input
                  type="date"
                  required
                  onChange={handleChange}
                  value={formValues.deadline}
                  autoComplete="off"
                  name="deadline"
                />
              </div>
            </div>
            <label htmlFor="description">
              Descripción de la tarea
            </label>
            <textarea
              placeholder="Ingrese una descripción"
              required
              onChange={handleChange}
              value={formValues.description}
              name="description"
              id=""
              className={styles.textArea}
              cols={30}
            ></textarea>

          </div>
          <div className={styles.buttonCard}>
            <button type="button" onClick={handleCloseModal}>Cancelar</button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting 
                ? "Guardando..." 
                : activeTask 
                  ? "Guardar cambios" 
                  : "Crear Tarea"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
