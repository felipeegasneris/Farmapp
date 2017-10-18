/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleProvider, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {
    StyleSheet
} from 'react-native';




@inject('store')
@observer
export default class App extends Component<{}> {

    constructor(props) {
        super(props);
        console.log('la volaitaa');

    }
    render() {
        return (
                <Container>
                    <Header>
                        <Left>
                            <Button transparent>
                                <Icon name='menu' />
                            </Button>
                        </Left>
                        <Body>
                        <Title>Farmapp</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Content>
                        <Text>
                            This is Content Section
                        </Text>
                        <MapView
                            provider={ PROVIDER_GOOGLE }
                            style={styles.map}
                            initialRegion={{
                                latitude: 39.7392,
                                longitude: -104.9903,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        />
                    </Content>
                    <Footer>
                        <FooterTab>
                            <Button full>
                                <Text>Footer</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>

        );
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        minHeight: 500
    }
});
