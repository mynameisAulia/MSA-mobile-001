import React from 'react'
import { Text, View } from 'react-native'

const Header = (props) => {
    return (
      <View style={{marginLeft: 15}}>
        <Text style={{fontWeight:'bold', fontSize: 20}}> 
            {props.name}
        </Text>
      </View>
    )
}

export default Header
