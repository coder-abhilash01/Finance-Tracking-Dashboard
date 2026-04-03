import React from "react";
import { useSelector } from "react-redux";

const RecentTransactions = () => {

  const { transactions } = useSelector((state) => state.finance)

  const recentTransactions = [...transactions].slice(-5).reverse()

  return (
    <div className="mt-8 bg-white dark:bg-zinc-900 text-black dark:text-white  shadow rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-4">
        Recent Transactions
      </h2>

      <table className="w-full text-left">

        <thead>
          <tr className="border-b">
            <th className="py-2">Date</th>
            <th>Category</th>
            <th>Type</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>

        <tbody>

          {recentTransactions.map((t) => (
            <tr key={t.id} className="border-b">

              <td className="py-2">{t.date}</td>

              <td>{t.category}</td>

              <td
                className={
                  t.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {t.type}
              </td>

              <td className="text-right font-semibold">
                ₹ {t.amount}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}

export default RecentTransactions