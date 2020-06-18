import React, { useState, useEffect } from 'react';
import { queryData } from './query';

const RootContainer = ({ serviceUrl, entity }) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		const { value } = entity;
		queryData({
			serviceUrl: serviceUrl,
			geneId: !Array.isArray(value) ? [value] : value
		}).then(data => {
			setData(data);
			setLoading(false);
		});
	}, []);

	return (
		<div className="rootContainer">
			<div className="innerContainer">
				<div className="graph">
					<span className="chart-title">Gene Tissue Localisation Network</span>
					{!data.length && loading ? <h1>Loading...</h1> : <></>}
				</div>
			</div>
		</div>
	);
};

export default RootContainer;
