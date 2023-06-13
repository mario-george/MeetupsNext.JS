import { useEffect, useRef, useState } from "react";
import { Textarea as CustomTextArea } from "@material-tailwind/react";
const Textarea = (props) => {
  const { placeholder, rows, small, value: propValue, onChange } = props;
  const [value, setValue] = useState(propValue ?? "");
  console.log(props.value);
  const textareaRef = useRef(null);

  const handleChange = (event) => {
    const updatedValue = event.target.value;
    setValue(updatedValue);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;

    if (onChange && typeof onChange === "function") {
      onChange(updatedValue);
    }
    if (props.changeProp && typeof props.changeProp === "function") {
      props.changeProp();
    }
  };
  useEffect(() => {
    if (textareaRef.current && props.value !== "") {
      setValue(props.value);
    }
  }, [textareaRef.current, props.value]);
  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  return (
    <div className="w-full">
      <CustomTextArea
      variant="filled"
      label="lol"
        ref={textareaRef}
        className={`
        outline-none
        block w-full  text-lg   p-2 leading-5 font-bold resize-none border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 overflow-hidden`}
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default Textarea;
