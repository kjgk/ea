'use strict';

angular.module('app', ['ngAnimate', 'ui.router', 'ui.bootstrap'
    , 'angular-loading-bar', 'LocalStorageModule', 'ngDragDrop', 'gridster', 'colorpicker.module', 'angular-table', 'ui-rangeSlider', 'angularFileUpload'])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'partials/designer.html',
                controller: 'DesignerCtrl'
            })
            .state('preview', {
                url: '/preview',
                templateUrl: 'partials/preview.html',
                controller: 'PreviewCtrl'
            });

        $urlRouterProvider.otherwise('/');

        $httpProvider.interceptors.push(function ($q, $location, $filter, cfpLoadingBar) {
            return {
                'request': function (request) {

                    if (request.cfpLoading === undefined || request.cfpLoading) {
                        cfpLoadingBar.start();
                    }

                    return request || $q.when(request);
                },
                'response': function (response) {
                    cfpLoadingBar.complete();

                    return response || $q.when(response);
                },

                'responseError': function (rejection) {
                    cfpLoadingBar.complete();
                    // 网络中断或服务器关闭
                    if (rejection.status == 0 || rejection.status == 502) {
                        window.location.reload();
                        return;
                    }
                    alert(rejection.status);
                    return $q.reject(rejection);
                }
            };
        });
    })

    .directive('jsTree', function () {
        return {
            restrict: 'EA',
            scope: {
                treeOptions: '=treeOptions',
                treeEventGroup: '=treeEventGroup'
            },
            link: function (scope, element, attribute) {
                var config = scope.treeOptions || {};
                var treeEventGroup = scope.treeEventGroup || 'jstree';
                var tree = jQuery(element).jstree(config);
                var events = ['changed'];
                _.each(events, function (event) {
                    tree.on(event + '.jstree', function (a, b) {
                        scope.$emit(event + '.' + treeEventGroup, b, $.jstree.reference(tree).get_selected(tree));
                    });
                });

            }
        };
    })

    .controller('MainCtrl', function () {

    })

    .controller('DesignerCtrl', function ($scope, $http, localStorageService, $state) {

        $scope.header = {};
        $scope.footer = {};

        var pageData = localStorageService.get('pageData') || {};

        $scope.treeOptions = {
            core: {
                data: function (obj, cb) {
                    $http({
                        url: '/ea/ea/page/loadTree',
                        method: 'GET',
                        params: {
                            node: obj.id == '#' ? 'ROOT' : obj.id
                        }
                    }).success(function (response) {
                        var nodes = [];
                        _.each(response.nodes, function (node) {
                            nodes.push({
                                id: node.id,
                                text: node.text,
                                icon: node.leaf ? 'fa fa-bar-chart-o' : 'fa fa-folder-o',
                                children: node.leaf ? [] : true
                            });
                        });
                        cb.call(this, nodes);
                    })
                }
            }, "plugins": [ "wholerow", "checkbox" ]};

        $scope.$on('changed.jstree', function (event, action, nodes) {
            $scope.selectedNodes = nodes;
        });

        $scope.pageItemList = pageData.content;

        $scope.addPageItem = function () {
            _.each($scope.selectedNodes, function (node) {
                if (node.parent == '#' || _.contains(_.pluck($scope.pageItemList, 'menuId'), node.id)) {
                    return true;
                }
                $scope.pageItemList.push({
                    name: node.text,
                    menuId: node.id
                });
            });
        };

        $scope.deletePageItem = function (item) {
            $scope.pageItemList = _.without($scope.pageItemList, item);
        };

        $scope.orderPageItem = function (item, pos) {
            var index = _.indexOf($scope.pageItemList, item);
            var target = $scope.pageItemList[index + pos];
            $scope.pageItemList[index + pos] = item;
            $scope.pageItemList[index] = target;
        };

        $scope.preview = function () {
            if (_.isEmpty($scope.pageItemList)) {
                alert('请设置内容！');
                return;
            }
            localStorageService.set('pageData', {
                header: $scope.header,
                footer: $scope.footer,
                content: $scope.pageItemList
            });
            $state.transitionTo('preview');
        };
    })

    .controller('DesignerWidgetCtrl', function ($scope, localStorageService, FileUploader) {

        var pageData = localStorageService.get('pageData') || {};
        $scope.widgets = [
            {
                title: '文字', icon: 'fa-text-width', tag: 'text', attributes: {style: {background: '', color: '#000000', fontFamily: 'Microsoft YaHei', 'fontSize': 14, textAlign: 'left'}}
            },
            {
                title: '图片', icon: 'fa-file-image-o', tag: 'image', attributes: {style: {background: '#ffEE00'}}
            },
            {
                title: '时间', icon: 'fa-clock-o', tag: 'date', sizeX: 12, sizeY: 2, attributes: {dateFormat: 'yyyy-MM-dd HH:mm:ss', style: {background: '', color: '#000000', fontFamily: 'Microsoft YaHei', 'fontSize': 14, textAlign: 'center', padding: 4}}
            }
        ];

        $scope.$watch('target', function () {
            $scope.$parent.$parent[$scope.target] = $scope.data = {
                options: pageData[$scope.target] && pageData[$scope.target].options ? pageData[$scope.target].options : {
                    columns: 64,
                    pushing: false,
                    floating: false,
                    margins: [2, 2],
                    minColumns: 1,
                    minRows: 2,
                    maxRows: 12,
                    contain: true,
                    defaultSizeX: 8,
                    defaultSizeY: 4
                },
                items: pageData[$scope.target] && pageData[$scope.target].items ? pageData[$scope.target].items : []
            };
        });

        $scope.pageItemList = pageData.content || [];

        $scope.dropSuccessHandler = function (widget) {
            $scope.data.items.push(angular.copy(widget));
        };

        $scope.$on('gridster.itemselect', function (event, scope) {
            $scope.currentItem = scope.item;
            $scope.$apply($scope.currentItem);
        });

        $scope.deleteItem = function () {
            $scope.data.items = _.without($scope.data.items, $scope.currentItem);
            $scope.currentItem = null;
        };

        var uploader = $scope.uploader = new FileUploader({
            url: '/ea/ea/page/image/upload',
            alias: 'attachment',
            removeAfterUpload: true,
            autoUpload: true
        });

        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            $scope.currentItem.attributes.image = {
                name: response.fileName,
                filename: response.tempFileName
            };
        };
    })

    .controller('PreviewCtrl', function ($scope, $state, localStorageService) {

        $scope.pageData = localStorageService.get('pageData');

        $scope.headerOptions = _.extend(_.clone($scope.pageData.header.options), {
            resizable: false,
            draggable: false
        });

        $scope.footerOptions = _.extend(_.clone($scope.pageData.footer.options), {
            resizable: false,
            draggable: false
        });

        $scope.back = function () {
            $state.transitionTo('home');
        };
        $scope.baseSize = 980 * 147 / 10000;

        if (_.isEmpty($scope.pageData.content)) {
            alert('请设置内容！');
            $state.transitionTo('home');
            return;
        }

        $scope.index = 0;

        $scope.currentId = $scope.pageData.content[$scope.index].menuId;
        $scope.prePage = function () {
            $scope.currentId = $scope.pageData.content[--$scope.index].menuId;
        };
        $scope.nextPage = function () {
            $scope.currentId = $scope.pageData.content[++$scope.index].menuId;
        };

        $scope.getCurrentPageSrc = function () {
            return 'ea/loadPage/withub.ext.ea.page.PageDisplay?menuId=' + $scope.currentId;
//            return 'ea/111';
        };

        $scope.getPageNo = function () {
            return $scope.index + 1 + '/' + $scope.pageData.content.length;
        };

    })
;

