import CodeViewer from "../components/CodeViewer";
import FileExplorer from "../components/FileExplorer";
import { useState } from "react";

const SourceCode = () => {

  const [selectedFile, setSelectedFile] = useState("");

    return (
      <div className="-mx-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Source Code</h1>
          <p>Explore the source code and its structure in this section.</p>
        </div>
        <div className="flex gap-8 p-6 bg-[#0d1117] rounded-lg">
          <FileExplorer onFileSelect={setSelectedFile} />
          {selectedFile && <CodeViewer filePath={selectedFile} />}
        </div>
      </div>
    );
  };
  
  export default SourceCode;
  