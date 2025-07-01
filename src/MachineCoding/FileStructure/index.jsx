import "./style.css";
import { data } from "./json";
import { useState } from "react";
const FileStructure = () => {
  const [isExpanded, setIsExpanded] = useState({});

  const handleExpandCollapse = (node) => {
    setIsExpanded((prev) => ({
      ...prev,
      [node.name]: !prev[node.name],
    }));
  };

   const ListContent = ({ data }) => {
    return (
      <div className="list-content">
        {data?.map((node) => (
          <div className="list-container" key={node.id}>
            <p>
              {node.isFolder && (
                <span
                  className="expand-collapse"
                  onClick={() => handleExpandCollapse(node)}
                >
                  +
                </span>
              )}
              {node.name}
            </p>
            {node.children && isExpanded[node.name] && (
              <ListContent data={node.children} />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>File Structure</h1>
      <div className="file-structure">
        <ListContent data={data} />
      </div>
    </div>
  );
};

export default FileStructure;
