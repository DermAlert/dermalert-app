import { api } from "@/services/api";
import { useState } from "react";

export function useFormLists() {
  // relatives list
  const [relativesList, setRelativesList] = useState<string[]>([]);

  // injuries and treatments list
  const [injuriesTreatmentList, setInjuriesTreatmentList] = useState<string[]>([]);

  

  //  load relatives list
  const loadRelatives = async () => {
    try {
      const { data } = await api.get('/relatives/');

      if (data) {
        const onlyNames: string[] = data.map((item: { name: string }) => item.name);
        setRelativesList(onlyNames);
        //console.log(relativesList);
        //console.log(data);
      }

    } catch (error) {
      console.log(error);
    }
  }

  // load injuries and treatments list
  const loadInjuriesTreatment = async () => {
    try {
      const { data } = await api.get('/injuries-treatments/');

      if (data) {
        const onlyNames: string[] = data.map((item: { name: string }) => item.name);
        setInjuriesTreatmentList(onlyNames);
      }

    } catch (error) {
      console.log(error);
    }
  }


  return {
    relativesList,
    loadRelatives,
    injuriesTreatmentList,
    loadInjuriesTreatment,
  };
}