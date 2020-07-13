import React from 'react';
import { HeatMap } from '@nivo/heatmap';
const heatmap_colors = ['#B9D6F7', '#87B8EF', '#569EEE', '#1A75DC'];

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
			{graphData.map(data =>
				Object.keys(data).map((item, index) => (
					<div
						key={index}
						style={{
							width:
								index != 0
									? Object.values(data[item].tissue).length * 50 + 100
									: Object.values(data[item].tissue).length * 50 + 160,
							height: graphHeight
						}}
					>
						<HeatMap
							data={Object.values(data[item].data)}
							keys={Object.values(data[item].tissue).map(t => t.value)}
							colors={heatmap_colors}
							indexBy={'Gene'}
							margin={{
								top: 200,
								right: 0,
								bottom: 0,
								left: index != 0 ? 0 : 60
							}}
							forceSquare={true}
							axisTop={{
								orient: 'top',
								tickSize: 5,
								tickPadding: 5,
								tickRotation: -90,
								legendOffset: -160,
								legendPosition: 'left',
								legend: item
							}}
							height={graphHeight}
							width={
								index != 0
									? Object.values(data[item].tissue).length * 50 + 100
									: Object.values(data[item].tissue).length * 50 + 160
							}
							axisRight={null}
							axisBottom={null}
							axisLeft={
								!index
									? {
											orient: 'left',
											tickSize: 5,
											tickPadding: 5,
											tickRotation: 0
									  }
									: null
							}
							cellBorderWidth={1}
							cellBorderColor="rgb(51, 51, 51)"
							labelTextColor="rgb(51, 51, 51)"
							nanColor="#fff"
							cellShape={({
								data,
								value,
								x,
								y,
								width,
								height,
								color,
								opacity,
								borderWidth,
								borderColor,
								enableLabel,
								textColor,
								onHover,
								onLeave,
								onClick,
								theme
							}) => {
								return (
									<g
										transform={`translate(${x}, ${y})`}
										onMouseEnter={onHover}
										onMouseMove={onHover}
										onMouseLeave={onLeave}
										onClick={e => onClick(data, e)}
										style={{ cursor: 'pointer' }}
									>
										<rect
											x={width * -0.5}
											y={height * -0.5}
											width={width}
											height={height}
											fill={color}
											fillOpacity={opacity}
											strokeWidth={borderWidth}
											stroke={borderColor}
											strokeOpacity={opacity}
										/>
										{enableLabel && (
											<text
												alignmentBaseline="central"
												textAnchor="middle"
												style={{
													...theme.labels.text,
													fill: textColor
												}}
												fillOpacity={opacity}
											>
												{isNaN(value) ? 'NA' : ''}
											</text>
										)}
									</g>
								);
							}}
						/>
					</div>
				))
			)}
		</div>
	);
};

export default Heatmap;
