import Input from '@/components/Input';
import { api } from '@/services/api';
import { PatientProps } from '@/types/forms';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeftIcon, MagnifyingGlassIcon } from 'phosphor-react-native';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FlatList, Modal, TextInput, TouchableOpacity, View } from 'react-native';
import { EmptyPatients } from './EmptyPatients';
import { Loading } from './Loading';
import PatientCard from './PatientCard';

type Props = {
  modalVisible: boolean,
  setModalVisible: (modalVisible: boolean) => void,
}

export default function PatientSearch({ modalVisible, setModalVisible }: Props) {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [patients, setPatients] = useState<PatientProps[]>([]);

  const searchInputRef = useRef<TextInput>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    control,
  } = useForm()

  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    searchTimeoutRef.current = setTimeout(() => {
      setPage(1);
      setPatients([]);
      setHasMore(true);
      loadPatients(1, searchText);
    }, 400);

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchText]);

  const loadPatients = async (pageNumber: number, search: string) => {
    if (isLoading || (!hasMore && search.length === 0)) return;
    setIsLoading(true);

    try {
      const endpoint = search.length > 0
        ? `/patients/?search=${encodeURIComponent(search)}`
        : `/patients/?page=${pageNumber}`;

      const { data } = await api.get(endpoint);
      const newPatients = data.results || [];

      setPatients(prev => pageNumber === 1 ? newPatients : [...prev, ...newPatients]);

      if (search.length === 0 && data.next) {
        setHasMore(true);
        setPage(prev => prev + 1);
      } else if (search.length === 0) {
        setHasMore(false);
      }
      
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [modalVisible]);

  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      visible={modalVisible}
      transparent={false}
      backdropColor="#F5F6FA"
      statusBarTranslucent={false}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <View className="flex-1 justify-center items-center bg-primary-50 w-full p-0 m-0">
        <View className="flex-row w-full h-[68] px-4 items-center justify-start gap-4">
          <TouchableOpacity activeOpacity={0.7} className="justify-center items-center h-10 w-10" onPress={() => setModalVisible(!modalVisible)}>
            <ArrowLeftIcon size={24} color="#4052A1" />
          </TouchableOpacity>
          <View className='flex-1'>
            <Input
              ref={searchInputRef}
              formProps={{
                control,
                name: "patient",
              }}
              inputProps={{
                placeholder: "Buscar paciente",
                returnKeyType: "send",
                onChangeText: handleSearch,
                value: searchText,
              }}
              icon={<MagnifyingGlassIcon size={22} color="#7D83A0" />}
            />
          </View>
        </View>

        <View className="flex-1 w-full px-4 mt-6">
          <FlatList
            data={patients}
            keyExtractor={(item) => `${item.user?.cpf}-${item.user?.id}`}
            renderItem={({ item }) =>
              <PatientCard
                name={item.user?.name || ''}
                cpf={item.user?.cpf || ''}
                id={item.user?.id?.toString() ?? ''}
              />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ marginBottom: 0, gap: 10 }}
            onEndReached={() => {
              if (!isLoading && hasMore && searchText.length === 0) {
                loadPatients(page, "");
              }
            }}
            onEndReachedThreshold={0.3}
            ListFooterComponent={() => isLoading ? <Loading /> : null}
            ListEmptyComponent={() => !isLoading && <EmptyPatients title="Nenhum paciente encontrado" description="Nenhum resultado encontrado para esta busca." />}
            initialNumToRender={7}
          />
          <LinearGradient
            colors={['rgba(255,255,255,0)', '#F5F6FA']}
            className="absolute bottom-0 left-0 right-0 h-[30]"
            pointerEvents="none"
          />
        </View>
      </View>
    </Modal>
  );
}
