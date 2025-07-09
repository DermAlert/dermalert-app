import Button from "@/components/Button";
import Header from "@/components/Header";
import ModalTagSearch from "@/components/ModalTagSearch";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useGeneralHealthForm } from "@/hooks/useGeneralHealthForm";
import { useTagListModal } from "@/hooks/useTagListModal";
import { GeneralHealthProps } from "@/types/forms";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft, useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

const ALLERGIES = [
  "Leite de vaca",
  "Ovo",
  "Amendoim",
  "Soja",
  "Trigo/glúten",
  "Frutos do mar",
  "Crustáceos",
  "Peixes",
  "Nozes",
  "Castanha de caju",
  "Castanha do Brasil",
  "Pistache",
  "Amêndoa",
  "Látex",
  "Penicilina",
  "Cefalosporinas",
  "Sulfametoxazol-trimetoprim",
  "Nimesulida",
  "Ácido acetilsalicílico (AAS)",
  "Dipirona",
  "Corantes alimentares",
  "Conservantes (sulfitos)",
  "Ácaros",
  "Pólen",
  "Pelos de gato",
  "Pelos de cachorro",
  "Fungos (mofo)",
  "Picada de abelha",
  "Picada de formiga (fogo)",
  "Níquel",
]

export default function GeneralHealthStep3() {
  const [isYesOpen, setIsYesOpen] = useState(false);
  const [notEmpty, setNotEmpty] = useState(false);
  const [modalSearchOpen, setModalSearchOpen] = useState(false);  
  
  const { generalHealthData, setGeneralHealthData, updateGeneralHealthData  } = useGeneralHealthForm();


  // animação accordion
  const measuredHeight = useSharedValue(0);
  const animatedHeight = useDerivedValue(() => 
    withTiming(
      isYesOpen ? measuredHeight.value : 0, 
      { duration: 300 }
    )
  );
  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    overflow: 'hidden',
  }));

  // formulario
  const { control, handleSubmit } = useForm<GeneralHealthProps>();
  const onChangeRef = useRef<(value: string[]) => void>(() => {});
  const valueRef = useRef<string[]>([]);
  const allergiesValue = useWatch({ control, name: "allergies_ids" });

  const {
    list: allergiesList,
    searchText,
    filteredData,
    addItemToList,
    removeItemFromList,
    handleSearch,
  } = useTagListModal({
    baseList: ALLERGIES,
    currentValue: allergiesValue ?? [],
    onChange: (v) => onChangeRef.current(v),
    setNotEmpty,
  });

  

  const handleNext = (data: GeneralHealthProps) => {
    if (data.allergies_ids && data.allergies_ids.length > 0 && notEmpty) {
      console.log(data);
      updateGeneralHealthData(data);
      router.push('/(app)/register-patient/general-health/step4');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setGeneralHealthData({});
    router.push('/(app)/register-patient/step9');
  }

  useEffect(() => {
    const current = allergiesValue || [];
    valueRef.current = allergiesValue || [];
    const hasOtherSelections = current.length > 0;


    setNotEmpty(hasOtherSelections);
  }, [allergiesValue, allergiesList]);

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
        title = 'A quais substâncias?'
        visible={modalSearchOpen}
        contentList={allergiesList}
        filteredData={filteredData}
        searchText={searchText}
        onClose={() => setModalSearchOpen(false)}
        onSearch={handleSearch}
        onAddItem={addItemToList}
        onRemoveItem={(item) => {
          removeItemFromList(item);
          const filtered = allergiesValue?.filter((v: string) => v !== item) || [];
          onChangeRef.current(filtered);
        }}
        onConfirm={() => {
          setModalSearchOpen(false);
          if (allergiesList.length > 0) {
            setNotEmpty(true);
            const currentValue = allergiesValue || [];
            const unique = allergiesList.filter(item => !currentValue.includes(item));
            onChangeRef.current([...currentValue, ...unique]);
          }
        }}
      />

      <Header title="Andecedentes clínicos" onPress={handleCancel} />

      <ScrollView className="px-6 w-full flex-1">
        <ProgressBar step={3} totalSteps={6} />

        <Text className="text-base text-gray-700 my-8">O paciente possui alergias?</Text>

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
                    checked={isYesOpen}
                    onPress={() => {
                      setIsYesOpen(true);
                      setNotEmpty(false);
                      if (value.includes("Não")) {
                        onChange(value.filter(v => v !== "Não"));
                      }
                    }}
                  />

                  <Animated.View style={animatedStyle}>
                    <View
                      style={{ position: 'absolute', width: '100%', visibility: isYesOpen ? 'visible' : 'hidden' }}
                      onLayout={(e) => {
                        measuredHeight.value = e.nativeEvent.layout.height;
                      }}
                    >
                      <View className="mx-6 mt-3">
                          <Text>A quais substâncias?</Text>
                          <TouchableOpacity
                            className="border border-gray-300 rounded-lg p-3 mb-4 mt-2"
                            activeOpacity={1}
                            onPress={() => setModalSearchOpen(true)}
                          >
                            <Text className="text-gray-300">Especifique as substâncias</Text>
                          </TouchableOpacity>

                          <View className="gap-2 mb-3">
                            {allergiesList.map((item) => (
                              <View key={item} className="flex-row gap-2 items-center bg-gray-200 rounded-lg px-3 py-2 self-start">
                                <Text className="w-auto max-w-[240px]">{item}</Text>
                                <TouchableOpacity onPress={() => removeItemFromList(item)}>
                                  <AntDesign name="close" size={12} color="#2C2C2C" />
                                </TouchableOpacity>
                              </View>
                            ))}
                          </View>
                        </View>
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
                    setIsYesOpen(false);
                    updateGeneralHealthData({ allergies_ids: newValue });
                    router.push('/(app)/register-patient/general-health/step4');
                  }}
                />
              </View>
            );
          }}
          name="allergies_ids"
        />
      </ScrollView>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push("/(app)/register-patient/general-health/step2")} 
          style={{ flexGrow: 1, width: '47%' }}
        />
        <Button 
          title="Próximo" 
          iconRight 
          icon={<AntDesign name="arrowright" size={14} color={`${notEmpty ? 'white' : '#B3B3B3'}`} />} 
          style={{ flexGrow: 1, width: '47%' }} 
          onPress={handleSubmit(handleNext)} 
          activeOpacity={notEmpty ? 0.2 : 1}
          disabled={notEmpty}
        />
      </View>
    </Animated.View>
  );
}
