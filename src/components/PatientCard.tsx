import { usePatientId } from '@/hooks/usePatientId';
import { formatCPF } from '@/utils/formatCPF';
import { router } from 'expo-router';
import { UserIcon } from 'phosphor-react-native';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type PatientCardProps = TouchableOpacityProps & {
  name: string;
  cpf: string;
  id: string;
  profissional?: boolean;
}

export default function PatientCard({name, cpf, id, profissional = false, ...rest}: PatientCardProps) {

  const { patientId, updatePatientId, setPatientId } = usePatientId();

  const handleGoToPatient = () => {
    updatePatientId(id.toString());
    if(profissional === true){
      router.push("/(app)/(profissional)/profissionalDetails/[id]");
    } else {
      router.push("/(app)/(patient)/patient/[id]");
    }
  }

  // useEffect(() => {
  //   if (id) {
  //     updatePatientId(id.toString());
  //     console.log("id:", patientId)
  //   } 
  // }, [id, patientId]);

  return (
    <TouchableOpacity 
      className="bg-white rounded-xl flex-row justify-start px-4 py-5 items-center gap-4 shadow-sm shadow-neutral-800"
      activeOpacity={0.6}
      // onPress={()=> router.push({pathname: "/(app)/(patient)/patient/[id]", params: { id }})}
      onPress={handleGoToPatient}
      {...rest}
    >

      <View className="rounded-full bg-secondary-100 overflow-hidden w-10 h-10 justify-center items-center">
        <UserIcon size={25} color="#FF765E" weight="bold" />
      </View>

      <View>
        <Text allowFontScaling={false} className='font-semibold text-base text-neutral-900'>{name}</Text>
        <Text allowFontScaling={false} className='text-sm mt-1 text-neutral-600'>{formatCPF(cpf)}</Text>
      </View>
    </TouchableOpacity>
  )
}