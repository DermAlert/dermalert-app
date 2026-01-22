import Button from "@/components/Button";
import CheckButton from "@/components/CheckButton";
import Header from "@/components/Header";
import ModalTagSearch from "@/components/ModalTagSearch";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useFormLists } from "@/hooks/api/useFormLists";
import { useFamilyHistoryForm } from "@/hooks/Oncodermato/useFamilyHistoryForm";
import { useLesionType } from "@/hooks/useLesionType";
import { useTagListModal } from "@/hooks/useTagListModal";
import { PersonalFamilyHistoryProps } from "@/types/forms";
import { router, useFocusEffect } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from "phosphor-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft, useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

// const LESION_TREATMENTS = [
//   "Crioterapia",
//   "Eletrocoagulação",
//   "Curetagem",
//   "Excisão cirúrgica",
//   "Biópsia excisional",
//   "Biópsia incisional",
//   "Laserterapia",
//   "Terapia fotodinâmica",
//   "Tratamento tópico com 5-fluorouracil",
//   "Tratamento tópico com imiquimode",
//   "Radioterapia",
//   "Quimioterapia tópica",
//   "Infiltração intralesional",
//   "Microagulhamento",
//   "Retirada com shaving",
//   "Observação clínica",
//   "Uso de antibióticos tópicos",
//   "Drenagem de abscesso",
//   "Cauterização química",
//   "Criocirurgia"
// ];

