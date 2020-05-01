import React, { useEffect, useState, useContext } from "react";
import { HorizontalContainer } from "./Layout";
import SettingsContext from "./SettingsContext";

const TemplatesDropdown = () => {
  const [templateKey, setTemplateKey] = useState();
  const [templates, setTemplates] = useState(new Map());
  const { dispatch } = useContext(SettingsContext);

  useEffect(() => {
    const tpl = new Map();
    for (let i = 0; i < localStorage.length; i++) {
      if (i === 0) {
        setTemplateKey(localStorage.key(i));
      }
      tpl.set(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
    }
    setTemplates(tpl);
  }, []);

  return (
    <HorizontalContainer>
      <select
        value={templateKey}
        onClick={evt => {
          const key = evt.target.value;
          setTemplateKey(key);
        }}
      >
        {Array.from(templates.keys()).map(key => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          const templateStringified = templates.get(templateKey);
          dispatch({
            type: "LOAD_TEMPLATE",
            template: JSON.parse(templateStringified)
          });
        }}
      >
        load template
      </button>
    </HorizontalContainer>
  );
};

TemplatesDropdown.propTypes = {};

export default TemplatesDropdown;
