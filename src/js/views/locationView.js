import { elements} from './base';


export const renderLocation = location => {
  console.log(location.name)
elements.locationElement.innerHTML = `${location.name} Weather Forecast today`

}
