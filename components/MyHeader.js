import * as React from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import db from '../config'

export default class MyHeader extends React.Component{
  constructor(props){
    super(props)
    this.state={
      value:""
    }
  }




 BellIconWithBadge=()=>{
    return(
      <View>
        <Icon name='bell' type='font-awesome' color='#ffc0cb' size={25}/>
         <Badge
          value={0}
         containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
      </View>
    )
  }

  render(){
    return(
        <Header
         leftComponent={<Icon name='bars' type='font-awesome' color='#696969' /* onPress={() => this.props.navigation.toggleDrawer()}*/
         />}
          centerComponent={{ text: this.props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
          rightComponent={<this.BellIconWithBadge {...this.props}/>}
          backgroundColor = "#eaf8fe"
        />

)
}

}
