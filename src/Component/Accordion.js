import React, {useState} from 'react'
import {View, TouchableOpacity, Text, FlatList, StyleSheet} from 'react-native'
import {Icon} from 'native-base'
import {Colors, Scale, Fonts} from '../CommonConfig'

const Accordion = ({item}) => {
  const [expanded, setExpanded] = useState(false)
  const {title, data} = item

  const handleExpanded = () => {
    setExpanded(!expanded)
  }
  return (
    <View>
      <TouchableOpacity
        style={[styles.row, {borderBottomColor: expanded ? '#fff' : '#E0E0E0'}]}
        onPress={handleExpanded}>
        <View style={styles.LeftContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
        <View style={styles.RightContainer}>
          <Icon
            type="MaterialIcons"
            name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={30}
            style={{color: Colors.GRAY}}
            color="white"
          />
        </View>
      </TouchableOpacity>
      {expanded && data.length > 0 && (
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <View style={styles.button}>
              <Text style={styles.itemInActive}>{item.key}</Text>
            </View>
          )}
        />
      )}
    </View>
  )
}

export default Accordion

const styles = StyleSheet.create({
  button: {
    alignItems: 'flex-start',
    borderBottomWidth: 2,
    borderBottomColor: '#00000029',
    marginHorizontal: Scale(12),
  },
  title: {
    fontSize: Scale(16),
    fontWeight: 'bold',
  },
  itemInActive: {
    paddingBottom: Scale(10),
    fontSize: Scale(16),
    color: '#202020',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#00000029',
    paddingVertical: Scale(17.5),
    marginHorizontal: Scale(10),
  },
  LeftContainer: {
    flex: 1,
    marginRight: Scale(10),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  RightContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})
