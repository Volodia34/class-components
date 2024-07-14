import { useState, useEffect } from "react";

const useSearchTerm = () => {
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    return localStorage.getItem("searchTerm") || "";
  });

  useEffect(() => {
    return () => {
      localStorage.setItem("searchTerm", searchTerm);
    };
  }, [searchTerm]);

  return [searchTerm, setSearchTerm] as const;
};

export default useSearchTerm;
