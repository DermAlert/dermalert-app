import Button from "@/components/Button";
import CheckButton from "@/components/CheckButton";
import Header from "@/components/Header";
import ModalTagSearch from "@/components/ModalTagSearch";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useGeneralHealthForm } from "@/hooks/useGeneralHealthForm";
import { useTagListModal } from "@/hooks/useTagListModal";
import { api } from "@/services/api";
import { GeneralHealthProps } from "@/types/forms";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
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

// const CHRONIC_DISEASES = [
//   "Hipertensão arterial",
//   "Diabetes mellitus tipo 1",
//   "Diabetes mellitus tipo 2",
//   "Asma brônquica",
//   "Doença pulmonar obstrutiva crônica (DPOC)",
//   "Insuficiência cardíaca",
//   "Doença arterial coronariana",
//   "Arritmia cardíaca",
//   "Doença renal crônica",
//   "Doença hepática crônica",
//   "Doença de Alzheimer",
//   "Doença de Parkinson",
//   "Artrite reumatoide",
//   "Osteoartrite",
//   "Lúpus eritematoso sistêmico",
//   "Esclerose múltipla",
//   "Hipotireoidismo",
//   "Hipertireoidismo",
//   "Doença celíaca",
//   "Fibrose cística",
//   "Fibromialgia",
//   "Depressão maior",
//   "Transtorno bipolar",
//   "Transtorno de ansiedade generalizada",
//   "Epilepsia",
//   "Doença de Crohn",
//   "Retocolite ulcerativa",
//   "Gota",
//   "Anemia falciforme",
//   "Talassemia",
//   "Hemofilia",
//   "HIV/Aids",
//   "Câncer de mama (crônico)",
//   "Câncer de próstata (crônico)",
//   "Câncer colorretal (crônico)",
//   "Esôfago de Barrett",
//   "Doença arterial periférica",
//   "Glaucoma",
//   "Catarata",
//   "Psoríase",
// ]

export default function GeneralHealthStep1() {
  const [isDiseasesOpen, setIsDiseasesOpen] = useState(false);
  const [notEmpty, setNotEmpty] = useState(false);
  const [isOtherDiseasesOpen, setIsOtherDiseasesOpen] = useState(false);
  const [modalSearchOpen, setModalSearchOpen] = useState(false);  
  const [chronicDiseasesList, setChronicDiseasesList] = useState<string[]>([]);
  
  const { generalHealthData, setGeneralHealthData, updateGeneralHealthData  } = useGeneralHealthForm();

  const { control, handleSubmit, getValues } = useForm<GeneralHealthProps>(
    {
      defaultValues: {
        chronic_diseases: generalHealthData.chronic_diseases && generalHealthData.chronic_diseases.length === 0 ? ["Não"] : undefined
      }
    }
  );

  const loadChronicDiseases = async () => {
    try {
      const { data } = await api.get('/chronic-diseases/');

      if (data) {
        const onlyNames: string[] = data.map((item: { name: string }) => item.name);
        setChronicDiseasesList(onlyNames);
        //console.log(chronicDiseasesList);
        //console.log(data);
      }

    } catch (error) {
      console.log(error);
    }
  }


  // animação accordion
  const measuredHeight = useSharedValue(0);
  const animatedHeight = useDerivedValue(() => 
    withTiming(
      // isDiseasesOpen || generalHealthData.chronic_diseases && generalHealthData.chronic_diseases.length > 0 ? measuredHeight.value : 0, 
      isDiseasesOpen ? measuredHeight.value : 0, 
      { duration: 300 }
    )
  );
  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    overflow: 'hidden',
  }));

  // formulario
  
  const fixedOptions = ["Hipertensão", "Diabetes", "Cardiopatas", "Não"];

  const onChangeRef = useRef<(value: string[]) => void>(() => {});
  const valueRef = useRef<string[]>([]);
  const chronicDiseasesValue = useWatch({ control, name: "chronic_diseases" });

  const {
    list: diseasesList,
    setList,
    searchText,
    filteredData,
    addItemToList,
    removeItemFromList,
    handleSearch,
  } = useTagListModal({
    baseList: chronicDiseasesList,
    currentValue: chronicDiseasesValue ?? [],
    onChange: (v) => onChangeRef.current(v),
    setNotEmpty,
    fixedOptions
  });

    

