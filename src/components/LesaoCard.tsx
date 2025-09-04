import { useLesionId } from '@/hooks/useLesionId';
import { router } from 'expo-router';
import { DiceFiveIcon } from 'phosphor-react-native';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type LesaoCardProps = TouchableOpacityProps & {
  title: string;
  type: string;
  lesionId: number;
}

export default function LesaoCard({title, type, lesionId, ...rest}: LesaoCardProps) {

  const { updateLesionId } = useLesionId();

  return (
    <TouchableOpacity 
      className="bg-white shadow-sm shadow-neutral-900 rounded-lg flex-row justify-start px-4 py-5 items-center gap-4"
      activeOpacity={0.6}
      onPress={()=> {
        updateLesionId(lesionId.toString());
        router.push({pathname: '/(app)/(patient)/lesao/[id]', params: { id: lesionId, type }});
      }}
      {...rest}
    >
      <View className={`h-12 w-12 rounded-lg justify-center items-center ${type === "cancer" ? 'bg-secondary-200' : 'bg-primary-200'}`}>
        <DiceFiveIcon size={24} color={`${type === "cancer" ? '#FF765E' : '#6775B4'}`} />
      </View>

      <View>

        <Text className='font-medium text-sm self-start mb-2 text-neutral-900'>
          {
            title === 'head_neck.scalp' ? 'Couro cabeludo' :
            title === 'head_neck.forehead' ? 'Testa' :
            title === 'head_neck.eyes' ? 'Olhos' :
            title === 'head_neck.nose' ? 'Nariz' :
            title === 'head_neck.mouth' ? 'Boca' :
            title === 'head_neck.ears' ? 'Orelhas' :
            title === 'head_neck.neck' ? 'Pescoço' :
            title === 'head_neck.face' ? 'Rosto' :
            title === 'trunk.chest_front' ? 'Tórax anterior' :
            title === 'trunk.chest_back' ? 'Tórax posterior' :
            title === 'trunk.upper_abdomen' ? 'Abdome superior' :
            title === 'trunk.lower_abdomen' ? 'Abdome inferior' :
            title === 'trunk.back' ? 'Costas' :
            title === 'trunk.flanks' ? 'Flancos' :
            title === 'pelvis.genitals' ? 'Genitais' :
            title === 'pelvis.pubis' ? 'Púbe' :
            title === 'pelvis.buttocks' ? 'Glúteos' :
            title === 'pelvis.coccyx' ? 'Cóccix' :
            title === 'extremities.shoulder_right' ? 'Ombro direito' :
            title === 'extremities.shoulder_left' ? 'Ombro esquerdo' :
            title === 'extremities.arm_right' ? 'Braço direito' :
            title === 'extremities.arm_left' ? 'Braço esquerdo' :
            title === 'extremities.forearm_right' ? 'Antebraço direito' :
            title === 'extremities.forearm_left' ? 'Antebraço esquerdo' :
            title === 'extremities.hand_right' ? 'Mão direita' :
            title === 'extremities.hand_left' ? 'Mão esquerda' :
            title === 'extremities.thigh_right' ? 'Coxa direita' :
            title === 'extremities.thigh_left' ? 'Coxa esquerda' :
            title === 'extremities.leg_right' ? 'Perna direita' :
            title === 'extremities.leg_left' ? 'Perna esquerda' :
            title === 'extremities.foot_right' ? 'Pé direito' :
            title === 'extremities.foot_left' ? 'Pé esquerdo' :
            'Lesão'
          }
        </Text>

        <View className={`rounded-full px-2 py-1 self-start ${type === "cancer" ? 'bg-secondary-100' : 'bg-primary-200'}`}>
          <Text className={`text-xs font-semibold ${type === "cancer" ? 'text-secondary-700' : 'text-primary-600'}`}>
            {type === "cancer" ? 'Oncodermato' : 'Úlcera venosa'}
          </Text>
        </View>
        
      </View>


    </TouchableOpacity>
  )
}