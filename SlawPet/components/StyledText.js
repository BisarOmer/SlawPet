import React from 'react'
import { Text } from 'react-native'

export function MonoText(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'Segoe UI',fontSize:18,marginTop:8 }]} />
  )
}