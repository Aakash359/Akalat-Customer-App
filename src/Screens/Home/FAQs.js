import React, {useState, useEffect} from 'react'
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import {Icon} from 'native-base'
import {Colors, Scale, ImagesPath} from '../../CommonConfig'
import {useNavigation} from '@react-navigation/native'
import {useSelector, useDispatch} from 'react-redux'
import {FAQRequest} from '../../redux/actions'
import {Menu} from 'react-native-paper'
import Accordion from 'react-native-collapsible/Accordion'

function FAQs() {
  const navigation = useNavigation()
  const {navigate} = useNavigation()
  const dispatch = useDispatch()
  const faqResponse = useSelector((state) => state.Setting.faqResponse)
  const [faqsList, setFaqsList] = React.useState([])

  useEffect(() => {
    dispatch(FAQRequest())
  }, [])

  // const renderItems = ({item, title}) => <Text>hello</Text>

  console.log('====================================')
  console.log('Aakash====>', faqsList)
  console.log('====================================')

  const SECTIONS = [
    {
      title: 'First',
      content: 'Lorem ipsum...',
    },
    {
      title: 'Second',
      content: 'Lorem ipsum...',
    },
  ]
  const _updateSections = (activeSections) => {
    setFaqsList(activeSections)
  }

  const _renderHeader = (section) => {
    const index = faqResponse?.data?.faq.findIndex(
      (i) => i.faq_id === section.faq_id,
    )

    const iconName = index === faqsList[0] ? 'chevron-up' : 'chevron-down'

    return (
      <View
        style={{
          margin: 10,
          paddingVertical: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 16, fontWeight: '600'}}>
          {section.question}
        </Text>
        <Icon
          name={iconName}
          type="Ionicons"
          style={{fontSize: 25, color: 'lightgrey'}}
        />
      </View>
    )
  }

  const _renderContent = (section) => {
    return (
      <View style={{margin: 10}}>
        <Text style={{fontSize: 16}}>{section.answer}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={Colors.APPCOLOR}
        barStyle="light-content"
      />
      <View style={styles.headerContainer}>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrowleft"
          type="AntDesign"
          style={styles.logoStyle}
        />
      </View>
      <Text style={styles.headerText}>FAQs </Text>

      <ImageBackground
        source={ImagesPath.background}
        style={styles.loginInputCont}>
        {/* <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 30}}
          data={faqResponse?.data?.faq}
          renderItem={renderItems}
          keyExtractor={(item, index) => index.toString()}
        /> */}
        <Accordion
          sections={faqResponse?.data?.faq || []}
          activeSections={faqsList}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={_updateSections}
          touchableComponent={TouchableOpacity}
          renderFooter={() => (
            <View style={{height: 2, backgroundColor: '#E0E0E0'}}></View>
          )}
        />
      </ImageBackground>
    </View>
  )
}
export default FAQs
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APPCOLOR,
  },
  loginInputCont: {
    flex: 1,
    paddingTop: Scale(10),
    paddingBottom: Scale(20),
    paddingHorizontal: Scale(15),
    borderTopLeftRadius: Scale(25),
    borderTopRightRadius: Scale(25),
    backgroundColor: Colors.WHITE,
  },
  headerText: {
    fontSize: Scale(20),
    marginHorizontal: Scale(25),
    marginBottom: Scale(25),
    color: Colors.WHITE,
  },
  notificationStyle: {
    width: Scale(25),
    height: Scale(25),
    resizeMode: 'contain',
    tintColor: Colors.WHITE,
    alignSelf: 'flex-end',
  },
  headerContainer: {
    paddingTop: Scale(20),
    height: Scale(80),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.APPCOLOR,
    paddingHorizontal: Scale(25),
  },

  logoStyle: {
    marginTop: Scale(15),
    fontSize: Scale(25),
    color: Colors.WHITE,
  },
})
