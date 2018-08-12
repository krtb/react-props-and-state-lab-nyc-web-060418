import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handlOnChangeType = (event) => {
    // need to grab the value of the dropdown menu
    let newType = event.target.value

    this.setState({
      filters: {
        type: newType
      }
    })

  }

  handleOnFindPetsClick = (event) => {
    // don't know have to grab a list of pets using fetch
    if (this.state.filters.type !== 'all') {
      fetch(`/api/pets?type=${this.state.filters.type}`).then(resp=>resp.json()).then(data=>{ 
        // here we are trying to set pets state with the result of the data we got back
        this.setState({
          ...this.state,
          pets: [...data]
      })}
    )
    } else {
      fetch('/api/pets').then(r=>r.json()).then(data=>{
        this.setState({
          ...this.state,
          pets: [...data]
        })}
      )
    }
  }

  handleOnAdoptPet = (petID) => {
    const allPets = this.state.pets.map((pet)=> pet.id === petID ? {...pet, isAdopted: true} : pet)
    
    this.setState({
      ...this.state,
      pets: allPets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
            {/* this component has a callback prop */}

              <Filters onChangeType={this.handlOnChangeType} onFindPetsClick={this.handleOnFindPetsClick} />

            </div>
            <div className="twelve wide column">

              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleOnAdoptPet} />

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
