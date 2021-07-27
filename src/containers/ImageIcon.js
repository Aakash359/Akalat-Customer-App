import React from 'react'
import PropTypes from 'prop-types'
import {Image, StyleSheet, Text} from 'react-native'
import {Scale} from '../CommonConfig'
function ImageIcon({src, tintColor, tint}) {
  return (
    <>
      <Image
        style={styles.icon}
        source={src}
        tintColor={tint ? tintColor : undefined}
      />
    </>
  )
}

ImageIcon.propTypes = {
  src: PropTypes.number.isRequired,
}

export default ImageIcon

const styles = StyleSheet.create({
  icon: {
    width: Scale(20),
    height: Scale(20),
    resizeMode: 'contain',
  },
})
