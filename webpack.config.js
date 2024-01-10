export const config = {
	mode: "production",
	entry: {
		script: "./src/scripts/script.js",
	},
	output: {
		filename: "[name].bundle.js",
	},
};

export default config;
