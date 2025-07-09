import Button from "@/components/Button";
import CheckButton from "@/components/CheckButton";
import Header from "@/components/Header";
import ModalTagSearch from "@/components/ModalTagSearch";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useGeneralHealthForm } from "@/hooks/useGeneralHealthForm";
import { useTagListModal } from "@/hooks/useTagListModal";
import { PersonalFamilyHistoryProps } from "@/types/forms";
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

const FAMILY_MEMBERS = [
  "Tio",
  "Tia",
  "Tio-avô",
  "Tia-avó",
  "Primo",
  "Prima",
  "Filho",
  "Filha",
  "Sobrinho",
  "Sobrinha",
  "Bisavô",
  "Bisavó"
];

export default function PersonalFamilyHistoryStep1() {
  const [isFamilyOpen, setIsFamilyOpen] = useState(false);
  const [notEmpty, setNotEmpty] = useState(false);
  const [isOtherOpen, setIsOtherOpen] = useState(false);
  const [modalSearchOpen, setModalSearchOpen] = useState(false);  
  
  const { generalHealthData, setGeneralHealthData, updateGeneralHealthData  } = useGeneralHealthForm();


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
  const { control, handleSubmit } = useForm<PersonalFamilyHistoryProps>();
  const onChangeRef = useRef<(value: string[]) => void>(() => {});
  const valueRef = useRef<string[]>([]);
  const familyHistoryValue = useWatch({ control, name: "family_history" });

  const {
    list: familyList,
    searchText,
    filteredData,
    addItemToList,
    removeItemFromList,
    handleSearch,
  } = useTagListModal({
    baseList: FAMILY_MEMBERS,
    currentValue: familyHistoryValue ?? [],
    onChange: (v) => onChangeRef.current(v),
    setNotEmpty,
  });

  

  const handleNext = (data: PersonalFamilyHistoryProps) => {
    if (data.family_history && data.family_history.length > 0 && notEmpty) {
      console.log(data);
      //updateGeneralHealthData(data);
      router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/personalFamilyHistory/step2');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    //setGeneralHealthData({});
    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/steps');
  }

  useEffect(() => {
    const isOutrosSelected = isOtherOpen;
    const current = familyHistoryValue || [];
    valueRef.current = familyHistoryValue || [];
    const hasOtherSelections = current.length > 0;
    const hasFamilyInList = familyList.length > 0;

    if (isOutrosSelected) {
      if (!hasFamilyInList) {
        setNotEmpty(false);
        return;
      }
      setNotEmpty(true);
      return;
    }

    setNotEmpty(hasOtherSelections);
  }, [familyHistoryValue, familyList, isOtherOpen]);

  // useEffect(() => {
  //   console.log(generalHealthData)
  // }, []);

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

      <ScrollView className="px-6 w-full flex-1">
        <ProgressBar step={1} totalSteps={4} />

        <Text className="text-base text-gray-700 my-8">O paciente tem histórico familiar de câncer de pele?</Text>

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
                      <Text className="px-0 mt-4">Qual grau de parentesco?</Text>
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
                              if (isSelected && familyList.length === 0) {
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
                            {familyList.map((item) => (
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
                    const newValue = ["Não"];
                    onChange(newValue);
                    setNotEmpty(true);
                    setIsFamilyOpen(false);
                    //updateGeneralHealthData({ chronic_diseases: newValue });
                    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/personalFamilyHistory/step2');
                  }}
                />
              </View>
            );
          }}
          name="family_history"
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
