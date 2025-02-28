import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import theme from '../../../theme/theme'
import Separator from '../../../components/common/Separator';

const Home = () => {
    const { colors, fonts } = theme;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors?.white }}>
            <View style={{ paddingHorizontal: 16, paddingVertical: 26, flex: 1 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../../../assets/images/home.png')}
                        style={{ width: 224, height: 170 }}
                        resizeMode="contain"
                    />
                </View>
                <Separator height={40} />
                <Text style={{ color: colors?.primaryBlack, fontSize: 26, fontFamily: fonts?.semiBold, textAlign: 'center' }}>Your Location & Your Ip Address</Text>
                <Separator height={40} />
                <View>
                    <Text style={{ color: colors?.primaryGray, fontFamily: fonts?.regular, fontSize: 16 }}>Ip Address : <Text style={{ color: "#FF6B6B", fontFamily: fonts?.regular, fontSize: 16 }}>117.243.247.109</Text></Text>
                    <Separator height={16} />
                    <Text style={{ color: colors?.primaryGray, fontFamily: fonts?.regular, fontSize: 16 }}>Country : <Text style={{ color: "#2ECC71", fontFamily: fonts?.regular, fontSize: 16 }}>India</Text></Text>
                </View>
                <View style={{ flex: 1 }} />
                <Pressable style={{ borderRadius: 18, backgroundColor: "#F2F3F2", padding: 16, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: colors?.primaryGreen, fontFamily: fonts?.semiBold, fontSize: 18 }}>Log Out</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})