import React from 'react'
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { peaceTrackList } from '../../constant/constants';
import * as Haptics from 'expo-haptics';


export const Peace = ({props}: any) => {
    return (
        <View>
            <Text style={styles.heading} >Peace Musics</Text>
            <ScrollView horizontal={true}>
                {
                    peaceTrackList.map(items => {
                        const {track, trackDesc, trackAudioSrc, trackImgSrc} = items;
                        return (
                            <View key={track} style={styles.body}>
                                <TouchableOpacity
                                    onPress={() => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), props.navigation.navigate("Player", {track, trackDesc, trackAudioSrc, trackImgSrc})}}>
                                    <View style={styles.container} >
                                        <View style={styles.card}>
                                            <Image source={{ uri: `${trackImgSrc}` }} style={styles.icons} />
                                        </View>
                                    </View>
                                    <Text style={styles.title}>
                                        {track}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default Peace

const styles = StyleSheet.create({
    body: {
        padding: 5
    },
    heading: {
        color: '#14213D',
        textTransform: 'capitalize',
        fontSize: 18,
        marginLeft: 12,
        marginTop: 40
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        width: 120,
        borderRadius: 20,

    },
    card: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    icons: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        width: 120,
        margin: 5,
        borderRadius: 20,
    },
    title: {
        textTransform: 'capitalize',
        fontSize: 15,
        color: '#14213D',
        marginLeft: 12,
        marginTop: 10,
    }
})