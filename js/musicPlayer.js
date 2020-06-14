const musicPlayer = new Vue({
    el: "#player",
    data: {
        // 查询的音乐信息
        musicInfo: "",
        // 搜索的音乐列表
        musicList: [],
        // 播放的音乐的地址
        musicUrl: "",
        // 当前音乐的图片
        musicPicture: "images/cover.png",
        // 热门评论列表
        topCommentsList: [],
        // 是否正在播放
        isPlaying: false
    },
    methods: {
        searchMusic: function () {
            if (this.musicInfo.length === 0) {
                alert("搜索信息不能为空！");
                return;
            }
            console.log(this.musicInfo);
            let that = this;
            // 开始请求搜索数据
            axios.get("https://autumnfish.cn/search?keywords=" + this.musicInfo)
                .then(
                    function (response) {
                        that.musicList = response.data.result.songs;
                    }, function (error) {
                        console.log(error);
                    }
                )
        },
        playMusic: function (musicId) {
            let that = this;
            // 通过歌曲id 获取歌曲详情
            axios.get("https://autumnfish.cn/song/url?id=" + musicId)
                .then(function (response) {
                    that.musicUrl = response.data.data[0].url;
                }, function (error) {
                    console.log(error);
                });
            // 获取音乐的图片
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
                .then(response => {
                    that.musicPicture = response.data.songs[0].al.picUrl;
                })
                .catch(function (error) {
                    console.log(error);
                });
            // 获取热门评论
            axios.get("https://autumnfish.cn/comment/hot?id=" + musicId + "&type=0")
                .then(response => {
                    that.topCommentsList = response.data.hotComments;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        play: function () {
            this.isPlaying = true;
        },
        pause: function () {
            this.isPlaying = false;
        }
    }
});