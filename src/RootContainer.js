import React, { useState, useEffect } from 'react';
import { queryData } from './query';
import Heatmap from './Heatmap';

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
		const heatmapObj = {};
		const genes = data.map(d => d.symbol);
		data.forEach(d => {
			d.proteinAtlasExpression.forEach(p => {
				heatmapObj[p.cellType] = {
					data:
						heatmapObj[p.cellType] && heatmapObj[p.cellType].data
							? {
								...heatmapObj[p.cellType].data,
								[d.symbol]: heatmapObj[p.cellType].data[d.symbol]
									? {
										[p.tissue.name]: getScore(p.level),
										...heatmapObj[p.cellType].data[d.symbol]
									}
									: {
										Gene: d.symbol,
										[p.tissue.name]: getScore(p.level)
									}
							}
							: {
								[d.symbol]: {
									Gene: d.symbol,
									[p.tissue.name]: getScore(p.level)
								}
							},
					tissue:
						heatmapObj[p.cellType] && heatmapObj[p.cellType].tissue
							? heatmapObj[p.cellType].tissue.filter(
								t => t.value == p.tissue.name
							  ).length == 0
								? [
									{ value: p.tissue.name, label: p.tissue.name },
									...heatmapObj[p.cellType].tissue
								  ]
								: heatmapObj[p.cellType].tissue
							: [{ value: p.tissue.name, label: p.tissue.name }]
				};
				if(
					heatmapObj[p.cellType] &&
					heatmapObj[p.cellType].data &&
					Object.keys(heatmapObj[p.cellType].data).length < genes.length
				) {
					genes.forEach(g => {
						heatmapObj[p.cellType].data = {
							[g]: {Gene: g},
							...heatmapObj[p.cellType].data
						};
					});
				}
			});
		});
		setHeatmapData([heatmapObj]);
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
					{!data.length && loading ? (
						<h1>Loading...</h1>
					) : (
						<>
							<Heatmap
								graphData={heatmapData}
								graphHeight={data.length * 100 + 50}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default RootContainer;
