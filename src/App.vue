<template>
        <div id="app">hello APP 2022/2/12 test1321121卧槽真的牛逼1111
            <div>
                <img src="@/assets/1.png" alt="">
                mesage
            </div>
            <router-view />
        </div>
</template>
<script>
export default {
    name:'',
    data(){
        return {
            text: '1231'
        }
    },
    async mounted(){
        await this.new()
        console.log('11132111');
        console.log('at');
        console.log(process.env);
    },
    methods:{
        new() {
            this.text = '1'
        }
    }
}
</script>
<style lang="scss">
 div{
     color: red;
     font-size: 12px;
     background: #f6f6f6;
     transform: translate(100px);
     backface-visibility: hidden;
 }
</style>