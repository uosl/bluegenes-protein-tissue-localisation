import React, { useState, useEffect } from 'react';
import { queryData } from './query';

const RootContainer = ({ serviceUrl, entity }) => {
	const [data, setData] = useState([]);
	const [heatmapData, setHeatmapData] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (localStorage.getItem('heat')) {
			setData(JSON.parse(localStorage.getItem('heat')));
			return;
		}
		setLoading(true);
		const { value } = entity;
		queryData({
			serviceUrl: serviceUrl,
			geneId: !Array.isArray(value) ? [value] : value
		}).then(data => {
			setData(data);
			localStorage.setItem('heat', JSON.stringify(data));
			setLoading(false);
		});
	}, []);

	useEffect(() => {
		const heatmapData = [];
		data.forEach(d => {
			const heatmapObj = {};
			d.proteinAtlasExpression.forEach(p => {
				heatmapObj[p.cellType] = {
					data:
						heatmapObj[p.cellType] && heatmapObj[p.cellType].data
							? {
									[p.tissue.name]: getScore(p.level),
									...heatmapObj[p.cellType].data
							  }
							: { Gene: d.symbol, [p.tissue.name]: getScore(p.level) },
					tissue:
						heatmapObj[p.cellType] && heatmapObj[p.cellType].tissue
							? [p.tissue.name, ...heatmapObj[p.cellType].tissue]
							: [p.tissue.name]
				};
			});
			heatmapData.push(heatmapObj);
		});
		setHeatmapData(heatmapData);
	}, [data]);

	const getScore = level => {
		if (level === 'Low') return 1;
		if (level === 'Medium') return 2;
		if (level === 'High') return 3;
		return 0;
	};

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
