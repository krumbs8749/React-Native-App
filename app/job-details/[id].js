import { useCallback, useState } from 'react'
import { Text, SafeAreaView, View, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import { useRouter, Stack, useLocalSearchParams } from 'expo-router'

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'

import useFetch from '../../hooks/useFetch'

const tabs = ['About', 'Qualifications', 'Responsibilities']

function JobDetails() {

    const router = useRouter();
    const params = useLocalSearchParams();
    
    const {data, loading, error,refetch } = useFetch('job-details', {job_id: params.id});
    
    const [refreshing, setRefreshing] = useState();
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const onRefresh = () => {};

    const displayTabContent = () => {
        switch(activeTab) {
            case "Qualifications":
        return (
          <Specifics
            title='Qualifications'
            points={data[params.id].qualifications ?? ["N/A"]}
          />
        );

        case "About":
            return (
            <JobAbout info={data[params.id].description ?? "No data provided"} />
            );

        case "Responsibilities":
            return (
            <Specifics
                title='Responsibilities'
                points={data[params.id].responsibilities ?? ["N/A"]}
            />
            );

        default:
            return null;
        }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerTitle: "",
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension='60%'
                        />
                    )
                }}
            />
            <>
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>}>
                    {loading ?
                        (<ActivityIndicator size='large' color={COLORS.primary}/>)
                                : error ? 
                                (<Text>Something went wrong</Text> )
                                        : data?.length === 0 ? 
                                        (<Text>No data</Text> )
                                            : 
                                            (<View style={{ padding: SIZES.medium, paddingBottom: 100 }} >
                                                <Company 
                                                    companyLogo={data[params.id].employer_logo}
                                                    jobTitle={data[params.id].job_title}
                                                    companyName={data[params.id].job_employer}
                                                    location={data[params.id].job_location}
                                                />
                                                <JobTabs 
                                                    tabs={tabs}
                                                    activeTab={activeTab}
                                                    setActiveTab={setActiveTab}
                                                />
                                                { displayTabContent()}
                                            </View> )  
                    }
                </ScrollView>
                <JobFooter url={ data?.length >= params.id + 1 && data[params.id]?.job_google_link ? data[params.id]?.job_google_link :  'https://careers.google.com/jobs/results/'} />
            </>   
           
        </SafeAreaView>
    )
}

export default JobDetails