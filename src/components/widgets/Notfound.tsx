interface NotfoundProps {
  text?: string
}
const Notfound = ({ text }: NotfoundProps) => {
  return (
    <div className="flex flex-col items-center text-gray-500 mt-8">
      <svg width="150" height="250" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" fill="#f3f4f6" />
          <path d="M9 10h6M9 14h3" />
          <path d="M15.5 15.5L20 20" stroke="#f87171" />
          <line x1="12" y1="3" x2="12" y2="21" opacity="0.1" />
        </g>
        <text x="50%" y="110%" dominantBaseline="middle" textAnchor="middle" fill="#999" fontSize="4">{text || "No Data"}</text>
      </svg>
    </div>
  )
}

export default Notfound