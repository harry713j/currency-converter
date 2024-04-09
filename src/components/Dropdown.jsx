/* eslint-disable react/prop-types */

function Dropdown({ currencies, title = "", currency, setCurrency }) {
  return (
    <div className="w-40">
      <label
        className="block text-base font-medium font-inter text-gray-700 mb-2"
        htmlFor={title}
      >
        {title}
      </label>
      <select
        id={title}
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="p-2.5 w-full border border-gray-400 rounded-md shadow focus:outline-none focus:ring-1 focus:ring-sky-600"
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
