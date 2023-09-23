import React, {useState} from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import styles from './nearbyjobs.style'
import { COLORS, SIZES } from '../../../constants'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
import useFetch from '../../../hooks/useFetch'

const Nearbyjobs = () => {
  const router = useRouter();

  const { data, loading, error } = useFetch(
    'search',
    {
      query: 'Java Developer',
      num_pages: 1
    }
  );

  const handleCardPress = (item) => {
    console.log(item);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {loading 
          ? <ActivityIndicator size={SIZES.large} color={COLORS.primary} />
          : error 
            ? <Text>Something went wrong</Text>
            : data.map((job, index) => (
              <NearbyJobCard
                job={job}
                key={`nearby-job-${index}`}
                handleNavigate={() => router.push(`/job-details/${index}`)}
              ></NearbyJobCard>
            ))
        }
      </View>
    </View>
  )
}

export default Nearbyjobs