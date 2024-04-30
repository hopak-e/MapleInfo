import { useEffect } from "react";

const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  setIsState: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsState(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, setIsState]);
};

export default useOutsideClick;
