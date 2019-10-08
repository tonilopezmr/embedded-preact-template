import './style.css';
import { Component, h, render } from 'preact';

class App extends Component {

	render() {
		return (
			<div>
				<p>Embedded Preact template is working!</p>
			</div>
		);
	}

}

render(<App />, document.body);