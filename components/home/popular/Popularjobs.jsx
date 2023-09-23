import React, {useState} from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import useFetch from '../../../hooks/useFetch'

const Popularjobs = () => {
  const router = useRouter();

  const { data, loading, error } = useFetch(
    'search',
    {
      query: 'Java Developer',
      num_pages: 1
    }
  );

  const [selectedJob, setSelectedJob] = useState();
  const handleCardPress = (item) => {
    console.log(item);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {loading 
          ? <ActivityIndicator size={SIZES.large} color={COLORS.primary} />
          : error 
            ? <Text>Something went wrong</Text>
            : <FlatList 
              data={data}
              renderItem={({item}) => (
                <PopularJobCard 
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
                />
              )}
              keyExtractor={item => item?.job_id} 
              contentContainerStyle={{ columnGap: SIZES.medium }}
              horizontal
              showsHorizontalScrollIndicator={false} 
              />
        }
      </View>
    </View>
  )
}

export default Popularjobs