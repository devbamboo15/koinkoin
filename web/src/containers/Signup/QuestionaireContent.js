import React, { Component } from 'react';
import QuestionaireForm, {
	generateFormFields as generateQuestionFormFields,
} from './QuestionaireForm';
import { Loader } from '../../components';
import axios from 'axios';
import { PLUGIN_URL } from '../../config/constants';

class QuestionaireContent extends Component {
	state = {
		isQuetionsLoaded: false,
		isSelectedQuestionIndex: 0,
		questions: [],
		answers: {},
	};

	UNSAFE_componentWillMount() {
		this.getQuestions();
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.questions.length === 0) {
			this.getQuestions();
		} else {
			this.setState({ isQuetionsLoaded: true });
		}
	}

	getQuestions = () => {
		axios
			.get('/plugins/questionaire/get-questions', { baseURL: PLUGIN_URL })
			.then((res) => {
				console.log('Maxkyu log result', res);
				this.setState({ questions: res.data }, () => {
					this.setState({ isQuetionsLoaded: true });
				});
			})
			.catch((err) => {
				alert('Server not availalbe!');
			});
	};
	onSubmitQuestion = (values) => {
		const qes = this.state.questions[this.state.isSelectedQuestionIndex];
		let answers = this.state.answers;
		answers[qes.id] = values.answer;
		this.setState({ answers: answers });
		const nextIndex = this.state.isSelectedQuestionIndex + 1;
		if (nextIndex < this.state.questions.length) {
			this.setState({ isSelectedQuestionIndex: nextIndex });
		} else {
			let answers_text = '';
			for (const key in answers) {
				const q = this.state.questions.find(
					(it) => it.id.toString() === key.toString()
				);
				let ans_txt = answers[key];
				if (q.type === 'CHOICE') {
					ans_txt = q.choices.find(
						(it) => it.value.toString() === ans_txt.toString()
					)['label'];
				}
				answers_text += `${q.content} [${ans_txt}] \n`;
			}

			this.props.onSubmit(answers_text);
		}
	};

	onCancelSubmitQuestion = () => {
		const nextIndex = this.state.isSelectedQuestionIndex - 1;
		const qes = this.state.questions[this.state.isSelectedQuestionIndex];
		let answers = this.state.answers;
		delete answers[qes.id];
		this.setState({ answers: answers });
		if (nextIndex >= 0) {
			this.setState({ isSelectedQuestionIndex: nextIndex });
		} else {
			this.props.onClose();
		}
	};
	render() {
		if (!this.state.isQuetionsLoaded) {
			return <Loader relative={true} background={false} />;
		} else {
			const question = this.state.questions[this.state.isSelectedQuestionIndex];
			const questionFormFields = generateQuestionFormFields(question);
			return (
				<div>
					<h4>{question.content}</h4>
					<QuestionaireForm
						key={question.id}
						onSubmit={this.onSubmitQuestion}
						cancelSubmit={this.onCancelSubmitQuestion}
						formFields={questionFormFields}
					/>
				</div>
			);
		}
	}
}

export default QuestionaireContent;
