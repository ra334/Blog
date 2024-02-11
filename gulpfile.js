const gulp = require('gulp');
const exec = require('gulp-exec');
const copy = require('gulp-copy');
const ncp = require('ncp').ncp;
const path = require('path');

function serverDirectory(cb) {
    process.chdir(path.join(__dirname, 'Server'));
    cb();
}

function clientDirectory(cb) {
    process.chdir(path.join(__dirname, 'Client'));
    cb();
}

function rootDirectory(cb) {
    process.chdir(__dirname);
    cb();
}

function buildServer() {
    return gulp.src('./')
        .pipe(exec('npm run build'))
        .pipe(exec.reporter());
}

function buildClient() {
    return gulp.src('/')
        .pipe(exec('npm run build'))
        .pipe(exec.reporter());
}

function copyDistFolder(cb) {
    ncp('./dist', '../Server/build/dist', (err) => {
        if (err) return console.error(err)
        console.log('Dist folder copied to Server/build directory')
    })
    cb()
}

function copyLogo(cb) {
    return gulp.src('./assets/logo.png')
    .pipe(copy('./build'), {prefix: 2})
}

function copyPackageFiles() {
    return gulp.src(['package.json', 'package-lock.json', '.env.production'])
        .pipe(copy('../Server/build', { prefix: 1 }));
}

gulp.task('copy-dist', gulp.series(clientDirectory, copyDistFolder));
gulp.task('build-server', gulp.series(serverDirectory, buildServer));
gulp.task('build-client', gulp.series(clientDirectory, buildClient));
gulp.task('move-user-default-logo', gulp.series(serverDirectory, copyLogo))

gulp.task('default', gulp.series(
    'build-server',
    'build-client',
    'copy-dist',
    'move-prisma-schema',
    'move-user-default-logo',
    copyPackageFiles,
    rootDirectory
));