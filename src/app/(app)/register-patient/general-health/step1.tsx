import Button from "@/components/Button";
import CheckButton from "@/components/CheckButton";
import Header from "@/components/Header";
import ModalTagSearch from "@/components/ModalTagSearch";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
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

const CHRONIC_DISEASES = [
  "Hipertensão arterial",
  "Diabetes mellitus tipo 1",
  "Diabetes mellitus tipo 2",
  "Asma brônquica",
  "Doença pulmonar obstrutiva crônica (DPOC)",
  "Insuficiência cardíaca",
  "Doença arterial coronariana",
  "Arritmia cardíaca",
  "Doença renal crônica",
  "Doença hepática crônica",
  "Doença de Alzheimer",
  "Doença de Parkinson",
  "Artrite reumatoide",
  "Osteoartrite",
  "Lúpus eritematoso sistêmico",
  "Esclerose múltipla",
  "Hipotireoidismo",
  "Hipertireoidismo",
  "Doença celíaca",
  "Fibrose cística",
  "Fibromialgia",
  "Depressão maior",
  "Transtorno bipolar",
  "Transtorno de ansiedade generalizada",
  "Epilepsia",
  "Doença de Crohn",
  "Retocolite ulcerativa",
  "Gota",
  "Anemia falciforme",
  "Talassemia",
  "Hemofilia",
  "HIV/Aids",
  "Câncer de mama (crônico)",
  "Câncer de próstata (crônico)",
  "Câncer colorretal (crônico)",
  "Esôfago de Barrett",
  "Doença arterial periférica",
  "Glaucoma",
  "Catarata",
  "Psoríase",
]

export default function GeneralHealthStep1() {
  const [isDiseasesOpen, setIsDiseasesOpen] = useState(false);
  const [notEmpty, setNotEmpty] = useState(false);
  const [isOtherDiseasesOpen, setIsOtherDiseasesOpen] = useState(false);
  const [modalSearchOpen, setModalSearchOpen] = useState(false);

  // animação accordion
  const measuredHeight = useSharedValue(0);
  const animatedHeight = useDerivedValue(() => 
    withTiming(
      isDiseasesOpen ? measuredHeight.value : 0, 
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
  const chronicDiseasesValue = useWatch({ control, name: "chronic_diseases" });

  const {
    list: diseasesList,
    searchText,
    filteredData,
    addItemToList,
    removeItemFromList,
    handleSearch,
  } = useTagListModal({
    baseList: CHRONIC_DISEASES,
    currentValue: chronicDiseasesValue ?? [],
    onChange: (v) => onChangeRef.current(v),
    setNotEmpty,
  });

  const handleNext = (data: GeneralHealthProps) => {
    if (data.chronic_diseases && data.chronic_diseases.length > 0 && notEmpty) {
      console.log(data);
    } else {
      return;
    }
  }

  const handleCancel = () => {
    router.push('/(app)/register-patient/step9');
  }

  useEffect(() => {
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

    setNotEmpty(hasOtherSelections);
  }, [chronicDiseasesValue, diseasesList, isOtherDiseasesOpen]);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >
      <ModalTagSearch
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

      <Header title="Andecedentes clínicos aaa" onPress={handleCancel} />

      <ScrollView className="px-6 w-full flex-1">
        <ProgressBar step={1} totalSteps={6} />

        <Text className="text-base text-gray-700 my-8">O paciente tem histórico de alguma doença crônica? </Text>

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
                        <View className="mx-6 mt-3">
                          <Text>Especifique</Text>
                          <TouchableOpacity
                            className="border border-gray-300 rounded-lg p-3 mb-4 mt-2"
                            activeOpacity={1}
                            onPress={() => setModalSearchOpen(true)}
                          >
                            <Text className="text-gray-300">Ex.:</Text>
                          </TouchableOpacity>

                          <View className="gap-2 mb-3">
                            {diseasesList.map((item) => (
                              <View key={item} className="flex-row gap-2 items-center bg-gray-200 rounded-lg px-3 py-2 self-start">
                                <Text className="w-auto max-w-[240px]">{item}</Text>
                                <TouchableOpacity onPress={() => removeItemFromList(item)}>
                                  <AntDesign name="close" size={12} color="#2C2C2C" />
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
                    onChange(["Não"]);
                    setNotEmpty(true);
                    setIsDiseasesOpen(false);
                  }}
                />
              </View>
            );
          }}
          name="chronic_diseases"
        />
      </ScrollView>

      <View className="px-6 w-full justify-start mb-4">
        <Button 
          title="Próximo" 
          iconRight 
          icon={<AntDesign name="arrowright" size={14} color={`${notEmpty ? 'white' : '#B3B3B3'}`} />} 
          style={{ marginTop: 24 }} 
          onPress={handleSubmit(handleNext)} 
          activeOpacity={notEmpty ? 0.2 : 1}
          disabled={notEmpty}
        />
      </View>
    </Animated.View>
  );
}
