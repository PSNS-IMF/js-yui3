/// <reference path="./../../src/yui3/build/yui/yui.js" />
/// <reference path="E:\Build\yui3\build\yui\yui.js" />
/// <reference path="./../../packages/Chutzpah.3.2.6/tools/TestFiles/Jasmine/v2/jasmine.js" />
/// <reference path="./../../packages/Chutzpah.3.2.6/tools/TestFiles/Jasmine/v2/boot.js" />

var YUIConfigurator =
{
    Configure: function(yuiBuildPath,
    galleryBuildPath,
    useDebugVersion)
    {
        var configuration =
        {
            classNamePrefix: 'pure',
            //filter: 'raw', // can be 'DEBUG' (debug version) or 'RAW' (non-minified)
            base: yuiBuildPath,
            groups:
                {
                    gallery:
                        {
                            base: galleryBuildPath,
                            patterns:
                                {
                                    'gallery-': {},
                                    'gallerycss-': { type: 'css' }
                                }
                        },
                    gallerycss:
                        {
                            base: galleryBuildPath,
                            modules:
                                {
                                    'gallery-sm-menu-core-css':
                                        {
                                            path: 'gallery-sm-menu/assets/gallery-sm-menu-core.css',
                                            type: 'css'
                                        }
                                }
                        }
                }
        };

        if(useDebugVersion === true)
        {
            configuration.filter = 'DEBUG';
        }

        YUI.applyConfig(configuration);
    }
};

var buildPath = './../../src/yui3/build/',
    galleryPath = './../../src/yui3-gallery/build/';

describe('Menu', function()
{
    var sandbox;
    beforeEach(function(done)
    {
        if(location.href.indexOf('C:/Builds') != -1)
        {
            buildPath = 'E:\\Build\\yui3\\build\\';
            galleryPath = 'E:\\Build\\yui3-gallery\\build\\';
        }

        YUIConfigurator.Configure(buildPath,
            galleryPath,
            true);

        YUI().use('node', function(Y)
        {
            sandbox = Y.one('body').appendChild('<div id="menu"></div>');
            done();
        });
    });

    afterEach(function(done)
    {
        sandbox.remove()
        done();
    });
    
    it('should render an item with a title correctly', function(done)
    {
        YUI().use('gallery-sm-menu', function(Y)
        {
            var menu = new Y.Menu({
                container: '#menu',

                items: [
                    {
                        id: 'firstItem',
                        label: 'First Item', url: 'http://www.example.com/',
                        title: 'First Item Title'
                    },
                    {
                        id: 'secondItem',
                        label: 'Second Item', url: 'http://www.second.com/'
                    },
                    {
                        id: 'thirdItem',
                        label: 'Third Item', url: 'http://www.second.com/',
                        title: null
                    },
                    {
                        label: 'Second Item', children: [
                           { label: 'Submenu Item' },
                           { label: 'Another Submenu Item' }
                        ]
                    },

                    { type: 'separator' },

                    { label: 'Group Heading', type: 'heading' },
                    { label: 'Another Item' }
                ]
            });

            menu.render().show();

            expect(Y.one('#firstItem').getAttribute('title')).toEqual('First Item Title');
            expect(Y.one('#secondItem').getAttribute('title')).toEqual('');
            expect(Y.one('#thirdItem').getAttribute('title')).toEqual('');

            done();
        });
    });
});