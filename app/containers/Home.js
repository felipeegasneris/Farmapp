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
import {getRegionForCoordinates, regionFrom} from "../utilities";


@inject('store')
@observer
export default class App extends Component<{}> {

    constructor(props) {
        super(props);
        console.log('la volaitaa');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                console.log(this.props.store);
                this.props.store.geo = regionFrom(position.coords.latitude,position.coords.longitude, 1000);

            },
            (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );

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
                            {this.props.store.geo.latitude}
                        </Text>
                        {
                            this.props.store.geo && <MapView
                                provider={ PROVIDER_GOOGLE }
                                style={styles.map}
                                region={this.props.store.geo}
                            />
                        }

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
