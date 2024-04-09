/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  isButtonLoading: false,
  currencies: null,
  convertedAmountDetails: null,
  error: null,
};

export const fetchCurrencies = createAsyncThunk("fetchCurrencies", async () => {
  const options = {
    method: "GET",
    url: "https://currency-converter-pro1.p.rapidapi.com/currencies",
    headers: {
      "X-RapidAPI-Key": "e53ac9cbc2mshe4ebc3e1d9e5732p1074adjsncd62d6884ea8",
      "X-RapidAPI-Host": "currency-converter-pro1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.log("Failed to fetch currencies data :: ", error);
  }

  return null;
});

export const fetchConvertedAmount = createAsyncThunk(
  "fetchConvertedAmount",
  async ({ fromCurrency, toCurrency, amount }) => {
    if (!amount) {
      return;
    }
    const options = {
      method: "GET",
      url: "https://currency-converter-pro1.p.rapidapi.com/convert",
      params: {
        from: `${fromCurrency}`,
        to: `${toCurrency}`,
        amount: `${amount}`,
      },
      headers: {
        "X-RapidAPI-Key": "e53ac9cbc2mshe4ebc3e1d9e5732p1074adjsncd62d6884ea8",
        "X-RapidAPI-Host": "currency-converter-pro1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.log("Failed to fetch converted amount :: ", error);
    }
    return null;
  }
);

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // for fetching currencies
    builder.addCase(fetchCurrencies.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchCurrencies.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currencies = action.payload;
    });

    // for fetching converted amount
    builder.addCase(fetchConvertedAmount.rejected, (state, action) => {
      state.isButtonLoading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchConvertedAmount.pending, (state, action) => {
      state.isButtonLoading = true;
    });

    builder.addCase(fetchConvertedAmount.fulfilled, (state, action) => {
      state.convertedAmountDetails = action.payload;
      state.isButtonLoading = false;
    });
  },
});

export default currencySlice.reducer;
