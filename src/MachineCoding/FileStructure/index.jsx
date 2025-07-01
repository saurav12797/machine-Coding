import "./style.css";
import { data } from "./json";
import { useState } from "react";

const FileStructure = () => {
  // State to store the file structure data
  const [itemData, setItemData] = useState(data);

  // State to track which folders are expanded
  const [isExpanded, setIsExpanded] = useState({});

  // Toggle expand/collapse for folders
  const handleExpandCollapse = (node) => {
    setIsExpanded((prev) => ({
      ...prev,
      [node.name]: !prev[node.name],
    }));
  };

  // Recursive component to render folders and files
  const ListContent = ({ data, addNodeToList, deleteNodeFromList }) => {
    return (
      <div className="list-content">
        {data?.map((node) => (
          <div className="list-container" key={node.id}>
            <div className="list-heading">
              {/* Show expand/collapse button for folders */}
              {node.isFolder && (
                <span
                  className="expand-collapse"
                  onClick={() => handleExpandCollapse(node)}
                >
                  {isExpanded[node.name] ? "-" : "+"}
                </span>
              )}

              {/* Node name */}
              {node.name}

              {/* Add button for folders */}
              {node.isFolder && (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1091/1091916.png"
                  width={23}
                  height={20}
                  onClick={() => addNodeToList(node.id)}
                />
              )}

              {/* Delete button for all nodes */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                width={23}
                height={20}
                onClick={() => deleteNodeFromList(node.id)}
              />
            </div>

            {/* Render children if expanded */}
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

  // Function to add a new node to a folder
  const addNodeToList = (nodeId) => {
    const name = prompt("Enter folder name");

    // Recursively update the structure
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

        // Recurse if there are children
        return {
          ...node,
          children: updateNode(node.children),
        };
      });
    };

    // Update the state with the new structure
    setItemData((prev) => updateNode(prev));
  };

  // Function to delete a node by ID
  const deleteNodeFromList = (nodeId) => {
    const deleteNode = (list) => {
      return list
        ?.filter((node) => node.id !== nodeId) // Remove target node
        .map((node) => ({
          ...node,
          children: deleteNode(node.children), // Recurse into children
        }));
    };

    // Update state after deletion
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
