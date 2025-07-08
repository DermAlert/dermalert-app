import { useState } from "react";

type UseTagListModalProps = {
  baseList: string[];
  currentValue: string[];
  onChange: (value: string[]) => void;
  setNotEmpty?: (value: boolean) => void;
};

export function useTagListModal({
  baseList,
  currentValue,
  onChange,
  setNotEmpty,
}: UseTagListModalProps) {
  const [list, setList] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<string[]>(baseList);

  const addItemToList = (item: string) => {
    if (list.includes(item)) return;

    const newList = [...list, item];
    setList(newList);
    setSearchText("");
    setFilteredData(baseList);
  };

  const removeItemFromList = (item: string) => {
    const updatedList = list.filter((d) => d !== item);
    setList(updatedList);

    const newValue = currentValue.filter((v) => v !== item);
    onChange(newValue);

    if (updatedList.length === 0 && setNotEmpty) {
      setNotEmpty(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = baseList.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return {
    list,
    setList,
    searchText,
    filteredData,
    addItemToList,
    removeItemFromList,
    handleSearch,
    setSearchText,
    setFilteredData,
  };
}
