import { useState } from "react";

const Sample = () => {
  const [data, setData] = useState<string[]>([
    "apple",
    "mongo",
    "banna ",
    "orange",
  ]);
  const [filterData, setFilterData] = useState<string[]>([]);

  const handleAdd = (e: string) => {
    setFilterData((el) => [...el, e]);
    setData((da) => da.filter((i) => i !== e));
  };

  const handleRemove = (e: string) => {
    setFilterData((val) => val.filter((i) => i !== e));
    setData((val) => [...val, e]);
  };

  return (
    <>
      <div className="grid grid-cols-1">
        <div className="flex flex-col gap-[15px] bg-blue-400">
          {data?.map((e, i) => (
            <>
              <span onClick={() => handleAdd(e)} key={i}>
                {e}
              </span>
            </>
          ))}
        </div>
        <div className="flex flex-col gap-[15px] bg-blue-200">
          {filterData?.map((e, i) => (
            <>
              <span className="flex gap-[10px]" key={i}>
                {e}

                <button onClick={() => handleRemove(e)}>Remove</button>
              </span>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sample;
