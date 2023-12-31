import { useRouter, Stack } from "expo-router";
import { useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { COLORS, FONT, SIZES, icons, images } from "../constants";
import {Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome} from "../components";

const Home = () => {
    const router = useRouter();
    const [searchText, setSearchText] = useState('')

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
                    ),
                    headerTitle: ""
                }}
                
            />
            <ScrollView
                showsHorizontalScrollIndicator={false}
            >
                <View style={{flex: 1, padding: SIZES.medium}}>
                    <Welcome 
                        searchText={searchText}
                        setSearchText={setSearchText}
                        handleClick={() => {
                            if(searchText)
                                router.push(`/search/${searchText}`)
                        }}
                    />
                    <Popularjobs />
                    <Nearbyjobs />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Home;