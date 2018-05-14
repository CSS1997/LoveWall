var app = getApp();
const AV = require('../../libs/av-weapp-min.js');
var Lovelist = AV.Object.extend('Lovelist');
var getList = function (_that) {
	var query = new AV.Query('Lovelist');
	query.descending('createdAt').find().then(function (products) {
		_that.setData({
			contentList:products
		});
		console.log(this.data.contentList);
	}).catch(function (error) {
		alert(JSON.stringify(error));
	});
}
Page({
	data: {
		tabArray: [
			'本期表白墙',
			'往期表白墙'],
		currentTab: 0,
		currentY: 0,
		pageStartY: 0,
		pageEndY: 0,
		isFixed: false,
		contentList: [
		],
		//轮播图
		imgUrls: [
			'http://lc-iYWKqvUU.cn-n1.lcfile.com/33e2be85df9ea50c4f7f.jpg'
		],
		indicatorDots: true,
		autoplay: false,
		interval: 5000,
		duration: 800,
		isBtnShow: false,
		scrollTop:false,
		isRefresh:false
	},
	onLoad:function () {
		getList(this);
	},
	onShow:function () {
		getList(this);
	},
	onReady:function () {

	},

  
	bindChange: function (e) {
		var that = this;
		that.setData({currentTab: e.detail.current});
	},
	goDetails:function (e) {
		var objId = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: "../loveWall-details/loveWall-details?objId=" + objId
		})
	},
	swichNav: function (e) {
		var that = this;
		// console.log(e.target)
		if (this.data.currentTab === e.target.dataset.current) {
			return false;
		} else {
			that.setData({
				currentTab: e.target.dataset.current
			})
		}
	},
	scrollstart: function (e) {
		var _that = this;
		_that.setData({
			pageStartY: e.touches[0].pageY,
		});
	},
	scrollend: function (e) {
		var _that = this;
		// console.log(e.changedTouches[0].pageY)
		if (_that.data.pageStartY-20 > e.changedTouches[0].pageY) { //向下
			_that.setData({
				isFixed: true,
				isBtnShow: true,
			});
		}
	},
	backTop: function (e) {
		var _that = this;
		// console.log(e.changedTouches[0].pageY)
		_that.setData({
			isFixed: false,
			isBtnShow: false,
			scrollTop:0,
		});
	},
	goRelease:function () {
		wx.navigateTo({
			url: '/pages/release/release'
		})
	}
})