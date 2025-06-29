import { useState } from "react";
import "./style.css";

export default function TabComponent() {
  const [activeTab, setActiveTab] = useState(1);
  const tabs = [
    { name: "Profile", id: 1, component: <div>Tab 1 component</div> },
    { name: "Settings", id: 2, component: <div>Tab 2 component</div> },
    { name: "Details", id: 3 },
  ];

  const handleTabClick = (id) => setActiveTab(id);

  return (
    <div>
      <h1>Tab Component </h1>
      <div className="tab-container">
        {tabs?.map((item, index) => {
          return (
            <div className="tab-component" key={item.id}>
              <button
                onClick={() => handleTabClick(item.id)}
                className={`tab-btn ${activeTab == item.id && "active"}`}
              >
                {item?.name ?? `Tab${index + 1}`}
              </button>
            </div>
          );
        })}
      </div>
      <div className="tab-content">
        {tabs.find((tab) => tab.id === activeTab)?.component ??
          "No content available"}
      </div>
    </div>
  );
}