export default function PersonalFamilyHistoryStep4() {
  const [isTreatmentOpen, setIsTreatmentOpen] = useState(false);
  const [notEmpty, setNotEmpty] = useState(false);
  const [isOtherOpen, setIsOtherOpen] = useState(false);
  const [modalSearchOpen, setModalSearchOpen] = useState(false);  
  const { loadInjuriesTreatment, injuriesTreatmentList } = useFormLists();
  
  
  const { familyHistoryData, setFamilyHistoryData, updateFamilyHistoryData  } = useFamilyHistoryForm();
  const { setLesionType } = useLesionType();

  const { control, handleSubmit } = useForm<PersonalFamilyHistoryProps>(
    {
      defaultValues: {
        injuries_treatment: familyHistoryData.injuries_treatment && familyHistoryData.injuries_treatment.length === 0 ? ["Não"] : undefined
      }
    }
  );


  // animação accordion
  const measuredHeight = useSharedValue(0);
  const animatedHeight = useDerivedValue(() => 
    withTiming(
      isTreatmentOpen ? measuredHeight.value : 0, 
      { duration: 300 }
    )
  );
  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    overflow: 'hidden',
  }));

  // formulario
  
  const onChangeRef = useRef<(value: string[]) => void>(() => {});
  const valueRef = useRef<string[]>([]);
  const treatmentsValue = useWatch({ control, name: "injuries_treatment" });
  const fixedOptions = ["Cirurgia", "Crioterapia", "Radioterapia", "Não"];

  const {
    list: treatmentsList,
    searchText,
    filteredData,
    addItemToList,
    removeItemFromList,
    handleSearch,
  } = useTagListModal({
    baseList: injuriesTreatmentList,
    currentValue: treatmentsValue ?? [],
    onChange: (v) => onChangeRef.current(v),
    setNotEmpty,
    fixedOptions
  });

  useEffect(() => {
    if (familyHistoryData.injuries_treatment && familyHistoryData.injuries_treatment.length > 0) {
      const fixedSelected = familyHistoryData.injuries_treatment.filter(d => fixedOptions.includes(d));
      const otherSelected = familyHistoryData.injuries_treatment.filter(d => !fixedOptions.includes(d));
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
  }, [familyHistoryData]);

  

  const handleNext = (data: PersonalFamilyHistoryProps) => {
    if (data.injuries_treatment && data.injuries_treatment.length > 0 && notEmpty) {
      //console.log(data);
      updateFamilyHistoryData(data);
      const sendData = data.injuries_treatment.includes("Não") ? [] : data.injuries_treatment;

      updateFamilyHistoryData({ injuries_treatment: sendData}); 
      router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/personalFamilyHistory/step5');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setFamilyHistoryData({});
    setLesionType(null)
    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/steps');
  }

  useEffect(() => {
    const isOutrosSelected = isOtherOpen;
    const current = treatmentsValue || [];
    valueRef.current = treatmentsValue || [];
    const hasOtherSelections = current.length > 0;
    const hasFamilyInList = treatmentsList.length > 0;

    if (isOutrosSelected) {
      if (!hasFamilyInList) {
        setNotEmpty(false);
        return;
      }
      setNotEmpty(true);
      return;
    }

    if(familyHistoryData.injuries_treatment && familyHistoryData.injuries_treatment?.length > 0) {
      setNotEmpty(true);
      setIsTreatmentOpen(true);
    }

    setNotEmpty(hasOtherSelections);
  }, [treatmentsValue, treatmentsList, isTreatmentOpen]);

  useFocusEffect(
    useCallback(() => {
      loadInjuriesTreatment()
    },[])
  )

  useEffect(() => {
    console.log(familyHistoryData)
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >
      <ModalTagSearch
        title = 'Outros tratamentos'
        visible={modalSearchOpen}
        contentList={treatmentsList}
        filteredData={filteredData}
        searchText={searchText}
        onClose={() => setModalSearchOpen(false)}
        onSearch={handleSearch}
        onAddItem={addItemToList}
        onRemoveItem={(item) => {
          removeItemFromList(item);
          const filtered = treatmentsValue?.filter((v: string) => v !== item) || [];
          onChangeRef.current(filtered);
        }}
        onConfirm={() => {
          setModalSearchOpen(false);
          if (treatmentsList.length > 0) {
            setNotEmpty(true);
            const currentValue = treatmentsValue || [];
            const unique = treatmentsList.filter(item => !currentValue.includes(item));
            onChangeRef.current([...currentValue, ...unique]);
          }
        }}
      />

      <Header title="Histórico Familiar e Pessoal" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={4} totalSteps={5} />

        <Text allowFontScaling={false} className="text-base text-neutral-800 mt-4 mb-8">O paciente já passou por tratamento para lesões na pele?</Text>

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
                    checked={isTreatmentOpen}
                    onPress={() => {
                      setIsTreatmentOpen(true);
                      setNotEmpty(false);
                      if (value.includes("Não")) {
                        onChange(value.filter(v => v !== "Não"));
                      }
                    }}
                  />

                  <Animated.View style={animatedStyle}>
                    <View
                      style={{ position: 'absolute', width: '100%', visibility: isTreatmentOpen ? 'visible' : 'hidden' }}
                      onLayout={(e) => {
                        measuredHeight.value = e.nativeEvent.layout.height;
                      }}
                    >
                      <Text allowFontScaling={false} className="px-0 mt-5 text-neutral-900 text-base">Qual foi o tratamento?</Text>
                      {["Cirurgia", "Crioterapia", "Radioterapia", "Outros"].map(item => (
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
                                const updatedValue = currentValue.filter(v => !treatmentsList.includes(v));
                                onChange(updatedValue);
                                if (updatedValue.length === 0) setNotEmpty(false);
                              } else {
                                setIsOtherOpen(true);
                                if (treatmentsList.length > 0) {
                                  const newItems = treatmentsList.filter(d => !currentValue.includes(d));
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
                              if (isSelected && treatmentsList.length === 0) {
                                setNotEmpty(false);
                              } else {
                                setNotEmpty(true);
                              }
                            }
                          }}
                          indented
                        />
                      ))}

                      {isOtherOpen && (
                        <View className="mx-4 mt-2">
                          <Text allowFontScaling={false} className="text-neutral-700 text-base">Especifique</Text>
                          <TouchableOpacity
                            className="border border-neutral-300 rounded-lg p-4 mb-4 mt-2"
                            activeOpacity={1}
                            onPress={() => setModalSearchOpen(true)}
                          >
                            <Text allowFontScaling={false} className="text-neutral-400">Ex.:</Text>
                          </TouchableOpacity>

                          <View className="gap-2">
                            {treatmentsList.map((item) => (
                              <View key={item} className="flex-row gap-2 items-center bg-primary-100 rounded-lg px-2 py-[6px] self-start">
                              <Text allowFontScaling={false} className="w-auto max-w-[240px] text-neutral-700 text-sm font-medium">{item}</Text>
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
                    setIsTreatmentOpen(false);
                    updateFamilyHistoryData({ injuries_treatment: [] });
                    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/personalFamilyHistory/step5');
                  }}
                />
              </View>
            );
          }}
          name="injuries_treatment"
        />
      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/personalFamilyHistory/step3')} 
          style={{ flexGrow: 1, width: '47%' }}
        />
        <Button 
          title="Próximo" 
          iconRight 
          icon={<ArrowRightIcon size={24} color={`${notEmpty ? 'white' : '#B3B3B3'}`} />}
          style={{ flexGrow: 1, width: '47%' }} 
          onPress={handleSubmit(handleNext)} 
          activeOpacity={notEmpty ? 0.2 : 1}
          disabled={notEmpty}
        />
      </View>
    </Animated.View>
  );
}
