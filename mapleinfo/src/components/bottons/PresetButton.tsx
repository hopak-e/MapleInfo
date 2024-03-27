interface PresetButtonProps {
  num: number;
}

const PresetButton = ({ num }: PresetButtonProps) => {
  return (
    <button className="bg-dark-150 px-2 py-1 text-sm rounded-full">
      프리셋 {num}
    </button>
  );
};

export default PresetButton;
