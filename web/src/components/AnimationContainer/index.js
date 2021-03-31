import React, { useLayoutEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import classes from './style.module.scss';

const AnimationContainer = ({ children }) => {
	const containerRef = useRef(null);
	const [show, doShow] = useState(false);
	useLayoutEffect(() => {
		let onScroll;

		const topPos = (element) => {
			return element.getBoundingClientRect().top;
		};

		setTimeout(() => {
			//added to reduce redundancy
			const divPos = topPos(containerRef.current);

			onScroll = () => {
				const scrollPos = window.scrollY + window.innerHeight;
				if (divPos < scrollPos) {
					doShow(true);
				}
			};
			onScroll();
			window.addEventListener('scroll', onScroll);
		}, 1000);

		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<div
			ref={containerRef}
			className={`${classnames(classes.container, {
				[classes.animation]: show,
			})}`}
		>
			{children}
		</div>
	);
};

export default AnimationContainer;
