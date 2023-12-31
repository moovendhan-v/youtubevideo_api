module.exports = function (grunt) {
    grunt.registerTask("hellow", function () {
      console.log("i am grunt running");
    });
    
    grunt.initConfig({
      concat: {
        options: {
          separator: "\n",
          sourceMap: true,
          banner: "/* Processed by grunt  */ \n",
        },
        css: {
          src: ["../css/**/*.css"],
          dest: "dist/css/app.css",
        },
        js: {
          src: ["../js/**/*.js"],
          dest: "dist/js/app.js",
        },
        scss: {
          src: ["../scss/**/*.scss"],
          dest: "dist/scss/style.scss",
        },
      },
  
      cssmin: {
        options: {
          mergeIntoShorthands: false,
          roundingPrecision: -1,
        },
        target: {
          files: {
            "../../htdocs/admin/dist/css/app.css": ["dist/css/app.css"],
          },
        },
        // sass:{
        //   dist:{
        //     options:{
        //       style: 'expanded'
        //     },
        //     files:{
        //       "../../htdocs/admin/dist/scss/app.css": ["dist/scss/style.scss"],
        //     }
        //   }
        // }
      },
  
      sass:{
        dist:{
          options:{
            style: 'expanded'
          },
          files:{
            "../../htdocs/admin/dist/scss/app.css": ["dist/scss/style.scss"],
          }
        }
      },


      uglify: {
        my_target: {
          options: {
            sourceMap: true,
          },
          files: {
            "../../htdocs/admin/dist/js/app.js": ["dist/js/app.js"],
          },  
        },
      },
  
    //   copy: {
    //     bower: {
    //       files: [
    //         {
    //           expand: true,
    //           flatten: true,
    //           filter: "isFile",
    //           src: ["bower_components/jquery/dist/*"],
    //           dest: "../../htdocs/admin/dist/js/jquery/",
    //         },
    //       ],
    //     },
    //   },
  
      obfuscator: {
        options: {
          // banner: '// obfuscated with grunt-contrib-obfuscator.\n',
          // // debugProtection: true,
          // debugProtectionInterval: true,
          // domainLock: ['www.example.com']
        },
        task1: {
          options: {
            // options for each sub task
          },
          files: {
            '../../htdocs/admin/dist/js/app.o.js': [
              'dist/js/app.js',
            ]
          }
        }
      },
      
      watch: {
        css: {
          files: ["../css/**/*.css"],
          tasks: ["concat:css", "cssmin"],
          options: {
            spawn: false,
          },
        },
        js: {
          files: ["../js/**/*.js"],
          tasks: ["concat:js", "uglify", "obfuscator"],
          options: {
            spawn: false,
          },
        },
        scss: {
          files: [        
            '../scss/**/*.scss'
          ],
          tasks: ['concat:scss','sass', 'cssmin:scss'],
          options: {
            spawn: false,
          },
        }
      },
  
    });

    
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    // grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-obfuscator');
    grunt.loadNpmTasks('grunt-contrib-sass');
    // grunt.loadNpmTasks('grunt-sass');
    
    grunt.registerTask('css',['concat:css','cssmin','sass']);    
    grunt.registerTask('js',['concat:js','uglify','obfuscator']); 
  
    grunt.registerTask("default", [
      "hellow",
    //   "copy",
      "concat",
      "cssmin",
      'sass',
      "uglify",
      'obfuscator',
      "watch",
    ]);
  };