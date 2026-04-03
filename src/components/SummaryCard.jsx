const SummaryCard = ({ title, value }) => {
  return (
    <div className="bg-zinc-100 dark:bg-white text-black dark:text-black  shadow shadow-black/30 rounded-xl p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl font-bold">₹ {value}</p>
    </div>
  )
}

export default SummaryCard