import { elements} from './base';


export const renderLocation = location => {
  console.log(location.name)
  console.log(location)
elements.locationElement.innerHTML = `${location.name}`

}
