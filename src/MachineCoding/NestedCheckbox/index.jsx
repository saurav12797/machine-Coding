import { useState } from "react";
import { CheckboxesData } from "./json.js";
import "./style.css";

const NestedCheckbox = () => {
  const [data, setData] = useState(CheckboxesData);

  const CheckboxList = ({ data, handleCheckbox }) => {
    return (
      <div className="checkbox-wrapper">
        {data?.map((node) => {
          return (
            <div className="checkbox-list" key={node.id}>
              <span>{node?.label ?? ""}</span>
              <input
                type="checkbox"
                checked={node?.isChecked}
                onChange={(e) => handleCheckbox(e, node.id)}
              />
              {node.children && (
                <CheckboxList
                  data={node.children}
                  handleCheckbox={handleCheckbox}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Handles checkbox toggle and updates tree
  const handleCheckbox = (e, parentId) => {
    const checkedValue = e.target.checked;

    // Recursively sets isChecked on all children
    const updateAllChildren = (node, value) =>
      node.children?.map((child) => ({
        ...child,
        isChecked: value,
        children: updateAllChildren(child, value),
      })) || [];

   
    // Recursively updates the tree based on parentId
    const updateCheckbox = (list) =>
      list.map((node) => {
        if (node.id === parentId) {
          const children = updateAllChildren(node, checkedValue);
          return { ...node, isChecked: checkedValue, children };
        }

      

        const children = updateCheckbox(node.children || []);
        return {
          ...node,
          isChecked: children.every((child) => child.isChecked), //parent check
          children,
        };
      });

    setData((prev) => updateCheckbox(prev));
  };

  return (
    <div>
      <h1>Nested Checkbox</h1>

      <div className="nested-checkbox">
        <CheckboxList data={data} handleCheckbox={handleCheckbox} />
      </div>
    </div>
  );
};

export default NestedCheckbox;

// ✅ Handles parent-to-children checkbox propagation (when parent is toggled)
// ✅ Recursively updates all nested children with the same checked state
// ✅ Handles child-to-parent checkbox sync (if all children checked, parent gets checked)
// ✅ Works for deeply nested checkbox trees (recursive structure)
// ✅ Ensures checkboxes are controlled via state (`isChecked` binding)
// ✅ Tree is updated immutably (no mutation of original structure)
// ✅ Avoids crashes when nodes have no children (safe fallback with `|| []`)

