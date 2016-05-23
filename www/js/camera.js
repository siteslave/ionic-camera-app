'use strict';

angular.module('starter.controllers.Camera', [])
  .controller('CameraCtrl', function ($scope, $log, $ionicPlatform, $cordovaCamera, $cordovaFileTransfer) {
    $scope.myPicture = null;

    $scope.takePicture = function () {
      $ionicPlatform.ready(function () {


        var options = {
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.PNG,
          targetWidth: 200,
          targetHeight: 200,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: true,
          correctOrientation: true
        };

        $cordovaCamera.getPicture(options).then(function (imageURI) {
          $log.info(imageURI);
          $scope.myPicture = imageURI;
        }, function (err) {
          $log.error(err);
        });
      });
    };

    $scope.uploadImage = function () {

      $ionicPlatform.ready(function () {

        let serverUrl = 'http://192.168.43.76:3000/uploads/image';
        $cordovaFileTransfer.upload(serverUrl, $scope.myPicture, { params: {hospcode: '11053'}})
          .then(function (result) {
            // Success!
            $log.info(result);
          }, function (err) {
            // Error
            $log.error(err);
          }, function (progress) {
            // constant progress updates
            $log.info(progress);
          });

      });

    };

  });