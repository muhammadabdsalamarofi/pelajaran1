import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';

const Tab = createBottomTabNavigator();

function App() {
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://equran.id/api/v2/surat',
      responseType: 'json',
    }).then(function (response) {
      setDatas(response.data.data);
    });
  }, []);

  const HandleSurah = () => {
    return (
      <ScrollView>
        {data.ayat?.map((item, index) => (
          <View style={styles.contenBody} key={index}>
            <Text style={styles.ayat}>{item.ar}</Text>
            <Text>
              {item.nomor}.{item.idn}
            </Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  const getHandleAmbilPerSurah = (surahNumber) => {
    axios({
      method: 'get',
      url: `https://equran.id/api/v2/surat/${surahNumber}`,
      responseType: 'json',
    }).then(function (response) {
      setData(response.data);
    });
  };

  const HandleListSurah = () => {
    return (
      <ScrollView>
        {datas?.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.contenBody}
            onPress={() => {
              setIsOpen(true);
              getHandleAmbilPerSurah(item.nomor);
            }}
          >
            <Text style={styles.ayat}>{item.nama}</Text>
            <Text>
              {index + 1}.{item.nama_latin}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const HandleJuz = () => {
    return (
      <ScrollView>
        {/* Tambahkan JSX untuk menangani Juz di sini */}
        <View style={styles.contenBody}>
          <Text style={styles.ayat}>Contoh Juz</Text>
        </View>
      </ScrollView>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name={isOpen ? 'Full Kumpulan Surat Al-Quran' : 'Full Kumpulan Surat Al-Quran'}
          component={isOpen ? HandleSurah : HandleListSurah}
        />
        <Tab.Screen name="Juz" component={HandleJuz} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  contenBody: {
    margin: 20,
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 8,
  },
  ayat: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default App;