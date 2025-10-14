import Button from "@/components/Button";
import CheckButton from "@/components/CheckButton";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ModalTagSearch from "@/components/ModalTagSearch";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useFamilyHistoryForm } from "@/hooks/Oncodermato/useFamilyHistoryForm";
import { useLesionType } from "@/hooks/useLesionType";
import { usePatientId } from "@/hooks/usePatientId";
import { useTagListModal } from "@/hooks/useTagListModal";
import { api } from "@/services/api";
import { PersonalFamilyHistoryProps } from "@/types/forms";
import { router, useFocusEffect } from "expo-router";
import { ArrowRightIcon, XIcon } from "phosphor-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { BackHandler, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft, useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

// const FAMILY_MEMBERS = [
//   "Tio",
//   "Tia",
//   "Tio-avô",
//   "Tia-avó",
//   "Primo",
//   "Prima",
//   "Filho",
//   "Filha",
//   "Sobrinho",
//   "Sobrinha",
//   "Bisavô",
//   "Bisavó"
// ];

export default function PersonalFamilyHistoryStep1() {
  const [isFamilyOpen, setIsFamilyOpen] = useState(false);
  const [notEmpty, setNotEmpty] = useState(false);
  const [isOtherOpen, setIsOtherOpen] = useState(false);
  const [modalSearchOpen, setModalSearchOpen] = useState(false);  
  const [relativesList, setRelativesList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { familyHistoryData, setFamilyHistoryData, updateFamilyHistoryData  } = useFamilyHistoryForm();
  const { setLesionType } = useLesionType();

  const { patientId } = usePatientId();


  // animação accordion
  const measuredHeight = useSharedValue(0);
  const animatedHeight = useDerivedValue(() => 
    withTiming(
      isFamilyOpen ? measuredHeight.value : 0, 
      { duration: 300 }
    )
  );
  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    overflow: 'hidden',
  }));

  // formulario
  const { control, handleSubmit, reset } = useForm<PersonalFamilyHistoryProps>(
    {
      defaultValues: {
        family_history: [],
        family_history_types: [],
      }
    }
  );

  const loadPersonalFamilyHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/patients/${patientId}/forms/family-history/`);
      console.log(data);
      const familyHistoryContent = data.family_history.map((item: string | { name: string }) => typeof item === 'string' ? item : item.name)
      const familyHistoryTypesContent = data.family_history_types.map((item: string | { name: string }) => typeof item === 'string' ? item : item.name)
      const patientCancerTypeContent = data.patient_cancer_type.map((item: string | { name: string }) => typeof item === 'string' ? item : item.name)
      const injuriesTreatmentContent = data.injuries_treatment.map((item: string | { name: string }) => typeof item === 'string' ? item : item.name)
      setFamilyHistoryData(prev => {
        return (prev?.family_history && prev?.family_history.length > 0) || (prev?.family_history_types && prev?.family_history_types.length > 0) ? prev : { 
          family_history: familyHistoryContent,
          family_history_types: familyHistoryTypesContent,
          injuries_treatment: injuriesTreatmentContent,
          patient_cancer_type: patientCancerTypeContent,
          removed_injuries: data.removed_injuries
        };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [patientId, setFamilyHistoryData]);

  useEffect(() => {
    if (familyHistoryData?.family_history && familyHistoryData?.family_history_types) {
      reset({
        family_history: familyHistoryData.family_history && familyHistoryData.family_history.length === 0 ? ["Não"] : familyHistoryData.family_history,
        family_history_types: familyHistoryData.family_history_types
      });
    }
  }, [familyHistoryData, reset]);


  useEffect(() => {
    loadPersonalFamilyHistory();
  }, [loadPersonalFamilyHistory]);


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

  const fixedOptions = ["Mãe", "Pai", "Avô/Avó", "Irmão/Irmã", "Não"];

  const onChangeRef = useRef<(value: string[]) => void>(() => {});
  const valueRef = useRef<string[]>([]);
  const familyHistoryValue = useWatch({ control, name: "family_history" });
  const familyHistoryTypeValue = useWatch({ control, name: "family_history_types" });

  const {
    list: familyList,
    setList,
    searchText,
    filteredData,
    addItemToList,
    removeItemFromList,
    handleSearch,
  } = useTagListModal({
    baseList: relativesList,
    currentValue: familyHistoryValue ?? [],
    onChange: (v) => onChangeRef.current(v),
    setNotEmpty,
    fixedOptions
  });

  useEffect(() => {
    if (familyHistoryData.family_history && familyHistoryData.family_history.length > 0) {
      const fixedSelected = familyHistoryData.family_history.filter(d => fixedOptions.includes(d));
      const otherSelected = familyHistoryData.family_history.filter(d => !fixedOptions.includes(d));
      //setList([]);
  
      onChangeRef.current([
        ...fixedSelected,
        ...otherSelected
      ]);
  
      //setList(otherSelected);
  
      if (otherSelected.length > 0) {
        setIsOtherOpen(true);
      }
    }
  }, [familyHistoryData, setList]);

  

  const handleNext = (data: PersonalFamilyHistoryProps) => {
    if (data.family_history && data.family_history.length > 0 && notEmpty) {
      console.log(data);

      if(!data.family_history.includes("Não") && data.family_history_types && data.family_history_types.length === 0) return

      const familyHistoryData = data.family_history.includes("Não") ? [] : data.family_history;
      const familyHistoryTypeData = data.family_history.includes("Não") ? [] : data.family_history_types;


      updateFamilyHistoryData({ family_history: familyHistoryData, family_history_types: familyHistoryTypeData });
      router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/personalFamilyHistory/edit/step2');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setFamilyHistoryData({});
    setLesionType(null)
    router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/personalFamilyHistory');
  }

  useEffect(() => {
    const isOutrosSelected = isOtherOpen;
    const current = familyHistoryValue || [];
    const currentType = familyHistoryTypeValue || [];
    valueRef.current = familyHistoryValue || [];
    const hasOtherSelections = current.length > 0 && currentType.length > 0;
    const hasFamilyInList = familyList.length > 0;

    if (isOutrosSelected) {
      if (!hasFamilyInList) {
        setNotEmpty(false);
        return;
      }
      if(currentType.length > 0){
        setNotEmpty(true);
      } else {
        setNotEmpty(false)
      }
      
      return;
    }

    if(familyHistoryData.family_history && familyHistoryData.family_history.length > 0) {
      setNotEmpty(true);        
      setIsFamilyOpen(true);
    }

    setNotEmpty(hasOtherSelections);
  }, [familyHistoryValue, familyList, isOtherOpen, isFamilyOpen]);

  useFocusEffect(
    useCallback(() => {
      loadRelatives()
    },[])
  )

  useEffect(() => {
    console.log(familyHistoryData)
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        handleCancel()
        return true;
      };
  
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
  
      return () => subscription.remove();
    }, [])
  );

  if(isLoading){
    return (
      <View className="flex-1 bg-white p-safe justify-center items-center">
        <Loading />
      </View>
    )
  }

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >
      <ModalTagSearch
        title = 'Outros membros da familia'
        visible={modalSearchOpen}
        contentList={familyList}
        filteredData={filteredData}
        searchText={searchText}
        onClose={() => setModalSearchOpen(false)}
        onSearch={handleSearch}
        onAddItem={addItemToList}
        onRemoveItem={(item) => {
          removeItemFromList(item);
          const filtered = familyHistoryValue?.filter((v: string) => v !== item) || [];
          onChangeRef.current(filtered);
        }}
        onConfirm={() => {
          setModalSearchOpen(false);
          if (familyList.length > 0) {
            setNotEmpty(true);
            const currentValue = familyHistoryValue || [];
            const unique = familyList.filter(item => !currentValue.includes(item));
            onChangeRef.current([...currentValue, ...unique]);
          }
        }}
      />

      <Header title="Histórico Familiar e Pessoal" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={1} totalSteps={5} />

        <Text className="text-base text-neutral-800 mt-4 mb-8">O paciente tem histórico familiar de câncer de pele?</Text>

        <Controller
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value = [] } }) => {
            onChangeRef.current = onChange;
            return (
              <View className="gap-3">
                <View>
                  <RadioButton
                    label="Sim"
                    checked={isFamilyOpen}
                    onPress={() => {
                      setIsFamilyOpen(true);
                      setNotEmpty(false);
                      if (value.includes("Não")) {
                        onChange(value.filter(v => v !== "Não"));
                      }
                    }}
                  />

                  <Animated.View style={animatedStyle}>
                    <View
                      style={{ position: 'absolute', width: '100%', visibility: isFamilyOpen ? 'visible' : 'hidden' }}
                      onLayout={(e) => {
                        measuredHeight.value = e.nativeEvent.layout.height;
                      }}
                    >
                      <Text className="px-0 mt-5 text-neutral-900 text-base">Qual grau de parentesco?</Text>
                      {["Mãe", "Pai", "Avô/Avó", "Irmão/Irmã", "Outros"].map(item => (
                        <CheckButton
                          key={item}
                          label={item}
                          value={item}
                          checked={item === "Outros" ? isOtherOpen : value.includes(item)}
                          onPress={() => {
                            if (item === "Outros") {
                              const isSelected = isOtherOpen;
                              const currentValue = valueRef.current;

                              if (isSelected) {
                                setIsOtherOpen(false);
                                const updatedValue = currentValue.filter(v => !familyList.includes(v));
                                onChange(updatedValue);
                                if (updatedValue.length === 0) setNotEmpty(false);
                              } else {
                                setIsOtherOpen(true);
                                if (familyList.length > 0) {
                                  const newItems = familyList.filter(d => !currentValue.includes(d));
                                  onChange([...currentValue, ...newItems]);
                                }
                              }
                              return;
                            }

                            if (value.includes(item)) {
                              onChange(value.filter(v => v !== item));
                            } else {
                              onChange([...value, item]);
                              const isSelected = isOtherOpen;
                              // if (isSelected && familyList.length === 0) {
                              //   setNotEmpty(false);
                              // } else if (familyHistoryTypeValue?.length === 0) {
                              //   setNotEmpty(false);
                              // } else {
                              //   setNotEmpty(true)
                              // }
                            }
                          }}
                          indented
                        />
                      ))}
                      {isOtherOpen && (
                        <View className="mx-4 mt-2">
                          <Text className="text-neutral-700 text-base">Especifique</Text>
                          <TouchableOpacity
                            className="border border-neutral-300 rounded-lg p-4 mt-2 mb-4"
                            activeOpacity={1}
                            onPress={() => setModalSearchOpen(true)}
                          >
                            <Text className="text-neutral-400">Ex.:</Text>
                          </TouchableOpacity>

                          <View className="gap-2">
                            {familyList.map((item) => (
                              <View key={item} className="flex-row gap-2 items-center bg-primary-100 rounded-lg px-2 py-[6px] self-start">
                              <Text className="w-auto max-w-[240px] text-neutral-700 text-sm font-medium">{item}</Text>
                              <TouchableOpacity onPress={() => removeItemFromList(item)}>
                                <XIcon size={12} color="#7D83A0" weight="bold" />
                              </TouchableOpacity>
                            </View>
                            ))}
                          </View>
                        </View>
                      )}

                      <Controller
                        control={control}
                        defaultValue={[]}
                        name="family_history_types"
                        render={({ field: { onChange, value = [] } }) => {
                          return (
                            <>
                            <Text  className="px-0 mt-5 text-neutral-900 text-base">Qual tipo de câncer de pele?</Text>
                              {["Melanoma", "Carcinoma Basocelular", "Carcinoma Espinocelular"].map(item => (
                                <CheckButton
                                  key={item}
                                  label={item}
                                  value={item}
                                  checked={value.includes(item)}
                                  onPress={() => {
                                    if (value.includes(item)) {
                                      onChange(value.filter(v => v !== item));
                                    } else {
                                      onChange([...value, item]);
                                      // if (familyHistoryValue && familyHistoryValue.length === 0) {
                                      //   setNotEmpty(false);
                                      //   return
                                      // } else {
                                      //   setNotEmpty(true)
                                      // }
                                    }
                                  }}
                                  indented
                                />
                              ))}
                            </>
                            
                          );
                        }}
                      />

                    </View>
                  </Animated.View>
                </View>

                <RadioButton
                  label="Não"
                  value="Não"
                  checked={value.includes("Não")}
                  onPress={() => {
                    const newValue = ["Não"];
                    onChange(newValue);
                    setNotEmpty(true);
                    setIsFamilyOpen(false);
                    updateFamilyHistoryData({ family_history: [], family_history_types: [] });
                    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/personalFamilyHistory/edit/step2');
                  }}
                />
              </View>
            );
          }}
          name="family_history"
        />


        
      </ScrollView>

      <View className="px-8 w-full justify-start mb-4 mt-4">
        <Button 
          title="Próximo" 
          iconRight 
          icon={<ArrowRightIcon size={24} color={`${notEmpty ? 'white' : '#D4D6DF'}`} />}
          onPress={handleSubmit(handleNext)} 
          activeOpacity={notEmpty ? 0.2 : 1}
          disabled={notEmpty}
        />
      </View>
    </Animated.View>
  );
}
