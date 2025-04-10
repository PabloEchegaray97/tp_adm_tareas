import { useState, useEffect } from "react";
import SprintListItem from "../SprintListItem/SprintListItem";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import "./SprintList.css";
import { getAllSprints } from "../../../http/sprint";
import { ISprint } from "../../../types/ISprint";

const SprintList = () => {
  const [sprints, setSprints] = useState<ISprint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSprints = async () => {
      try {
        const sprintsData = await getAllSprints();
        setSprints(sprintsData);
      } catch (error) {
        console.error("Error al cargar los sprints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSprints();
  }, []);

  return (
    <div className="sprint-list">
      <div className="sprint-list-header">
        <div className="sprint-list-title-container">
          <h2 className="sprint-list-title">Lista de Sprints</h2>
          <button className="sprint-list-add-button">
            <PlaylistAddIcon />
          </button>
        </div>
      </div>

      <ul className="sprint-list-items">
        {loading ? (
          <li className="sprint-list-loading">Cargando...</li>
        ) : sprints.length > 0 ? (
          sprints.map((sprint) => (
            <SprintListItem
              key={sprint.id}
              sprintId={sprint.id}
              sprintNumber={sprint.title}
              startDate={sprint.startDate}
              endDate={sprint.closingDate}
            />
          ))
        ) : (
          <li className="sprint-list-empty">No hay sprints disponibles</li>
        )}
      </ul>
    </div>
  );
};

export default SprintList;
