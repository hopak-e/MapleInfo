interface PresetButtonProps {
  num: number;
  isSelected: boolean;
  onClick: () => void;
}

const PresetButton = ({ num, isSelected, onClick }: PresetButtonProps) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      className={` px-2 py-1 text-xs rounded-full ${
        isSelected ? "bg-dark-50" : "bg-dark-150"
      }`}
      onClick={handleClick}
    >
      프리셋 {num}
    </button>
  );
};

export default PresetButton;
