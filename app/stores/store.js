import {observable} from 'mobx'

import {getRegionForCoordinates, regionFrom} from "../utilities";

//const region = getRegionForCoordinates([{latitude: -33.4488897, longitude: -70.6692655}]);

const region = regionFrom(-33.4488897,-70.6692655, 1000);
class Store {

    @observable geo = region;


}


const store = new Store();
export default store;