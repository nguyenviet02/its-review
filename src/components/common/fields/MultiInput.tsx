import React from "react";

const MultiInput = () => {
  const [data, setData] = React.useState([{ value: "" }]);
  console.log("☠️ ~ MultiInput ~ data:", data);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newData = data.map((item, i) => {
      if (i === index) {
        return { value: e.target.value };
      }
      return item;
    });
    setData(newData);
  };
  const addMore = () => {
    setData([...data, { value: "" }]);
  };
  const remove = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };
  return (
    <div className="flex flex-col gap-1">
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className="flex gap-2 overflow-hidden rounded border border-gray-300 px-4 py-2"
          >
            <input
              className="flex-1 border-none outline-none"
              placeholder="Điền vào chỗ trống"
              type="text"
              value={item.value}
              onChange={(e) => handleChange(e, index)}
            />
            <button className="w-fit shrink-0" onClick={addMore}>
              Add
            </button>
            <button className="w-fit shrink-0" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default MultiInput;
