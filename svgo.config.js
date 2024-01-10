export const config = {
	// Ensures the best optimization.
	multipass: true,
	js2svg: {
		// Beutifies the SVG output instead of
		// stripping all white space.
		pretty: true,
		indent: 4,
	},
	// Alter the default list of plugins.
	plugins: [
		// You can enable a plugin with just its name.
		"sortAttrs",
		{
			name: "removeViewBox",
			// Disable a plugin by setting active to false.
			active: false,
		},
		{
			name: "cleanupIDs",
			// Add plugin options.
			params: {
				minify: true,
			},
		},
	],
};

export default config;
