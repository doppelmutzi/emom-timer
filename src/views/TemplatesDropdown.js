import React, { useEffect, useState, useContext } from "react";

import { HorizontalContainer } from "../Layout";
import SettingsContext from "../SettingsContext";
import Button from "../components/Button";

const TemplatesDropdown = () => {
  const [templateKey, setTemplateKey] = useState();
  const [templates, setTemplates] = useState(new Map());
  const { dispatch } = useContext(SettingsContext);

  useEffect(() => {
    const tpl = new Map();
    let index = null;
    for (let i = 0; i < localStorage.length; i++) {
      const value = localStorage.key(i);
      if (value.startsWith("emom_")) {
        if (index == null) {
          index = i;
          setTemplateKey(value.substr("emom_".length));
        }
        tpl.set(
          value.substr("emom_".length),
          localStorage.getItem(localStorage.key(i))
        );
      }
    }
    setTemplates(tpl);
  }, []);
  if (Array.from(templates.keys()).length === 0) return null;
  return (
    <HorizontalContainer>
      <select
        value={templateKey}
        onChange={(evt) => {
          const key = evt.target.value;
          setTemplateKey(key);
        }}
      >
        {Array.from(templates.keys()).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <Button
        onClick={() => {
          const templateStringified = templates.get(templateKey);
          dispatch({
            type: "LOAD_TEMPLATE",
            template: JSON.parse(templateStringified),
          });
        }}
      >
        load template
      </Button>
    </HorizontalContainer>
  );
};

export default React.memo(TemplatesDropdown);
