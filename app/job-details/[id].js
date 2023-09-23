import { useCallback, useState } from 'react'
import { Text, SafeAreaView, View, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import { useRouter, Stack, useLocalSearchParams } from 'expo-router'

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'

import useFetch from '../../hooks/useFetch'

function JobDetails() {
    const router = useRouter();
    const params = useLocalSearchParams();
    
    const {data, loading, error,refetch } = useFetch('job-details', {job_id: params.id});
    
    const [refreshing, setRefreshing] = useState();

    const onRefresh = () => {};

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerTitle: '',
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        ></ScreenHeaderBtn>
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension='60%'
                        ></ScreenHeaderBtn>
                    )
                }}
            >
             <>
                <ScrollView showsHorizontalScrollIndicator={false} refreshControl={<RefreshControl refreshing onRefresh></RefreshControl>}>
                    {loading ? <ActivityIndicator size='large' color={COLORS.primary}/>
                             : error ? <Text>Something went wrong</Text> 
                                     : data?.length <= 0 ? <Text>No data</Text> 
                                                         : <View
                                                            style={{ padding: SIZES.medium, paddingBottom: 100 }}
                                                         >
                                                            <Company 
                                                            
                                                            />
                                                            <JobTabs 
                                                            
                                                            />
                                                         </View>   
                    }
                </ScrollView>
             </>   
            </Stack.Screen>
        </SafeAreaView>
    )
}

export default JobDetails