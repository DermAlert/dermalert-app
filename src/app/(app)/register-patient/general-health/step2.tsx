import Button from "@/components/Button";
import Header from "@/components/Header";
import ModalTagSearch from "@/components/ModalTagSearch";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { usePatientAPI } from "@/hooks/api/usePatientAPI";
import { useGeneralHealthForm } from "@/hooks/useGeneralHealthForm";
import { useTagListModal } from "@/hooks/useTagListModal";
import { GeneralHealthProps } from "@/types/forms";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
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

// const MEDICINES = [
//   "Paracetamol",
//   "Dipirona sódica",
//   "Ibuprofeno",
//   "Ácido acetilsalicílico",
//   "Amoxicilina",
//   "Azitromicina",
//   "Cefalexina",
//   "Ciprofloxacino",
//   "Metformina",
//   "Glibenclamida",
//   "Insulina humana NPH",
//   "Insulina glargina",
//   "Enalapril",
//   "Losartana potássica",
//   "Atenolol",
//   "Amlodipino",
//   "Furosemida",
//   "Hidroclorotiazida",
//   "Sinvastatina",
//   "Rosuvastatina",
//   "Omeprazol",
//   "Pantoprazol",
//   "Ranitidina",
//   "Salbutamol (aerossol)",
//   "Budesonida + formoterol",
//   "Beclometasona",
//   "Prednisona",
//   "Hidrocortisona",
//   "Loratadina",
//   "Cetirizina",
//   "Desloratadina",
//   "Nimesulida",
//   "Diclofenaco sódico",
//   "Celecoxibe",
//   "Clopidogrel",
//   "Varfarina sódica",
//   "Heparina",
//   "Sertralina",
//   "Fluoxetina",
//   "Citalopram",
//   "Risperidona",
//   "Quetiapina",
//   "Haloperidol",
//   "Carbamazepina",
//   "Fenitoína",
//   "Ácido valpróico",
//   "Levodopa + benserazida",
//   "Alendronato de sódio",
//   "Colecalciferol (vitamina D)",
// ]

export default function GeneralHealthStep2() {
  const [isYesOpen, setIsYesOpen] = useState(false);
  const [notEmpty, setNotEmpty] = useState(false);
  const [modalSearchOpen, setModalSearchOpen] = useState(false);  

  
  const { generalHealthData, setGeneralHealthData, updateGeneralHealthData  } = useGeneralHealthForm();
  const { loadMedicines, medicinesDataList } = usePatientAPI();

  


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
  const { control, handleSubmit } = useForm<GeneralHealthProps>(
    {
      defaultValues: {
        medicines: generalHealthData.medicines && generalHealthData.medicines.length === 0 ? ["Não"] : undefined
      }
    }
  );
  const onChangeRef = useRef<(value: string[]) => void>(() => {});
  const valueRef = useRef<string[]>([]);
  const medicinesValue = useWatch({ control, name: "medicines" });

  const {
    list: medicinesList,
    searchText,
    filteredData,
    setList,
    addItemToList,
    removeItemFromList,
    handleSearch,
  } = useTagListModal({
    baseList: medicinesDataList,
    currentValue: medicinesValue ?? [],
    onChange: (v) => onChangeRef.current(v),
    setNotEmpty,
    fixedOptions: ["Não"]
  });

  

  const handleNext = (data: GeneralHealthProps) => {
    if (data.medicines && data.medicines.length > 0 && notEmpty) {

      const sendData = data.medicines.includes("Não") ? [] : data.medicines;
  
      console.log({ medicines: sendData});
      updateGeneralHealthData({ medicines: sendData}); 
      //console.log(data);
      //updateGeneralHealthData(data);
      router.push('/(app)/register-patient/general-health/step3');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setGeneralHealthData({});
    router.push('/(app)/register-patient/step9');
  }

  useEffect(() => {
    if (generalHealthData.medicines && generalHealthData.medicines.length > 0) {
  
      onChangeRef.current([
        ...generalHealthData.medicines
      ]);
  
    }
  }, [generalHealthData, setList]);

  useEffect(() => {
    const current = medicinesValue || [];
    valueRef.current = medicinesValue || [];
    const hasOtherSelections = current.length > 0;

    if(generalHealthData.medicines && generalHealthData.medicines?.length > 0) {
      setNotEmpty(true);
      setIsYesOpen(true);
    }


    setNotEmpty(hasOtherSelections);
  }, [medicinesValue, medicinesList]);

  useEffect(() => {
    console.log(generalHealthData)
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadMedicines()
    },[])
  )

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >
      <ModalTagSearch
        title = 'Quais medicamentos?'
        visible={modalSearchOpen}
        contentList={medicinesList}
        filteredData={filteredData}
        searchText={searchText}
        onClose={() => setModalSearchOpen(false)}
        onSearch={handleSearch}
        onAddItem={addItemToList}
        onRemoveItem={(item) => {
          removeItemFromList(item);
          const filtered = medicinesValue?.filter((v: string) => v !== item) || [];
          onChangeRef.current(filtered);
        }}
        onConfirm={() => {
          setModalSearchOpen(false);
          if (medicinesList.length > 0) {
            setNotEmpty(true);
            const currentValue = medicinesValue || [];
            const unique = medicinesList.filter(item => !currentValue.includes(item));
            onChangeRef.current([...currentValue, ...unique]);
          }
        }}
      />

      <Header title="Andecedentes clínicos" onPress={handleCancel} />

      <ScrollView className="px-8 pb-6 w-full flex-1">
        <ProgressBar step={2} totalSteps={6} />

        <Text allowFontScaling={false} className="text-base text-neutral-900 mt-6 mb-8">O paciente faz uso regular de medicamentos? </Text>

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
                      <View className="mx-4 mt-6">
                          <Text allowFontScaling={false} className="text-neutral-900 font-semibold text-base">Quais medicamentos?</Text>
                          <TouchableOpacity
                            className="border border-neutral-300 rounded-lg p-4 mb-4 mt-2"
                            activeOpacity={1}
                            onPress={() => setModalSearchOpen(true)}
                          >
                            <Text allowFontScaling={false} className="text-neutral-400">Especifique os medicamentos</Text>
                          </TouchableOpacity>

                          <View className="gap-2 mb-3">
                            {medicinesList.map((item) => (
                              <View key={item} className="flex-row gap-2 items-center bg-primary-100 rounded-lg px-2 py-[6px] self-start">
                              <Text allowFontScaling={false} className="w-auto max-w-[240px] text-neutral-700 text-sm font-medium">{item}</Text>
                              <TouchableOpacity onPress={() => removeItemFromList(item)}>
                                <XIcon size={12} color="#7D83A0" weight="bold" />
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
                    setIsYesOpen(false)
                    updateGeneralHealthData({ medicines: [] });
                    router.push('/(app)/register-patient/general-health/step3');
                  }}
                />
              </View>
            );
          }}
          name="medicines"
        />
      </ScrollView>

      <View className="gap-4 mt-6 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
          onPress={()=> router.push("/(app)/register-patient/general-health/step1")} 
          style={{ flexGrow: 1, width: '47%' }}
        />
        <Button 
          title="Próximo" 
          iconRight 
          icon={<ArrowRightIcon size={24} color={`${notEmpty ? 'white' : '#D4D6DF'}`} />} 
          style={{ flexGrow: 1, width: '47%' }} 
          onPress={handleSubmit(handleNext)} 
          activeOpacity={notEmpty ? 0.2 : 1}
          disabled={notEmpty}
        />
      </View>
    </Animated.View>
  );
}
