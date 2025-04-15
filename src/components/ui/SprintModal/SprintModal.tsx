import { FC, useState, ChangeEvent, FormEvent } from "react";
import styles from "../Modal/Modal.module.css";
import { useSprintStore } from "../../../store";
import { ISprint } from "../../../types/ISprint";

type ISprintModal = {
  handleCloseModal: VoidFunction;
  activeSprint?: ISprint | null;
};

interface ISprintForm {
  title: string;
  startDate: string;
  closingDate: string;
}

const initialState: ISprintForm = {
  title: "",
  startDate: "",
  closingDate: "",
};

export const SprintModal: FC<ISprintModal> = ({ handleCloseModal, activeSprint }) => {
  const { createSprint, updateSprint } = useSprintStore();
  const [formValues, setFormValues] = useState<ISprintForm>(
    activeSprint 
      ? { 
          title: activeSprint.title, 
          startDate: activeSprint.startDate, 
          closingDate: activeSprint.closingDate 
        } 
      : initialState
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validar que la fecha de cierre sea posterior a la fecha de inicio
      const startDate = new Date(formValues.startDate);
      const closingDate = new Date(formValues.closingDate);
      
      if (closingDate <= startDate) {
        alert("La fecha de cierre debe ser posterior a la fecha de inicio");
        setIsSubmitting(false);
        return;
      }
      
      if (activeSprint) {
        await updateSprint({
          ...activeSprint,
          title: formValues.title,
          startDate: formValues.startDate,
          closingDate: formValues.closingDate,
        });
      } else {
        await createSprint({
          title: formValues.title,
          startDate: formValues.startDate,
          closingDate: formValues.closingDate,
          tasks: []
        });
      }
      
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar el sprint:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.containerPrincipalModal}>
      <div className={styles.contentPopUP}>
        <div className={styles.title}>
          <h3>{activeSprint ? "Editar Sprint" : "Crear Nuevo Sprint"}</h3>
        </div>

        <form onSubmit={handleSubmit} className={styles.formContent}>
          <div>
            <div className={styles.inputContainerItem}>
              <label htmlFor="title">
                Título del Sprint
              </label>
              <input
                placeholder="Ingrese un título para el sprint"
                type="text"
                required
                onChange={handleChange}
                value={formValues.title}
                autoComplete="off"
                name="title"
              />
            </div>
            
            <div className={styles.inputContainer}>
              <div className={styles.inputContainerItem}>
                <label htmlFor="startDate">
                  Fecha de inicio
                </label>
                <input
                  type="date"
                  required
                  onChange={handleChange}
                  value={formValues.startDate}
                  autoComplete="off"
                  name="startDate"
                />
              </div>
              <div className={styles.inputContainerItem}>
                <label htmlFor="closingDate">
                  Fecha de cierre
                </label>
                <input
                  type="date"
                  required
                  onChange={handleChange}
                  value={formValues.closingDate}
                  autoComplete="off"
                  name="closingDate"
                />
              </div>
            </div>
          </div>
          
          <div className={styles.buttonCard}>
            <button type="button" onClick={handleCloseModal}>Cancelar</button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting 
                ? "Guardando..." 
                : activeSprint 
                  ? "Guardar cambios" 
                  : "Crear Sprint"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 