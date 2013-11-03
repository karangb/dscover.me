"use strict";angular.module("dscover.me").controller("MainCtrl",function($scope,$http,audio,$compile,fetchTracks,mp3Resource){function setVolume(){$scope.volumes.default==0&&$scope.$apply($scope.muted=!0);audio.volume=$scope.volumes.default}$scope.title="dscover.me";fetchTracks.success(function(e){$scope.tracks=e.tracks});$scope.current=0;$scope.playing=!1;$scope.paused=!1;$scope.muted=!1;$scope.volumes={"default":.5,options:{orientation:"vertical",min:0,max:1,step:.1,range:"min",change:setVolume,slide:setVolume}};$scope.play=function(){if(!$scope.tracks.length)return;var hypemId=$scope.tracks[$scope.current].hypemId;mp3Resource(hypemId).success(function(response){var mp3url=eval(response);$scope.loader=!0;audio.src=mp3url;audio.play();$scope.loader=!1});if($scope.pause){audio.play();$scope.playing=!0}};$scope.pause=function(){if($scope.playing){audio.pause();$scope.playing=!1;$scope.paused=!0}};$scope.next=function(){$scope.paused=!1;$scope.tracks.length>$scope.current+1?$scope.current++:$scope.current=0;$scope.playing&&$scope.play()};$scope.prev=function(){$scope.paused=!1;if($scope.current>0){$scope.current--;$scope.play()}};$scope.muteVolume=function(){if($scope.muted==1){$scope.muted=!1;$scope.volumes.default=.5}else{audio.volume=0;$scope.volumes.default=0;$scope.muted=!0}};$scope.checkHypemId=function(){return $scope.tracks[$scope.current].hypemId};audio.addEventListener("ended",function(){$scope.$apply($scope.next)});audio.addEventListener("timeupdate",function(){var e=document.getElementById("duration"),t=parseInt(audio.currentTime%60),n=audio.duration,r=t/n*100;$(".progress").html($compile("<div class='progress-bar' style='width:"+r+"%'><span class='sr-only'>60% Complete</span></div>")($scope))},!1)}).factory("audio",function(e){var t=e[0].createElement("audio");return t}).factory("fetchTracks",function(e){return e.get("http://gijwi.com:8080/recommendations?username=karan")}).factory("mp3Resource",function(e,t){return function(t){return e.get("http://gijwi.com:3001/mp3?hypemId="+t)}});