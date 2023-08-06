import React, {useState} from 'react'
import { 
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { useRouter } from 'expo-router'
import styles from './welcome.style'
import {icons, SIZES} from '../../../constants'


const jobTypes = ['Full Time', 'Part Time', 'Internship', 'Student Worker', 'Contractor'];


const Welcome = () => {
  const router = useRouter()
  const [activeJob, setActiveJob] = useState('Full time')
  return (
    <View>
        <View style={styles.container}>
          <Text style={styles.userName}>Hello Ikram</Text>
          <Text style={styles.welcomeMessage}>Find your perfect job!</Text>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput 
              style={styles.searchInput}
              value=''
              placeholder='What are you looking for?'
              onChange={() => {}}
            />
          </View>
          <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
              <Image 
                source={icons.search} 
                resizeMode='contain'
                style={styles.searchBtnImage} 
              />
          </TouchableOpacity>
        </View>
        <View style={styles.tabsContainer}>
          <FlatList 
            data={jobTypes}
            renderItem={({item}) => (
              <TouchableOpacity 
                style={styles.tab(activeJob, item)} 
                onPress={() => {
                  setActiveJob(item)
                  router.push(`/search/${item}`);
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
    </View>
    
  )
}

export default Welcome