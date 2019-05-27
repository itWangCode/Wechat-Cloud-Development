// pages/cloud/cloud.js
const db = wx.cloud.database();//初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[]
  },

//插入数据
  insert(){
    console.log("插入数据");
    /*db.collection('user').add({
      data:{
        name:'wang',
        age:20
      },
      success:res=>{
        console.log(res);
      },
      fail:err=>{
        console.log(err);
      }
    })*/

    //使用promise的写法
    db.collection('user').add({
      data:{
        name:'wangcoder',
        age:23
      }
    }).then(res => { 
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },

//更新数据
  update(){
    db.collection('user').doc('f4b905395ceaa61e062a8acd12369409').update({
      data:{
        age:21
      }
    }).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },

  // 查找数据
  search(){
    console.log('aaa');
    db.collection('user').where({
      name:'wangyang'
    }).get().then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    });
  },

  //删除数据
  delete(){
    db.collection('user')
    .doc('57896b495ceaa8e10627bde54a1b3345')
    .remove()
    .then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },

  // 调用云函数文件
  sum(){
    wx.cloud.callFunction({
      name:'sum',//这里是当前云函数的名称
      data:{
        a:2,
        b:5
      }
    }).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    });
  },


  // getOpenId
  getOpenId(){
    console.log("aaavvv");
    wx.cloud.callFunction({
      name:'login'
    }).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },

  //getDelete
  getDelete(){
    wx.cloud.callFunction({
      name:'batchDelete',
    }).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.error(err);
    })
  },

  //upload
  upload(){
    //选择图片,chooseImage第一步
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);

        //第二步uploadFile
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime()+'.png', // 上传至云端的路径
          filePath: tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID);
            db.collection('images').add({
              data:{
                fileID: res.fileID
              }
            }).then(res=>{
              console.log(res);
            }).catch(err=>{
              console.log(res);
            })
          },
          fail: console.error
        })
      }
    })
  },

  //getFileShow
  getFileShow(){
    wx.cloud.callFunction({
      name:'login'
    }).then(res=>{
      db.collection('images').where({
        _openid: res.result.openid
      }).get().then(res2=>{
        console.log(res2);
        this.setData({
          images:res2.data
        })
      })
    })
  },

  //downloadFile
  downloadFile(event){
    wx.cloud.downloadFile({
      fileID: event.target.dataset.fileid, // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath);
        //保存图片
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) { 
            wx.showToast({
              title: '保存成功',
            })
          }
        })
      },
      fail: console.error
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})