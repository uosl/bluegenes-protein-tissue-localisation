import React, { useState, useEffect } from 'react';
import { queryData } from './query';
import Heatmap from './components/Heatmap';
import FilterPanel from './components/FilterPanel';

const RootContainer = ({ serviceUrl, entity }) => {
	const [data, setData] = useState([]);
	const [heatmapData, setHeatmapData] = useState([]);
	const [tissueList, setTissueList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedExpression, setSelectedExpression] = useState({});

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
				heatmapObj[p.tissue.name] = {
					data:
						heatmapObj[p.tissue.name] && heatmapObj[p.tissue.name].data
							? {
									...heatmapObj[p.tissue.name].data,
									[d.symbol]: heatmapObj[p.tissue.name].data[d.symbol]
										? {
												[p.cellType]: getScore(p.level),
												// [`${p.cellType}Color`]: getColor(p.level),
												...heatmapObj[p.tissue.name].data[d.symbol]
										  }
										: {
												Gene: d.symbol,
												[p.cellType]: getScore(p.level)
												// [`${p.cellType}Color`]: getColor(p.level)
										  }
							  }
							: {
									[d.symbol]: {
										Gene: d.symbol,
										[p.cellType]: getScore(p.level)
										// [`${p.cellType}Color`]: getColor(p.level)
									}
							  },
					tissue:
						heatmapObj[p.tissue.name] && heatmapObj[p.tissue.name].tissue
							? heatmapObj[p.tissue.name].tissue.filter(
									t => t.value == p.cellType
							  ).length == 0
								? [
										{ value: p.cellType, label: p.cellType },
										...heatmapObj[p.tissue.name].tissue
								  ]
								: heatmapObj[p.tissue.name].tissue
							: [{ value: p.cellType, label: p.cellType }]
				};
				if (
					heatmapObj[p.tissue.name] &&
					heatmapObj[p.tissue.name].data &&
					Object.keys(heatmapObj[p.tissue.name].data).length < genes.length
				) {
					genes.forEach(g => {
						heatmapObj[p.tissue.name].data = {
							[g]: { Gene: g },
							...heatmapObj[p.tissue.name].data
						};
					});
				}
			});
		});
		setTissueList(
			Object.keys(heatmapObj).map(tissue => ({ value: tissue, label: tissue }))
		);
		setHeatmapData([heatmapObj]);
	}, [data]);

	const getScore = level => {
		if (level === 'Low') return 1;
		if (level === 'Medium') return 2;
		if (level === 'High') return 3;
		return 0;
	};

	// const getColor = level => {
	// 	if (level === 'Low') return '#A4B2E1';
	// 	if (level === 'Medium') return '#747EC4';
	// 	if (level === 'High') return '#23298B';
	// 	return '#DCE2F5';
	// };

	return (
		<div className="rootContainer">
			<div className="innerContainer">
				<div className="graph">
					{loading ? (
						<h1>Loading...</h1>
					) : (
						<>
							<span className="chart-title">
								Gene Tissue Localisation Network
							</span>
							{heatmapData.length ? (
								<Heatmap
									graphData={heatmapData}
									graphHeight={data.length * 100 + 80}
								/>
							) : (
								<div className="noTissue">
									Data Not Found! Please Update The Filter.
								</div>
							)}
							<FilterPanel
								tissueList={tissueList}
								selectedExpression={selectedExpression}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default RootContainer;