useEffect(() => {
  if (generalHealthData.chronic_diseases && generalHealthData.chronic_diseases.length > 0) {
    const fixedSelected = generalHealthData.chronic_diseases.filter(d => fixedOptions.includes(d));
    const otherSelected = generalHealthData.chronic_diseases.filter(d => !fixedOptions.includes(d));
    //setList([]);

    onChangeRef.current([
      ...fixedSelected,
      ...otherSelected
    ]);

    //setList(otherSelected);

    if (otherSelected.length > 0) {
      setIsOtherDiseasesOpen(true);
    }
  }
}, [generalHealthData, setList]);


  const handleNext = (data: GeneralHealthProps) => {
    if (data.chronic_diseases && data.chronic_diseases.length > 0 && notEmpty) {
      //const formatted = data.chronic_diseases.map((d) => ({ name: d }));

      const sendData = data.chronic_diseases.includes("Não") ? [] : data.chronic_diseases;
  
      //console.log({ chronic_diseases: sendData});
      updateGeneralHealthData({ chronic_diseases: sendData}); 
      router.push('/(app)/register-patient/general-health/step2');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setGeneralHealthData({});
    router.push('/(app)/register-patient/step9');
  }

  useEffect(() => {
    //console.log("diseasesList: ", diseasesList)
    //console.log("chronicDiseasesValue: ", chronicDiseasesValue)
    const isOutrosSelected = isOtherDiseasesOpen;
    const current = chronicDiseasesValue || [];
    valueRef.current = chronicDiseasesValue || [];
    const hasOtherSelections = current.length > 0;
    const hasDiseasesInList = diseasesList.length > 0;

    if (isOutrosSelected) {
      if (!hasDiseasesInList) {
        setNotEmpty(false);
        return;
      }
      setNotEmpty(true);
      return;
    }

    if(generalHealthData.chronic_diseases && generalHealthData.chronic_diseases?.length > 0) {
      setNotEmpty(true);
      setIsDiseasesOpen(true);
    }

    setNotEmpty(hasOtherSelections);
  }, [chronicDiseasesValue, diseasesList, isOtherDiseasesOpen, isDiseasesOpen]);

  useFocusEffect(
    useCallback(() => {
      loadChronicDiseases()
    },[])
  )

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setGeneralHealthData({});
        router.push('/(app)/register-patient/step9');
        return true;
      };
  
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
  
      return () => subscription.remove();
    }, [])
  );

  useEffect(() => {
    console.log(generalHealthData)
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >
      <ModalTagSearch
        title = 'Outras doenças crônicas'
        visible={modalSearchOpen}
        contentList={diseasesList}
        filteredData={filteredData}
        searchText={searchText}
        onClose={() => setModalSearchOpen(false)}
        onSearch={handleSearch}
        onAddItem={addItemToList}
        onRemoveItem={(item) => {
          removeItemFromList(item);
          const filtered = chronicDiseasesValue?.filter((v: string) => v !== item) || [];
          onChangeRef.current(filtered);
        }}
        onConfirm={() => {
          setModalSearchOpen(false);
          if (diseasesList.length > 0) {
            setNotEmpty(true);
            const currentValue = chronicDiseasesValue || [];
            const unique = diseasesList.filter(item => !currentValue.includes(item));
            onChangeRef.current([...currentValue, ...unique]);
          }
        }}
      />

      <Header title="Andecedentes clínicos" onPress={handleCancel} />

      <ScrollView className="px-8 pb-6 w-full flex-1">
        <ProgressBar step={1} totalSteps={6} />

        <Text className="text-base text-neutral-900 mt-6 mb-8">O paciente tem histórico de alguma doença crônica? </Text>

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
                    checked={isDiseasesOpen}
                    onPress={() => {
                      setIsDiseasesOpen(true);
                      setNotEmpty(false);
                      if (value.includes("Não")) {
                        onChange(value.filter(v => v !== "Não"));
                      }
                    }}
                  />

                  <Animated.View style={animatedStyle}>
                    <View
                      style={{ position: 'absolute', width: '100%', visibility: isDiseasesOpen ? 'visible' : 'hidden' }}
                      className="py-2"
                      onLayout={(e) => {
                        measuredHeight.value = e.nativeEvent.layout.height;
                      }}
                    >
                      {["Hipertensão", "Diabetes", "Cardiopatas", "Outros"].map(item => (
                        <CheckButton
                          key={item}
                          label={item}
                          value={item}
                          checked={item === "Outros" ? isOtherDiseasesOpen : value.includes(item)}
                          onPress={() => {
                            if (item === "Outros") {
                              const isSelected = isOtherDiseasesOpen;
                              const currentValue = valueRef.current;

                              if (isSelected) {
                                setIsOtherDiseasesOpen(false);
                                const updatedValue = currentValue.filter(v => !diseasesList.includes(v));
                                onChange(updatedValue);
                                if (updatedValue.length === 0) setNotEmpty(false);
                              } else {
                                setIsOtherDiseasesOpen(true);
                                if (diseasesList.length > 0) {
                                  const newItems = diseasesList.filter(d => !currentValue.includes(d));
                                  onChange([...currentValue, ...newItems]);
                                }
                              }
                              return;
                            }

                            if (value.includes(item)) {
                              onChange(value.filter(v => v !== item));
                            } else {
                              onChange([...value, item]);
                              const isSelected = isOtherDiseasesOpen;
                              if (isSelected && diseasesList.length === 0) {
                                setNotEmpty(false);
                              } else {
                                setNotEmpty(true);
                              }
                            }
                          }}
                          indented
                        />
                      ))}

                      {isOtherDiseasesOpen && (
                        <View className="mx-4 mt-2">
                          <Text className="text-neutral-700 text-base">Especifique</Text>
                          <TouchableOpacity
                            className="border border-neutral-300 rounded-lg p-4 mb-4 mt-2"
                            activeOpacity={1}
                            onPress={() => setModalSearchOpen(true)}
                          >
                            <Text className="text-neutral-400">Ex.:</Text>
                          </TouchableOpacity>

                          <View className="gap-2">
                            {diseasesList.map((item) => (
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
                    setIsDiseasesOpen(false);
                    updateGeneralHealthData({ chronic_diseases: [] });
                    router.push('/(app)/register-patient/general-health/step2');
                  }}
                />
              </View>
            );
          }}
          name="chronic_diseases"
        />
      </ScrollView>

      <View className="px-8 w-full justify-start mb-4">
        <Button 
          title="Próximo" 
          iconRight 
          icon={<ArrowRightIcon size={20} color={`${notEmpty ? 'white' : '#D4D6DF'}`} />} 
          onPress={handleSubmit(handleNext)} 
          activeOpacity={notEmpty ? 0.2 : 1}
          disabled={notEmpty}
        />
      </View>
      
    </Animated.View>
  );
}
