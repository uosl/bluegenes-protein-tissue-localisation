const query = geneId => ({
	from: 'Gene',
	select: [
		'primaryIdentifier',
		'symbol',
		'proteinAtlasExpression.cellType',
		'proteinAtlasExpression.level',
		'proteinAtlasExpression.reliability',
		'proteinAtlasExpression.tissue.name'
	],
	orderBy: [
		{
			path: 'primaryIdentifier',
			direction: 'ASC'
		}
	],
	where: [
		{
			path: 'Gene',
			op: 'LOOKUP',
			value: geneId,
			extraValue: 'H. sapiens',
			code: 'A'
		}
	]
});

const queryData = ({ geneId, serviceUrl, imjsClient = imjs }) => {
	const service = new imjsClient.Service({
		root: serviceUrl
	});
	return new Promise((resolve, reject) => {
		service
			.records(query(geneId))
			.then(res => {
				if (res.length === 0) reject('No data found!');
				resolve(res);
			})
			.catch(() => reject('No data found!'));
	});
};

export { queryData };
