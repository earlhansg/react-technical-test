import type { AccountData } from "../../types";
import { AiOutlineDown } from "react-icons/ai";

const AdWordsIcon = () => (
  <svg
    className="w-4 h-4"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 250.8 250.8"
  >
    <path
      d="M85.9 28.6c2.4-6.3 5.7-12.1 10.6-16.8 19.6-19.1 52-14.3 65.3 9.7 10 18.2 20.6 36 30.9 54 17.2 29.9 34.6 59.8 51.6 89.8 14.3 25.1-1.2 56.8-29.6 61.1-17.4 2.6-33.7-5.4-42.7-21-15.1-26.3-30.3-52.6-45.4-78.8-.3-.6-.7-1.1-1.1-1.6-1.6-1.3-2.3-3.2-3.3-4.9-6.7-11.8-13.6-23.5-20.3-35.2-4.3-7.6-8.8-15.1-13.1-22.7-3.9-6.8-5.7-14.2-5.5-22 .3-4 .8-8 2.6-11.6"
      fill="#3c8bd9"
    />
    <path
      d="M85.9 28.6c-.9 3.6-1.7 7.2-1.9 11-.3 8.4 1.8 16.2 6 23.5C101 82 112 101 122.9 120c1 1.7 1.8 3.4 2.8 5-6 10.4-12 20.7-18.1 31.1-8.4 14.5-16.8 29.1-25.3 43.6-.4 0-.5-.2-.6-.5-.1-.8.2-1.5.4-2.3 4.1-15.7-28.3-9.6-39.7-6.3-6.9-14.3-10.8-23.5-12.1-12-1.7-22.6 1.4-32.1 8.9-1.7 1.3-2.8 3.2-4.8 4.2-.4 0-.6-.2-.7-.5 4.8-8.3 9.5-16.6 14.3-24.9C45.5 98.4 65.3 64 85.2 29.7c.2-.4.5-.7.7-1.1"
      fill="#fabc04"
    />
    <path
      d="M11.8 158c1.9-1.7 3.7-3.5 5.7-5.1 24.3-19.2 60.8-5.3 66.1 25.1 1.3 7.3.6 14.3-1.6 21.3-.1.6-.2 1.1-.4 1.7-.9 1.6-1.7 3.3-2.7 4.9-8.9 14.7-22 22-39.2 20.9C20 225.4 4.5 210.6 1.8 191c-1.3-9.5.6-18.4 5.5-26.6 1-1.8 2.2-3.4 3.3-5.2.5-.4.3-1.2 1.2-1.2"
      fill="#34a852"
    />
  </svg>
);

const AccountsTable: React.FC<{ accounts: AccountData[] }> = ({ accounts }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 p-6 pb-4">
        Accounts requiring attention
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Insights
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Wasted spend
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Spend
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Conv.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CPA
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ROAS
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {accounts.map((account, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <AdWordsIcon />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {account.name}
                      </div>
                    </div>
                    <div className="ml-2 px-2 py-1 text-xs bg-[#ECF5F7] text-[#418D8E] rounded">
                      {account.insights}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {account.wastedSpend}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {account.spend}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {account.conv}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {account.cpa}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {account.roas}
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                  <button className="text-sm text-[#418D8E]">
                    Actions
                  </button>
                  <AiOutlineDown className="text-[#418D8E] mt-1" size={11}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountsTable;
