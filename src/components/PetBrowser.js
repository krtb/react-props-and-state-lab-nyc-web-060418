import React from 'react'
import Pet from './Pet'

class PetBrowser extends React.Component {
  mapPets = () => {
    // an array of pets that the component uses to render Pet Components
    // APP should determine which pets to pass down as props
    // APP should be responsible for the list based on types of pets user wants to see
    return this.props.pets.map((aPet)=>
    // receives an "onAdoptAPet" prop. this callback gets passed to it's Pet children components
      <Pet key={aPet.id} pet={aPet} onAdoptPet={this.props.onAdoptPet} />
   )
  }

  render() {
    return <div className="ui cards" >
      {this.mapPets()}
    </div>
  }
}

export default PetBrowser
