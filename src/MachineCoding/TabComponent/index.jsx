import { useState } from "react";
import "./style.css";

export default function TabComponent() {
  const [activeTab, setActiveTab] = useState(1);
  const tabs = [
    { name: "Tab1", id: 1, component: <div>Tab 1 component</div> },
    { name: "Tab2", id: 2, component: <div>Tab 2 component</div> },
    { name: "Tab3", id: 3, component: <div>Tab 3 component</div> },
  ];

  const handleTabClick = (id) => setActiveTab(id);

  return (
    <div>
      <h1>Tab Component </h1>
      <div className="tab-container">
        {tabs?.map((item) => {
          return (
            <div className="tab-component" key={item.id}>
              <button
                onClick={() => handleTabClick(item.id)}
                className={`tab-btn ${activeTab == item.id && "active"}`}
              >
                {item?.name}
              </button>
            </div>
          );
        })}
      </div>
      <div className="tab-content">
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </div>
    </div>
  );
}
