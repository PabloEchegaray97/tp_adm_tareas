import "./MainContent.css";
import { ScreenBacklog } from "../ScreenBacklog/ScreenBacklog";
// import { ScreenSprint } from "./ScreenSprint";
const MainContent = () => {
  return (
    <main className="main-content">
      <ScreenBacklog />
      {/* <ScreenSprint /> */}
    </main>
  );
};

export default MainContent;
