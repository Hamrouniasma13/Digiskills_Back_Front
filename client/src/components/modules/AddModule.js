import React, { Component } from 'react'

class AddModule extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <span className="Controls">

                    <p>Am</p>
                        <button><strong>B</strong></button>
                        <button><em>I</em></button>
                        <button><u>U</u></button>
                    </span>
                    <textarea rows="5" className="Text" />
                </header>
            </div>
        )
    }
}
export default AddModule;