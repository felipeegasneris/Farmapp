import {observable, action} from 'mobx'
import {regionFrom} from "../utilities";

const region = regionFrom(-33.4488897, -70.6692655, 700);

class Store {
	@observable geo = region;
	@observable farmacias = [];

	@action
	async getAllFarmacias() {

		//TODO: manejar si es que la respuesta viene mal
		try {
			let response = await fetch('http://datos.gob.cl/api/action/datastore_search?resource_id=a60f93af-6a8a-45b6-85ff-267f5dd37ad6&limit=20000000');
			let data = await response.json();
			this.farmacias = data.result.records;
			return this.farmacias;
		} catch (e) {
			console.log(e);
		}
	}

	@action
	async getFarmaciaByName(name) {
		try {
			let response = await fetch(`http://datos.gob.cl/api/action/datastore_search_sql?sql=SELECT * from "a60f93af-6a8a-45b6-85ff-267f5dd37ad6" WHERE local_nombre LIKE \'${name}\'`);
			let data = await response.json();
			this.farmacias = data.result.records;
			return this.farmacias;
		} catch (e) {
			console.log(e);
		}
	}
	@action
	async getFarmaciasTurno() {
		try {
			let response = await fetch('http://farmanet.minsal.cl/index.php/ws/getLocalesTurnos');
			let data = await response.json();
			this.farmacias = data;
			console.log(this.farmacias);
			return this.farmacias;
		} catch (e) {
			console.log(e);
		}
	}
}

const store = new Store();
export default store;