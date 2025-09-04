import { XIcon } from 'phosphor-react-native';
import React, { useEffect, useRef } from 'react';
import { Dimensions, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import Button from './Button';
import Header from './Header';

const { height } = Dimensions.get('window');

type Props = {
  visible: boolean;
  title: string;
  contentList: string[];
  filteredData: string[];
  searchText: string;
  onClose: () => void;
  onSearch: (text: string) => void;
  onAddItem: (item: string) => void;
  onRemoveItem: (item: string) => void;
  onConfirm: () => void;
};

export default function ModalTagSearch({
  visible,
  title,
  contentList,
  filteredData,
  searchText,
  onClose,
  onSearch,
  onAddItem,
  onRemoveItem,
  onConfirm
}: Props) {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideOutDown}
      className="flex-1 bg-white p-safe justify-start items-start w-full absolute top-0 left-0 z-50"
      style={{ height }}
    >
      <Header title={title} onPress={onClose} />

      <View className="flex-row px-4 py-2 flex-wrap gap-2 border-t border-neutral-300">
        {contentList.map((item) => (
          <View key={item} className="flex-row gap-2 items-center bg-primary-100 rounded-lg px-3 py-1 h-[32px]">
            <Text className="text-neutral-700 text-sm font-medium">{item}</Text>
            <TouchableOpacity onPress={() => onRemoveItem(item)}>
              <XIcon size={12} color="#7D83A0" weight="bold" />
            </TouchableOpacity>
          </View>
        ))}
        <TextInput
          ref={inputRef}
          placeholder="Buscar..."
          value={searchText}
          onChangeText={onSearch}
          textAlignVertical="center"
          className="bg-white flex-1 h-[32px] p-0 leading-none m-0 border-0 min-w-10 text-neutral-900"
        />
      </View>

      <View className="flex-1 w-full">
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onAddItem(item)}
              className="border-t border-neutral-300 px-4 py-3 w-full"
              key={item}
            >
              <Text className='text-neutral-900 text-base'>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            searchText.length > 0 ? (
              <TouchableOpacity
                onPress={() => onAddItem(searchText)}
                className="border-t border-gray-300 px-4 py-3 w-full"
              >
                <Text>{searchText}</Text>
              </TouchableOpacity>
            ) : null
          }
        />
      </View>

      <View className="px-6 w-full justify-start mb-4">
        <Button
          title="Concluir"
          style={{ marginTop: 24 }}
          onPress={onConfirm}
        />
      </View>
    </Animated.View>
  );
}
