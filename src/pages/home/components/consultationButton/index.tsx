interface props {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}

export function ConsultationButton({ isExpanded, setIsExpanded }: props) {
  <div
    className={`fixed bottom-4 right-4 z-50 flex items-center gap-x-4 bg-white shadow-lg rounded-lg transition-all duration-300 ${
      isExpanded ? "w-80 p-4" : "w-auto p-1"
    } cursor-pointer`}
    onClick={() => setIsExpanded(!isExpanded)}
  >
    <img src="/store-chat-specialist-icon.png" alt="_" />
    {isExpanded && (
      <div>
        <p className="text-slate-500">نیاز به مشاوره دارید؟</p>
        <p className="text-sm text-blue-500">به متخصص وصل شو🔹</p>
      </div>
    )}
  </div>;
}
