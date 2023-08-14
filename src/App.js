import React, { Component } from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import './App.css';
import {randomName} from './NameGenerator';
import {shuffleArray} from './ArrayShuffler' ;
class App extends Component {
  state = {
    n: 3, 
    draggables: [
      <SortableComponent length={3} />,
      <SortableComponent length={3} />,
      <SortableComponent length={3} />,
    ],
    men: ["m1", "m2", "m3"],
    women: ["w1", "w2", "w3"],
    names: {},
    preferences: {
      men: {
        m1: ["w1", "w2", "w3"],
        m2: ["w1", "w2", "w3"],
        m3: ["w1", "w2", "w3"],
      },
      women: {
        w1: ["m1", "m2", "m3"],
        w2: ["m1", "m2", "m3"],
        w3: ["m1", "m2", "m3"],
      }
    },
    matching: {
      proposals: {
        w1: [],
        w2: [],
        w3: [],
      },
      rejections: {
        m1: [],
        m2: [],
        m3: [],
      },
      days: [],
    },
    done: false,
  }
  add_names(oldName, newName) {
    let new_names = this.state.names;
    new_names[oldName] = newName;
    this.setState((prevState, props) => {
      return {names: new_names};
    })
  }
  generateRandomNames() {
    for (let man of this.state.men) {
      this.add_names(man, randomName("m"))
    }
    for (let woman of this.state.women) {
      this.add_names(woman, randomName("f"))
    }
  }
  async executeStep() {
    if (this.state.done) {
      return // If algo finished, return
    }
    let new_matching = this.state.matching; //copy state's matching
    new_matching.days.push("day")
    let women = Object.keys(this.state.matching.proposals) ;
    for (let woman of women) {
      new_matching.proposals[woman].push([]);
    }
    for (let man of this.state.men) {
      for (let woman of this.state.preferences.men[man]) {
        if (!this.state.matching.rejections[man].includes(woman)) {
          new_matching.proposals[woman].slice(-1)[0].push(man);
          break; //proposal complete
        }
      }
    }
    for (let woman of women) {
      let new_proposals = new_matching.proposals[woman].slice(-1)[0];
      //Find the best man
      let best_man = "";
      for (let man of this.state.preferences.women[woman]) {
        if (new_proposals.includes(man)) {
          best_man = man;
          break;
        }
      }
      //Reject everyone else
      for (let man of new_proposals) {
        if (man !== best_man) {
          new_matching.rejections[man].push(woman);
        }
      }
    }
    this.setState({matching: new_matching});
    let flag = true;
    for (let woman of women) {
      if (this.state.matching.proposals[woman].length < 1 || this.state.matching.proposals[woman].slice(-1)[0].length !== 1) {
        flag = false;
      }
    }
    if (flag) {
      this.setState({done: true})
      return
    }
  }

  aliased_str(n) {
    if (this.state.names.hasOwnProperty(n)) {
      return this.state.names[n]
    }
    if (n.substring(0, 1) === "m") {
      return "m" + n.substring(1);
    } else if (n.substring(0, 1) === "w") {
      return "w" + n.substring(1);
    }
    return n
  }

  aliased(n) {
    if (this.state.names.hasOwnProperty(n)) {
      return this.state.names[n]
    }
    if (n.substring(0, 1) === "m") {
      return (<span>m<sub>{n.substring(1)}</sub></span>);
    } else if (n.substring(0, 1) === "w") {
      return (<span>w<sub>{n.substring(1)}</sub></span>);
    }
    return n
  }

  restart(value, resetPrefs, doweshuffle) {
    let men = [];
    let women = [];
    for (var i = 0; i < value; i++) {
      men.push("m" + (i+1));
      women.push("w" + (i+1));
    }

    let preferences = this.state.preferences;

    if (resetPrefs) {
      preferences = {
        men: {},
        women: {},
      }
    }

    let matching = {
      proposals: {},
      rejections: {},
      days: [],
    }
    
    for (let man of men) {
      if (resetPrefs) {
        var arr = women.slice(0);
        if (doweshuffle) {
          shuffleArray(arr);
        }

        preferences.men[man] = arr;
      }
      matching.rejections[man] = [];
    }

    for (let woman of women) {
      if (resetPrefs) {
        arr = men.slice(0);
        if (doweshuffle) {
          shuffleArray(arr);
        }
        preferences.women[woman] = arr;
      }
      matching.proposals[woman] = [];
    } 

    this.setState({
      n: value,
      men: men,
      women: women,
      preferences: preferences,
      matching: matching,
      done: false,
    })
  }

