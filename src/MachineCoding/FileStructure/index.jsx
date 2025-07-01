import "./style.css";
import { data } from "./json";
import { useState } from "react";
const FileStructure = () => {
  const [itemData, setItemData] = useState(data);
  const [isExpanded, setIsExpanded] = useState({});

  const handleExpandCollapse = (node) => {
    setIsExpanded((prev) => ({
      ...prev,
      [node.name]: !prev[node.name],
    }));
  };

  const ListContent = ({ data, addNodeToList, deleteNodeFromList }) => {
    return (
      <div className="list-content">
        {data?.map((node) => (
          <div className="list-container" key={node.id}>
            <div className="list-heading">
              {node.isFolder && (
                <span
                  className="expand-collapse"
                  onClick={() => handleExpandCollapse(node)}
                >
                  {isExpanded[node.name] ? "-" : "+"}
                </span>
              )}
              {node.name}
              {node.isFolder && (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1091/1091916.png"
                  width={23}
                  height={20}
                  onClick={() => addNodeToList(node.id)}
                />
              )}
              <img
                src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                width={23}
                height={20}
                onClick={() => deleteNodeFromList(node.id)}
              />
            </div>
            {node.children && isExpanded[node.name] && (
              <ListContent
                data={node.children}
                addNodeToList={addNodeToList}
                deleteNodeFromList={deleteNodeFromList}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const addNodeToList = (nodeId) => {
    const name = prompt("Enter folder name");
    const updateNode = (list) => {
      return list?.map((node) => {
        if (node.id == nodeId) {
          return {
            ...node,
            children: [
              ...(node.children || []),
              { name: name, id: Date.now(), isFolder: false },
            ],
          };
        }
        // if it has more children
        return {
          ...node,
          children: updateNode(node.children),
        };
      });
    };

    setItemData((prev) => updateNode(prev));
  };

  const deleteNodeFromList = (nodeId) => {
    const deleteNode = (list) => {
      return list
        ?.filter((node) => node.id !== nodeId) // Remove the matching node
        .map((node) => ({
          ...node,
          children: deleteNode(node.children), // Recurse into children
        }));
    };

    setItemData((prev) => deleteNode(prev));
  };

  return (
    <div>
      <h1>File Structure</h1>
      <div className="file-structure">
        <ListContent
          data={itemData}
          addNodeToList={addNodeToList}
          deleteNodeFromList={deleteNodeFromList}
        />
      </div>
    </div>
  );
};

export default FileStructure;
