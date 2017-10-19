/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {
	StyleProvider, ActionSheet, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text
} from 'native-base';
import {
	StyleSheet
} from 'react-native';
import {regionFrom} from "../utilities";

//const BUTTONS = ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"];
var BUTTONS = ["CRUZ VERDE", "AHUMADA", "SALCOBRAND", "Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

@inject('store')
@observer
export default class App extends Component<{}> {

	constructor(props) {
		super(props);
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.props.store.geo = regionFrom(position.coords.latitude, position.coords.longitude, 600);
			},
			(error) => console.log(error),
			{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
		);
		this.props.store.getAllFarmacias();
	}

	render() {
		return (
			<Container>
				<Header>
					<Body>
					<Title>Farmapp</Title>
					</Body>
				</Header>
				<Content>
					{
						this.props.store.geo &&
						<MapView
							provider={PROVIDER_GOOGLE}
							style={styles.map}
							region={this.props.store.geo}
						>
							<MapView.Marker
								coordinate={
									{
										latitude: this.props.store.geo.latitude,
										longitude: this.props.store.geo.longitude
									}
								}
								title={'yo'}
								description={'ubicación'}
								image={require('../assets/1f3c3.png')}
							/>
							{this.props.store.farmacias.map(farmacia => (

								(farmacia.local_lat !== '' && farmacia.local_lng !== '') &&
								<MapView.Marker
									key={farmacia.local_id}
	                coordinate={
		                {
			                latitude: parseFloat(farmacia.local_lat),
			                longitude: parseFloat(farmacia.local_lng)
		                }
	                }
	                title={farmacia.local_nombre}
	                description={
	                	`-${farmacia.local_direccion}\n-${farmacia.funcionamiento_hora_apertura}\n-${farmacia.funcionamiento_hora_cierre}\n-${farmacia.local_telefono}`
	                }
								/>
							))}
						</MapView>

					}

				</Content>
				<Footer>
					<FooterTab>
						<Button vertical active={true}>
							<Icon active={true} name="home" />
							<Text>Todas</Text>
						</Button>
						<Button vertical>
							<Icon  name="medkit" />
							<Text>De turno</Text>
						</Button>
						<Button vertical
			        onPress={() =>
				        ActionSheet.show(
					        {
						        options: BUTTONS,
						        cancelButtonIndex: CANCEL_INDEX,
						        destructiveButtonIndex: DESTRUCTIVE_INDEX,
						        title: "Seleccione farmacia"
					        },
					        buttonIndex => {
						        console.log(buttonIndex);
					        }
				        )}
						>
							<Icon name="list" />
							<Text>Filtrar</Text>
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
