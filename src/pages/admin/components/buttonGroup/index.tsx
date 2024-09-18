type ButtonGroupProps = {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
};

export function ButtonGroup({ options, selected, onSelect }: ButtonGroupProps) {
  return (
    <div className="inline-flex rounded-lg shadow-sm" role="group" dir="rtl">
      {options.map((option, index) => (
        <button
          key={option}
          type="button"
          className={`px-8 py-2 border border-gray-500 text-lg font-semibold transition-colors duration-150 focus:outline-none ${
            selected === option
              ? "bg-blue-600 text-white"
              : "bg-[#fafdff0e] text-gray-400 hover:bg-gray-200"
          } ${index === 0 ? "rounded-r-lg" : ""} ${
            index === options.length - 1 ? "rounded-l-lg" : ""
          }`}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
