import SprintListItem from "../SprintListItem/SprintListItem";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import "./SprintList.css";

const SprintList = () => {
  const sprints = [
    {
      sprintNumber: "Sprint 122",
      startDate: "2025-03-04",
      endDate: "2025-03-11",
    },
    {
      sprintNumber: "Sprint 121",
      startDate: "2025-02-20",
      endDate: "2025-02-27",
    },
  ];

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
        {sprints.map((sprint, index) => (
          <SprintListItem
            key={index}
            sprintNumber={sprint.sprintNumber}
            startDate={sprint.startDate}
            endDate={sprint.endDate}
          />
        ))}
      </ul>
    </div>
  );
};

export default SprintList;
