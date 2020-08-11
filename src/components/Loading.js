import React from 'react';

const Loading = () => (
	<div className="loading-container">
		<div className="inner-loading-container">
			<div style={{ left: 71, top: 71, animationDelay: '0s' }}></div>
			<div
				style={{ left: 91, top: 71, animationDelay: ' 0.11682242990654206s' }}
			></div>
			<div
				style={{ left: 111, top: 71, animationDelay: '0.2336448598130841s' }}
			></div>
			<div
				style={{ left: 71, top: 91, animationDelay: '0.8177570093457943s' }}
			></div>
			<div
				style={{ left: 111, top: 91, animationDelay: '0.35046728971962615s' }}
			></div>
			<div
				style={{ left: 71, top: 111, animationDelay: '0.7009345794392523s' }}
			></div>
			<div
				style={{ left: 91, top: 111, animationDelay: '0.5841121495327103s' }}
			></div>
			<div
				style={{ left: 111, top: 111, animationDelay: '0.4672897196261682s' }}
			></div>
		</div>
	</div>
);

export default Loading;