  render() {
    return (
      <div>
        <div className='prompt'>
          Number of Pairs to be Formed <NumberChanger
  initial={3}
  callback={(value) => {
    if (value > 0 && value <= 100) {
      this.restart(value, true, false);
    }
  }}
/>
        </div>
        <div className='prompt'>
          Men {this.state.men.map((val, i) => {
            return (
              <InputChanger
                key={val + this.aliased_str(val)}
                parent={this}
                initial={this.aliased_str(val)} 
                callback={(value) => {this.add_names(val, value)}}
              />
            )
          }).reduce((prev, curr) => [prev, ' ', curr])}
        </div>
        <div className='prompt'>
          Women {this.state.women.map((val, i) => {
            return (
              <InputChanger
                key={val + this.aliased_str(val)}
                parent={this}
                initial={this.aliased_str(val)} 
                callback={(value)=>{this.add_alias(val, value)}}
              />
            )
          }).reduce((prev,curr) => [prev, ' ', curr])}
        </div>

        <div style={{height: "1em"}}></div>
        
        <div className='prompt'>
          <button className="btn" onClick={() => {this.generateRandomNames()}}>Generate Random Names</button>
        </div>

        <button className="btn" onClick={this.executeStep.bind(this)}>Show Next Step</button>
        <button className="btn" onClick={async () => {
          for (var i = 0; i < this.state.n * this.state.n; i++) {
            await this.executeStep()
          }
        }}>Show Final Matching</button>
        <button className="btn" onClick={() => {this.restart(this.state.n, false, false)}}>Start Afresh</button>
        
        <div className="tableContainer">
          <table>
            <tbody>
            <tr><td>Proposed</td>{this.state.matching.days.map((val, i) => {return <td>{"Day " + (i+1)}</td>})}</tr>
            {Object.keys(this.state.matching.proposals).map((key, index) => {
              return (
                <tr>
                  <td><b>{this.aliased(key)}</b></td>
                  {this.state.matching.proposals[key].map((group, i) => {
                    if (group.length < 1) {
                      return (<td></td>)
                    }
                    return (<td>{group.map((val, i) => {return this.aliased(val)}).reduce((prev, curr) => [prev, ', ', curr])}</td>)
                  })}
                </tr>);
            })}
            </tbody>
          </table>
        </div>

        {this.state.done ? (
          <div className='prompt'>
            <h4>Output</h4>
            {Object.keys(this.state.matching.proposals).map((key, i) => {
              return (
                <div className='op'>
                  {this.aliased(key)} has been matched to {this.aliased(this.state.matching.proposals[key].slice(-1)[0][0])}
                </div>
              )
            })}
          </div>
        ) : ""}

        <h4 className='prompt'>
          Preferences<span> </span>
          <button className="btn" onClick={() => {this.restart(this.state.n, true, true)}}>Randomize Preferences</button>
        </h4>

        {Object.keys(this.state.preferences.men).map((key, index) => {
          return (
            <div className="prefList">
              <div className="prefListTitle">{this.aliased(key)}</div>
              <SortableComponent
                parent={this}
                key={this.state.n + JSON.stringify(this.state.preferences)} 
                items={this.state.preferences.men[key]}
                callback={(o, n) => {
                  let new_preferences = this.state.preferences;
                  new_preferences.men[key] = arrayMove(new_preferences.men[key], o, n);
                  this.setState({preferences: new_preferences})
                }}
              />
            </div>
          )
        })}

        <div><hr></hr></div>
        {Object.keys(this.state.preferences.women).map((key, index) => {
          return (
            <div className="prefList">
              <div className="prefListTitle">{this.aliased(key)}</div>
              <SortableComponent 
                parent={this}
                key={this.state.n + JSON.stringify(this.state.preferences)} 
                items={this.state.preferences.women[key]}
                callback={(o, n) => {
                  let new_preferences = this.state.preferences;
                  new_preferences.women[key] = arrayMove(new_preferences.women[key], o, n);
                  this.setState({preferences: new_preferences})
                }}
              />
            </div>
          )
        })}
      </div>
    );
  }
}

class InputChanger extends Component {
  constructor(props) {
    super();
    this.state = {value: props.initial};
  }

  onChange(event) {
    this.props.callback(event.target.value);
    this.setState({value: event.target.value})
  }

  render() {
    return (
      <input className = 'ip' type="text" defaultValue={this.state.value} onBlur={this.onChange.bind(this)} />
    )
  }
}

class NumberChanger extends Component {
  constructor(props) {
    super();
    this.state = {value: props.initial};
  }

  onChange(event) {
    this.props.callback(event.target.value);
    this.setState({value: event.target.value})
  }

  render() {
    return (
      <input class = 'ip' type="number" value={this.state.value} onChange={this.onChange.bind(this)} />
    )
  }
}

const SortableItem = SortableElement(({value, parent}) =>
  <li className="prefListItem">{parent.aliased(value)}</li>
);

const SortableList = SortableContainer(({items, parent}) => {
  return (
    <ol className="prefListList">
      {items.map((value, index) => (
        <SortableItem parent={parent} key={`item-${index}`} index={index} value={value} />
      )).reduce((prev, curr) => [prev, ' > ', curr])}
    </ol>
  );
});

class SortableComponent extends Component {
  constructor(props) {
    super()
    this.state = {
      items: props.items
    }
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
    this.props.callback(oldIndex, newIndex)
  }

  render() {
    return <SortableList axis={"x"} parent={this.props.parent} items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}

export default App;