import React, { Component } from 'react';

const createMarkup = (msg) => {
	return { __html: msg };
};

class VerificationStatus extends Component {
	constructor(props) {
		super(props);
		this.state = {
			verfiication_status: {
				current_level: props.verification_level,
				current_index: [],
			},
		};
	}

	onStatusChange = (event) => {
		event.persist();
		const value = JSON.parse(event.target.value);
		const { userTiers } = this.props;

		const element = userTiers[value.level];
		const found = element.note.match(/<li>.+<\/li>/g);
		// checked = true
		if (
			event.target.checked &&
			!this.state.verfiication_status.current_index.includes(value.index)
		) {
			if (this.state.verfiication_status.current_level !== value.level) {
				alert(
					'Before you check this level, please confirm all backward levels are passed'
				);
				return;
			}

			if (
				found.length - 1 ===
				this.state.verfiication_status.current_index.length
			) {
				const next_level = this.state.verfiication_status.current_level + 1;

				if (next_level <= Object.keys(userTiers).length) {
					return this.setState({
						verfiication_status: {
							current_level: next_level,
							current_index: [],
						},
					});
				}
			}

			this.setState({
				verfiication_status: {
					current_level: value.level,
					current_index: [
						...this.state.verfiication_status.current_index,
						value.index,
					],
				},
			});
			// checked = false
		} else {
			if (
				!event.target.checked &&
				value.level === this.state.verfiication_status.current_level &&
				this.state.verfiication_status.current_index.includes(value.index)
			) {
				const index = this.state.verfiication_status.current_index.indexOf(
					value.index
				);
				const arr = [...this.state.verfiication_status.current_index];
				arr.splice(index, 1);
				return this.setState({
					verfiication_status: {
						current_level: value.level,
						current_index: arr,
					},
				});
			} else if (
				!event.target.checked &&
				value.level === this.state.verfiication_status.current_level - 1
			) {
				const current_index = found.map((v, i) => i);
				const index = current_index.indexOf(value.index);
				current_index.splice(index, 1);
				return this.setState({
					verfiication_status: {
						current_level: value.level,
						current_index: current_index,
					},
				});
			} else {
				alert(
					'Before you uncheck this level, please confirm all forward levels are unchecked.'
				);
				return;
			}
		}
	};
	render() {
		const { userTiers } = this.props;
		const verfiication_status = this.state.verfiication_status;
		return (
			<div>
				{userTiers
					? Object.keys(userTiers).map((key) => {
							var element = userTiers[key];
							const found = element.note.match(/<li>.+<\/li>/g);

							return (
								<div key={key}>
									<h4>{element.name}</h4>
									<div className="d-flex">
										<div
											style={{ fontSize: '13px' }}
											dangerouslySetInnerHTML={createMarkup(element.note)}
										/>
										<div className="pl-5">
											<ol>
												{found.map((el, idx) => {
													var status = false;
													if (
														element.id < verfiication_status.current_level ||
														(element.id === verfiication_status.current_level &&
															verfiication_status.current_index.includes(idx))
													) {
														status = true;
													}
													return (
														<li key={idx}>
															<input
																type="checkbox"
																value={JSON.stringify({
																	level: element.id,
																	index: idx,
																})}
																checked={status}
																onChange={this.onStatusChange}
															/>
														</li>
													);
												})}
											</ol>
										</div>
									</div>
								</div>
							);
					  })
					: 'No Data'}
			</div>
		);
	}
}

export default VerificationStatus;
