module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dist: {
        files: [{
          expand: true,
          cwd: 'img',
          src: ['**.{jpg,gif,png,JPG}', './**/*.{jpg,gif,png,JPG}'],
          dest: 'img_resp'
        }]
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css', '!*.min.css'],
          dest: 'css',
          ext: '.min.css'
        },{
          expand: true,
          cwd: 'css',
          src: ['vendors/*.css', '!vendors/*.min.css'],
          dest: 'css',
          ext: '.min.css'
        },
        ]
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'js/script.min.js': ['js/script.js'],
          'js/vendors/jquery/jquery.nav.min.js': 'js/vendors/jquery/jquery.nav.js',
          'js/vendors/bootstrap-slider.min.js': 'js/vendors/bootstrap-slider.js'
        }
      }
    },
    htmlmin: {
      multiple: { // Target
        options: { // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{ // Dictionary of files
          expand: true,
          cwd: 'src',
          src: ['*.html'], // Source
          dest: './' // Destination
        }]
      }
    },
    uncss: {
      dist: {
        files: {
          'dist/css/styles.css': '*.html'
        }
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          src: ['img/*.svg'],
          dest: './'
        }, {
          expand: true,
          src: ['img/*.{png,jpg,JPG,gif}'],
          dest: './'
        }, {
          expand: true,
          src: ['img_resp/**/*.{png,jpg,JPG}'],
          dest: './'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          src: ['js/vendors/**'],
          dest: 'dist/'
        }, {
          expand: true,
          src: ['css/vendors/**'],
          dest: 'dist/'
        }, {
          expand: true,
          src: ['*.json'],
          dest: 'dist/'
        }, {
          expand: true,
          src: ['*.php'],
          dest: 'dist/'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-newer');



  grunt.registerTask('all', ['newer:responsive_images:dist', 'newer:imagemin:dist', 'htmlmin', 'uglify', 'uncss', 'pleeease', 'copy']);
  grunt.registerTask('html', ['htmlmin', 'uglify', 'cssmin']);
};
