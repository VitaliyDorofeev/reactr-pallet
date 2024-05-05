import { useState } from 'react';
import { useFetchData, useUniqueValues } from '../FetchDataHook';

const PopulateForm = ({ onRegionChange, onTradingChange, onReturnPointChange }) => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedTradingNetwork, setSelectedTradingNetwork] = useState('');
  const [selectedReturnPoint, setSelectedReturnPoint] = useState('');

  const regions = useFetchData('Sheet1!A3:A');
  const tradingNetworks = useFetchData('Sheet1!B3:B');
  const returnPoints = useFetchData('Sheet1!C3:C');
  const plnListData = useFetchData('Sheet1!D3:D');
  const rcsListData = useFetchData('Sheet1!E3:E');
  const tarifListData = useFetchData('Sheet1!F3:F');

  const uniqueRegions = useUniqueValues(regions);
  const filteredTradingNetwork = tradingNetworks.filter((_, index) => regions[index] === selectedRegion);
  const uniqueTradingNetworks = useUniqueValues(filteredTradingNetwork);
  const filteredReturnPoints = returnPoints.filter((_, index) => regions[index] === selectedRegion && tradingNetworks[index] === selectedTradingNetwork);
  const uniqueReturnPoints = useUniqueValues(filteredReturnPoints);
  const filteredPlnList = plnListData.filter((_, index) => returnPoints[index] === selectedReturnPoint && tradingNetworks[index] === selectedTradingNetwork);
  const uniquePlnList = useUniqueValues(filteredPlnList);
  const filteredRcsList = rcsListData.filter((_, index) => returnPoints[index] === selectedReturnPoint && tradingNetworks[index] === selectedTradingNetwork);
  const uniqueRcsList = useUniqueValues(filteredRcsList);
  const filteredTarifList = tarifListData.filter((_, index) => returnPoints[index] === selectedReturnPoint && tradingNetworks[index] === selectedTradingNetwork);
  const uniqueTarifList = useUniqueValues(filteredTarifList);

  const handleRegionChange = (event) => {
    const region = event.target.value;
    setSelectedRegion(region);
    onRegionChange(region);
    setSelectedTradingNetwork('');
    setSelectedReturnPoint('');
  };

  const handleTradingChange = (event) => {
    const tradingNetwork = event.target.value;
    setSelectedTradingNetwork(tradingNetwork);
    onTradingChange(tradingNetwork);
    setSelectedReturnPoint('');
  };

  const handleReturnPointChange = (event) => {
    const returnPoint = event.target.value;
    setSelectedReturnPoint(returnPoint);
    onReturnPointChange(returnPoint);
  };



  return (
    <div>
        <div className="pallet-return-form__group">
            <select id="region" className='custom-select' value={selectedRegion} onChange={handleRegionChange}>
                <option value="">Выберите регион</option>
                {uniqueRegions.map((region, index) => (
                <option key={index} value={region}>
                    {region}
                </option>
                ))}
            </select>
            <select id="trading-network" className="custom-select" value={selectedTradingNetwork} onChange={handleTradingChange}>
                <option value="">Выберите торговую сеть</option>
                {uniqueTradingNetworks.map((network, index) => (
                <option key={index} value={network}>
                    {network}
                </option>
                ))}
            </select>
            <select id="return-point" className="custom-select" value={selectedReturnPoint} onChange={handleReturnPointChange}>
                <option value="">Выберите точку возврата</option>
                {uniqueReturnPoints.map((point, index) => (
                <option key={index} value={point}>
                    {point}
                </option>
                ))}
            </select>
        </div>

        <div className="pallet-return-form__group">
            <select id="pln" className="custom-select custom-select--mod">
                {uniquePlnList.map((pln, index) => (
                <option key={index} value={pln}>{pln}</option>
                ))}
            </select>

            <select id="rcs" className="custom-select custom-select--mod">
                {uniqueRcsList.map((rcs, index) => (
                <option key={index} value={rcs}>{rcs}</option>
                ))}
            </select>

            <select id="tarif" className="custom-select custom-select--mod">
                {uniqueTarifList.map((tarif, index) => (
                <option key={index} value={tarif}>{tarif}</option>
                ))}
            </select>
        </div>       
    </div>
  );
};

export default PopulateForm;
