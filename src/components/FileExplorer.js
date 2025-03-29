import { useEffect, useState } from "react";

const GITHUB_API_URL = "https://api.github.com/repos/VladAlvarez/wimbo/contents/";

const FileExplorer = ({ path = "", onFileSelect }) => {
    const [files, setFiles] = useState([]);
    const [expandedDirs, setExpandedDirs] = useState({}); // Track expanded folders

    useEffect(() => {
        fetch(GITHUB_API_URL + path)
            .then(res => res.json())
            .then(setFiles);
    }, [path]);

    const toggleFolder = (folder) => {
        setExpandedDirs((prev) => ({
            ...prev,
            [folder]: !prev[folder],
        }));
    };

    return (
        <div className="font-sans bg-[#161b22] text-[#c9d1d9] p-4 rounded-lg">
            <ul className="list-none">
                {files.map(file => (
                    <li key={file.path} className="mb-1">
                        {file.type === "dir" ? (
                            <div
                                className="cursor-pointer font-bold text-[#58a6ff]"
                                onClick={() => toggleFolder(file.path)}
                            >
                                {expandedDirs[file.path] ? "📂" : "📁"} {file.name}
                            </div>
                        ) : (
                            <div
                                className="cursor-pointer text-[#c9d1d9]"
                                onClick={() => onFileSelect(file.path)}
                            >
                                📄 {file.name}
                            </div>
                        )}
                        {expandedDirs[file.path] && <FileExplorer path={file.path} onFileSelect={onFileSelect} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileExplorer;
