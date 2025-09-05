import Button from '@/components/Button';
import Header from '@/components/Header';
import LesaoRegistroCard from '@/components/LesaoRegistroCard';
import { Loading } from '@/components/Loading';
import { useLesionId } from '@/hooks/useLesionId';
import { useLesionType } from '@/hooks/useLesionType';
import { usePatientId } from '@/hooks/usePatientId';
import { api } from '@/services/api';
import { LesionOncoProps, LesionProps } from '@/types/forms';
import axios from 'axios';

import { LinearGradient } from 'expo-linear-gradient';
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { CaretRightIcon, FilePdfIcon, PlusIcon } from 'phosphor-react-native';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function Lesao() {
  const [isLoading, setIsLoading] = useState(false);
  const [lesion, setLesion] = useState<LesionProps>({} as LesionProps);
  const [registro, setRegistro] = useState<LesionOncoProps[]>([]);

  const { type } = useLocalSearchParams<{ type: string }>();

  const { patientId } = usePatientId();
  const { setLesionId, lesionId } = useLesionId();
  const { updateLesionType, setLesionType } = useLesionType();

  async function loadLesionsById() {
    try {
      setIsLoading(true)
      const lesionsResponse = await api.get(`/patients/${patientId}/skin-conditions/${lesionId}`);

      setLesion(lesionsResponse.data);
      if(type === "cancer"){
        setRegistro(lesionsResponse.data.cancer_forms);
      } else {
        setRegistro(lesionsResponse.data.wounds);
      }
      //console.log(lesionsResponse.data);

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        console.log('AXIOS ERROR', error.message);
        console.log('CONFIG', error.config?.url);
      } else {
        console.log('UNKNOWN ERROR', error);
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await loadLesionsById();
      })();
    }, [patientId])
  );

  useEffect(() => {
    updateLesionType(null);
  }, []);

  if(isLoading){
    return (
      <View className="flex-1 bg-white p-safe justify-center items-center">
        <Loading />
      </View>
    )
  }

  return (
    <View className="flex-1 bg-primary-50 p-safe relative">

      <Header icon="back" title="Detalhes da lesão" onPress={()=> {
        setLesionId(null);
        setLesionType(null);
        router.push("/(app)/(patient)/patient/[id]")
        }} />

      <View className="flex-1 px-5 py-6">

        <View className="bg-white shadow-sm shadow-neutral-800 rounded-lg overflow-hidden">
          <View className="border-b border-neutral-300">
            <View 
              className="flex-row justify-start p-4 items-center gap-5"
            >
              <View className="flex-1">
                <Text className='text-base font-semibold text-neutral-900 mb-1'>
                  {
                    lesion.location === 'head_neck.scalp' ? 'Couro cabeludo' :
                    lesion.location === 'head_neck.forehead' ? 'Testa' :
                    lesion.location === 'head_neck.eyes' ? 'Olhos' :
                    lesion.location === 'head_neck.nose' ? 'Nariz' :
                    lesion.location === 'head_neck.mouth' ? 'Boca' :
                    lesion.location === 'head_neck.ears' ? 'Orelhas' :
                    lesion.location === 'head_neck.neck' ? 'Pescoço' :
                    lesion.location === 'head_neck.face' ? 'Rosto' :
                    lesion.location === 'trunk.chest_front' ? 'Tórax anterior' :
                    lesion.location === 'trunk.chest_back' ? 'Tórax posterior' :
                    lesion.location === 'trunk.upper_abdomen' ? 'Abdome superior' :
                    lesion.location === 'trunk.lower_abdomen' ? 'Abdome inferior' :
                    lesion.location === 'trunk.back' ? 'Costas' :
                    lesion.location === 'trunk.flanks' ? 'Flancos' :
                    lesion.location === 'pelvis.genitals' ? 'Genitais' :
                    lesion.location === 'pelvis.pubis' ? 'Púbe' :
                    lesion.location === 'pelvis.buttocks' ? 'Glúteos' :
                    lesion.location === 'pelvis.coccyx' ? 'Cóccix' :
                    lesion.location === 'extremities.shoulder_right' ? 'Ombro direito' :
                    lesion.location === 'extremities.shoulder_left' ? 'Ombro esquerdo' :
                    lesion.location === 'extremities.arm_right' ? 'Braço direito' :
                    lesion.location === 'extremities.arm_left' ? 'Braço esquerdo' :
                    lesion.location === 'extremities.forearm_right' ? 'Antebraço direito' :
                    lesion.location === 'extremities.forearm_left' ? 'Antebraço esquerdo' :
                    lesion.location === 'extremities.hand_right' ? 'Mão direita' :
                    lesion.location === 'extremities.hand_left' ? 'Mão esquerda' :
                    lesion.location === 'extremities.thigh_right' ? 'Coxa direita' :
                    lesion.location === 'extremities.thigh_left' ? 'Coxa esquerda' :
                    lesion.location === 'extremities.leg_right' ? 'Perna direita' :
                    lesion.location === 'extremities.leg_left' ? 'Perna esquerda' :
                    lesion.location === 'extremities.foot_right' ? 'Pé direito' :
                    lesion.location === 'extremities.foot_left' ? 'Pé esquerdo' :
                    'Lesão'
                  }
                </Text>
                <View className={`rounded-full px-2 py-1 self-start ${type === "cancer" ? 'bg-secondary-200' : 'bg-primary-200'}`}>
                  <Text className={`text-xs font-semibold ${type === "cancer" ? 'text-secondary-700' : 'text-primary-600'}`}>
                    {type === "cancer" ? 'Oncodermato' : 'Úlcera venosa'}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="border-b border-neutral-300">
            <TouchableOpacity 
              className="flex-row justify-start px-4 py-[10] items-center gap-5"
            >
              <FilePdfIcon size={24} color="#6775B4" />
              <Text className='text-base text-neutral-900 flex-1'>Gerar PDF</Text>
              <CaretRightIcon size={16} color="#7D83A0" />
            </TouchableOpacity>
          </View>

          <View className="border-b border-neutral-300">
            {type === "cancer" ? (
              <TouchableOpacity 
                className="flex-row justify-start px-4 py-[10] items-center gap-5"
                onPress={()=> router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/anamnesisDetails')}
              >
                <FilePdfIcon size={24} color="#6775B4" />
                <Text className='text-base text-neutral-900 flex-1'>Anamnese Oncodermato</Text>
                <CaretRightIcon size={16} color="#7D83A0" />
              </TouchableOpacity>
            )
            : (
              <TouchableOpacity 
                className="flex-row justify-start px-4 py-[10] items-center gap-5"
                onPress={()=> router.push('/(app)/(patient)/lesao/anamnesis/ulcera/anamnesisDetails')}
              >
                <FilePdfIcon size={24} color="#6775B4" />
                <Text className='text-base text-neutral-900 flex-1'>Anamnese Úlcera Venosa</Text>
                <CaretRightIcon size={16} color="#7D83A0" />
              </TouchableOpacity>
            )}
          </View>


        </View>

        
        <Text className="text-xl mb-4 font-semibold mt-8 text-neutral-900">Histórico de registros</Text>

        <View className="flex-1">
          <FlatList
              data={registro}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => <LesaoRegistroCard lesionDate={item.created_at} registroId={item.id} imagesNumber={item.images.length} activeOpacity={1} lesionType={type} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom:50,
                gap: 10
              }}
            />
            <LinearGradient
              colors={['rgba(255,255,255,0)', '#F5F6FA']}
              className="absolute bottom-0 left-0 right-0 h-[20]"
              pointerEvents="none"
            />
        </View>

      </View>

      <View className="absolute bottom-0 m-auto w-full justify-center items-center mb-12 z-10">
        <Button 
          title="Fazer novo registro" 
          style={{ width: 194 }} 
          iconLeft 
          icon={(<PlusIcon size={18} color="white" weight="bold" />)} 
          onPress={()=> {
            updateLesionType(type);
            if(type === "cancer"){
              router.push("/(app)/(patient)/register-lesao/oncodermato/step2")
            } else {
              router.push({pathname: "/(app)/(patient)/register-lesao/ulcera/step2", params: { patientId }})
            }
          }} 
        />
      </View>

    </View>
  );
}
