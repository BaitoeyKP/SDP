import React from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
const FileUpload = () => {

  return (
    <div
      className={classNames({
        "w-full h-96": true,
        "p-4 grid place-content-center cursor-pointer": true,
        "bg-violet-50 text-violet-500 rounded-lg hover:bg-violet-100": true,
        "border-4 border-dashed border-violet-100 hover:border-violet-500":
          true,
        "transition-colors": true,
      })}
    >
      <div className="flex flex-col items-center">
        <CloudArrowUpIcon className="w-2 h-2" />
        <span>
          <span>Choose a File</span> or Drag it here
        </span>
        <input type="file" hidden />
      </div>
    </div>
  );
};

export default FileUpload;
