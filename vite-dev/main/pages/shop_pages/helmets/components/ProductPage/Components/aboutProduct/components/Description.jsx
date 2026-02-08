/* eslint-disable react/prop-types */
const Oneal_Description = ({product}) => {
	const description = product?.lang_data?.content || '';
	return (
		<div>
			{description ? (
				<div dangerouslySetInnerHTML={{ __html: description }} />
			) : (
				<p>No description</p>
			)}
		</div>
	);
};

export default Oneal_Description;