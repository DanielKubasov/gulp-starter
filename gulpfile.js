// GULP

import gulp from "gulp";

// SERVER

import browserSync from "browser-sync";

// UTILITIES

import { existsSync as exists } from "fs";
import cleaner from "gulp-clean";
import rename from "gulp-rename";

// HTML

import htmlmin from "gulp-htmlmin";
import fileinclude from "gulp-file-include";
import typograf from "gulp-typograf";

// SASS

import * as sassConfig from "sass";
import gulpSass from "gulp-sass";
import sassGlob from "gulp-sass-glob";
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "gulp-autoprefixer";

const sass = gulpSass(sassConfig);

// JAVASCRIPT

import webpack from "webpack-stream";
import webpackConfig from "./webpack.config.js";

// IMAGES

import imagemin from "gulp-imagemin";
import svgSprite from "gulp-svg-sprite";
import GulpSvgmin from "gulp-svgmin";
import GulpSvgminConfig from "./svgo.config.js";

const spriteConfig = {
	mode: {
		stack: {
			sprite: "../sprite.svg"
		}
	}
};

// DEFINING PATHS

const source = "src";
const dist = "dist";

const paths = {
	html: `${source}/`,
	styles: `${source}/styles`,
	scripts: `${source}/scripts`,
	images: `${source}/images`,
	fonts: `${source}/fonts`,
};

// TODO: Pug instead of file include.

// SERVER

browserSync.create()

export const server = () => {
	browserSync.init({
		server: {
			baseDir: `./dist`
		},
		notify: false
	});
};

// HTML

export const html = (done) => {
	return gulp
		.src([`${paths.html}/**/*.html`, `!${paths.html}/partials/**/*.html`])
		.pipe(fileinclude({
			prefix: "@@",
            basepath: "@file",
		}))
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(typograf({ locale: ['ru', 'en-US'] }))
		.pipe(gulp.dest(`${dist}/`));
};

// STYLES

export const styles = () => {
	return gulp
		.src(`${paths.styles}/style.scss`)
		.pipe(sourcemaps.init())
		.pipe(sassGlob())
		.pipe(sass({
			includePaths: ["node_modules"],
			outputStyle: "compressed"
		}))
		.pipe(autoprefixer({
			grid: true,
			cascade: false
		}))
		.pipe(sourcemaps.write())
		.pipe(rename("style.min.css"))
		.pipe(gulp.dest(`${dist}/css/`))
};

// SCRIPTS

export const scripts = () => {
	return gulp
		.src(`${paths.scripts}/script.js`)
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest(`${dist}/js/`))
};

// IMAGES

export const images = () => {
	return gulp
		.src([
			`${paths.images}/**/*[.png, .jpg, .jpeg, .webp]`,
			`!${paths.images}/svg/**/*.svg`
		])
		.pipe(imagemin())
		.pipe(gulp.dest(`${dist}/images/`))

};

// SVG SPRITES

export const sprites = () => {
	return gulp
		.src(`${paths.images}/svg/*.svg`)
		.pipe(svgSprite(spriteConfig))
		.pipe(GulpSvgmin(GulpSvgminConfig))
		.pipe(gulp.dest(`${dist}/images/svg/`))

};

// FONTS

export const fonts = () => {
	return gulp
		.src(`${paths.fonts}/**/*.woff2`)
		.pipe(gulp.dest(`${dist}/fonts/`))
};

// CLEAN

export const clean = (done) => {
	if (exists(dist)) {
		return gulp.src(dist, { read: false })
			.pipe(cleaner());
	}
	done();
};

// WATCH

export const watch = () => {
	gulp.watch(`${paths.html}**/*.html`, html)
		.on("change", () => {
			browserSync.reload()
		})
	gulp.watch(`${paths.styles}/**/*.scss`, styles)
		.on("change", () => {
			browserSync.reload()
		})
	gulp.watch(`${paths.scripts}/**/*.js`, scripts)
		.on("change", () => {
			browserSync.reload()
		})
	gulp.watch(`${paths.images}/**/*`, images)
		.on("change", () => {
			browserSync.reload()
		})
	gulp.watch(`${paths.images}/**/*`, sprites)
		.on("change", () => {
			browserSync.reload()
		})
	gulp.watch(`${paths.fonts}/**/*.woff2`, fonts)
		.on("change", () => {
			browserSync.reload()
		})
};

// DEFAULT TASK

export default gulp.series(
	gulp.parallel( clean ),
	gulp.parallel( html, styles, scripts, images, sprites, fonts ),
	gulp.parallel ( server, watch )
);

