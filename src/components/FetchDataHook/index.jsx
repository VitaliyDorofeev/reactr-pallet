import { useState, useEffect } from 'react';
import { fetchDataFromGoogleSheets, getUniqueValues } from '../FetchDataFromGoogleSheets/GoogleSheetsData';

export const useFetchData = (range) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataFromGoogleSheets(range);
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [range]);

  return data;
};

export const useUniqueValues = (data) => {
  return getUniqueValues(data);
};
