import { useState } from "react";
import { accordionData } from "./json";
import "./style.css";

const Accordion = () => {
  const [data, setData] = useState(accordionData);
  const [selectedData, setSelectedData] = useState(null);

  const handleExpandShow = (id) => {
    setSelectedData((prev) => (prev === id ? null : id));
  };

  const AccordionList = ({ data }) => {
    return (
      <div className="accordion-list">
        {data?.map((item) => (
          <div key={item.id}>
            <div className="accordion-heading">
              <div>{item.title}</div>
              <div onClick={() => handleExpandShow(item.id)}>
                {selectedData === item.id ? "Collapse" : "Expand"}
              </div>
            </div>
            {selectedData === item.id && (
              <div className="accordion-content">
                {item?.content || "No Content available to Display"}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>Accordion</h1>
      <AccordionList data={data} />
    </div>
  );
};

export default Accordion;
