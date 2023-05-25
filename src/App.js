import './App.css';
import {transaction} from "./data/transaction";
import {types} from "./data/types";
import {useEffect, useState} from "react";
import {useLocation, Link} from "react-router-dom"

function App() {
  const transactionTypes = types;
  const location = useLocation();
  const activeTabIndex = location.search ? location.search.slice(-1) : 0;
  const [activeType, setActiveType] = useState(transactionTypes[activeTabIndex].title);
  const [transactionsList, setTransactionsList] = useState(transaction.data);

  function addRandomAmount() {
    let newList = [];
    transactionsList.forEach(transaction => {
      transaction.amount = (Math.random() * 4000).toFixed(2);
      newList.push(transaction)
    });
    setTransactionsList(newList)
  }

  useEffect(() => {
    addRandomAmount()
  }, [])

  return (
      <div className="container mx-auto my-10">
        <div className="mx-auto max-w-fit">
          <ul className="flex mx-auto max-w-fit">
            {transactionTypes.map(type => (
                <Link key={type.id} to={`/navigator?tab=${type.id - 1}`}>
                  <li className={`px-5 py-2 border-2 border-black rounded-t-lg ${activeType === type.title ? 'bg-gray-100' : 'cursor-pointer'}`}
                      onClick={() => setActiveType(type.title)}>
                    {type.title}
                  </li>
                </Link>
            ))}
          </ul>
          <ul>
            <li className="flex justify-between px-10 py-2 border-b font-bold">
              <p>Name</p>
              <p>Amount</p>
            </li>
            {transactionsList.map(transaction => transaction.type === activeType && (
                <li key={transaction._id} className="flex justify-between px-10 py-2 border-b">
                  <p>{transaction.name.first} {transaction.name.last}</p>
                  <p>{transaction.amount}</p>
                </li>
            ))}
          </ul>
        </div>
      </div>
  );
}

export default App;
