/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {observable} from 'mobx';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Spinner from 'react-native-loading-spinner-overlay';
import {
	StyleProvider, ActionSheet, Container, Header, Title, Card, CardItem,
	Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text
} from 'native-base';
import {StyleSheet, Dimensions} from 'react-native';
import {regionFrom} from "../utilities";

//const BUTTONS = ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"];
const BUTTONS = ["CRUZ VERDE", "AHUMADA", "SALCOBRAND", "Cancel"];
const CANCEL_INDEX = 3;

@inject('store')
@observer
export default class App extends Component {

	@observable loading = false;
	@observable allActive = true;
	@observable turnoActive = false;
	@observable filterDisable = false;

	constructor(props) {
		super(props);
		console.log('holaaa');
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.props.store.geo = regionFrom(position.coords.latitude, position.coords.longitude, 600);
			},
			(error) => console.log(error),
			{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
		);
		//this.getFarmacias();
	}

	getFarmaciaByName(name) {
		this.loading = true;
		this.props.store.getFarmaciaByName(name).then(()=> this.loading = false);
	}

	getFarmacias() {
		this.loading = true;
		this.props.store.getAllFarmacias().then(()=> this.loading = false);
		this.filterDisable = false;
		this.turnoActive = false;
		this.allActive = true;
	}

	getTurno() {
		this.loading = true;
		this.props.store.getFarmaciasTurno().then(()=> this.loading = false);
		this.filterDisable = true;
		this.turnoActive = true;
		this.allActive = false;
	}



	render() {
		return (
			<Container style={styles.container}>
				<Header>
					<Body>
					<Title>Farmapp</Title>
					</Body>
				</Header>
				<Content>
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
							showsUserLocation={true}
							followsUserLocation={true}
							image={require('../assets/1f3c3.png')}
						/>
						{this.props.store.farmacias.map(farmacia => (

							(farmacia.local_lat !== '' && farmacia.local_lng !== '') &&
							<MapView.Marker
								key={farmacia.local_id}
								image={require('../assets/1f48a.png')}
                coordinate={
	                {
		                latitude: parseFloat(farmacia.local_lat),
		                longitude: parseFloat(farmacia.local_lng)
	                }
                }

							>
								<MapView.Callout>
									<Card>
										<CardItem header>
											<Text>{farmacia.local_nombre}</Text>
										</CardItem>
										<CardItem>
											<Body>
												<Text>
													{`-${farmacia.local_direccion}\n-${farmacia.funcionamiento_hora_apertura} a ${farmacia.funcionamiento_hora_cierre}\n-${farmacia.local_telefono}`}
												</Text>
											</Body>
										</CardItem>
									</Card>
								</MapView.Callout>
							</MapView.Marker>
						))}
					</MapView>
					<Spinner visible={this.loading} animation="slide" />
				</Content>
				<Footer>
					<FooterTab>
						<Button vertical active={this.allActive}  onPress={() => { this.getFarmacias() }}>
							<Icon active={this.allActive} name="home" />
							<Text>Todas</Text>
						</Button>
						<Button vertical active={this.turnoActive} onPress={() => { this.getTurno() }} >
							<Icon  active={this.turnoActive} name="medkit" />
							<Text>De turno</Text>
						</Button>
						<Button vertical disabled={this.filterDisable}
			        onPress={() =>
				        ActionSheet.show(
					        {
						        options: BUTTONS,
						        cancelButtonIndex: CANCEL_INDEX,
						        title: "Seleccione farmacia"
					        },
					        buttonIndex => {
						        if(buttonIndex !== 3)
											this.getFarmaciaByName(BUTTONS[buttonIndex]);
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

let { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	map: {
		//...StyleSheet.absoluteFillObject,
		flex: 1,
		width: width,
		height: height
	},
	container: {
		//...StyleSheet.absoluteFillObject,
		//height: 400,
		//width: 400,
		//justifyContent: 'flex-end',
		//alignItems: 'center'
	}
});
