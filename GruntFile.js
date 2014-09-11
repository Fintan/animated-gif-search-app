module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-contrib-*').forEach(grunt.loadNpmTasks);
    grunt.loadNpmTasks('grunt-connect-proxy');

    var _ = grunt.util._;

    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    var requireJsOptions = {
        baseUrl: yeomanConfig.app + '/scripts',
        dir: yeomanConfig.dist + '/scripts',
        mainConfigFile: yeomanConfig.app + '/scripts/app.build.js',
        //name: "main",
        preserveLicenseComments: false,
        useStrict: true,
        wrap: true,
        done:function(done, output) {
            grunt.task.run(['copy:require_to_dist']);
            done();
        }
    };

    //determines which data to use in the app (can be production or mock)
    var serviceContext = { type:'none' };

    var bannerOptions = {
        stripBanners: false,
        banner: 'requirejs.config({\
                                    config: {\
                                       "app/Application": { \
                                            developer:"<%= developer.name %>", \
                                            date: "<%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %>"\
                                        },\
                                        "app/ModelContext": { \
                                            serviceContext:"<%= serviceContext.type %>"\
                                        }\
                                    }\
                                });'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        developer: grunt.file.readJSON('developer.json'),
        serviceContext: serviceContext,

        connect: {
            server:{
                options:{
                    port: 8000,
                    base: ".",
                    keepalive: false
                }
            }
        },

        jshint: {
            files: [yeomanConfig.app+'/**/*.js', '!'+yeomanConfig.app+'/bower_components/**/*.js', '!' + yeomanConfig.app+ '/scripts/jst.js', '!'+yeomanConfig.app+'/scripts/vendor/**/*.js'],
            options: {
                jshintrc: 'jshintrc'
            }
        },
        requirejs: {
            deploy: {
                options: _.extend({optimize: 'uglify2', name:'main'}, requireJsOptions)
            },
            debug: {
                options: _.extend({ generateSourceMaps: true, optimize: 'none', name:'main' }, requireJsOptions)
            },
            ui_harness: {
                options: _.extend({ generateSourceMaps: true, optimize: 'none', name:'ui-harness' }, requireJsOptions)
            },
            compile_css: {
                options: {
                    cssIn: "app/css/main-frm-sass.css",
                    out: "dist/css/main.css"
                }
            }
        },
        jasmine : {
            src : ['scripts/**/*.js'],
            options : {
                host: 'http://127.0.0.1:8000/',
                keepRunner:true,  
                specs : ['./specs/main.js', './specs/*Spec.js'],
                //helpers: ,
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfigFile: [yeomanConfig.app + '/scripts/app.build.js', './specs/config.js'],
                    requireConfig: {
                        baseUrl: yeomanConfig.app + '/scripts/'
                    }
                }
            }
        },
        clean: ['dist/*', yeomanConfig.app+'/css/structure/*'],
        copy: {
            dist: {
                files: [
                { expand: true, dot: true, cwd: yeomanConfig.app, dest: yeomanConfig.dist, src: [
                        'index.html', 'ui.html'
                    ]}
                ]
            },
            require_to_dist: {
                files: [
                { expand: true, dot: true, cwd: yeomanConfig.app+'/bower_components/requirejs/', dest: yeomanConfig.dist+'/scripts/', src: [
                        'require.js'
                    ]}
                ]
            },
            bower_libs: {
                files: [
                    {expand: true, cwd: yeomanConfig.app+'/bower_components/', src: ['**'], dest: yeomanConfig.dist +'/bower_components/'} 
                ]
            },
            amd_not_compiled: {
                files: [
                    {expand: true, cwd: yeomanConfig.app+'/scripts/', src: ['**'], dest: yeomanConfig.dist +'/scripts/'} 
                ]
            },
            resources: {
                files: [
                    {expand: true, cwd: yeomanConfig.app+'/img/', src: ['**'], dest: yeomanConfig.dist +'/img/'},
                    {expand: true, cwd: yeomanConfig.app+'/fonts/', src: ['**'], dest: yeomanConfig.dist +'/fonts/'},
                    {expand: true, cwd: yeomanConfig.app+'/data/', src: ['**'], dest: yeomanConfig.dist +'/data/'}
                ]
            },
            jst: {
                files: [{
                    expand: true, dot: true, cwd: yeomanConfig.app + '/scripts/', dest: yeomanConfig.dist + '/scripts/', src: [
                        'jst.js'
                    ]}
                ]
            }
        },
        concat: {          
            amd_not_compiled: {
                options: bannerOptions,
                src: [yeomanConfig.app+'/scripts/app.build.js', yeomanConfig.app+'/scripts/main.js'],
                dest: yeomanConfig.dist +'/scripts/main.js'
            },
            deploy: {
                options: bannerOptions,
                src:[yeomanConfig.dist +'/scripts/main.js'],
                dest: yeomanConfig.dist +'/scripts/main.js'
            },
            ui_harness: {
                options: bannerOptions,
                src:[yeomanConfig.dist +'/scripts/ui-harness.js'],
                dest: yeomanConfig.dist +'/scripts/ui-harness.js'
            },
            theme_and_structure: {
                //src: ['app/css/main-frm-sass.css', yeomanConfig.app+'/css/structure/*.css'],
                src: [yeomanConfig.app+'/css/structure/*.css', 'app/css/main-frm-sass.css'],
                dest: 'app/css/main-frm-sass.css'
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: "JST",
                    amd: true,
                    processName: function(filePath) {
                        return filePath.split('/').pop().split('.')[0];
                    }
                },
                files: {
                    'app/scripts/jst.js': [yeomanConfig.app+'/scripts/app/**/*.hbs', yeomanConfig.app+'/scripts/ui/**/*.hbs']
                }
            }
        },
        sass: {
            theme: {
                options: {
                    style: 'compact' /*nested/compressed/compact/expanded*/
                },
                files: {
                    'app/css/main-frm-sass.css': yeomanConfig.app+'/sass/main.scss'
                }
            },
            structure: {
                options: {
                    style: 'compact'
                },
                files: [{
                    expand: true,
                    src: [yeomanConfig.app+'/scripts/app/**/*.scss', yeomanConfig.app+'/scripts/ui/**/*.scss'],
                    dest: yeomanConfig.app+'/css/structure',
                    ext: '.css',
                    flatten: true
                }]
            }
        },
        watch: {
            theme: {
                files: yeomanConfig.app+'/sass/**/*',
                tasks: 'sass:theme'
            },
            structure: {
                files: yeomanConfig.app+'/scripts/app/**/*',
                tasks: 'sass:structure'
                
            }
        },
        connect: {
            server: {
                options: {
                  port: 8000,
                  base: 'dist',
                  logger: 'dev',
                  keepalive: true,
                  hostname: 'localhost',
                  middleware: function (connect, options) {
                    var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                    console.log('options.base', options.base);
                    return [
                        // Include the proxy first
                        proxy,
                        // Serve static files.
                        connect.static(options.base[0]),
                        // Make empty directories browsable.
                        connect.directory(options.base[0])
                    ];

                    // var middlewares = [];
           
                    // if (!Array.isArray(options.base)) {
                    //   options.base = [options.base];
                    // }
                       
                    // // Setup the proxy
                    // middlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest);
             
                    // // Serve static files
                    // options.base.forEach(function(base) {
                    //   middlewares.push(connect.static(base));
                    // });
             
                    // return middlewares;
                  }
                },
                proxies: [ 
                    {
                        context: '/media',
                        host: 'media0.giphy.com',
                        port: 80,
                        // port: 8080,
                        //https: false,
                        //xforward: false//,
                        headers: {
                            "Access-Control-Allow-Origin": "*"
                        }
                        // rewrite: {
                        //     // the key '^/api' is a regex for the path to be rewritten
                        //     // the value is the context of the data service
                        //     '^/api': '/data-service-path'
                        // }
                    },
                    {
                        context: '/media',
                        // host: 'media1.giphy.com',
                        host: '54.230.30.16',
                        port: 80,
                        // port: 8080,
                        //https: false,
                        //xforward: false//,
                        headers: {
                            //"Access-Control-Allow-Origin": "*",
                            "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                            "Accept-Encoding":"gzip,deflate,sdch",
                            "Accept-Language":"en-US,en;q=0.8",
                            "Cache-Control":"no-cache",
                            "Connection":"keep-alive"
                        }
                        // rewrite: {
                        //     // the key '^/api' is a regex for the path to be rewritten
                        //     // the value is the context of the data service
                        //     '^/api': '/data-service-path'
                        // }
                    }
                ]
            }
        }
    });
    
    grunt.registerTask('server', function (target) {
        grunt.task.run([
            'configureProxies:server',
            'connect:server'
            //'open'
        ]);
    });

    //determines which models and collections will be used
    grunt.registerTask('service_context', _.bind(function (type) {

        serviceContext.type = type ? type : 'production';// Set the serviceContext type (production, mock)
        
    }, this));

    var baseTasks =  [ 'jshint', 'clean', 'copy:dist', 'handlebars', 'copy:resources', 'sass', 'concat:theme_and_structure', 'requirejs:compile_css' ];
    var deployTasks = baseTasks.slice();
    var debugTasks = baseTasks.slice();
    var debugMockTasks = baseTasks.slice();
    var buildTasks = baseTasks.slice();
    var uiTasks = baseTasks.slice();

    deployTasks.splice(4,0, 'service_context', 'requirejs:deploy', 'concat:deploy');
    debugTasks.splice(4,0, 'service_context', 'requirejs:debug', 'concat:deploy');
    debugMockTasks.splice(4,0, 'service_context:mock', 'requirejs:debug', 'concat:deploy');
    buildTasks.splice(4,0, 'service_context', 'copy:bower_libs', 'copy:amd_not_compiled', 'copy:require_to_dist', 'concat:amd_not_compiled');
    uiTasks.splice(4,0, 'service_context:mock', 'requirejs:ui_harness', 'concat:ui_harness');

    //full build, optimised and uglified
    grunt.registerTask('deploy',  deployTasks);
    //full build, optimised and with source mapping
    grunt.registerTask('debug',  debugTasks);
    //same as debug but using mock services
    grunt.registerTask('debugmock',  debugMockTasks);
    //full build, non-optimised (AMDs not combined)
    grunt.registerTask('build', buildTasks);

    grunt.registerTask('test', ['connect:server', 'jasmine']);

    grunt.registerTask('ui',  uiTasks);


    //plato -r -d report -x .json -l jshintrc app/scripts/app/
};