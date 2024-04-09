import "./App.css";
import { useEffect, useState } from "react";
import Dropdown from "./components/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { LuArrowRightLeft } from "react-icons/lu";
import {
  fetchCurrencies,
  fetchConvertedAmount,
} from "./store/features/currency/currencySlice";

function App() {
  const [toCurrency, setToCurrency] = useState("INR");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const dispatch = useDispatch();
  const currencies = useSelector((state) => state.currency.currencies);
  const error = useSelector((state) => state.currency.error);
  const loading = useSelector((state) => state.currency.isLoading);
  const buttonLoading = useSelector((state) => state.currency.isButtonLoading);
  const convertedAmountDetails = useSelector(
    (state) => state.currency.convertedAmountDetails
  );

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  useEffect(() => {
    if (convertedAmountDetails) {
      setConvertedAmount(convertedAmountDetails.result + " " + toCurrency);
    }
  }, [convertedAmountDetails]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(null);
  };

  const handleConvert = (e) => {
    e.preventDefault();

    dispatch(
      fetchConvertedAmount({
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        amount: amount,
      })
    );
  };

  if (error) {
    return (
      <div className="h-96 mx-auto my-24 px-12 py-8 w-1/2 bg-gray-50 rounded-lg shadow-lg text-center">
        Error: {error.message}
      </div>
    );
  }
  return (
    <>
      {loading ? (
        <div className="animate-pulse h-96 mx-auto my-24 px-12 py-8 w-1/2 bg-gray-50 rounded-lg shadow-lg">
          <div className="w-1/2 h-6 bg-slate-400 rounded-xl"></div>
          <div className="mt-12 mb-4 flex items-center justify-between">
            <div className="w-2/5 h-6 bg-slate-400 rounded-xl"></div>
            <div className="w-2/5 h-6 bg-slate-400 rounded-xl"></div>
          </div>
          <div className="mt-16 mb-4 flex flex-col">
            <div className="w-full h-6 bg-slate-400 rounded-xl mb-4"></div>
            <span className="flex justify-end">
              <div className="bg-slate-400 w-24 h-6 rounded-xl"></div>
            </span>
          </div>
          <div className="bg-slate-400 w-full h-6 rounded-xl mt-8"></div>
        </div>
      ) : (
        <div className="mx-auto my-24 px-12 py-8 w-1/2 bg-gray-50 rounded-lg shadow-lg">
          <h1 className="text-2xl font-medium text-gray-800/90 font-inter">
            Currency Converter
          </h1>
          <div className="mt-12 mb-4 flex justify-between items-end ">
            <span>
              <Dropdown
                currencies={Object.keys(currencies.result)}
                title="From"
                currency={fromCurrency}
                setCurrency={setFromCurrency}
              />
            </span>
            <span className="-mt-4">
              <button
                onClick={handleSwap}
                className="bg-indigo-500 p-2 rounded-full "
              >
                <LuArrowRightLeft className="text-lg text-gray-100" />
              </button>
            </span>
            <span>
              <Dropdown
                currencies={Object.keys(currencies.result)}
                title="To"
                currency={toCurrency}
                setCurrency={setToCurrency}
              />
            </span>
          </div>
          <form onSubmit={handleConvert} className="mt-12 flex flex-col">
            <span className="mb-2">
              <label
                className="block text-base font-medium font-inter text-gray-700 mb-2"
                htmlFor="amount"
              >
                Amount
              </label>
              <input
                id="amount"
                className="w-full outline-1 outline-indigo-400 border border-1 border-gray-400 rounded px-4 py-2"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </span>
            <span className="mt-4 flex justify-end">
              {buttonLoading ? (
                <button
                  className={`flex items-center px-6 py-2 text-base font-inter font-medium bg-purple-700 rounded text-gray-200 hover:bg-purple-600 focus:ring-2 focus:ring-purple-600 focus:ring-offset-2`}
                  type="submit"
                  disabled
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-gray-50 animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Converting...
                </button>
              ) : (
                <button
                  className={`px-6 py-2 text-base font-inter font-medium bg-purple-700 rounded text-gray-200 hover:bg-purple-600 focus:ring-2 focus:ring-purple-600 focus:ring-offset-2`}
                  type="submit"
                >
                  Convert
                </button>
              )}
            </span>
          </form>
          <div className="mt-4 text-lg font-normal font-inter text-right text-green-500">
            {convertedAmount && <p>Converted amount: {convertedAmount}</p>}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
