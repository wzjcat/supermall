<template>
    <!-- 静态页面 无数据 -->
    <div id="profile">
        <nav-bar class="nav-bar">
            <div slot="center">我的档案</div>
        </nav-bar>
        <!-- 个人信息 -->
        <div class="info-head">
            <div class="head-left">
                <img src="~assets/img/profile/avatar.svg" alt="">
            </div>
            <div class="head-center">
                <div class="login">登录/注册</div>
                <div class="phone">
                    <img src="~assets/img/profile/phone.svg" alt="">
                    <span>暂无绑定手机号</span>
                </div>
            </div>
            <div class="head-right">
                ＞
            </div>
        </div>
        <!-- 个人余额优惠券积分 -->
        <div class="info-center">
            <div>
                <span>0.00</span>元
                <p>我的余额</p>
            </div>
            <div>
                <span>0</span>个
                <p>我的余额</p>
            </div>
            <div>
                <span>0</span>分
                <p>我的余额</p>
            </div>
        </div>
        <!-- app相关功能 -->
        <div class="info-bottom-one">

            <div>
                <img src="~assets/img/profile/message.svg" alt="">
                <span>我的消息</span>
            </div>
            <div>
                <img src="~assets/img/profile/pointer.svg" alt="">
                <span>积分商城</span>
            </div>
            <div>
                <img src="~assets/img/profile/vip.svg" alt="">
                <span>会员卡</span>
            </div>
        </div>
        <div class="info-bottom-two">
            <div>
                <img src="~assets/img/profile/cart.svg" alt="">
                <span>我的购物车</span>
            </div>
            <div>
                <img src="~assets/img/profile/shopping.svg" alt="">
                <span>下载购物app</span>
            </div>
        </div>

    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    export default {
        name: 'Profile',
        components: {
            NavBar,
        }
    }
</script>

<style scoped>
    #profile {
        height: 100vh;
        background-color: #f5f5f5;
    }

    .nav-bar {
        color: #fff;
        font-weight: 700;
        background-color: var(--color-tint);
    }

    .info-head {
        display: flex;
        width: 100%;
        height: 90px;
        color: #fff;
        background-color: var(--color-tint);
    }

    .info-head .head-left img {
        margin: 15px 20px;
        width: 60px;
        height: 60px;
    }

    .info-head .head-center {
        position: relative;
        flex: 1;
    }

    .info-head .head-center .login {
        position: absolute;
        top: 23px;
        left: 5px;
        font-size: 16px;
    }

    .info-head .head-center .phone {
        position: absolute;
        top: 47px;
        left: 0;
    }

    .info-head .head-center .phone img {
        width: 20px;
        height: 100%;
        vertical-align: middle;
    }

    .info-head .head-center .phone span {
        font-size: 14px;
    }

    .info-head .head-right {
        margin-right: 10px;
        font-size: 20px;
        line-height: 90px;
    }

    .info-center {
        background-color: #fff;
        display: flex;
        height: 85px;
        text-align: center;
    }

    .info-center div {
        flex: 1;
        padding-top: 20px;
        font-size: 14px;
    }

    .info-center div:nth-child(2) {
        border-left: 3px solid #f5f5f5;
        border-right: 3px solid #f5f5f5;
    }

    .info-center span {
        font-size: 20px;
        font-weight: 700;
        color: red;
    }

    .info-center p {
        margin-top: 5px;
        font-size: 14px;

    }

    .info-bottom-one,
    .info-bottom-two {
        background-color: #f5f5f5;
    }

    .info-bottom-one div,
    .info-bottom-two div {
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        font-weight: 700;
        background-color: #fff;

    }

    .info-bottom-one img,
    .info-bottom-two img {
        width: 20px;
        height: 100%;
        vertical-align: middle;
        margin: auto 10px;
    }

    .info-bottom-one {
        margin: 20px 0;
    }

    .info-bottom-one div:nth-child(2) {
        margin: 2px 0;
    }

    .info-bottom-two div:nth-child(1) {
        margin-bottom: 2px;
    }
</style>