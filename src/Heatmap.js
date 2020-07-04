import React from 'react';
import { HeatMap } from '@nivo/heatmap';
const heatmap_colors = ['#edf8e9', '#bae4b3', '#74c476', '#238b45'];

const Heatmap = ({ graphData, graphHeight }) => {
	return (
		<div
			style={{
				display: 'flex',
				textAlign: 'center',
				width: 'calc(100vw - 5rem)',
				overflowX: 'scroll',
				overflowY: 'hidden'
			}}
		>
			{graphData.map(g =>
				Object.keys(g).map(d => (
					<div
						style={{
							width: Object.values(g[d].tissue).length * 50,
							height: graphHeight
						}}
					>
						<HeatMap
							data={Object.values(g[d].data)}
							keys={Object.values(g[d].tissue).map(t => t.value)}
							colors={heatmap_colors}
							indexBy={'Gene'}
							margin={{ top: 200, right: 0, bottom: 0, left: 0 }}
							forceSquare={true}
							axisTop={{
								orient: 'top',
								tickSize: 5,
								tickPadding: 5,
								tickRotation: -90
							}}
							height={graphHeight}
							width={Object.values(g[d].tissue).length * 50}
							axisRight={null}
							axisBottom={null}
							axisLeft={{
								orient: 'left',
								tickSize: 5,
								tickPadding: 5,
								tickRotation: 0
							}}
							cellBorderWidth={2}
						/>
					</div>
				))
			)}
		</div>
	);
};

export default Heatmap;
